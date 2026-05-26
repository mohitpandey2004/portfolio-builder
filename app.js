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
// Pure navigation links ko strict capture karna (Class aur Attribute matching)
const navLinks = document.querySelectorAll('.navbar a, .logo, .btn-box');
const sections = document.querySelectorAll('.content-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetSectionId = link.getAttribute('data-target');

        if (targetSectionId) {
            e.preventDefault();

            // Step B: Navbar ke saare links se active state highlight hatana
            document.querySelectorAll('.navbar a').forEach(navLink => {
                navLink.classList.remove('active');
            });

            // Step C: Sahi link ko active state color dena
            const matchingNavbarLink = document.querySelector(`.navbar a[data-target="${targetSectionId}"]`);
            if (matchingNavbarLink) {
                matchingNavbarLink.classList.add('active');
            }

            // Step D: Saare sections ko hide karna aur sirf active wale ko show karna
            sections.forEach(section => {
                section.classList.remove('active');
                
                // Mobile layout bug fix tracking block
                if (window.innerWidth <= 768) {
                    section.style.display = 'none'; 
                }

                if (section.id === targetSectionId) {
                    section.classList.add('active');
                    
                    // Mobile structure hardware mapping update
                    if (window.innerWidth <= 768) {
                        section.style.display = 'block';
                    }
                    
                    // Desktop internal container scroll reset
                    section.scrollTop = 0;
                }
            });

            // Step E: 🔥 MOBILE ENGINE FORCE RESET (Black Screen aur Ghost Page Killer)
            // Hardware layout ko force jump karwana taaki section zero coordinate se hi khule
            if (window.innerWidth <= 768) {
                window.scrollTo(0, 0);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        }
    });
});