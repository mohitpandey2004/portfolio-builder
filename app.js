// ==================== 1. TYPED.JS INTERFACE ====================
// Landing page par dynamic text auto-typing loop trigger configuration
var typed = new Typed(".text", {
    strings: ["Frontend Developer", "Web Developer", "Android Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// ==================== 2. SINGLE PAGE TAB SWITCHING LOGIC ====================
// Target links aur master content wrappers ko catch karna
// Maine isme '.logo' aur '.btn-box' ko bhi target kar diya hai taaki unpe click hone pe bhi page change ho!
const navLinks = document.querySelectorAll('.nav-link, .logo, .btn-box');
const sections = document.querySelectorAll('.content-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Step A: Page reload toggle settings block karna
        const targetSectionId = link.getAttribute('data-target');

        if (targetSectionId) {
            e.preventDefault();

            // Step B: Navbar ke saare links se active highlighted classes hatana
            document.querySelectorAll('.navbar a').forEach(navLink => {
                navLink.classList.remove('active');
            });

            // Step C: Upar navbar mein sahi button ko active (Blue/Cyan neon) highlight dena
            const matchingNavbarLink = document.querySelector(`.navbar a[data-target="${targetSectionId}"]`);
            if (matchingNavbarLink) {
                matchingNavbarLink.classList.add('active');
            }

            // Step D: Saare absolute wrappers ko band karke sirf targeted element ko active karna
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSectionId) {
                    section.classList.add('active');
                    
                    // Desktop internal section scroll bar reset configuration
                    section.scrollTop = 0;
                }
            });

            // Step E: 🔥 MOBILE ENGINE CORE PATCH (Sabse Zaroori)
            // Agar smartphone view chal raha hai, toh naya section khulte hi screen automatic 
            // ekdum top par smooth scroll ho jayegi, jisse black screen ya missing content bilkul nahi hoga!
            if (window.innerWidth <= 768) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    });
});