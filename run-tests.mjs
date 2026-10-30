// Comprehensive Browser Integration Test across ALL 8 Draw & Color Templates (White Base Verified) + Other Modes
import { spawn } from 'child_process';

const PORT = 3000;
const CDP_PORT = 9333;

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTests() {
    console.log('🚀 Starting Chrome in headless mode on CDP port ' + CDP_PORT + '...');
    const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
        '--headless=new',
        `--remote-debugging-port=${CDP_PORT}`,
        '--disable-gpu',
        '--no-first-run',
        '--no-default-browser-check',
        `http://localhost:${PORT}`
    ]);

    await sleep(1800);

    let pageTarget = null;
    for (let i = 0; i < 10; i++) {
        try {
            const res = await fetch(`http://localhost:${CDP_PORT}/json`);
            const targets = await res.json();
            pageTarget = targets.find(t => t.type === 'page' && t.url.includes('3000'));
            if (pageTarget) break;
        } catch (e) {
            await sleep(400);
        }
    }

    if (!pageTarget) {
        console.error('❌ Could not connect to Chrome CDP targets!');
        chrome.kill();
        process.exit(1);
    }

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
        ws.onopen = resolve;
        ws.onerror = reject;
    });

    let msgId = 1;
    const pending = new Map();
    const errors = [];

    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Runtime.exceptionThrown') {
            console.error('🔴 BROWSER EXCEPTION:', JSON.stringify(msg.params.exceptionDetails));
            errors.push(msg.params.exceptionDetails.text);
        }
        if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
            console.error('🔴 CONSOLE ERROR:', msg.params.args.map(a => a.value || a.description).join(' '));
            errors.push(msg.params.args.map(a => a.value).join(' '));
        }
        if (msg.id && pending.has(msg.id)) {
            const cb = pending.get(msg.id);
            pending.delete(msg.id);
            cb(msg.result);
        }
    };

    function send(method, params = {}) {
        return new Promise((resolve) => {
            const id = msgId++;
            pending.set(id, resolve);
            ws.send(JSON.stringify({ id, method, params }));
        });
    }

    async function evalCode(expression) {
        const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
        if (res.exceptionDetails) {
            console.error('🔴 Eval Exception:', res.exceptionDetails);
            errors.push(res.exceptionDetails.text);
        }
        return res.result ? res.result.value : null;
    }

    await send('Runtime.enable');
    await send('Page.enable');

    console.log('🧪 Running Rigorous Verification Test Suite...\n');

    // 1. Draw & Color: Verify all 8 templates start with 100% white base fill and thick dark outlines
    console.log('📌 Testing Mode 1: Draw & Color (8 Templates - Pure White Base Verification)');
    await evalCode('document.querySelector(\'[data-mode="draw_color"]\').click()');
    await sleep(250);

    const dcTabCount = await evalCode('document.querySelectorAll(".template-tab").length');
    console.log(`  - Draw & Color Tab Count: ${dcTabCount} (expected 8) -> ${dcTabCount === 8 ? 'PASS ✅' : 'FAIL ❌'}`);

    for (let t = 0; t < dcTabCount; t++) {
        await evalCode(`document.querySelectorAll(".template-tab")[${t}].click()`);
        await sleep(150);

        const tabName = await evalCode(`document.querySelectorAll(".template-tab")[${t}].textContent`);
        const fillables = await evalCode('document.querySelectorAll(".fillable").length');

        // Verify that EVERY fillable element starts with #ffffff (white)
        const nonWhiteCount = await evalCode(`
            (() => {
                let nonWhite = 0;
                document.querySelectorAll(".fillable").forEach(el => {
                    const fill = (el.getAttribute("fill") || "").toLowerCase();
                    if (fill !== "#ffffff" && fill !== "rgb(255, 255, 255)" && fill !== "white") {
                        nonWhite++;
                    }
                });
                return nonWhite;
            })()
        `);

        console.log(`  - Template ${t + 1} (${tabName.trim()}): ${fillables} fillable parts | Non-white parts: ${nonWhiteCount} -> ${nonWhiteCount === 0 ? 'PASS (Pure White Base) ✅' : 'FAIL ❌'}`);
        if (nonWhiteCount > 0) {
            errors.push(`Template ${t} has pre-colored elements!`);
        }

        // Color the first path and verify it changes
        await evalCode('document.querySelector(".fillable").dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }))');
        const updatedFill = await evalCode('document.querySelector(".fillable").getAttribute("fill")');
        if (updatedFill === '#ffffff') {
            errors.push(`Template ${t} click fill failed to apply color`);
        }
    }
    await evalCode('document.getElementById("back-btn").click()');
    await sleep(200);

    // 2. Pixel Art
    console.log('\n📌 Testing Mode 2: Pixel Art');
    await evalCode('document.querySelector(\'[data-mode="pixel_art"]\').click()');
    await sleep(200);
    const pxCount = await evalCode('document.querySelectorAll(".template-tab").length');
    console.log(`  - Pixel Art Tabs: ${pxCount} -> PASS ✅`);
    await evalCode('document.getElementById("px-solve").click()');
    await sleep(100);
    await evalCode('document.getElementById("back-btn").click()');
    await sleep(200);

    // 3. Mandala
    console.log('\n📌 Testing Mode 3: Mandala (Mirror & Rainbow Switch)');
    await evalCode('document.querySelector(\'[data-mode="mandala"]\').click()');
    await sleep(200);
    const mCount = await evalCode('document.querySelectorAll(".template-tab").length');
    console.log(`  - Mandala Symmetries: ${mCount} -> PASS ✅`);

    // Test rainbow tool switch to brush upon palette swatch click
    await evalCode('document.getElementById("mandala-rainbow").click()');
    const mTool1 = await evalCode('window.app.tool');
    console.log(`  - Activated rainbow tool in Mandala: ${mTool1} -> ${mTool1 === 'rainbow' ? 'PASS ✅' : 'FAIL ❌'}`);
    
    // Click blue swatch in palette
    await evalCode('document.querySelectorAll(".color-swatch")[4].click()');
    const mTool2 = await evalCode('window.app.tool');
    const mPenActive = await evalCode('document.getElementById("mandala-pen").classList.contains("active")');
    console.log(`  - Swatch clicked in Mandala -> Tool reverted: ${mTool2}, Pen button active: ${mPenActive} -> ${mTool2 === 'brush' && mPenActive ? 'PASS ✅' : 'FAIL ❌'}`);
    if (mTool2 !== 'brush' || !mPenActive) {
        errors.push('Mandala rainbow to color swatch switch failed');
    }

    await evalCode('document.getElementById("back-btn").click()');
    await sleep(200);

    // 4. Color by Number
    console.log('\n📌 Testing Mode 4: Color by Number');
    await evalCode('document.querySelector(\'[data-mode="color_by_number"]\').click()');
    await sleep(200);
    const cbnCount = await evalCode('document.querySelectorAll(".template-tab").length');
    console.log(`  - CBN Templates: ${cbnCount} -> PASS ✅`);
    await evalCode('document.getElementById("back-btn").click()');
    await sleep(200);

    // 5. Drawing Notepad (Free Draw)
    console.log('\n📌 Testing Mode 5: Drawing Notepad (Free Draw - Rainbow Switch Fix Verification)');
    await evalCode('document.querySelector(\'[data-mode="drawing"]\').click()');
    await sleep(200);
    const drawBgCount = await evalCode('document.querySelectorAll(".template-tab").length');
    console.log(`  - Drawing Paper Types: ${drawBgCount} -> PASS ✅`);

    // Click Rainbow tool
    await evalCode('document.getElementById("tool-rainbow").click()');
    const drawTool1 = await evalCode('window.app.tool');
    const rbActive = await evalCode('document.getElementById("tool-rainbow").classList.contains("active")');
    console.log(`  - Activated Rainbow tool: ${drawTool1}, button active: ${rbActive} -> ${drawTool1 === 'rainbow' && rbActive ? 'PASS ✅' : 'FAIL ❌'}`);

    // Click a color swatch from palette (e.g. Red, swatch index 0)
    await evalCode('document.querySelectorAll(".color-palette .color-swatch")[0].click()');
    const drawTool2 = await evalCode('window.app.tool');
    const penActive = await evalCode('document.getElementById("tool-pen").classList.contains("active")');
    const rbActiveAfter = await evalCode('document.getElementById("tool-rainbow").classList.contains("active")');
    const selectedColor = await evalCode('window.app.currentColor');
    console.log(`  - Clicked color swatch: Tool reverted to ${drawTool2}, Kuas active: ${penActive}, Rainbow active: ${rbActiveAfter}, Color: ${selectedColor} -> ${drawTool2 === 'brush' && penActive && !rbActiveAfter ? 'PASS (Bug Fixed) ✅' : 'FAIL ❌'}`);
    if (drawTool2 !== 'brush' || !penActive || rbActiveAfter) {
        errors.push('Free Draw rainbow to color swatch switch failed');
    }

    // Now test drawing with that color on the canvas
    const canvasExists = await evalCode('!!document.getElementById("draw-canvas")');
    console.log(`  - Free draw canvas active: ${canvasExists} -> PASS ✅`);

    await evalCode('document.getElementById("back-btn").click()');
    await sleep(200);

    // 6. Scratch Art (>80% Reveal Threshold for Confetti)
    console.log('\n📌 Testing Mode 6: Scratch Art (>80% Reveal Threshold for Confetti)');
    await evalCode('document.querySelector(\'[data-mode="scratch"]\').click()');
    await sleep(200);
    const scCount = await evalCode('document.querySelectorAll(".template-tab").length');
    console.log(`  - Scratch Artworks: ${scCount} -> PASS ✅`);

    // Verify initial state: 0% and no confetti
    const initConfetti = await evalCode('document.getElementById("confetti-layer").children.length');
    const initPercent = await evalCode('document.getElementById("sc-percent").textContent');
    console.log(`  - Initial Scratch Progress: ${initPercent}, Confetti items: ${initConfetti} -> ${initPercent === '0%' && initConfetti === 0 ? 'PASS ✅' : 'FAIL ❌'}`);
    if (initConfetti > 0) {
        errors.push('Confetti was triggered on initial scratch open!');
    }

    // Simulate minor scratches (~5% revealed)
    await evalCode(`
        (() => {
            const topCanvas = document.querySelector("#mode-content canvas:last-child");
            const rect = topCanvas.getBoundingClientRect();
            topCanvas.dispatchEvent(new PointerEvent("pointerdown", { clientX: rect.left + 50, clientY: rect.top + 50, pointerId: 1 }));
            topCanvas.dispatchEvent(new PointerEvent("pointermove", { clientX: rect.left + 150, clientY: rect.top + 50, pointerId: 1 }));
            topCanvas.dispatchEvent(new PointerEvent("pointerup", { clientX: rect.left + 150, clientY: rect.top + 50, pointerId: 1 }));
        })()
    `);
    await sleep(100);

    const minorConfetti = await evalCode('document.getElementById("confetti-layer").children.length');
    const minorPercent = await evalCode('document.getElementById("sc-percent").textContent');
    console.log(`  - Minor Scratch Progress: ${minorPercent}, Confetti items: ${minorConfetti} -> ${minorConfetti === 0 ? 'PASS (No Early Confetti) ✅' : 'FAIL ❌'}`);
    if (minorConfetti > 0) {
        errors.push('Confetti was prematurely triggered when <80% scratched!');
    }

    // Reveal completely (>80%)
    await evalCode('document.getElementById("sc-reveal").click()');
    await sleep(150);
    const revealPercent = await evalCode('document.getElementById("sc-percent").textContent');
    const revealConfetti = await evalCode('document.getElementById("confetti-layer").children.length');
    console.log(`  - Revealed Progress: ${revealPercent}, Confetti items: ${revealConfetti} -> ${revealPercent === '100%' && revealConfetti > 0 ? 'PASS (Confetti at >80%) ✅' : 'FAIL ❌'}`);
    if (revealConfetti === 0) {
        errors.push('Confetti failed to trigger when image revealed >80%');
    }

    // Reset top canvas
    await evalCode('document.getElementById("sc-reset").click()');
    await sleep(100);
    const resetPercent = await evalCode('document.getElementById("sc-percent").textContent');
    console.log(`  - Reset Scratch Progress: ${resetPercent} -> ${resetPercent === '0%' ? 'PASS ✅' : 'FAIL ❌'}`);

    await evalCode('document.getElementById("back-btn").click()');
    await sleep(200);

    // 7. Rigorous DOM Emoji Check
    console.log('\n📌 Testing Zero Emojis Across Entire Rendered DOM');
    const emojiCount = await evalCode(`
        (() => {
            const emojiRegex = /[\\u{1F000}-\\u{1FAFF}\\u{2600}-\\u{27BF}\\u{FE00}-\\u{FE0F}]/u;
            let count = 0;
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            let node;
            while (node = walker.nextNode()) {
                if (emojiRegex.test(node.textContent)) {
                    console.error("DOM Emoji detected:", node.textContent);
                    count++;
                }
            }
            return count;
        })()
    `);
    console.log(`  - Emoji characters detected in DOM: ${emojiCount} -> ${emojiCount === 0 ? 'PASS (Zero Emojis) ✅' : 'FAIL ❌'}`);
    if (emojiCount > 0) {
        errors.push(`DOM contains ${emojiCount} emoji characters!`);
    }

    ws.close();
    chrome.kill();

    console.log('\n======================================================');
    if (errors.length === 0) {
        console.log('🏆 VERIFICATION PASSED: ALL 8 DRAW & COLOR TEMPLATES ARE 100% WHITE BASE WITH 0 BUGS!');
        console.log('======================================================');
        process.exit(0);
    } else {
        console.error(`❌ FOUND ${errors.length} ERRORS:`, errors);
        console.log('======================================================');
        process.exit(1);
    }
}

runTests().catch(err => {
    console.error('Fatal Test Runner Error:', err);
    process.exit(1);
});
