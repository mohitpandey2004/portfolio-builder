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
const navLinks = document.querySelectorAll('.nav-link, .logo, .btn-box');
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

            // Step D: Saare sections ko badalna aur internal scroll reset karna
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSectionId) {
                    section.classList.add('active');
                    
                    // Desktop internal container scroll ko zero karna
                    section.scrollTop = 0;
                }
            });

            // Step E: 🔥 MOBILE ENGINE FORCE RESET (Black Screen Ka Pakka Ilaaj)
            // Phone par instant reset zaroori hai taaki browser bina glitch ke content top par dikhaye
            if (window.innerWidth <= 768) {
                window.scrollTo(0, 0);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        }
    });
});