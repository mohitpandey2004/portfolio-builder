// ==================== 1. TYPED.JS INTERFACE ====================
var typed = new Typed(".text", {
    strings: ["Frontend Developer", "Web Developer", "Android Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// ==================== 2. SINGLE PAGE UNIFIED TAB SWITCHING LOGIC ====================
// Captures links across top desktop header bar AND mobile bottom sticky footer layout menu
const navLinks = document.querySelectorAll('.navbar a, .mobile-footer-nav a, .logo, .btn-box');
const sections = document.querySelectorAll('.content-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetSectionId = link.getAttribute('data-target');

        if (targetSectionId) {
            e.preventDefault();

            // 🔥 FORCE AUDIO ON-CLICK MECHANISM (Endless Loops Triggered Uniquely)
            playSystemSound(580, 'triangle', 0.08);

            // Synchronize active highlights state machines cleanly across layout engines
            document.querySelectorAll('.navbar a, .mobile-footer-nav a').forEach(nav => {
                nav.classList.remove('active');
                if(nav.getAttribute('data-target') === targetSectionId) {
                    nav.classList.add('active');
                }
            });

            // Section switching block visibility logic
            sections.forEach(section => {
                section.classList.remove('active');
                
                if (window.innerWidth <= 768) {
                    section.style.display = 'none'; 
                }

                if (section.id === targetSectionId) {
                    section.classList.add('active');
                    
                    if (window.innerWidth <= 768) {
                        section.style.display = 'block';
                    }
                    
                    section.scrollTop = 0;
                }
            });

            if (window.innerWidth <= 768) {
                window.scrollTo(0, 0);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        }
    });
});

// ==================== 🎛 *CONTROL PANEL SYSTEM SCHEMAS CORE* ====================
const cyberPanel = document.getElementById('cyberPanel');
const panelToggle = document.getElementById('panelToggle');
const matrixToggle = document.getElementById('matrixToggle');
const themeToggle = document.getElementById('themeToggle');
const lightModeToggle = document.getElementById('lightModeToggle');
const soundToggle = document.getElementById('soundToggle');
const matrixCanvas = document.getElementById('matrixCanvas');

// Slide drawer toggle action handler
panelToggle.addEventListener('click', (e) => {
    e.stopPropagation(); 
    cyberPanel.classList.toggle('open');
    playSystemSound(650, 'sine', 0.08);
});

// Auto close framework wrapper click handler
document.addEventListener('click', (e) => {
    if (cyberPanel.classList.contains('open') && !cyberPanel.contains(e.target)) {
        cyberPanel.classList.remove('open');
        playSystemSound(300, 'sine', 0.06);
    }
});

// A. NEON MODES MUTATION MANAGER
themeToggle.addEventListener('change', () => {
    if(themeToggle.checked) {
        lightModeToggle.checked = false; 
        document.body.classList.remove('light-mode-active');
        document.body.classList.add('pink-neon-theme');
        playSystemSound(440, 'triangle', 0.12);
    } else {
        document.body.classList.remove('pink-neon-theme');
        playSystemSound(330, 'triangle', 0.12);
    }
});

// B. PREMIUM LIGHT MODE CONTROLLER
lightModeToggle.addEventListener('change', () => {
    if(lightModeToggle.checked) {
        themeToggle.checked = false; 
        document.body.classList.remove('pink-neon-theme');
        document.body.classList.add('light-mode-active');
        playSystemSound(750, 'sine', 0.1);
    } else {
        document.body.classList.remove('light-mode-active');
        playSystemSound(380, 'sine', 0.1);
    }
});

// C. UNIFIED REAL-TIME STREAMING MATRIX ENGINE
const ctx = matrixCanvas.getContext('2d');
let matrixInterval = null;

function resizeCanvas() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
}

const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabet = katakana.split("");
let fontSize = 16;
let rainDrops = [];

function initMatrix() {
    let columns = window.innerWidth / fontSize;
    rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }
}

function drawMatrix() {
    ctx.fillStyle = document.body.classList.contains('light-mode-active') ? 'rgba(244, 246, 249, 0.06)' : 'rgba(6, 19, 31, 0.06)';
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    if (document.body.classList.contains('pink-neon-theme')) { ctx.fillStyle = '#ff007f'; }
    else if (document.body.classList.contains('light-mode-active')) { ctx.fillStyle = '#0284c7'; }
    else { ctx.fillStyle = '#00eeff'; }
    
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
}

matrixToggle.addEventListener('change', () => {
    if (matrixToggle.checked) {
        matrixCanvas.style.display = 'block';
        resizeCanvas();
        initMatrix();
        clearInterval(matrixInterval);
        matrixInterval = setInterval(drawMatrix, 30);
        playSystemSound(600, 'sine', 0.08);
    } else {
        clearInterval(matrixInterval);
        ctx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        matrixCanvas.style.display = 'none';
        playSystemSound(200, 'sine', 0.08);
    }
});

// D. REUSABLE NON-DESTRUCTIVE AUDIO CORES INTERFACE
function playSystemSound(frequency, type, duration) {
    if (!soundToggle.checked) return; 
    try {
        // Core Web Audio API instantiation scheme pattern tracking rules
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        // Browser standard override hooks loops auto-play policies handler
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = type;
        oscillator.frequency.value = frequency;
        
        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.log("Hardware acoustics synthesis pipeline update exception.");
    }
}

// Global dynamic interface nodes hover sound mapping parameters
document.querySelectorAll('.navbar a, .logo, .btn-box, .panel-toggle-btn, .skill-tag, .portfolio-box, .mobile-footer-nav a').forEach(element => {
    element.addEventListener('mouseenter', () => {
        playSystemSound(950, 'sine', 0.02);
    });
});