// ==================== 1. TYPED.JS INTERFACE ====================
var typed = new Typed(".text", {
    strings: ["Frontend Developer", "Web Developer", "Android Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// ==================== 2. SINGLE PAGE TAB SWITCHING LOGIC ====================
const navLinks = document.querySelectorAll('.navbar a, .logo, .btn-box');
const sections = document.querySelectorAll('.content-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetSectionId = link.getAttribute('data-target');

        if (targetSectionId) {
            e.preventDefault();

            // Step B: Navbar ke saare links se active highlighted classes hatana
            document.querySelectorAll('.navbar a').forEach(navLink => {
                navLink.classList.remove('active');
            });

            // Step C: Sahi link ko active state highlight dena
            const matchingNavbarLink = document.querySelector(`.navbar a[data-target="${targetSectionId}"]`);
            if (matchingNavbarLink) {
                matchingNavbarLink.classList.add('active');
            }

            // Step D: Saare sections ko hide karna aur sirf active wale ko show karna
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

            // Step E: 🔥 MOBILE ENGINE FORCE RESET
            if (window.innerWidth <= 768) {
                window.scrollTo(0, 0);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        }
    });
});

// ==================== 🎛️ NEW CYBER CONTROL PANEL FRAMEWORK LOGIC ====================
const cyberPanel = document.getElementById('cyberPanel');
const panelToggle = document.getElementById('panelToggle');
const matrixToggle = document.getElementById('matrixToggle');
const themeToggle = document.getElementById('themeToggle');
const soundToggle = document.getElementById('soundToggle');
const matrixCanvas = document.getElementById('matrixCanvas');

// Toggle sliding animation drawer
panelToggle.addEventListener('click', () => {
    cyberPanel.classList.toggle('open');
    playSystemSound(500, 'triangle', 0.08);
});

// A. NEON MODES CORE HANDLER
themeToggle.addEventListener('change', () => {
    if(themeToggle.checked) {
        document.body.classList.add('pink-neon-theme');
        playSystemSound(440, 'triangle', 0.12);
    } else {
        document.body.classList.remove('pink-neon-theme');
        playSystemSound(330, 'triangle', 0.12);
    }
});

// B. REAL-TIME HARDWARE ADVANCED MATRIX STREAMER ENGINE
const ctx = matrixCanvas.getContext('2d');
let matrixInterval = null;

function resizeCanvas() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);

const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabet = katakana.split("");
let fontSize = 16;
let columns = window.innerWidth / fontSize;
let rainDrops = [];

function initMatrix() {
    columns = window.innerWidth / fontSize;
    rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(6, 19, 31, 0.05)'; 
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    // Swap color mapping according to live toggle configurations
    ctx.fillStyle = document.body.classList.contains('pink-neon-theme') ? '#ff007f' : '#00eeff';
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
        matrixInterval = setInterval(drawMatrix, 30);
        playSystemSound(600, 'sine', 0.08);
    } else {
        clearInterval(matrixInterval);
        ctx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        matrixCanvas.style.display = 'none';
        playSystemSound(200, 'sine', 0.08);
    }
});

// C. WEB AUDIO API SOUND SYNTHESIZER
function playSystemSound(frequency, type, duration) {
    if (!soundToggle.checked) return; 
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = type;
        oscillator.frequency.value = frequency;
        gainNode.gain.setValueAtTime(duration, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.log("Audio contexts blocked");
    }
}

// Attach hover acoustics to interactive nodes
document.querySelectorAll('.navbar a, .logo, .btn-box, .panel-toggle-btn, .skill-tag, .portfolio-box').forEach(element => {
    element.addEventListener('mouseenter', () => {
        playSystemSound(900, 'sine', 0.015);
    });
});