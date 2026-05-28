// ==================== 1. TYPED.JS INTERFACE ====================
if (document.querySelector('.text')) {
    var typed = new Typed(".text", {
        strings: ["Frontend Developer", "Web Developer", "Android Developer"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}

// ==================== 2. SINGLE PAGE UNIFIED TAB SWITCHING LOGIC ====================
const navLinks = document.querySelectorAll('.navbar a, .logo, .btn-box');
const sections = document.querySelectorAll('.content-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetSectionId = link.getAttribute('data-target');

        if (targetSectionId) {
            e.preventDefault();
            playSystemSound(580, 'triangle', 0.08);

            document.querySelectorAll('.navbar a').forEach(nav => {
                nav.classList.remove('active');
            });

            const matchingNavbarLink = document.querySelector(`.navbar a[data-target="${targetSectionId}"]`);
            if (matchingNavbarLink) {
                matchingNavbarLink.classList.add('active');
            }

            sections.forEach(section => {
                section.classList.remove('active');
                if (window.innerWidth <= 768) { section.style.display = 'none'; }

                if (section.id === targetSectionId) {
                    section.classList.add('active');
                    if (window.innerWidth <= 768) { section.style.display = 'block'; }
                    section.scrollTop = 0;
                }
            });

            if (window.innerWidth <= 768) {
                window.scrollTo(0, 0);
            }
        }
    });
});

// ==================== 🎛️ CONTROL PANEL SYSTEM SCHEMAS ====================
const cyberPanel = document.getElementById('cyberPanel');
const panelToggle = document.getElementById('panelToggle');
const matrixToggle = document.getElementById('matrixToggle');
const themeToggle = document.getElementById('themeToggle');
const lightModeToggle = document.getElementById('lightModeToggle');
const soundToggle = document.getElementById('soundToggle');
const matrixCanvas = document.getElementById('matrixCanvas');

if (panelToggle) {
    panelToggle.addEventListener('click', (e) => {
        e.stopPropagation(); 
        cyberPanel.classList.toggle('open');
        playSystemSound(650, 'sine', 0.08);
    });
}

document.addEventListener('click', (e) => {
    if (cyberPanel && cyberPanel.classList.contains('open') && !cyberPanel.contains(e.target)) {
        cyberPanel.classList.remove('open');
        playSystemSound(300, 'sine', 0.06);
    }
});

if (themeToggle) {
    themeToggle.addEventListener('change', () => {
        if(themeToggle.checked) {
            if(lightModeToggle) lightModeToggle.checked = false; 
            document.body.classList.remove('light-mode-active');
            document.body.classList.add('pink-neon-theme');
            playSystemSound(440, 'triangle', 0.12);
        } else {
            document.body.classList.remove('pink-neon-theme');
            playSystemSound(330, 'triangle', 0.12);
        }
    });
}

if (lightModeToggle) {
    lightModeToggle.addEventListener('change', () => {
        if(lightModeToggle.checked) {
            if(themeToggle) themeToggle.checked = false; 
            document.body.classList.remove('pink-neon-theme');
            document.body.classList.add('light-mode-active');
            playSystemSound(750, 'sine', 0.1);
        } else {
            document.body.classList.remove('light-mode-active');
            playSystemSound(380, 'sine', 0.1);
        }
    });
}

// MATRIX ENGINE
const ctx = matrixCanvas ? matrixCanvas.getContext('2d') : null;
let matrixInterval = null;

function resizeCanvas() {
    if (matrixCanvas) {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    }
}

const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabet = katakana.split("");
let fontSize = 16;
let rainDrops = [];

function initMatrix() {
    let columns = window.innerWidth / fontSize;
    rainDrops = [];
    for (let x = 0; x < columns; x++) { rainDrops[x] = 1; }
}

function drawMatrix() {
    if (!ctx || !matrixCanvas) return;
    ctx.fillStyle = document.body.classList.contains('light-mode-active') ? 'rgba(236, 238, 241, 0.06)' : 'rgba(6, 19, 31, 0.06)';
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    if (document.body.classList.contains('pink-neon-theme')) { ctx.fillStyle = '#ff007f'; }
    else if (document.body.classList.contains('light-mode-active')) { ctx.fillStyle = '#0284c7'; }
    else { ctx.fillStyle = '#00eeff'; }
    
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        if (rainDrops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) { rainDrops[i] = 0; }
        rainDrops[i]++;
    }
}

if (matrixToggle) {
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
            if(ctx && matrixCanvas) ctx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            if(matrixCanvas) matrixCanvas.style.display = 'none';
            playSystemSound(200, 'sine', 0.08);
        }
    });
}

window.addEventListener('resize', () => {
    if (matrixToggle && matrixToggle.checked) { resizeCanvas(); initMatrix(); }
});

function playSystemSound(frequency, type, duration) {
    if (!soundToggle || !soundToggle.checked) return; 
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') { audioCtx.resume(); }
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) { console.log("Acoustics loop exception."); }
}

document.querySelectorAll('.navbar a, .logo, .btn-box, .panel-toggle-btn, .skill-tag, .portfolio-box, .section-tab').forEach(element => {
    element.addEventListener('mouseenter', () => { playSystemSound(950, 'sine', 0.015); });
});

// ==================== 🚀 5. ADVANCED GAMIFIED PROGRESSIVE ATS SCORE ENGINE ====================
let globalAtsPenaltyScore = 0; 

function calculateATSScore() {
    let score = 0;

    const name = document.getElementById('res_name')?.value || "";
    const email = document.getElementById('res_email')?.value || "";
    const phone = document.getElementById('res_phone')?.value || "";
    const address = document.getElementById('res_address')?.value || "";
    const education = document.getElementById('res_education')?.value || "";
    const experience = document.getElementById('res_experience')?.value || "";
    const skills = document.getElementById('res_skills')?.value || "";
    const objective = document.getElementById('res_objective')?.value || "";
    const reference = document.getElementById('res_reference')?.value || "";
    const projects = document.getElementById('res_projects')?.value || "";

    const modContact = document.getElementById('mod-contact');
    const modEducation = document.getElementById('mod-education');
    const modExperience = document.getElementById('mod-experience');
    const modSkills = document.getElementById('mod-skills');
    const modObjective = document.getElementById('mod-objective');
    const modReference = document.getElementById('mod-reference');
    const modProjects = document.getElementById('mod-projects');
    const modAddMore = document.getElementById('mod-addmore');

    const modulesArr = [modContact, modEducation, modExperience, modSkills, modObjective, modReference, modProjects, modAddMore];
    modulesArr.forEach(tag => {
        if(tag) { tag.classList.remove('active-step', 'optimized'); tag.classList.add('critical'); }
    });

    let currentVisibleStep = null;
    let basePersonalReady = false;

    // 🛑 PHASE A: PERSONAL BASE DETAILS COMPULSORY (Max: 15 Points)
    let contactWeight = 0;
    if (name.trim().length > 3) contactWeight += 4;
    if (email.trim().includes("@")) contactWeight += 4;
    if (phone.trim().length > 6) contactWeight += 4;
    if (address.trim().length > 5) contactWeight += 3;
    score += contactWeight;

    if (contactWeight >= 15) {
        basePersonalReady = true;
        if(modContact) { modContact.classList.remove('critical'); modContact.classList.add('optimized'); }
    } else {
        currentVisibleStep = modContact;
    }

    // 💎 BONUS LAYER: ON-SWITCH + FILL DATA CHECK ENGINE (+2 Per Option)
    const optionalsArr = ['dob', 'nationality', 'marital', 'website', 'linkedin', 'facebook', 'twitter', 'religion', 'passport', 'gender', 'licence', 'place', 'salary'];
    let bonusAccumulated = 0;
    optionalsArr.forEach(key => {
        const toggle = document.querySelector(`.field-toggle[data-field="${key}"]`);
        const input = document.getElementById(`dyn-input-${key}`);
        if(toggle && toggle.checked && input && input.value.trim().length > 0) {
            bonusAccumulated += 2;
        }
    });
    score += bonusAccumulated;

    // 🛑 PHASE B: EDUCATION DESCRIPTIVE LENGTH MONITOR (Max: 15 Points)
    if (basePersonalReady) {
        let textLen = education.trim().length;
        let eduScore = 0;
        if(textLen > 5) eduScore = 5;
        if(textLen > 35) eduScore = 10;
        if(textLen > 70) eduScore = 15;
        score += eduScore;

        if(eduScore >= 15) {
            if(modEducation) { modEducation.classList.remove('critical'); modEducation.classList.add('optimized'); }
        } else if(!currentVisibleStep) {
            currentVisibleStep = modEducation;
        }
    }

    // 🛑 PHASE C: WORK EXPERIENCE ANALYSIS TIMELINE (Max: 15 Points)
    if (basePersonalReady && education.trim().length > 70) {
        let textLen = experience.trim().length;
        let expScore = 0;
        if(textLen > 5) expScore = 5;
        if(textLen > 30) expScore = 10;
        if(textLen > 60) expScore = 15;
        score += expScore;

        if(expScore >= 15) {
            if(modExperience) { modExperience.classList.remove('critical'); modExperience.classList.add('optimized'); }
        } else if(!currentVisibleStep) {
            currentVisibleStep = modExperience;
        }
    }

    // 🛑 PHASE D: TECHNICAL SKILLS ARRAY EXTRACTION (Max: 15 Points)
    if (basePersonalReady && experience.trim().length > 60) {
        let cleanSkills = skills.split(',').map(s => s.trim()).filter(s => s.length > 0).length;
        let skillScore = Math.min(cleanSkills * 3, 15);
        score += skillScore;

        if(skillScore >= 15) {
            if(modSkills) { modSkills.classList.remove('critical'); modSkills.classList.add('optimized'); }
        } else if(!currentVisibleStep) {
            currentVisibleStep = modSkills;
        }
    }

    // 🛑 PHASE E: CAREER PURPOSE STATEMENT MATRIX (Max: 10 Points)
    if (basePersonalReady && skills.trim().length > 5) {
        let textLen = objective.trim().length;
        let objScore = 0;
        if(textLen > 10) objScore = 5;
        if(textLen > 40) objScore = 10;
        score += objScore;

        if(objScore >= 10) {
            if(modObjective) { modObjective.classList.remove('critical'); modObjective.classList.add('optimized'); }
        } else if(!currentVisibleStep) {
            currentVisibleStep = modObjective;
        }
    }

    // 🛑 PHASE F: CREDENTIAL REFERENCE METRICS (Max: 10 Points)
    if (basePersonalReady && objective.trim().length > 40) {
        let textLen = reference.trim().length;
        let refScore = 0;
        if(textLen > 10) refScore = 5;
        if(textLen > 35) refScore = 10;
        score += refScore;

        if(refScore >= 10) {
            if(modReference) { modReference.classList.remove('critical'); modReference.classList.add('optimized'); }
        } else if(!currentVisibleStep) {
            currentVisibleStep = modReference;
        }
    }

    // 🛑 PHASE G: KEY FEATURED PROJECTS EVALUATION (Max: 15 Points)
    if (basePersonalReady && reference.trim().length > 35) {
        let textLen = projects.trim().length;
        let projScore = 0;
        if(textLen > 15) projScore = 5;
        if(textLen > 45) projScore = 10;
        if(textLen > 80) projScore = 15;
        score += projScore;

        if(projScore >= 15) {
            if(modProjects) { modProjects.classList.remove('critical'); modProjects.classList.add('optimized'); }
        } else if(!currentVisibleStep) {
            currentVisibleStep = modProjects;
        }
    }

    // 🛑 PHASE H: ADD MORE EXTRA WIDGET BONUS SWITCHES (Max: 5 Points)
    if (basePersonalReady && projects.trim().length > 80) {
        const sectionsKeys = ['interests', 'awards', 'activities', 'publications', 'languages', 'additional', 'signature'];
        let extraSectionsBonus = 0;
        sectionsKeys.forEach(secKey => {
            const toggle = document.querySelector(`.sec-toggle[onchange*="${secKey}"]`);
            const inputText = document.getElementById(`dyn-sec-input-${secKey}`);
            if(toggle && toggle.checked && inputText && inputText.value.trim().length > 4) {
                extraSectionsBonus += 2.5;
            }
        });
        let extraScore = Math.min(extraSectionsBonus, 5);
        score += extraScore;

        if(extraScore >= 5) {
            if(modAddMore) { modAddMore.classList.remove('critical'); modAddMore.classList.add('optimized'); }
        } else if(!currentVisibleStep) {
            currentVisibleStep = modAddMore;
        }
    }

    // Dynamic semantic penalty application
    if (typeof globalAtsPenaltyScore !== "undefined") {
        score -= globalAtsPenaltyScore;
    }

    if(score > 100) score = 100;
    if(score < 0) score = 0;

    if (currentVisibleStep) {
        currentVisibleStep.classList.add('active-step');
    }

    const scoreBadge = document.getElementById('atsScoreBadge');
    const feedbackText = document.getElementById('atsFeedbackText');
    const radarBox = document.querySelector('.radar-box');

    if (scoreBadge && feedbackText) {
        scoreBadge.innerText = (score < 10 ? "0" : "") + score + "%";

        if (!basePersonalReady) {
            feedbackText.innerText = "❌ Profile Base Locked: Complete compulsory Personal info fields.";
            feedbackText.style.color = "#ff4a4a";
            if(radarBox) radarBox.style.borderColor = "#ff4a4a";
        } else if (basePersonalReady && currentVisibleStep === modEducation) {
            feedbackText.innerText = "💎 Hint: Personal Details complete! Optional switches ON karke data fill karo aur har step par +2 bonus points kamao. Moving to [Education] section.";
            feedbackText.style.color = "#00eeff";
            if(radarBox) radarBox.style.borderColor = "#00eeff";
        } else if (score >= 40 && score < 85) {
            feedbackText.innerText = "⚙️ Re-calculating Parameters: Input deep optimized content inside textareas to maximize professional index scoring weights.";
            feedbackText.style.color = "#ffb700";
            if(radarBox) radarBox.style.borderColor = "#ffb700";
        } else if (score >= 85 && score < 100) {
            feedbackText.innerText = "🚀 Orbit Locked: High-density data stream processed. Profile completely algorithm resilient.";
            feedbackText.style.color = "#00eeff";
            if(radarBox) radarBox.style.borderColor = "#00eeff";
        } else {
            feedbackText.innerText = "🔥 Full 100% Core Matrix Integrity Synched: Master blueprint successfully compiled!";
            feedbackText.style.color = "#00ff66";
            if(radarBox) radarBox.style.borderColor = "#00ff66";
        }
    }
}

// ==================== 🧠 DYNAMIC FUZZY SPELL CHECK MATRIX ENGINE ====================
const globalAtsVault = {
    // Standard Resume vocabulary base system reference array
    validDictionaryWords: [
        'location', 'education', 'experience', 'skills', 'projects', 'objective', 'references', 
        'developer', 'android', 'fresher', 'history', 'management', 'development', 'kotlin', 'java', 
        'address', 'contact', 'qualification', 'technical', 'professional', 'engineered', 'spearheaded'
    ],
    poorWords: ['made', 'created', 'built', 'worked', 'managed', 'did', 'led', 'handled', 'helped', 'fixed', 'responsible for', 'good', 'bad'],
    replacements: {
        'made': ['Engineered', 'Architected', 'Formulated'],
        'created': ['Developed', 'Innovated', 'Generated'],
        'built': ['Constructed', 'Assembled', 'Fabricated'],
        'worked': ['Collaborated', 'Contributed', 'Spearheaded'],
        'managed': ['Orchestrated', 'Directed', 'Supervised'],
        'did': ['Executed', 'Implemented', 'Discharged'],
        'led': ['Spearheaded', 'Pioneered', 'Chambered'],
        'handled': ['Navigated', 'Controlled', 'Executed'],
        'helped': ['Assisted', 'Facilitated', 'Supported'],
        'fixed': ['Resolved', 'Debugged', 'Optimized'],
        'responsible for': ['Accountable for', 'Entrusted with', 'Executed'],
        'good': ['Exceptional', 'Proficient', 'Exemplary'],
        'bad': ['Suboptimal', 'Deficient', 'Inefficient']
    },
    skillsBackup: ['Kotlin', 'Java', 'Android SDK', 'Jetpack Compose', 'Git & GitHub', 'REST APIs', 'SQL Database', 'Firebase integration'],
    objectiveUpgrades: [
        'Seeking to leverage robust software development expertise within a high-growth tech architecture context.',
        'Driven engineer aiming to innovate and deploy resilient technical solutions aligned with enterprise benchmarks.'
    ],
    educationBlueprints: [
        "Highest Education: BCA - CGC Jhanjheri (Current CGPA: 8.07) [2022-2025]\nSenior Secondary: 12th - CBSE Board (85%)\nSecondary School: 10th - CBSE Board (90%)",
        "Degree: B.Tech in Computer Science & Engineering [2021-2025]\nCGPA: 8.2 | Core Focus: Software Engineering & Data Structures\nHigh School Matrix: 12th Board (88%)"
    ]
};

// 🔮 LEVENSHTEIN DISTANCE ALGORITHM: Calculates string variance dynamically
function calculateLevenshteinDistance(str1, str2) {
    const track = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) track[0][i] = i;
    for (let j = 0; j <= str2.length; j += 1) track[j][0] = j;
    for (let j = 1; j <= str2.length; j += 1) {
        for (let i = 1; i <= str1.length; i += 1) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][1 - 1] + 1, 
                track[j - 1][i] + 1, 
                track[j - 1][i - 1] + indicator 
            );
        }
    }
    return track[str2.length][str1.length];
}

function universalInputScanner(fieldId, mentorId, statusId, suggestId, type) {
    const inputNode = document.getElementById(fieldId);
    const mentorBox = document.getElementById(mentorId);
    const statusBox = document.getElementById(statusId);
    const suggestBox = document.getElementById(suggestId);

    if (!inputNode || !mentorBox || !statusBox || !suggestBox) return;

    let textVal = inputNode.value.trim();
    let lowerText = textVal.toLowerCase();

    if (textVal.length === 0) {
        mentorBox.style.display = 'none';
        inputNode.classList.remove('input-error-glow');
        inputNode.setAttribute('data-penalty', '0');
        compileTotalGlobalPenalties();
        return;
    }

    let isInvalid = false;
    let warningMsg = "";
    let suggestionsHtml = "";
    let fieldPenalty = 0;

    // 🛑 1. ANTI-GIBBERISH RADAR ENGINE
    let gibberishRegex = /([a-z0-9])\1{3,}/i; 
    let spaceSpamArray = textVal.split(/[\s,.\n]+/);
    let isSpamWord = spaceSpamArray.some(word => word.length > 4 && !/[aeiouy]{1,}/i.test(word)); 

    if (gibberishRegex.test(lowerText) || (spaceSpamArray.length > 3 && isSpamWord) || ['asdf', 'dfg', 'qwer', 'zxcv', '12345'].some(v => lowerText.includes(v))) {
        isInvalid = true;
        fieldPenalty = 15; 
        warningMsg = "🚨 Junk / Dummy Text Detected! Kripya sahi professional info enter karein.";
        
        if (fieldId === 'res_education') {
            globalAtsVault.educationBlueprints.forEach((eduStr, idx) => {
                suggestionsHtml += `<button type="button" class="suggest-token-btn" style="text-align:left; display:block; margin-bottom:5px;" onclick="applyFullEducationBlueprint('${fieldId}', ${idx})">Inject Premium Education Format ${idx + 1}</button>`;
            });
        }
    } 
    // 🔍 2. DYNAMIC UNLIMITED SPELL CORRECTION SCANNER VIA FUZZY MATCHING
    else {
        let textWords = lowerText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(/\s+/);
        let activeTypoMatches = [];

        textWords.forEach(word => {
            if (word.length > 3 && !globalAtsVault.validDictionaryWords.includes(word)) {
                globalAtsVault.validDictionaryWords.forEach(validWord => {
                    let distance = calculateLevenshteinDistance(word, validWord);
                    // Match closely distorted items (Max 2 characters displacement, e.g., locactin -> location)
                    if (distance > 0 && distance <= 2) {
                        if (!activeTypoMatches.some(m => m.wrong === word)) {
                            activeTypoMatches.push({ wrong: word, right: validWord });
                        }
                    }
                });
            }
        });

        if (activeTypoMatches.length > 0) {
            isInvalid = true;
            fieldPenalty = activeTypoMatches.length * 3;
            warningMsg = "✍️ Typo / Spelling Mistake Detected: Sahi corporate keyword chun kar replace karein:";
            
            activeTypoMatches.forEach(match => {
                suggestionsHtml += `<button type="button" class="suggest-token-btn" style="border-color: #ffb700; color: #ffb700; background: rgba(255,183,0,0.05);" onclick="globalWordReplacer('${fieldId}', '${match.wrong}', '${match.right}')"><i class="fa-solid fa-wand-magic-sparkles"></i> Change "${match.wrong}" to [${match.right}]</button> `;
            });
        }
        // 🔍 3. NATIVE DESCRIPTIVE TEXT & VALIDATION PARSER LAYER
        else if (type === 'personal') {
            if (fieldId === 'res_email' && (!textVal.includes('@') || !textVal.includes('.'))) {
                isInvalid = true;
                fieldPenalty = 5;
                warningMsg = "📧 Invalid Email Pattern Structure: Matrix system requires valid domain formatting.";
            } else if (fieldId === 'res_phone' && (textVal.replace(/[\s+]/g, '').length < 10 || isNaN(textVal.replace(/[\s+]/g, '')))) {
                isInvalid = true;
                fieldPenalty = 5;
                warningMsg = "📞 Contact String Deficient: Phone numeric code requires complete global digits pattern.";
            }
        } 
        else if (type === 'skills') {
            let items = textVal.split(',').map(s => s.trim()).filter(s => s.length > 0);
            if (items.length < 3) {
                isInvalid = true;
                fieldPenalty = 8;
                warningMsg = "🛠️ Low Keyword Density Alert: Technical matrix requires minimum 3 core technologies.";
                globalAtsVault.skillsBackup.forEach(sk => {
                    if (!items.map(i => i.toLowerCase()).includes(sk.toLowerCase())) {
                        suggestionsHtml += `<button type="button" class="suggest-token-btn" onclick="addSuggestedSkill('${fieldId}', '${sk}')">+ Add ${sk}</button> `;
                    }
                });
            }
        } 
        else if (type === 'objective') {
            if (textVal.length < 25) {
                isInvalid = true;
                fieldPenalty = 7;
                warningMsg = "🎯 Profile Summary Short: Use premium high-impact pre-built frameworks below:";
                globalAtsVault.objectiveUpgrades.forEach((obj, idx) => {
                    suggestionsHtml += `<button type="button" class="suggest-token-btn" style="text-align:left; display:block; margin-bottom:5px;" onclick="applyFullObjective('${fieldId}', ${idx})">Inject Blueprint Template ${idx + 1}</button>`;
                });
            }
        } 
        else if (type === 'text-content') {
            let detectedBadWords = globalAtsVault.poorWords.filter(word => {
                let regex = new RegExp('\\b' + word + '\\b', 'g');
                return regex.test(lowerText);
            });

            if (detectedBadWords.length > 0) {
                isInvalid = true;
                fieldPenalty = detectedBadWords.length * 4;
                warningMsg = `❌ Ordinary English Elements Found (${detectedBadWords.join(', ')}). Upgrade using high-impact verbs:`;
                
                detectedBadWords.forEach(bad => {
                    let cleanKey = bad.toLowerCase();
                    let options = globalAtsVault.replacements[cleanKey];
                    if (options) {
                        options.forEach(good => {
                            suggestionsHtml += `<button type="button" class="suggest-token-btn" onclick="globalWordReplacer('${fieldId}', '${bad}', '${good}')">Sweep "${bad}" ➔ [${good}]</button> `;
                        });
                    }
                });
            }
        }
    }

    // 🏁 VISUAL COMPILATION BINDING
    if (isInvalid) {
        inputNode.classList.add('input-error-glow');
        mentorBox.style.display = 'block';
        mentorBox.classList.remove('optimized-active');
        mentorBox.classList.add('warning-active');
        statusBox.innerHTML = `<span style="color: #ff4a4a;"><i class="fa-solid fa-triangle-exclamation"></i> ${warningMsg}</span>`;
        suggestBox.innerHTML = suggestionsHtml;
        inputNode.setAttribute('data-penalty', fieldPenalty);
    } else {
        inputNode.classList.remove('input-error-glow');
        inputNode.setAttribute('data-penalty', '0');
        mentorBox.style.display = 'block';
        mentorBox.classList.remove('warning-active');
        mentorBox.classList.add('optimized-active');
        statusBox.innerHTML = `<span style="color: #00ff66;"><i class="fa-solid fa-circle-check"></i> ATS Parameter Synced: Verified enterprise structural benchmark standard.</span>`;
        suggestBox.innerHTML = "";
    }
    compileTotalGlobalPenalties();
}

function compileTotalGlobalPenalties() {
    let totalDeduction = 0;
    document.querySelectorAll('input, textarea').forEach(el => {
        let p = parseInt(el.getAttribute('data-penalty') || "0");
        totalDeduction += p;
    });
    globalAtsPenaltyScore = totalDeduction;
    calculateATSScore();
}

function globalWordReplacer(id, oldW, newW) {
    const input = document.getElementById(id);
    if (!input) return;
    playSystemSound(900, 'sine', 0.04);
    let regex = new RegExp('\\b' + oldW + '\\b', 'gi');
    input.value = input.value.replace(regex, newW);
    input.dispatchEvent(new Event('input'));
}

function addSuggestedSkill(id, skillName) {
    const input = document.getElementById(id);
    if (!input) return;
    playSystemSound(900, 'sine', 0.04);
    if (input.value.trim().length > 0) {
        input.value += ", " + skillName;
    } else {
        input.value = skillName;
    }
    input.dispatchEvent(new Event('input'));
}

function applyFullEducationBlueprint(id, index) {
    const textarea = document.getElementById(id);
    if (!textarea) return;
    playSystemSound(950, 'sine', 0.05);
    textarea.value = globalAtsVault.educationBlueprints[index];
    textarea.dispatchEvent(new Event('input'));
}

function applyFullObjective(id, blueprintIdx) {
    const input = document.getElementById(id);
    if (!input) return;
    playSystemSound(950, 'sine', 0.05);
    input.value = globalAtsVault.objectiveUpgrades[blueprintIdx];
    input.dispatchEvent(new Event('input'));
}

function bindDynamicAtsListeners() {
    setTimeout(() => {
        document.querySelectorAll('#personalDynamicContainer input').forEach(input => {
            input.removeEventListener('input', calculateATSScore);
            input.addEventListener('input', () => {
                universalInputScanner(input.id, 'mentor-personal', 'status-personal', 'suggest-personal', 'personal');
                calculateATSScore();
                if (typeof renderRealtimeLivePreviewDocumentCanvas === "function") renderRealtimeLivePreviewDocumentCanvas();
            });
        });
        document.querySelectorAll('#customSectionsDynamicArea textarea').forEach(txt => {
            txt.removeEventListener('input', calculateATSScore);
            txt.addEventListener('input', () => {
                universalInputScanner(txt.id, 'mentor-addmore', 'status-addmore', 'suggest-addmore', 'text-content');
                calculateATSScore();
                if (typeof renderRealtimeLivePreviewDocumentCanvas === "function") renderRealtimeLivePreviewDocumentCanvas();
            });
        });
    }, 150);
}

// Runtime Listener Triggers & Real-Time Canvas Render Hook Integration
document.addEventListener("DOMContentLoaded", () => {
    const activeFormNode = document.getElementById('wizardMasterForm') || document.querySelector('form');
    if (activeFormNode) {
        activeFormNode.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                calculateATSScore();
                if (typeof renderRealtimeLivePreviewDocumentCanvas === "function") {
                    renderRealtimeLivePreviewDocumentCanvas(); 
                }
            });
        });

        ['res_name', 'res_email', 'res_phone', 'res_address'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('input', () => universalInputScanner(id, 'mentor-personal', 'status-personal', 'suggest-personal', 'personal'));
        });

        const edu = document.getElementById('res_education');
        if (edu) edu.addEventListener('input', () => universalInputScanner('res_education', 'mentor-education', 'status-education', 'suggest-education', 'text-content'));

        const exp = document.getElementById('res_experience');
        if (exp) exp.addEventListener('input', () => universalInputScanner('res_experience', 'mentor-experience', 'status-experience', 'suggest-experience', 'text-content'));

        const sks = document.getElementById('res_skills');
        if (sks) sks.addEventListener('input', () => universalInputScanner('res_skills', 'mentor-skills', 'status-skills', 'suggest-skills', 'skills'));

        const obj = document.getElementById('res_objective');
        if (obj) obj.addEventListener('input', () => universalInputScanner('res_objective', 'mentor-objective', 'status-objective', 'suggest-objective', 'objective'));

        const ref = document.getElementById('res_reference');
        if (ref) ref.addEventListener('input', () => universalInputScanner('res_reference', 'mentor-reference', 'status-reference', 'suggest-reference', 'text-content'));

        const prj = document.getElementById('res_projects');
        if (prj) prj.addEventListener('input', () => universalInputScanner('res_projects', 'mentor-projects', 'status-projects', 'suggest-projects', 'text-content'));

        activeFormNode.addEventListener('change', (e) => {
            if (e.target.classList.contains('field-toggle') || e.target.classList.contains('sec-toggle')) {
                bindDynamicAtsListeners(); 
                setTimeout(() => {
                    calculateATSScore();
                    if (typeof renderRealtimeLivePreviewDocumentCanvas === "function") {
                        renderRealtimeLivePreviewDocumentCanvas();
                    }
                }, 100);
            }
        });
    }

    const fontSelector = document.getElementById('resumeFontSelector');
    const colorPicker = document.getElementById('resumeColorPicker');

    if (fontSelector) {
        fontSelector.addEventListener('change', () => {
            playSystemSound(600, 'sine', 0.05);
            if (typeof renderRealtimeLivePreviewDocumentCanvas === "function") {
                renderRealtimeLivePreviewDocumentCanvas(); 
            }
        });
    }

    if (colorPicker) {
        colorPicker.addEventListener('input', () => {
            if (typeof renderRealtimeLivePreviewDocumentCanvas === "function") {
                renderRealtimeLivePreviewDocumentCanvas(); 
            }
        });
        colorPicker.addEventListener('change', () => {
            playSystemSound(700, 'sine', 0.05);
        });
    }
    
    calculateATSScore();
    if (typeof renderRealtimeLivePreviewDocumentCanvas === "function") {
        renderRealtimeLivePreviewDocumentCanvas();
    }
});