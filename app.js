// ==================== 1. TYPED.JS INTERFACE ====================
// Ye aapka pehle wala code hai jo landing page par skills ko animate karega
var typed = new Typed(".text", {
    strings: ["Frontend Developer", "Web Developer", "Android Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


// ==================== 2. SINGLE PAGE TAB SWITCHING LOGIC ====================
// Ye logic click karne par baaki saare sections ko hide karega aur sirf target section ko samne layega
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Step A: Kis section par jana hai, uski 'data-target' value nikalna
        const targetSectionId = link.getAttribute('data-target');

        // Step B: Saare sections se 'active' class hatana taaki wo chhup (hide) jayein
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Step C: Sirf click kiye huye section ko active karke screen par laana
        const activeSection = document.getElementById(targetSectionId);
        if (activeSection) {
            activeSection.className = "content-section active";
        }

        // Step D: Navbar ke saare links se 'active' text color/style hatana
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
        });
        
        // Step E: Agar header ke navbar wala link click hua hai, ya fir home ka 'More About Me' button click hua hai,
        // dono hi case mein upar navbar mein sahi button blue/cyan color ka active ho jayega.
        const matchingNavbarLink = document.querySelector(`.navbar a[data-target="${targetSectionId}"]`);
        if (matchingNavbarLink) {
            matchingNavbarLink.classList.add('active');
        }
    });
});