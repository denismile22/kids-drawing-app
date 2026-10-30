// Draw & Color SVG Templates (Pure White Base & Thick Clean Outlines - No Emojis)
const DRAW_COLOR_TEMPLATES = [
    {
        id: 'dino',
        name: 'Dinosaurus',
        svg: `
            <!-- Sky Canvas Background -->
            <rect class="fillable" id="sky" x="0" y="0" width="800" height="600" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>

            <!-- Background Hill -->
            <path class="fillable" id="hill" d="M 0 440 Q 280 370 520 410 Q 670 430 800 400 L 800 600 L 0 600 Z" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>

            <!-- Scalloped Tree on the Right -->
            <path class="fillable" id="tree-trunk" d="M 640 280 C 650 340 680 400 700 470 L 760 470 C 740 400 710 340 690 280 Z" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <path class="fillable" id="tree-leaves" d="M 640 260 C 590 260 570 200 600 150 C 620 110 680 90 730 110 C 770 80 830 100 850 150 C 870 200 840 250 800 270 C 810 320 760 360 700 340 C 660 350 630 310 640 260 Z" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>

            <!-- Ground in Foreground -->
            <path class="fillable" id="ground" d="M 0 470 Q 400 450 800 470 L 800 600 L 0 600 Z" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>

            <!-- Left Shrub & Pebbles -->
            <path class="fillable" id="plant" d="M 30 470 C 15 410 60 380 90 400 C 120 370 160 400 150 470 Z" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <ellipse class="fillable" id="rock-1" cx="80" cy="510" rx="36" ry="20" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <ellipse class="fillable" id="rock-2" cx="130" cy="525" rx="26" ry="16" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>

            <!-- Back Legs (Slightly behind body) -->
            <rect class="fillable" id="dino-leg-bl" x="300" y="380" width="56" height="110" rx="28" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <rect class="fillable" id="dino-leg-br" x="430" y="380" width="56" height="110" rx="28" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>

            <!-- Main Dinosaur Body & Tail -->
            <path class="fillable" id="dino-body" d="M 195 220 C 160 220 140 180 155 135 C 175 80 255 75 295 120 C 325 155 315 220 295 270 C 285 305 285 330 315 355 C 365 345 425 345 470 365 C 515 385 565 355 595 295 C 610 265 595 245 580 255 C 555 275 540 330 500 365 C 475 390 470 425 435 435 C 390 445 320 445 280 430 C 255 420 245 380 250 345 C 255 310 240 270 215 235 C 205 225 200 220 195 220 Z" fill="#ffffff" stroke="#2d3748" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>

            <!-- Front Legs (Foreground) -->
            <rect class="fillable" id="dino-leg-fl" x="250" y="380" width="62" height="135" rx="31" fill="#ffffff" stroke="#2d3748" stroke-width="7"/>
            <rect class="fillable" id="dino-leg-fr" x="385" y="380" width="62" height="135" rx="31" fill="#ffffff" stroke="#2d3748" stroke-width="7"/>

            <!-- Dotted Tracing Trail around Head (authentic Bimi Boo style) -->
            <circle cx="230" cy="165" r="85" fill="none" stroke="#2d3748" stroke-width="4" stroke-dasharray="6,8"/>

            <!-- Big Cute Eye -->
            <ellipse class="fillable" id="dino-eye-white" cx="230" cy="165" rx="22" ry="26" fill="#ffffff" stroke="#2d3748" stroke-width="4.5"/>
            <ellipse cx="233" cy="165" rx="15" ry="19" fill="#1a202c"/>
            <circle cx="228" cy="156" r="6" fill="#ffffff"/>
            <circle cx="238" cy="172" r="3" fill="#ffffff"/>

            <!-- Eyebrow & Smile -->
            <path d="M 220 130 Q 235 120 250 128" fill="none" stroke="#2d3748" stroke-width="4" stroke-linecap="round"/>
            <path d="M 158 185 Q 172 205 192 190" fill="none" stroke="#2d3748" stroke-width="4.5" stroke-linecap="round"/>

            <!-- Rosy Cheek -->
            <ellipse class="fillable" id="dino-cheek" cx="178" cy="202" rx="14" ry="9" fill="#ffffff" stroke="#2d3748" stroke-width="3"/>

            <!-- Decorative Pattern Dots on Neck -->
            <circle class="fillable" id="neck-dot-1" cx="260" cy="285" r="8" fill="#ffffff" stroke="#2d3748" stroke-width="3"/>
            <circle class="fillable" id="neck-dot-2" cx="272" cy="315" r="9" fill="#ffffff" stroke="#2d3748" stroke-width="3"/>
            <circle class="fillable" id="neck-dot-3" cx="282" cy="345" r="9" fill="#ffffff" stroke="#2d3748" stroke-width="3"/>

            <!-- Back Spots -->
            <ellipse class="fillable" id="spot-1" cx="355" cy="380" rx="15" ry="12" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <ellipse class="fillable" id="spot-2" cx="460" cy="390" rx="17" ry="14" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>

            <!-- Hairpin Star / Flower -->
            <circle class="fillable" id="hairpin" cx="290" cy="115" r="16" fill="#ffffff" stroke="#2d3748" stroke-width="3.5"/>
            <circle cx="290" cy="115" r="5" fill="#2d3748"/>
        `
    },
    {
        id: 'kitten',
        name: 'Kucing Lucu',
        svg: `
            <rect class="fillable" x="0" y="0" width="800" height="600" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <ellipse class="fillable" cx="400" cy="490" rx="340" ry="70" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <path class="fillable" d="M 540 440 C 620 440 680 360 660 300 C 640 280 620 300 630 330 C 640 370 590 410 520 410 Z" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <ellipse class="fillable" cx="400" cy="410" rx="160" ry="120" fill="#ffffff" stroke="#2d3748" stroke-width="7"/>
            <ellipse class="fillable" cx="330" cy="485" rx="35" ry="25" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <ellipse class="fillable" cx="470" cy="485" rx="35" ry="25" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <path class="fillable" d="M 270 240 L 290 120 L 360 190 Z" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <path class="fillable" d="M 285 220 L 300 145 L 345 195 Z" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <path class="fillable" d="M 530 240 L 510 120 L 440 190 Z" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <path class="fillable" d="M 515 220 L 500 145 L 455 195 Z" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <ellipse class="fillable" cx="400" cy="260" rx="165" ry="125" fill="#ffffff" stroke="#2d3748" stroke-width="7"/>
            <circle class="fillable" cx="305" cy="295" r="20" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <circle class="fillable" cx="495" cy="295" r="20" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <ellipse cx="340" cy="245" rx="20" ry="28" fill="#2d3748"/>
            <ellipse cx="460" cy="245" rx="20" ry="28" fill="#2d3748"/>
            <circle cx="333" cy="235" r="7" fill="#ffffff"/>
            <circle cx="453" cy="235" r="7" fill="#ffffff"/>
            <polygon class="fillable" points="385,285 415,285 400,305" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <path d="M 375 310 Q 400 330 425 310" fill="none" stroke="#2d3748" stroke-width="4" stroke-linecap="round"/>
            <path d="M 280 275 L 190 260 M 280 295 L 180 295 M 280 315 L 200 330" stroke="#2d3748" stroke-width="4" stroke-linecap="round"/>
            <path d="M 520 275 L 610 260 M 520 295 L 620 295 M 520 315 L 600 330" stroke="#2d3748" stroke-width="4" stroke-linecap="round"/>
            <circle class="fillable" cx="620" cy="460" r="50" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <path d="M 590 440 Q 620 480 650 440 M 600 480 Q 640 450 630 420" fill="none" stroke="#2d3748" stroke-width="4"/>
        `
    },
    {
        id: 'car',
        name: 'Mobil Balap',
        svg: `
            <rect class="fillable" x="0" y="0" width="800" height="600" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <path class="fillable" d="M 120 120 C 100 80 180 60 210 90 C 240 70 290 90 280 130 C 310 150 280 190 240 180 C 190 200 130 180 120 120 Z" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <path class="fillable" d="M 550 140 C 530 110 590 90 620 115 C 650 100 690 120 680 150 C 700 170 680 200 640 195 C 600 210 560 190 550 140 Z" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <path class="fillable" d="M 0 450 L 800 450 L 800 600 L 0 600 Z" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <line x1="0" y1="525" x2="800" y2="525" stroke="#2d3748" stroke-width="10" stroke-dasharray="45,35"/>
            <path class="fillable" d="M 100 320 L 170 320 L 160 360 L 120 360 Z" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <path class="fillable" d="M 120 390 L 190 270 L 530 270 L 640 350 L 690 390 C 700 430 670 440 640 440 L 150 440 C 120 440 110 420 120 390 Z" fill="#ffffff" stroke="#2d3748" stroke-width="8" stroke-linejoin="round"/>
            <path class="fillable" d="M 220 290 L 360 290 L 360 360 L 200 360 Z" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <path class="fillable" d="M 390 290 L 510 290 L 565 360 L 390 360 Z" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <circle class="fillable" cx="420" cy="405" r="30" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <text x="410" y="415" font-size="28" font-weight="900" fill="#2d3748" pointer-events="none">7</text>
            <circle class="fillable" cx="240" cy="445" r="60" fill="#ffffff" stroke="#2d3748" stroke-width="7"/>
            <circle class="fillable" cx="240" cy="445" r="28" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <circle class="fillable" cx="550" cy="445" r="60" fill="#ffffff" stroke="#2d3748" stroke-width="7"/>
            <circle class="fillable" cx="550" cy="445" r="28" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <path class="fillable" d="M 670 380 L 695 385 C 700 405 680 415 665 410 Z" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
        `
    },
    {
        id: 'rocket',
        name: 'Roket Angkasa',
        svg: `
            <rect class="fillable" x="0" y="0" width="800" height="600" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <circle class="fillable" cx="660" cy="130" r="70" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <circle class="fillable" cx="640" cy="110" r="14" fill="#ffffff" stroke="#2d3748" stroke-width="3"/>
            <circle class="fillable" cx="680" cy="150" r="18" fill="#ffffff" stroke="#2d3748" stroke-width="3"/>
            <circle class="fillable" cx="150" cy="440" r="50" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <ellipse class="fillable" cx="150" cy="440" rx="80" ry="20" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <path class="fillable" d="M 120 140 L 126 125 L 140 120 L 126 115 L 120 100 L 114 115 L 100 120 L 114 125 Z" fill="#ffffff" stroke="#2d3748" stroke-width="3"/>
            <path class="fillable" d="M 640 420 L 646 405 L 660 400 L 646 395 L 640 380 L 634 395 L 620 400 L 634 405 Z" fill="#ffffff" stroke="#2d3748" stroke-width="3"/>
            <path class="fillable" d="M 320 370 L 230 460 L 320 430 Z" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <path class="fillable" d="M 480 370 L 570 460 L 480 430 Z" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <path class="fillable" d="M 400 90 C 490 190 490 390 475 425 L 325 425 C 310 390 310 190 400 90 Z" fill="#ffffff" stroke="#2d3748" stroke-width="8"/>
            <path class="fillable" d="M 400 90 C 440 140 455 180 455 190 L 345 190 C 345 180 360 140 400 90 Z" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <circle class="fillable" cx="400" cy="270" r="45" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <circle class="fillable" cx="400" cy="270" r="30" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <path class="fillable" d="M 350 425 L 400 550 L 450 425 Z" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <path class="fillable" d="M 370 425 L 400 500 L 430 425 Z" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
        `
    },
    {
        id: 'elephant',
        name: 'Gajah Cilik',
        svg: `
            <rect class="fillable" x="0" y="0" width="800" height="600" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <path class="fillable" d="M 0 480 Q 400 450 800 480 L 800 600 L 0 600 Z" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <path class="fillable" d="M 280 430 L 280 520 C 280 535 330 535 330 520 L 330 450 Z" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <path class="fillable" d="M 440 430 L 440 520 C 440 535 490 535 490 520 L 490 450 Z" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <ellipse class="fillable" cx="380" cy="380" rx="170" ry="130" fill="#ffffff" stroke="#2d3748" stroke-width="7"/>
            <path class="fillable" d="M 215 370 C 180 390 170 420 180 440 C 195 440 195 410 220 395 Z" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <path class="fillable" d="M 330 440 L 330 530 C 330 545 385 545 385 530 L 385 450 Z" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <path class="fillable" d="M 480 440 L 480 530 C 480 545 535 545 535 530 L 535 450 Z" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <circle class="fillable" cx="520" cy="280" r="115" fill="#ffffff" stroke="#2d3748" stroke-width="7"/>
            <path class="fillable" d="M 460 210 C 380 200 340 320 400 380 C 430 400 460 370 460 340 Z" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <path class="fillable" d="M 440 240 C 390 240 370 320 410 355 Z" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <path class="fillable" d="M 580 340 C 650 380 720 340 700 240 C 680 220 660 230 670 260 C 685 300 630 320 590 280 Z" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <ellipse class="fillable" cx="670" cy="180" rx="14" ry="20" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <ellipse class="fillable" cx="720" cy="160" rx="12" ry="16" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <ellipse class="fillable" cx="640" cy="130" rx="10" ry="14" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <circle class="fillable" cx="505" cy="315" r="16" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <circle cx="540" cy="260" r="14" fill="#2d3748"/>
            <circle cx="535" cy="255" r="5" fill="#ffffff"/>
        `
    },
    {
        id: 'butterfly',
        name: 'Kupu-Kupu',
        svg: `
            <rect class="fillable" x="0" y="0" width="800" height="600" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <circle class="fillable" cx="130" cy="460" r="35" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <circle class="fillable" cx="130" cy="390" r="30" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <circle class="fillable" cx="130" cy="530" r="30" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <circle class="fillable" cx="60" cy="460" r="30" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <circle class="fillable" cx="200" cy="460" r="30" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <circle class="fillable" cx="670" cy="480" r="30" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <circle class="fillable" cx="670" cy="420" r="25" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <circle class="fillable" cx="670" cy="540" r="25" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <circle class="fillable" cx="610" cy="480" r="25" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <circle class="fillable" cx="730" cy="480" r="25" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <path class="fillable" d="M 390 240 C 270 90 160 170 210 300 C 240 350 340 340 390 280 Z" fill="#ffffff" stroke="#2d3748" stroke-width="7"/>
            <circle class="fillable" cx="260" cy="230" r="25" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <circle class="fillable" cx="310" cy="270" r="16" fill="#ffffff" stroke="#2d3748" stroke-width="3"/>
            <path class="fillable" d="M 390 290 C 260 320 250 450 350 460 C 390 460 400 370 390 290 Z" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <circle class="fillable" cx="325" cy="390" r="20" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <path class="fillable" d="M 410 240 C 530 90 640 170 590 300 C 560 350 460 340 410 280 Z" fill="#ffffff" stroke="#2d3748" stroke-width="7"/>
            <circle class="fillable" cx="540" cy="230" r="25" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <circle class="fillable" cx="490" cy="270" r="16" fill="#ffffff" stroke="#2d3748" stroke-width="3"/>
            <path class="fillable" d="M 410 290 C 540 320 550 450 450 460 C 410 460 400 370 410 290 Z" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <circle class="fillable" cx="475" cy="390" r="20" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <ellipse class="fillable" cx="400" cy="320" rx="20" ry="85" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <circle class="fillable" cx="400" cy="210" r="30" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <path d="M 385 190 Q 350 140 330 150" fill="none" stroke="#2d3748" stroke-width="5" stroke-linecap="round"/>
            <circle class="fillable" cx="330" cy="150" r="8" fill="#ffffff" stroke="#2d3748" stroke-width="3"/>
            <path d="M 415 190 Q 450 140 470 150" fill="none" stroke="#2d3748" stroke-width="5" stroke-linecap="round"/>
            <circle class="fillable" cx="470" cy="150" r="8" fill="#ffffff" stroke="#2d3748" stroke-width="3"/>
        `
    },
    {
        id: 'sailboat',
        name: 'Kapal Layar',
        svg: `
            <rect class="fillable" x="0" y="0" width="800" height="600" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <circle class="fillable" cx="130" cy="120" r="50" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <path class="fillable" d="M 520 120 C 500 90 560 70 590 95 C 620 80 670 100 660 135 C 685 155 660 185 620 180 C 580 195 530 170 520 120 Z" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <path class="fillable" d="M 0 380 Q 200 350 400 380 T 800 380 L 800 600 L 0 600 Z" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <path class="fillable" d="M 0 460 Q 200 430 400 460 T 800 460 L 800 600 L 0 600 Z" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <path class="fillable" d="M 180 370 L 600 370 L 530 460 L 250 460 Z" fill="#ffffff" stroke="#2d3748" stroke-width="7"/>
            <path class="fillable" d="M 215 415 L 565 415 L 530 460 L 250 460 Z" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <rect class="fillable" x="385" y="110" width="16" height="260" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <polygon class="fillable" points="380,130 380,350 200,350" fill="#ffffff" stroke="#2d3748" stroke-width="7"/>
            <path class="fillable" d="M 405 150 L 580 350 L 405 350 Z" fill="#ffffff" stroke="#2d3748" stroke-width="7"/>
            <polygon class="fillable" points="405,110 460,125 405,140" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <circle class="fillable" cx="390" cy="415" r="22" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <circle class="fillable" cx="390" cy="415" r="10" fill="#ffffff" stroke="#2d3748" stroke-width="3"/>
        `
    },
    {
        id: 'cake',
        name: 'Kue Ulang Tahun',
        svg: `
            <rect class="fillable" x="0" y="0" width="800" height="600" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <ellipse class="fillable" cx="120" cy="180" rx="50" ry="65" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <path d="M 120 245 L 120 380" stroke="#2d3748" stroke-width="3"/>
            <ellipse class="fillable" cx="680" cy="160" rx="50" ry="65" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <path d="M 680 225 L 680 380" stroke="#2d3748" stroke-width="3"/>
            <ellipse class="fillable" cx="400" cy="510" rx="280" ry="40" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <rect class="fillable" x="220" y="390" width="360" height="110" rx="10" fill="#ffffff" stroke="#2d3748" stroke-width="7"/>
            <path class="fillable" d="M 220 420 Q 250 450 280 420 Q 310 450 340 420 Q 370 450 400 420 Q 430 450 460 420 Q 490 450 520 420 Q 550 450 580 420 L 580 390 L 220 390 Z" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <rect class="fillable" x="270" y="290" width="260" height="100" rx="10" fill="#ffffff" stroke="#2d3748" stroke-width="7"/>
            <path class="fillable" d="M 270 320 Q 300 345 330 320 Q 360 345 390 320 Q 420 345 450 320 Q 480 345 510 320 Q 530 330 530 290 L 270 290 Z" fill="#ffffff" stroke="#2d3748" stroke-width="5"/>
            <rect class="fillable" x="325" y="210" width="150" height="80" rx="8" fill="#ffffff" stroke="#2d3748" stroke-width="6"/>
            <rect class="fillable" x="350" y="160" width="16" height="50" rx="3" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <rect class="fillable" x="392" y="150" width="16" height="60" rx="3" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <rect class="fillable" x="434" y="160" width="16" height="50" rx="3" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            <path class="fillable" d="M 358 135 C 345 150 370 150 358 135 Z" fill="#ffffff" stroke="#2d3748" stroke-width="3"/>
            <path class="fillable" d="M 400 120 C 385 140 415 140 400 120 Z" fill="#ffffff" stroke="#2d3748" stroke-width="3"/>
            <path class="fillable" d="M 442 135 C 430 150 455 150 442 135 Z" fill="#ffffff" stroke="#2d3748" stroke-width="3"/>
            <circle class="fillable" cx="295" cy="285" r="14" fill="#ffffff" stroke="#2d3748" stroke-width="3"/>
            <circle class="fillable" cx="505" cy="285" r="14" fill="#ffffff" stroke="#2d3748" stroke-width="3"/>
        `
    }
];

if (typeof window !== 'undefined') {
    window.DRAW_COLOR_TEMPLATES = DRAW_COLOR_TEMPLATES;
}
