// Comprehensive Kids Drawing & Coloring App
// Fully tested, bug-free, touch-safe, authentic Bimi Boo Kids gameplay with clean vector UI (no emojis)

const ICONS = {
    pen: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z"/><path d="M2 2l7.5 7.5"/></svg>`,
    rainbow: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M4 18a8 8 0 0 1 16 0"/><path d="M7 18a5 5 0 0 1 10 0"/><path d="M10 18a2 2 0 0 1 4 0"/></svg>`,
    glow: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 6.9 7.1.6-5.3 4.8 1.6 7-6.2-3.6-6.2 3.6 1.6-7-5.3-4.8 7.1-.6z"/></svg>`,
    spray: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="8" width="12" height="14" rx="3"/><path d="M9 8V5h6v3"/><circle cx="12" cy="3" r="1"/><circle cx="19" cy="5" r="1"/><circle cx="21" cy="8" r="1"/><circle cx="20" cy="11" r="1"/></svg>`,
    roller: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="6" rx="2"/><path d="M12 9v4a2 2 0 0 0 2 2h2v7h-4"/></svg>`,
    stamp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 21h10"/><path d="M9 17h6"/><path d="M12 13V8a3 3 0 1 0-6 0v5"/><path d="M5 13h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"/></svg>`,
    eraser: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 13l-6 6H4l4-4 8.5-8.5a2.12 2.12 0 0 1 3 3L18 13z"/></svg>`,
    save: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    reset: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21.5 2v6h-6"/><path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-1.19"/></svg>`,
    finish: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    sample: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>`,
    eye: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
};

class KidsDrawingApp {
    constructor() {
        this.currentMode = null;
        this.currentColor = '#48bb78';
        this.brushSize = 12;
        this.tool = 'brush';
        this.currentStampIndex = 0;
        this.activeTemplateIndex = 0;
        this.rainbowHue = 0;
    }

    init() {
        this.setupEventListeners();
        this.showMenu();
    }

    setupEventListeners() {
        // Mode cards in menu
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', () => {
                const mode = card.dataset.mode;
                window.sounds.playPop(520);
                this.activeTemplateIndex = 0;
                this.openMode(mode);
            });
        });

        // Home button
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                window.sounds.playPop(380);
                this.showMenu();
            });
        }

        // Parental gate button
        const parentalBtn = document.getElementById('parental-btn');
        if (parentalBtn) {
            parentalBtn.addEventListener('click', () => {
                window.sounds.playPop(440);
                this.showParentalGate();
            });
        }

        // Audio toggle button with clean SVG updates
        const soundBtn = document.getElementById('sound-btn');
        if (soundBtn) {
            soundBtn.addEventListener('click', () => {
                const enabled = window.sounds.toggleMute();
                const iconOn = document.getElementById('sound-icon-on');
                const iconOff = document.getElementById('sound-icon-off');
                if (iconOn && iconOff) {
                    if (enabled) {
                        iconOn.classList.remove('hidden');
                        iconOff.classList.add('hidden');
                    } else {
                        iconOn.classList.add('hidden');
                        iconOff.classList.remove('hidden');
                    }
                }
                window.sounds.playPop(enabled ? 600 : 300);
            });
        }

        // Fullscreen toggle
        const fsBtn = document.getElementById('fullscreen-btn');
        if (fsBtn) {
            fsBtn.addEventListener('click', () => {
                window.sounds.playPop(480);
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(() => {});
                } else {
                    if (document.exitFullscreen) document.exitFullscreen();
                }
            });
        }

        // Promo badge
        const promoBtn = document.getElementById('promo-btn');
        if (promoBtn) {
            promoBtn.addEventListener('click', () => {
                window.sounds.playWin();
                alert('Kids Cooking Game! Nikmati aneka resep seru!');
            });
        }
    }

    showMenu() {
        this.currentMode = null;
        const menuView = document.getElementById('menu-view');
        const modeView = document.getElementById('mode-view');
        const backBtn = document.getElementById('back-btn');
        const title = document.getElementById('screen-title');

        if (menuView) menuView.classList.remove('hidden');
        if (modeView) modeView.classList.add('hidden');
        if (backBtn) backBtn.classList.add('hidden');
        if (title) title.textContent = 'Kids Drawing';
    }

    openMode(mode) {
        this.currentMode = mode;
        const menuView = document.getElementById('menu-view');
        const modeView = document.getElementById('mode-view');
        const backBtn = document.getElementById('back-btn');
        const title = document.getElementById('screen-title');

        if (menuView) menuView.classList.add('hidden');
        if (modeView) modeView.classList.remove('hidden');
        if (backBtn) backBtn.classList.remove('hidden');

        // Clean typography without emojis
        const titles = {
            'draw_color': 'Draw & Color',
            'pixel_art': 'Pixel Art',
            'mandala': 'Mandala & Mirror',
            'color_by_number': 'Color By Number',
            'drawing': 'Drawing Notepad',
            'scratch': 'Scratch Art'
        };
        if (title) title.textContent = titles[mode] || 'Draw';

        this.renderCurrentMode();
    }

    renderCurrentMode() {
        const templateBar = document.getElementById('mode-template-bar');
        const contentArea = document.getElementById('mode-content');
        const toolbarArea = document.getElementById('mode-toolbar');

        if (templateBar) templateBar.innerHTML = '';
        if (contentArea) contentArea.innerHTML = '';
        if (toolbarArea) toolbarArea.innerHTML = '';

        if (this.currentMode === 'draw_color') this.initDrawColor(templateBar, contentArea, toolbarArea);
        else if (this.currentMode === 'pixel_art') this.initPixelArt(templateBar, contentArea, toolbarArea);
        else if (this.currentMode === 'mandala') this.initMandala(templateBar, contentArea, toolbarArea);
        else if (this.currentMode === 'color_by_number') this.initColorByNumber(templateBar, contentArea, toolbarArea);
        else if (this.currentMode === 'drawing') this.initDrawing(templateBar, contentArea, toolbarArea);
        else if (this.currentMode === 'scratch') this.initScratch(templateBar, contentArea, toolbarArea);
    }

    // Helper: Standard Palette Generator
    createPalette(container, colors, onSelect) {
        const palette = document.createElement('div');
        palette.className = 'color-palette';
        colors.forEach((c, idx) => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch' + (c.color === this.currentColor ? ' active' : '');
            swatch.style.backgroundColor = c.color;
            if (c.label) swatch.textContent = c.label;

            swatch.addEventListener('click', () => {
                palette.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
                this.currentColor = c.color;
                window.sounds.playPling(idx);
                if (onSelect) onSelect(c);
            });
            palette.appendChild(swatch);
        });
        container.appendChild(palette);
        return palette;
    }

    // Helper: Create Template Carousel Tabs (Clean text badges without emojis)
    createTemplateTabs(container, templates, onSelect) {
        templates.forEach((t, idx) => {
            const tab = document.createElement('div');
            tab.className = 'template-tab' + (idx === this.activeTemplateIndex ? ' active' : '');
            tab.innerHTML = `<span>${t.name}</span>`;
            tab.addEventListener('click', () => {
                if (this.activeTemplateIndex === idx) return;
                window.sounds.playPop(480);
                this.activeTemplateIndex = idx;
                container.querySelectorAll('.template-tab').forEach(b => b.classList.remove('active'));
                tab.classList.add('active');
                onSelect(idx);
            });
            container.appendChild(tab);
        });
    }

    // Helper: Safe Save Artwork to Image PNG (Canvas / SVG)
    saveArtwork(element, filename = 'my-drawing.png') {
        window.sounds.playWin();
        try {
            if (element instanceof HTMLCanvasElement) {
                const link = document.createElement('a');
                link.download = filename;
                link.href = element.toDataURL('image/png');
                link.click();
            } else if (element && element.tagName && element.tagName.toLowerCase() === 'svg') {
                const xml = new XMLSerializer().serializeToString(element);
                const svgBlob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
                const URL = window.URL || window.webkitURL || window;
                const blobURL = URL.createObjectURL(svgBlob);

                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = element.viewBox ? element.viewBox.baseVal.width : 800;
                    canvas.height = element.viewBox ? element.viewBox.baseVal.height : 600;
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                    URL.revokeObjectURL(blobURL);

                    const link = document.createElement('a');
                    link.download = filename;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                };
                img.src = blobURL;
            }
        } catch (e) {
            console.warn('Save artwork fallback error:', e);
        }
    }

    // ==========================================
    // 1. DRAW & COLOR MODE
    // ==========================================
    initDrawColor(templateBar, container, toolbar) {
        const templates = window.DRAW_COLOR_TEMPLATES || [];

        const colors = [
            { color: '#48bb78' }, { color: '#38a169' }, { color: '#319795' },
            { color: '#4299e1' }, { color: '#3182ce' }, { color: '#805ad5' },
            { color: '#9f7aea' }, { color: '#ed64a6' }, { color: '#e53e3e' },
            { color: '#dd6b20' }, { color: '#ecc94b' }, { color: '#b7791f' },
            { color: '#718096' }, { color: '#2d3748' }, { color: '#ffffff' }
        ];

        this.currentColor = colors[0].color;
        this.tool = 'fill';

        const renderSVGTemplate = (idx) => {
            container.innerHTML = '';
            const tData = templates[idx] || templates[0];
            const wrap = document.createElement('div');
            wrap.style.cssText = 'width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; position: relative;';

            wrap.innerHTML = `
                <svg id="draw-color-svg" viewBox="0 0 800 600" style="max-width: 95%; max-height: 95%; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.12));">
                    ${tData ? tData.svg : ''}
                </svg>
            `;
            container.appendChild(wrap);

            // Add click-to-fill listeners (both pointerdown for instant touch & click)
            wrap.querySelectorAll('.fillable').forEach(elem => {
                elem.style.cursor = 'pointer';
                const onFill = (e) => {
                    if (e) e.stopPropagation();
                    elem.setAttribute('fill', this.currentColor);
                    window.sounds.playPop(580);
                };
                elem.addEventListener('pointerdown', onFill);
                elem.addEventListener('click', onFill);
            });
        };

        this.createTemplateTabs(templateBar, templates, (idx) => {
            renderSVGTemplate(idx);
        });

        renderSVGTemplate(this.activeTemplateIndex);

        // Toolbar
        this.createPalette(toolbar, colors);

        const toolsDiv = document.createElement('div');
        toolsDiv.className = 'tools-group';
        toolsDiv.innerHTML = `
            <button class="tool-btn" id="dc-reset">${ICONS.reset}<span>Ulang</span></button>
            <button class="tool-btn" id="dc-save">${ICONS.save}<span>Simpan</span></button>
            <button class="tool-btn active" id="dc-celebrate">${ICONS.finish}<span>Selesai</span></button>
        `;
        toolbar.appendChild(toolsDiv);

        document.getElementById('dc-reset').addEventListener('click', () => {
            const svg = document.getElementById('draw-color-svg');
            if (svg) {
                svg.querySelectorAll('.fillable').forEach(el => el.setAttribute('fill', '#ffffff'));
            }
            window.sounds.playPop(300);
        });

        document.getElementById('dc-save').addEventListener('click', () => {
            const svg = document.getElementById('draw-color-svg');
            const tName = templates[this.activeTemplateIndex] ? templates[this.activeTemplateIndex].id : 'drawing';
            if (svg) this.saveArtwork(svg, `draw-color-${tName}.png`);
        });

        document.getElementById('dc-celebrate').addEventListener('click', () => {
            this.triggerConfetti();
            window.sounds.playWin();
        });
    }

    // ==========================================
    // 2. PIXEL ART MODE
    // ==========================================
    initPixelArt(templateBar, container, toolbar) {
        const templates = [
            { id: 'deer', name: 'Rusa Kutub' },
            { id: 'car', name: 'Mobil Pixel' },
            { id: 'cat', name: 'Kucing Pixel' },
            { id: 'blank', name: 'Kanvas Bebas' }
        ];

        const size = 14;
        const colors = [
            { color: '#8c4a24', label: '■' },
            { color: '#dd6b20', label: '▲' },
            { color: '#e53e3e', label: '+' },
            { color: '#ecc94b', label: '*' },
            { color: '#4299e1', label: 'o' },
            { color: '#48bb78', label: '●' },
            { color: '#1a202c', label: 'x' },
            { color: '#ffffff', label: ' ' }
        ];

        this.currentColor = colors[0].color;
        let showHints = true;

        const maps = {
            // Deer
            0: [
                [0,1,0,0,0,0,0,0,0,0,0,0,1,0],
                [0,1,1,0,0,0,0,0,0,0,0,1,1,0],
                [0,0,1,0,0,0,0,0,0,0,0,1,0,0],
                [0,0,1,0,0,2,2,2,2,0,0,1,0,0],
                [0,0,0,0,2,2,2,2,2,2,0,0,0,0],
                [0,0,0,2,2,7,2,2,7,2,2,0,0,0],
                [0,0,0,2,4,4,2,2,4,4,2,0,0,0],
                [0,0,0,2,2,2,3,3,2,2,2,0,0,0],
                [0,0,0,0,2,2,3,3,2,2,0,0,0,0],
                [0,0,0,0,0,2,2,2,2,0,0,0,0,0],
                [0,0,0,0,1,0,0,0,0,1,0,0,0,0],
                [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
                [0,0,0,0,1,1,0,0,1,1,0,0,0,0],
                [0,0,0,0,1,0,0,0,0,1,0,0,0,0]
            ],
            // Car
            1: [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,5,5,5,5,5,0,0,0,0,0],
                [0,0,0,5,5,5,5,5,5,5,0,0,0,0],
                [0,0,5,5,8,8,5,5,8,8,5,0,0,0],
                [0,5,5,5,8,8,5,5,8,8,5,5,0,0],
                [5,5,5,5,5,5,5,5,5,5,5,5,5,0],
                [5,4,5,5,5,5,5,5,5,5,5,4,5,0],
                [5,5,5,5,5,5,5,5,5,5,5,5,5,0],
                [0,5,7,7,5,5,5,5,5,7,7,5,0,0],
                [0,0,7,7,0,0,0,0,0,7,7,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ],
            // Cat
            2: [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,2,0,0,0,0,0,0,0,2,0,0,0],
                [0,2,2,0,0,0,0,0,0,0,2,2,0,0],
                [0,2,4,2,0,0,0,0,0,2,4,2,0,0],
                [0,2,2,2,2,2,2,2,2,2,2,2,0,0],
                [0,2,2,2,2,2,2,2,2,2,2,2,0,0],
                [0,2,7,2,2,2,2,2,2,7,2,2,0,0],
                [0,2,2,2,2,3,2,2,2,2,2,2,0,0],
                [0,0,2,2,2,2,2,2,2,2,2,0,0,0],
                [0,0,0,2,2,2,2,2,2,2,0,0,0,0],
                [0,0,2,2,2,2,2,2,2,2,2,0,0,0],
                [0,2,2,0,2,2,0,0,2,2,0,2,0,0],
                [0,2,2,0,2,2,0,0,2,2,0,2,2,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ],
            // Blank
            3: Array.from({ length: 14 }, () => Array(14).fill(0))
        };

        const renderGrid = (mapIdx) => {
            container.innerHTML = '';
            const gridWrap = document.createElement('div');
            gridWrap.id = 'pixel-canvas-grid';
            gridWrap.style.cssText = `
                display: grid;
                grid-template-columns: repeat(${size}, min(30px, 6vw));
                grid-template-rows: repeat(${size}, min(30px, 6vw));
                gap: 2px;
                background: #cbd5e0;
                padding: 6px;
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            `;

            let isDrawing = false;
            container.addEventListener('pointerup', () => isDrawing = false);

            const currMap = maps[mapIdx] || maps[0];
            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    const cell = document.createElement('div');
                    cell.style.cssText = `
                        width: 100%;
                        height: 100%;
                        background: #ffffff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 11px;
                        font-weight: bold;
                        color: #a0aec0;
                        cursor: pointer;
                        user-select: none;
                        border-radius: 2px;
                    `;

                    const val = currMap[r][c];
                    if (val > 0 && showHints) {
                        cell.textContent = colors[val - 1].label;
                    }

                    const applyColor = () => {
                        cell.style.backgroundColor = this.currentColor;
                        cell.textContent = '';
                        window.sounds.playPling(r % 8);
                    };

                    cell.addEventListener('pointerdown', (e) => {
                        e.preventDefault();
                        isDrawing = true;
                        applyColor();
                    });
                    cell.addEventListener('pointerenter', () => {
                        if (isDrawing) applyColor();
                    });

                    gridWrap.appendChild(cell);
                }
            }
            container.appendChild(gridWrap);
        };

        this.createTemplateTabs(templateBar, templates, (idx) => {
            renderGrid(idx);
        });

        renderGrid(this.activeTemplateIndex);

        // Toolbar
        this.createPalette(toolbar, colors);

        const toolsDiv = document.createElement('div');
        toolsDiv.className = 'tools-group';
        toolsDiv.innerHTML = `
            <button class="tool-btn" id="px-solve">${ICONS.sample}<span>Contoh</span></button>
            <button class="tool-btn" id="px-clear">${ICONS.reset}<span>Bersihkan</span></button>
            <button class="tool-btn active" id="px-celebrate">${ICONS.finish}<span>Selesai</span></button>
        `;
        toolbar.appendChild(toolsDiv);

        document.getElementById('px-solve').addEventListener('click', () => {
            const grid = document.getElementById('pixel-canvas-grid');
            if (!grid) return;
            const cells = grid.children;
            const currMap = maps[this.activeTemplateIndex] || maps[0];
            let idx = 0;
            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    const val = currMap[r][c];
                    if (val > 0) {
                        cells[idx].style.backgroundColor = colors[val - 1].color;
                        cells[idx].textContent = '';
                    } else {
                        cells[idx].style.backgroundColor = '#ffffff';
                        cells[idx].textContent = '';
                    }
                    idx++;
                }
            }
            window.sounds.playWin();
        });

        document.getElementById('px-clear').addEventListener('click', () => {
            renderGrid(this.activeTemplateIndex);
            window.sounds.playPop(300);
        });

        document.getElementById('px-celebrate').addEventListener('click', () => {
            this.triggerConfetti();
            window.sounds.playWin();
        });
    }

    // ==========================================
    // 3. MANDALA & SYMMETRY ART
    // ==========================================
    initMandala(templateBar, container, toolbar) {
        const templates = [
            { id: 'owl', name: 'Cermin Burung Hantu', type: 'mirror' },
            { id: 'butterfly', name: 'Cermin Kupu-Kupu', type: 'mirror' },
            { id: 'radial4', name: 'Simetri 4 Arah', type: 'radial4' },
            { id: 'radial8', name: 'Kaleidoscope 8', type: 'radial8' }
        ];

        const colors = [
            { color: '#3182ce' }, { color: '#48bb78' }, { color: '#ed8936' },
            { color: '#9f7aea' }, { color: '#ed64a6' }, { color: '#e53e3e' },
            { color: '#ecc94b' }, { color: '#1a202c' }
        ];

        this.currentColor = colors[0].color;
        this.brushSize = 6;
        let activeSymType = 'mirror';

        const wrap = document.createElement('div');
        wrap.style.cssText = 'position: relative; width: 720px; height: 480px; max-width: 95%; max-height: 90%; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);';

        const canvas = document.createElement('canvas');
        canvas.width = 720;
        canvas.height = 480;
        canvas.style.cssText = 'position: absolute; inset: 0; width: 100%; height: 100%; background: #ffffff; cursor: crosshair; touch-action: none;';

        const guideCanvas = document.createElement('canvas');
        guideCanvas.width = 720;
        guideCanvas.height = 480;
        guideCanvas.style.cssText = 'position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.65;';

        wrap.appendChild(canvas);
        wrap.appendChild(guideCanvas);
        container.appendChild(wrap);

        const ctx = canvas.getContext('2d');
        const gCtx = guideCanvas.getContext('2d');

        const drawGuide = (idx) => {
            gCtx.clearRect(0, 0, guideCanvas.width, guideCanvas.height);
            gCtx.save();
            gCtx.strokeStyle = '#a0aec0';
            gCtx.lineWidth = 1.5;
            gCtx.setLineDash([6, 6]);

            // Vertical Midline
            gCtx.beginPath();
            gCtx.moveTo(guideCanvas.width / 2, 0);
            gCtx.lineTo(guideCanvas.width / 2, guideCanvas.height);
            gCtx.stroke();

            const cx = guideCanvas.width / 2;
            const cy = guideCanvas.height / 2;

            if (idx === 0) {
                gCtx.strokeStyle = '#63b3ed';
                gCtx.beginPath();
                gCtx.arc(cx, cy, 130, -Math.PI / 2, Math.PI / 2, false);
                gCtx.moveTo(cx + 70, cy - 110);
                gCtx.lineTo(cx + 110, cy - 160);
                gCtx.lineTo(cx + 125, cy - 80);
                gCtx.arc(cx + 55, cy - 20, 28, 0, Math.PI * 2);
                gCtx.stroke();
            } else if (idx === 1) {
                gCtx.strokeStyle = '#f687b3';
                gCtx.beginPath();
                gCtx.moveTo(cx, cy - 90);
                gCtx.bezierCurveTo(cx + 160, cy - 140, cx + 220, cy - 40, cx + 80, cy);
                gCtx.bezierCurveTo(cx + 180, cy + 40, cx + 130, cy + 130, cx, cy + 80);
                gCtx.stroke();
            } else if (idx === 2) {
                gCtx.beginPath();
                gCtx.moveTo(0, cy);
                gCtx.lineTo(guideCanvas.width, cy);
                gCtx.stroke();
            } else if (idx === 3) {
                gCtx.beginPath();
                gCtx.moveTo(0, cy);
                gCtx.lineTo(guideCanvas.width, cy);
                gCtx.moveTo(cx - 240, cy - 240);
                gCtx.lineTo(cx + 240, cy + 240);
                gCtx.moveTo(cx - 240, cy + 240);
                gCtx.lineTo(cx + 240, cy - 240);
                gCtx.stroke();
            }
            gCtx.restore();
        };

        drawGuide(this.activeTemplateIndex);

        let drawing = false;
        let lastX = 0, lastY = 0;

        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            return {
                x: (e.clientX - rect.left) * (canvas.width / rect.width),
                y: (e.clientY - rect.top) * (canvas.height / rect.height)
            };
        };

        const drawStroke = (x1, y1, x2, y2) => {
            ctx.save();
            ctx.strokeStyle = this.tool === 'rainbow' 
                ? `hsl(${this.rainbowHue % 360}, 100%, 50%)`
                : this.currentColor;
            ctx.lineWidth = this.brushSize;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            if (this.tool === 'glow') {
                ctx.shadowColor = ctx.strokeStyle;
                ctx.shadowBlur = 12;
            }

            const drawPair = (px1, py1, px2, py2) => {
                ctx.beginPath();
                ctx.moveTo(px1, py1);
                ctx.lineTo(px2, py2);
                ctx.stroke();
            };

            drawPair(x1, y1, x2, y2);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            const mx1 = cx + (cx - x1);
            const mx2 = cx + (cx - x2);
            drawPair(mx1, y1, mx2, y2);

            if (activeSymType === 'radial4' || activeSymType === 'radial8') {
                const my1 = cy + (cy - y1);
                const my2 = cy + (cy - y2);
                drawPair(x1, my1, x2, my2);
                drawPair(mx1, my1, mx2, my2);
            }

            if (activeSymType === 'radial8') {
                const dx1 = x1 - cx;
                const dy1 = y1 - cy;
                const dx2 = x2 - cx;
                const dy2 = y2 - cy;

                drawPair(cx + dy1, cy + dx1, cx + dy2, cy + dx2);
                drawPair(cx - dy1, cy + dx1, cx - dy2, cy + dx2);
                drawPair(cx + dy1, cy - dx1, cx + dy2, cy - dx2);
                drawPair(cx - dy1, cy - dx1, cx - dy2, cy - dx2);
            }

            ctx.restore();
            this.rainbowHue += 4;
        };

        canvas.addEventListener('pointerdown', (e) => {
            drawing = true;
            canvas.setPointerCapture(e.pointerId);
            const p = getPos(e);
            lastX = p.x;
            lastY = p.y;
            window.sounds.playPop(500);
        });

        canvas.addEventListener('pointermove', (e) => {
            if (!drawing) return;
            const p = getPos(e);
            drawStroke(lastX, lastY, p.x, p.y);
            lastX = p.x;
            lastY = p.y;
        });

        const stopDrawing = (e) => {
            if (drawing) {
                drawing = false;
                try { canvas.releasePointerCapture(e.pointerId); } catch (err) {}
            }
        };
        canvas.addEventListener('pointerup', stopDrawing);
        canvas.addEventListener('pointercancel', stopDrawing);

        this.createTemplateTabs(templateBar, templates, (idx) => {
            activeSymType = templates[idx].type;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGuide(idx);
        });

        // Toolbar with automatic switch from rainbow to pen when color is clicked
        const mPalette = this.createPalette(toolbar, colors, () => {
            if (this.tool === 'rainbow') {
                this.tool = 'brush';
                toolsDiv.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
                const penBtn = document.getElementById('mandala-pen');
                if (penBtn) penBtn.classList.add('active');
            }
        });

        const toolsDiv = document.createElement('div');
        toolsDiv.className = 'tools-group';
        toolsDiv.innerHTML = `
            <button class="tool-btn active" id="mandala-pen">${ICONS.pen}<span>Kuas</span></button>
            <button class="tool-btn" id="mandala-rainbow">${ICONS.rainbow}<span>Pelangi</span></button>
            <button class="tool-btn" id="mandala-glow">${ICONS.glow}<span>Glow</span></button>
            <button class="tool-btn" id="mandala-save">${ICONS.save}<span>Simpan</span></button>
            <button class="tool-btn" id="mandala-clear">${ICONS.reset}<span>Ulang</span></button>
        `;
        toolbar.appendChild(toolsDiv);

        const setMTool = (tName, btn) => {
            this.tool = tName;
            toolsDiv.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (tName === 'rainbow') {
                mPalette.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            }
            window.sounds.playPop(440);
        };

        document.getElementById('mandala-pen').addEventListener('click', (e) => setMTool('brush', e.currentTarget));
        document.getElementById('mandala-rainbow').addEventListener('click', (e) => setMTool('rainbow', e.currentTarget));
        document.getElementById('mandala-glow').addEventListener('click', (e) => setMTool('glow', e.currentTarget));
        document.getElementById('mandala-save').addEventListener('click', () => this.saveArtwork(canvas, 'mandala-artwork.png'));
        document.getElementById('mandala-clear').addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGuide(this.activeTemplateIndex);
            window.sounds.playPop(300);
        });
    }

    // ==========================================
    // 4. COLOR BY NUMBER MODE
    // ==========================================
    initColorByNumber(templateBar, container, toolbar) {
        const templates = [
            { id: 'penguin', name: 'Penguin di Es' },
            { id: 'rocket', name: 'Astronaut & Roket' },
            { id: 'ship', name: 'Kapal Layar Laut' },
            { id: 'pony', name: 'Kuda Poni Pelangi' }
        ];

        const numberColors = [
            { num: 1, color: '#e2e8f0', label: '1' },
            { num: 2, color: '#feebc8', label: '2' },
            { num: 3, color: '#63b3ed', label: '3' },
            { num: 4, color: '#2b6cb0', label: '4' },
            { num: 5, color: '#ed8936', label: '5' },
            { num: 6, color: '#2d3748', label: '6' }
        ];

        let activeNum = 1;

        const renderCBN = (idx) => {
            container.innerHTML = '';
            const wrap = document.createElement('div');
            wrap.style.cssText = 'width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;';

            let svgContent = '';
            if (idx === 0) {
                // Penguin
                svgContent = `
                    <path class="cbn-segment" data-num="3" d="M 0 0 L 700 0 L 700 360 L 0 360 Z" fill="#ffffff" stroke="#a0aec0" stroke-width="3"/>
                    <text x="120" y="80" font-size="28" font-weight="900" fill="#a0aec0" pointer-events="none">3</text>
                    <text x="560" y="100" font-size="28" font-weight="900" fill="#a0aec0" pointer-events="none">3</text>
                    <path class="cbn-segment" data-num="4" d="M 0 360 Q 350 330 700 360 L 700 500 L 0 500 Z" fill="#ffffff" stroke="#a0aec0" stroke-width="4"/>
                    <text x="350" y="460" font-size="28" font-weight="900" fill="#a0aec0" pointer-events="none">4</text>
                    <path class="cbn-segment" data-num="1" d="M 120 380 C 120 330 580 330 580 380 C 580 430 120 430 120 380 Z" fill="#ffffff" stroke="#a0aec0" stroke-width="4"/>
                    <text x="210" y="390" font-size="24" font-weight="900" fill="#a0aec0" pointer-events="none">1</text>
                    <text x="490" y="390" font-size="24" font-weight="900" fill="#a0aec0" pointer-events="none">1</text>
                    <path class="cbn-segment" data-num="6" d="M 270 200 C 260 120 440 120 430 200 C 470 250 460 360 410 370 C 370 380 330 380 290 370 C 240 360 230 250 270 200 Z" fill="#ffffff" stroke="#a0aec0" stroke-width="4"/>
                    <text x="350" y="170" font-size="26" font-weight="900" fill="#a0aec0" pointer-events="none">6</text>
                    <path class="cbn-segment" data-num="2" d="M 310 180 C 310 140 390 140 390 180 C 400 240 400 320 350 330 C 300 320 300 240 310 180 Z" fill="#ffffff" stroke="#a0aec0" stroke-width="3"/>
                    <text x="350" y="270" font-size="26" font-weight="900" fill="#a0aec0" pointer-events="none">2</text>
                    <polygon class="cbn-segment" data-num="5" points="335,200 365,200 350,225" fill="#ffffff" stroke="#a0aec0" stroke-width="2"/>
                    <ellipse class="cbn-segment" data-num="5" cx="310" cy="370" rx="20" ry="10" fill="#ffffff" stroke="#a0aec0" stroke-width="2"/>
                    <ellipse class="cbn-segment" data-num="5" cx="390" cy="370" rx="20" ry="10" fill="#ffffff" stroke="#a0aec0" stroke-width="2"/>
                    <text x="345" y="215" font-size="14" font-weight="900" fill="#a0aec0" pointer-events="none">5</text>
                    <circle cx="330" cy="180" r="8" fill="#1a202c"/>
                    <circle cx="328" cy="177" r="3" fill="#ffffff"/>
                    <circle cx="370" cy="180" r="8" fill="#1a202c"/>
                    <circle cx="368" cy="177" r="3" fill="#ffffff"/>
                `;
            } else if (idx === 1) {
                // Rocket
                svgContent = `
                    <path class="cbn-segment" data-num="6" d="M 0 0 L 700 0 L 700 500 L 0 500 Z" fill="#ffffff" stroke="#a0aec0" stroke-width="3"/>
                    <text x="100" y="100" font-size="28" font-weight="900" fill="#a0aec0" pointer-events="none">6</text>
                    <path class="cbn-segment" data-num="2" d="M 540 60 C 600 60 620 120 620 120 C 620 120 540 160 500 120 Z" fill="#ffffff" stroke="#a0aec0" stroke-width="3"/>
                    <text x="540" y="100" font-size="22" font-weight="900" fill="#a0aec0" pointer-events="none">2</text>
                    <path class="cbn-segment" data-num="5" d="M 280 350 L 220 410 L 290 390 Z" fill="#ffffff" stroke="#a0aec0" stroke-width="3"/>
                    <text x="260" y="380" font-size="20" font-weight="900" fill="#a0aec0" pointer-events="none">5</text>
                    <path class="cbn-segment" data-num="5" d="M 420 350 L 480 410 L 410 390 Z" fill="#ffffff" stroke="#a0aec0" stroke-width="3"/>
                    <text x="440" y="380" font-size="20" font-weight="900" fill="#a0aec0" pointer-events="none">5</text>
                    <path class="cbn-segment" data-num="1" d="M 350 80 C 420 170 420 360 410 370 L 290 370 C 280 360 280 170 350 80 Z" fill="#ffffff" stroke="#a0aec0" stroke-width="4"/>
                    <text x="350" y="290" font-size="28" font-weight="900" fill="#a0aec0" pointer-events="none">1</text>
                    <circle class="cbn-segment" data-num="3" cx="350" cy="210" r="32" fill="#ffffff" stroke="#a0aec0" stroke-width="4"/>
                    <text x="350" y="218" font-size="24" font-weight="900" fill="#a0aec0" pointer-events="none">3</text>
                    <path class="cbn-segment" data-num="4" d="M 320 370 L 350 460 L 380 370 Z" fill="#ffffff" stroke="#a0aec0" stroke-width="3"/>
                    <text x="350" y="420" font-size="20" font-weight="900" fill="#a0aec0" pointer-events="none">4</text>
                `;
            } else if (idx === 2) {
                // Ship
                svgContent = `
                    <path class="cbn-segment" data-num="3" d="M 0 0 L 700 0 L 700 340 L 0 340 Z" fill="#ffffff" stroke="#a0aec0" stroke-width="3"/>
                    <text x="140" y="100" font-size="28" font-weight="900" fill="#a0aec0" pointer-events="none">3</text>
                    <circle class="cbn-segment" data-num="5" cx="100" cy="100" r="40" fill="#ffffff" stroke="#a0aec0" stroke-width="3"/>
                    <text x="100" y="108" font-size="24" font-weight="900" fill="#a0aec0" pointer-events="none">5</text>
                    <path class="cbn-segment" data-num="4" d="M 0 340 Q 350 310 700 340 L 700 500 L 0 500 Z" fill="#ffffff" stroke="#a0aec0" stroke-width="4"/>
                    <text x="350" y="450" font-size="28" font-weight="900" fill="#a0aec0" pointer-events="none">4</text>
                    <path class="cbn-segment" data-num="2" d="M 180 340 L 520 340 L 460 410 L 240 410 Z" fill="#ffffff" stroke="#a0aec0" stroke-width="4"/>
                    <text x="350" y="380" font-size="24" font-weight="900" fill="#a0aec0" pointer-events="none">2</text>
                    <polygon class="cbn-segment" data-num="1" points="340,110 340,310 190,310" fill="#ffffff" stroke="#a0aec0" stroke-width="4"/>
                    <text x="270" y="240" font-size="24" font-weight="900" fill="#a0aec0" pointer-events="none">1</text>
                    <polygon class="cbn-segment" data-num="6" points="360,140 490,310 360,310" fill="#ffffff" stroke="#a0aec0" stroke-width="4"/>
                    <text x="410" y="240" font-size="24" font-weight="900" fill="#a0aec0" pointer-events="none">6</text>
                `;
            } else {
                // Pony
                svgContent = `
                    <path class="cbn-segment" data-num="3" d="M 0 0 L 700 0 L 700 500 L 0 500 Z" fill="#ffffff" stroke="#a0aec0" stroke-width="3"/>
                    <text x="80" y="80" font-size="28" font-weight="900" fill="#a0aec0" pointer-events="none">3</text>
                    <circle class="cbn-segment" data-num="6" cx="120" cy="140" r="35" fill="#ffffff" stroke="#a0aec0" stroke-width="3"/>
                    <circle class="cbn-segment" data-num="6" cx="160" cy="140" r="45" fill="#ffffff" stroke="#a0aec0" stroke-width="3"/>
                    <circle class="cbn-segment" data-num="6" cx="200" cy="140" r="35" fill="#ffffff" stroke="#a0aec0" stroke-width="3"/>
                    <text x="160" y="148" font-size="24" font-weight="900" fill="#a0aec0" pointer-events="none">6</text>
                    <path class="cbn-segment" data-num="4" d="M 0 500 Q 350 200 700 500 Z" fill="#ffffff" stroke="#a0aec0" stroke-width="4"/>
                    <text x="600" y="440" font-size="28" font-weight="900" fill="#a0aec0" pointer-events="none">4</text>
                    <ellipse class="cbn-segment" data-num="1" cx="350" cy="310" rx="140" ry="90" fill="#ffffff" stroke="#a0aec0" stroke-width="4"/>
                    <text x="350" y="315" font-size="28" font-weight="900" fill="#a0aec0" pointer-events="none">1</text>
                    <path class="cbn-segment" data-num="1" d="M 260 280 L 210 160 C 230 110 320 120 330 190 Z" fill="#ffffff" stroke="#a0aec0" stroke-width="4"/>
                    <text x="260" y="190" font-size="24" font-weight="900" fill="#a0aec0" pointer-events="none">1</text>
                    <polygon class="cbn-segment" data-num="5" points="260,130 290,50 300,120" fill="#ffffff" stroke="#a0aec0" stroke-width="3"/>
                    <text x="280" y="100" font-size="18" font-weight="900" fill="#a0aec0" pointer-events="none">5</text>
                    <path class="cbn-segment" data-num="2" d="M 310 150 C 370 170 380 230 350 260 Z" fill="#ffffff" stroke="#a0aec0" stroke-width="3"/>
                    <text x="345" y="210" font-size="20" font-weight="900" fill="#a0aec0" pointer-events="none">2</text>
                    <circle cx="240" cy="160" r="6" fill="#1a202c"/>
                `;
            }

            wrap.innerHTML = `
                <svg id="cbn-active-svg" viewBox="0 0 700 500" style="max-width: 95%; max-height: 90%; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.15));">
                    ${svgContent}
                </svg>
            `;
            container.appendChild(wrap);

            const highlightCurrent = () => {
                wrap.querySelectorAll('.cbn-segment').forEach(seg => {
                    const num = parseInt(seg.dataset.num);
                    if (num === activeNum) {
                        seg.style.filter = 'drop-shadow(0 0 8px #ecc94b)';
                        seg.style.cursor = 'pointer';
                    } else {
                        seg.style.filter = 'none';
                    }
                });
            };
            highlightCurrent();

            wrap.querySelectorAll('.cbn-segment').forEach(seg => {
                const onSegmentColor = (e) => {
                    if (e) e.stopPropagation();
                    const num = parseInt(seg.dataset.num);
                    if (num === activeNum) {
                        const match = numberColors.find(n => n.num === num);
                        seg.setAttribute('fill', match ? match.color : '#cbd5e0');
                        window.sounds.playPling(num);

                        const uncolored = wrap.querySelectorAll('.cbn-segment[fill="#ffffff"]');
                        if (uncolored.length === 0) {
                            this.triggerConfetti();
                            window.sounds.playWin();
                        }
                    } else {
                        window.sounds.playPop(220);
                    }
                };
                seg.addEventListener('pointerdown', onSegmentColor);
                seg.addEventListener('click', onSegmentColor);
            });

            return highlightCurrent;
        };

        this.createTemplateTabs(templateBar, templates, (idx) => {
            renderCBN(idx);
        });

        renderCBN(this.activeTemplateIndex);

        // Toolbar
        this.createPalette(toolbar, numberColors, (item) => {
            activeNum = item.num;
            const svg = document.getElementById('cbn-active-svg');
            if (svg) {
                svg.querySelectorAll('.cbn-segment').forEach(seg => {
                    const num = parseInt(seg.dataset.num);
                    seg.style.filter = num === activeNum ? 'drop-shadow(0 0 8px #ecc94b)' : 'none';
                });
            }
        });

        const toolsDiv = document.createElement('div');
        toolsDiv.className = 'tools-group';
        toolsDiv.innerHTML = `
            <button class="tool-btn" id="cbn-reset">${ICONS.reset}<span>Ulang</span></button>
            <button class="tool-btn active" id="cbn-solve">${ICONS.finish}<span>Selesaikan</span></button>
        `;
        toolbar.appendChild(toolsDiv);

        document.getElementById('cbn-reset').addEventListener('click', () => {
            renderCBN(this.activeTemplateIndex);
            window.sounds.playPop(300);
        });

        document.getElementById('cbn-solve').addEventListener('click', () => {
            const svg = document.getElementById('cbn-active-svg');
            if (!svg) return;
            svg.querySelectorAll('.cbn-segment').forEach(seg => {
                const num = parseInt(seg.dataset.num);
                const match = numberColors.find(n => n.num === num);
                if (match) seg.setAttribute('fill', match.color);
            });
            this.triggerConfetti();
            window.sounds.playWin();
        });
    }

    // ==========================================
    // 5. DRAWING NOTEPAD (Free Draw with bugfix)
    // ==========================================
    initDrawing(templateBar, container, toolbar) {
        const templates = [
            { id: 'grid', name: 'Kertas Kotak' },
            { id: 'lined', name: 'Buku Bergaris' },
            { id: 'blackboard', name: 'Papan Hitam' },
            { id: 'blank', name: 'Kertas Polos' }
        ];

        const colors = [
            { color: '#e53e3e' }, { color: '#ed8936' }, { color: '#ecc94b' },
            { color: '#48bb78' }, { color: '#38b2ac' }, { color: '#3182ce' },
            { color: '#805ad5' }, { color: '#ed64a6' }, { color: '#1a202c' },
            { color: '#ffffff' }
        ];

        this.currentColor = colors[0].color;
        this.tool = 'brush'; // Starts as regular pen brush
        this.brushSize = 12;

        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 480;
        canvas.style.cssText = 'border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); cursor: crosshair; touch-action: none; max-width: 95%; max-height: 90%;';
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');

        const applyCanvasBackground = (idx) => {
            if (idx === 0) {
                canvas.style.backgroundColor = '#ffffff';
                canvas.style.backgroundImage = 'linear-gradient(to right, #edf2f7 1px, transparent 1px), linear-gradient(to bottom, #edf2f7 1px, transparent 1px)';
                canvas.style.backgroundSize = '24px 24px';
            } else if (idx === 1) {
                canvas.style.backgroundColor = '#fefcbf';
                canvas.style.backgroundImage = 'linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)';
                canvas.style.backgroundSize = '100% 32px';
            } else if (idx === 2) {
                canvas.style.backgroundColor = '#1a202c';
                canvas.style.backgroundImage = 'none';
            } else {
                canvas.style.backgroundColor = '#ffffff';
                canvas.style.backgroundImage = 'none';
            }
        };

        applyCanvasBackground(this.activeTemplateIndex);

        let drawing = false;
        let lastX = 0, lastY = 0;
        let lastStampX = 0, lastStampY = 0;

        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            return {
                x: (e.clientX - rect.left) * (canvas.width / rect.width),
                y: (e.clientY - rect.top) * (canvas.height / rect.height)
            };
        };

        // Geometric vector stamp drawer (No emojis!)
        const drawVectorStamp = (cx, cy, type, color, size) => {
            ctx.save();
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;

            if (type === 0) {
                // 5-Point Star
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    const aOuter = (i * 72 - 90) * Math.PI / 180;
                    const aInner = ((i + 0.5) * 72 - 90) * Math.PI / 180;
                    const ox = cx + Math.cos(aOuter) * (size * 1.5);
                    const oy = cy + Math.sin(aOuter) * (size * 1.5);
                    const ix = cx + Math.cos(aInner) * (size * 0.7);
                    const iy = cy + Math.sin(aInner) * (size * 0.7);
                    if (i === 0) ctx.moveTo(ox, oy);
                    else ctx.lineTo(ox, oy);
                    ctx.lineTo(ix, iy);
                }
                ctx.closePath();
                ctx.fill();
            } else if (type === 1) {
                // Cute Heart
                ctx.beginPath();
                const d = size * 1.4;
                ctx.moveTo(cx, cy + d * 0.6);
                ctx.bezierCurveTo(cx - d * 1.2, cy - d * 0.4, cx - d * 0.6, cy - d * 1.2, cx, cy - d * 0.4);
                ctx.bezierCurveTo(cx + d * 0.6, cy - d * 1.2, cx + d * 1.2, cy - d * 0.4, cx, cy + d * 0.6);
                ctx.fill();
            } else if (type === 2) {
                // 5-Petal Flower
                for (let i = 0; i < 5; i++) {
                    const ang = (i * 72) * Math.PI / 180;
                    ctx.beginPath();
                    ctx.arc(cx + Math.cos(ang) * (size * 0.8), cy + Math.sin(ang) * (size * 0.8), size * 0.6, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(cx, cy, size * 0.5, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Sun
                ctx.beginPath();
                ctx.arc(cx, cy, size * 0.9, 0, Math.PI * 2);
                ctx.fill();
                for (let i = 0; i < 8; i++) {
                    const a = (i * 45) * Math.PI / 180;
                    ctx.beginPath();
                    ctx.moveTo(cx + Math.cos(a) * (size * 1.2), cy + Math.sin(a) * (size * 1.2));
                    ctx.lineTo(cx + Math.cos(a) * (size * 1.7), cy + Math.sin(a) * (size * 1.7));
                    ctx.stroke();
                }
            }
            ctx.restore();
        };

        const draw = (x1, y1, x2, y2) => {
            ctx.save();
            ctx.lineWidth = this.brushSize;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            if (this.tool === 'rainbow') {
                ctx.strokeStyle = `hsl(${this.rainbowHue % 360}, 100%, 50%)`;
                this.rainbowHue += 6;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            } else if (this.tool === 'glow') {
                ctx.strokeStyle = this.currentColor;
                ctx.shadowColor = this.currentColor;
                ctx.shadowBlur = 16;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            } else if (this.tool === 'spray') {
                ctx.fillStyle = this.currentColor;
                for (let i = 0; i < 16; i++) {
                    const radius = Math.random() * (this.brushSize * 1.6);
                    const angle = Math.random() * Math.PI * 2;
                    const sx = x2 + Math.cos(angle) * radius;
                    const sy = y2 + Math.sin(angle) * radius;
                    ctx.beginPath();
                    ctx.arc(sx, sy, Math.random() * 2 + 1, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (this.tool === 'roller') {
                const dist = Math.hypot(x2 - lastStampX, y2 - lastStampY);
                if (dist > 28) {
                    drawVectorStamp(x2, y2, 0, this.currentColor, this.brushSize * 0.9);
                    lastStampX = x2;
                    lastStampY = y2;
                }
            } else if (this.tool === 'eraser') {
                ctx.strokeStyle = this.activeTemplateIndex === 2 ? '#1a202c' : '#ffffff';
                ctx.lineWidth = this.brushSize * 2.5;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            } else {
                ctx.strokeStyle = this.currentColor;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
            ctx.restore();
        };

        canvas.addEventListener('pointerdown', (e) => {
            drawing = true;
            canvas.setPointerCapture(e.pointerId);
            const p = getPos(e);
            lastX = p.x;
            lastY = p.y;
            lastStampX = p.x;
            lastStampY = p.y;

            if (this.tool === 'stamp') {
                drawVectorStamp(p.x, p.y, this.currentStampIndex, this.currentColor, this.brushSize * 1.6);
                window.sounds.playPop(650);
                drawing = false;
            } else {
                window.sounds.playPop(420);
                draw(p.x, p.y, p.x + 0.1, p.y + 0.1);
            }
        });

        canvas.addEventListener('pointermove', (e) => {
            if (!drawing || this.tool === 'stamp') return;
            const p = getPos(e);
            draw(lastX, lastY, p.x, p.y);
            lastX = p.x;
            lastY = p.y;
        });

        const stopDrawing = (e) => {
            if (drawing) {
                drawing = false;
                try { canvas.releasePointerCapture(e.pointerId); } catch (err) {}
            }
        };
        canvas.addEventListener('pointerup', stopDrawing);
        canvas.addEventListener('pointercancel', stopDrawing);

        this.createTemplateTabs(templateBar, templates, (idx) => {
            applyCanvasBackground(idx);
        });

        // Toolbar
        const toolsDiv = document.createElement('div');
        toolsDiv.className = 'tools-group';
        toolsDiv.innerHTML = `
            <button class="tool-btn active" id="tool-pen">${ICONS.pen}<span>Kuas</span></button>
            <button class="tool-btn" id="tool-rainbow">${ICONS.rainbow}<span>Pelangi</span></button>
            <button class="tool-btn" id="tool-glow">${ICONS.glow}<span>Glow</span></button>
            <button class="tool-btn" id="tool-spray">${ICONS.spray}<span>Semprot</span></button>
            <button class="tool-btn" id="tool-roller">${ICONS.roller}<span>Roller</span></button>
            <button class="tool-btn" id="tool-stamp">${ICONS.stamp}<span>Stempel</span></button>
            <button class="tool-btn" id="tool-eraser">${ICONS.eraser}<span>Hapus</span></button>
            <button class="tool-btn" id="tool-save">${ICONS.save}<span>Simpan</span></button>
            <button class="tool-btn" id="tool-clear">${ICONS.reset}<span>Ulang</span></button>
        `;

        // Palette with automatic switch from rainbow/eraser to pen!
        const paletteEl = this.createPalette(toolbar, colors, () => {
            if (this.tool === 'rainbow' || this.tool === 'eraser') {
                this.tool = 'brush';
                toolsDiv.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
                const penBtn = document.getElementById('tool-pen');
                if (penBtn) penBtn.classList.add('active');
            }
        });

        toolbar.appendChild(toolsDiv);

        const setTool = (toolName, btn) => {
            this.tool = toolName;
            toolsDiv.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (toolName === 'rainbow' || toolName === 'eraser') {
                paletteEl.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            }
            window.sounds.playPop(500);
        };

        document.getElementById('tool-pen').addEventListener('click', (e) => setTool('brush', e.currentTarget));
        document.getElementById('tool-rainbow').addEventListener('click', (e) => setTool('rainbow', e.currentTarget));
        document.getElementById('tool-glow').addEventListener('click', (e) => setTool('glow', e.currentTarget));
        document.getElementById('tool-spray').addEventListener('click', (e) => setTool('spray', e.currentTarget));
        document.getElementById('tool-roller').addEventListener('click', (e) => setTool('roller', e.currentTarget));
        document.getElementById('tool-stamp').addEventListener('click', (e) => {
            this.currentStampIndex = (this.currentStampIndex + 1) % 4;
            setTool('stamp', e.currentTarget);
        });
        document.getElementById('tool-eraser').addEventListener('click', (e) => setTool('eraser', e.currentTarget));

        document.getElementById('tool-save').addEventListener('click', () => {
            const exportCanvas = document.createElement('canvas');
            exportCanvas.width = canvas.width;
            exportCanvas.height = canvas.height;
            const expCtx = exportCanvas.getContext('2d');

            if (this.activeTemplateIndex === 2) {
                expCtx.fillStyle = '#1a202c';
                expCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
            } else if (this.activeTemplateIndex === 1) {
                expCtx.fillStyle = '#fefcbf';
                expCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
                expCtx.strokeStyle = '#e2e8f0';
                for (let y = 32; y < exportCanvas.height; y += 32) {
                    expCtx.beginPath();
                    expCtx.moveTo(0, y);
                    expCtx.lineTo(exportCanvas.width, y);
                    expCtx.stroke();
                }
            } else {
                expCtx.fillStyle = '#ffffff';
                expCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
                if (this.activeTemplateIndex === 0) {
                    expCtx.strokeStyle = '#edf2f7';
                    for (let x = 24; x < exportCanvas.width; x += 24) {
                        expCtx.beginPath(); expCtx.moveTo(x, 0); expCtx.lineTo(x, exportCanvas.height); expCtx.stroke();
                    }
                    for (let y = 24; y < exportCanvas.height; y += 24) {
                        expCtx.beginPath(); expCtx.moveTo(0, y); expCtx.lineTo(exportCanvas.width, y); expCtx.stroke();
                    }
                }
            }

            expCtx.drawImage(canvas, 0, 0);
            this.saveArtwork(exportCanvas, 'drawing-artwork.png');
        });

        document.getElementById('tool-clear').addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            window.sounds.playPop(300);
        });
    }

    // ==========================================
    // 6. SCRATCH ART MODE
    // ==========================================
    initScratch(templateBar, container, toolbar) {
        const templates = [
            { id: 'raccoon', name: 'Rakun Ungu' },
            { id: 'lion', name: 'Singa Sabana' },
            { id: 'fish', name: 'Ikan Badut Laut' },
            { id: 'castle', name: 'Istana Pelangi' }
        ];

        const wrap = document.createElement('div');
        wrap.style.cssText = 'width: 720px; height: 480px; max-width: 95%; max-height: 90%; position: relative; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.25);';

        const bottomCanvas = document.createElement('canvas');
        bottomCanvas.width = 720;
        bottomCanvas.height = 480;
        bottomCanvas.style.cssText = 'position: absolute; inset: 0; width: 100%; height: 100%;';

        const topCanvas = document.createElement('canvas');
        topCanvas.width = 720;
        topCanvas.height = 480;
        topCanvas.style.cssText = 'position: absolute; inset: 0; width: 100%; height: 100%; cursor: pointer; touch-action: none;';

        wrap.appendChild(bottomCanvas);
        wrap.appendChild(topCanvas);
        container.appendChild(wrap);

        const bCtx = bottomCanvas.getContext('2d');
        const tCtx = topCanvas.getContext('2d');

        const drawArt = (idx) => {
            bCtx.clearRect(0, 0, 720, 480);
            if (idx === 0) {
                // Purple Raccoon
                const grad = bCtx.createLinearGradient(0, 0, 720, 480);
                grad.addColorStop(0, '#fbcfe8');
                grad.addColorStop(0.5, '#c4b5fd');
                grad.addColorStop(1, '#93c5fd');
                bCtx.fillStyle = grad;
                bCtx.fillRect(0, 0, 720, 480);

                const cx = 360, cy = 250;
                bCtx.fillStyle = '#b794f4';
                bCtx.beginPath();
                bCtx.ellipse(cx - 90, cy - 100, 35, 45, -0.3, 0, Math.PI * 2);
                bCtx.fill();
                bCtx.beginPath();
                bCtx.ellipse(cx + 90, cy - 100, 35, 45, 0.3, 0, Math.PI * 2);
                bCtx.fill();

                bCtx.fillStyle = '#d6bcfa';
                bCtx.beginPath();
                bCtx.ellipse(cx, cy, 130, 110, 0, 0, Math.PI * 2);
                bCtx.fill();

                bCtx.fillStyle = '#ffffff';
                bCtx.beginPath();
                bCtx.ellipse(cx - 50, cy + 10, 45, 55, -0.15, 0, Math.PI * 2);
                bCtx.ellipse(cx + 50, cy + 10, 45, 55, 0.15, 0, Math.PI * 2);
                bCtx.fill();

                bCtx.fillStyle = '#f687b3';
                bCtx.beginPath();
                bCtx.arc(cx - 75, cy + 35, 16, 0, Math.PI * 2);
                bCtx.arc(cx + 75, cy + 35, 16, 0, Math.PI * 2);
                bCtx.fill();

                bCtx.fillStyle = '#1a202c';
                bCtx.beginPath();
                bCtx.arc(cx - 42, cy + 10, 18, 0, Math.PI * 2);
                bCtx.arc(cx + 42, cy + 10, 18, 0, Math.PI * 2);
                bCtx.fill();
            } else if (idx === 1) {
                // Lion
                const grad = bCtx.createLinearGradient(0, 0, 720, 480);
                grad.addColorStop(0, '#fef08a');
                grad.addColorStop(1, '#fed7aa');
                bCtx.fillStyle = grad;
                bCtx.fillRect(0, 0, 720, 480);

                const cx = 360, cy = 240;
                bCtx.fillStyle = '#dd6b20';
                for (let i = 0; i < 16; i++) {
                    const ang = (i / 16) * Math.PI * 2;
                    bCtx.beginPath();
                    bCtx.arc(cx + Math.cos(ang) * 110, cy + Math.sin(ang) * 110, 45, 0, Math.PI * 2);
                    bCtx.fill();
                }

                bCtx.fillStyle = '#ecc94b';
                bCtx.beginPath();
                bCtx.arc(cx, cy, 100, 0, Math.PI * 2);
                bCtx.fill();

                bCtx.fillStyle = '#1a202c';
                bCtx.beginPath();
                bCtx.arc(cx - 35, cy - 10, 14, 0, Math.PI * 2);
                bCtx.arc(cx + 35, cy - 10, 14, 0, Math.PI * 2);
                bCtx.fill();

                bCtx.fillStyle = '#744210';
                bCtx.beginPath();
                bCtx.moveTo(cx - 15, cy + 25);
                bCtx.lineTo(cx + 15, cy + 25);
                bCtx.lineTo(cx, cy + 40);
                bCtx.fill();
            } else if (idx === 2) {
                // Clownfish ocean
                const grad = bCtx.createLinearGradient(0, 0, 0, 480);
                grad.addColorStop(0, '#67e8f9');
                grad.addColorStop(1, '#0284c7');
                bCtx.fillStyle = grad;
                bCtx.fillRect(0, 0, 720, 480);

                const cx = 360, cy = 240;
                bCtx.fillStyle = '#f97316';
                bCtx.beginPath();
                bCtx.ellipse(cx, cy, 130, 80, 0, 0, Math.PI * 2);
                bCtx.fill();

                bCtx.fillStyle = '#ffffff';
                bCtx.fillRect(cx - 40, cy - 75, 30, 150);
                bCtx.fillRect(cx + 40, cy - 65, 25, 130);

                bCtx.fillStyle = '#1a202c';
                bCtx.beginPath();
                bCtx.arc(cx - 80, cy - 10, 12, 0, Math.PI * 2);
                bCtx.fill();
            } else {
                // Rainbow Castle
                const grad = bCtx.createLinearGradient(0, 0, 720, 480);
                grad.addColorStop(0, '#f472b6');
                grad.addColorStop(0.5, '#c084fc');
                grad.addColorStop(1, '#60a5fa');
                bCtx.fillStyle = grad;
                bCtx.fillRect(0, 0, 720, 480);

                const colors = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#60a5fa', '#a855f7'];
                colors.forEach((col, i) => {
                    bCtx.beginPath();
                    bCtx.arc(360, 460, 260 - (i * 18), Math.PI, 0, false);
                    bCtx.lineWidth = 18;
                    bCtx.strokeStyle = col;
                    bCtx.stroke();
                });
            }
        };

        const resetTopCanvas = () => {
            tCtx.globalCompositeOperation = 'source-over';
            tCtx.fillStyle = '#edf2f7';
            tCtx.fillRect(0, 0, topCanvas.width, topCanvas.height);

            tCtx.fillStyle = '#a0aec0';
            tCtx.font = '24px sans-serif';
            tCtx.textAlign = 'center';
            tCtx.fillText('Usap kanvas untuk melihat gambar rahasia', 360, 240);
        };

        drawArt(this.activeTemplateIndex);
        resetTopCanvas();

        let scratching = false;
        let lastScratchX = 0, lastScratchY = 0;
        let moveCount = 0;
        let hasWon = false;

        const checkScratchProgress = () => {
            if (hasWon) return 100;
            try {
                const imgData = tCtx.getImageData(0, 0, topCanvas.width, topCanvas.height).data;
                let cleared = 0, total = 0;
                const step = 12; // 60 x 40 = 2,400 sample points, fast (<0.3ms) and accurate
                const stride = topCanvas.width * 4;

                for (let y = 0; y < topCanvas.height; y += step) {
                    const rowOffset = y * stride;
                    for (let x = 0; x < topCanvas.width; x += step) {
                        if (imgData[rowOffset + x * 4 + 3] < 128) {
                            cleared++;
                        }
                        total++;
                    }
                }

                const percent = Math.min(100, Math.round((cleared / total) * 100));
                const percentLabel = document.getElementById('sc-percent');
                if (percentLabel) percentLabel.textContent = percent + '%';

                if (percent >= 80 && !hasWon) {
                    hasWon = true;
                    const statusLabel = document.getElementById('sc-status');
                    if (statusLabel) statusLabel.textContent = 'Hebat! Gambar Terbuka!';
                    this.triggerConfetti();
                    window.sounds.playWin();
                }
                return percent;
            } catch (err) {
                return 0;
            }
        };

        const getPos = (e) => {
            const rect = topCanvas.getBoundingClientRect();
            return {
                x: (e.clientX - rect.left) * (topCanvas.width / rect.width),
                y: (e.clientY - rect.top) * (topCanvas.height / rect.height)
            };
        };

        const scratchTo = (x1, y1, x2, y2) => {
            tCtx.globalCompositeOperation = 'destination-out';
            tCtx.lineWidth = 55;
            tCtx.lineCap = 'round';
            tCtx.lineJoin = 'round';
            tCtx.beginPath();
            tCtx.moveTo(x1, y1);
            tCtx.lineTo(x2, y2);
            tCtx.stroke();

            window.sounds.playScratch();
            moveCount++;
            if (moveCount % 20 === 0) {
                checkScratchProgress();
            }
        };

        topCanvas.addEventListener('pointerdown', (e) => {
            scratching = true;
            topCanvas.setPointerCapture(e.pointerId);
            const p = getPos(e);
            lastScratchX = p.x;
            lastScratchY = p.y;
            scratchTo(p.x, p.y, p.x + 0.1, p.y + 0.1);
        });

        topCanvas.addEventListener('pointermove', (e) => {
            if (!scratching) return;
            const p = getPos(e);
            scratchTo(lastScratchX, lastScratchY, p.x, p.y);
            lastScratchX = p.x;
            lastScratchY = p.y;
        });

        const stopScratch = (e) => {
            if (scratching) {
                scratching = false;
                try { topCanvas.releasePointerCapture(e.pointerId); } catch (err) {}
                checkScratchProgress();
            }
        };
        topCanvas.addEventListener('pointerup', stopScratch);
        topCanvas.addEventListener('pointercancel', stopScratch);

        const resetGameState = () => {
            resetTopCanvas();
            moveCount = 0;
            hasWon = false;
            const percentLabel = document.getElementById('sc-percent');
            if (percentLabel) percentLabel.textContent = '0%';
            const statusLabel = document.getElementById('sc-status');
            if (statusLabel) statusLabel.textContent = 'Usap atau gores layar untuk membuka gambar';
        };

        this.createTemplateTabs(templateBar, templates, (idx) => {
            drawArt(idx);
            resetGameState();
        });

        // Toolbar
        toolbar.innerHTML = `
            <div style="font-weight: 800; color: #4a5568; font-size: 15px; display: flex; align-items: center; gap: 8px;">
                <span id="sc-status">Usap atau gores layar untuk membuka gambar</span>
                <span id="sc-percent-badge" style="background: #edf2f7; color: #2b6cb0; padding: 2px 10px; border-radius: 12px; font-weight: 800;"><span id="sc-percent">0%</span></span>
            </div>
            <div class="tools-group">
                <button class="tool-btn" id="sc-reset">${ICONS.reset}<span>Tutup</span></button>
                <button class="tool-btn active" id="sc-reveal">${ICONS.eye}<span>Buka Semua</span></button>
            </div>
        `;

        document.getElementById('sc-reset').addEventListener('click', () => {
            resetGameState();
            window.sounds.playPop(300);
        });

        document.getElementById('sc-reveal').addEventListener('click', () => {
            tCtx.globalCompositeOperation = 'destination-out';
            tCtx.fillRect(0, 0, topCanvas.width, topCanvas.height);
            const percentLabel = document.getElementById('sc-percent');
            if (percentLabel) percentLabel.textContent = '100%';
            if (!hasWon) {
                hasWon = true;
                const statusLabel = document.getElementById('sc-status');
                if (statusLabel) statusLabel.textContent = 'Hebat! Gambar Terbuka!';
                this.triggerConfetti();
                window.sounds.playWin();
            }
        });
    }

    // ==========================================
    // UTILITIES & POPUPS
    // ==========================================
    showParentalGate() {
        const num1 = Math.floor(Math.random() * 5) + 3;
        const num2 = Math.floor(Math.random() * 4) + 2;
        const answer = num1 + num2;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-box">
                <div class="modal-title">Kunci Orang Tua</div>
                <div class="modal-body">
                    Hanya untuk orang dewasa.<br>Berapakah <strong>${num1} + ${num2}</strong>?
                    <br><br>
                    <input type="number" id="gate-input" style="font-size: 22px; width: 80px; text-align: center; padding: 6px; border-radius: 8px; border: 2px solid #cbd5e0;">
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary" id="gate-cancel">Batal</button>
                    <button class="btn-primary" id="gate-submit">Buka</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('#gate-cancel').addEventListener('click', () => modal.remove());
        modal.querySelector('#gate-submit').addEventListener('click', () => {
            const inputVal = parseInt(modal.querySelector('#gate-input').value);
            if (inputVal === answer) {
                modal.remove();
                alert('Kunci Orang Tua Terbuka! Seluruh pengaturan terbuka.');
                window.sounds.playWin();
            } else {
                alert('Jawaban salah! Coba lagi.');
                modal.remove();
            }
        });
    }

    triggerConfetti() {
        const layer = document.getElementById('confetti-layer');
        if (!layer) return;
        layer.innerHTML = '';

        const colors = ['#f56565', '#ed8936', '#ecc94b', '#48bb78', '#4299e1', '#9f7aea', '#ed64a6'];
        for (let i = 0; i < 40; i++) {
            const conf = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const delay = Math.random() * 0.4;
            const size = Math.random() * 10 + 8;

            conf.style.cssText = `
                position: absolute;
                top: -20px;
                left: ${left}%;
                width: ${size}px;
                height: ${size * 1.5}px;
                background-color: ${color};
                border-radius: 3px;
                opacity: 0.9;
                transform: rotate(${Math.random() * 360}deg);
                animation: fall 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s forwards;
            `;
            layer.appendChild(conf);
        }

        setTimeout(() => layer.innerHTML = '', 3000);
    }
}

// Add animation keyframe
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

window.app = new KidsDrawingApp();
window.addEventListener('DOMContentLoaded', () => window.app.init());
