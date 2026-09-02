// =====================================================
// CANVA DESIGN PORTFOLIO — script.js
// =====================================================

// ── Navbar: scroll hide / show + scrolled style ──
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (!navbar) return;
    navbar.classList.toggle('scrolled', y > 40);
});

// ── Mobile hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const navPills  = document.querySelectorAll('.nav-pill');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        hamburger.classList.toggle('active', open);
        hamburger.setAttribute('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });

    navPills.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}

// ── Scroll-reveal (fade-up) ──
const fadeEls = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .zoom-in');

const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => revealObserver.observe(el));

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navPills.forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`.nav-pill[href="#${entry.target.id}"]`);
            // Exclude the 'Hire Me' button from getting the normal active style
            if (activeLink && !activeLink.classList.contains('nav-pill-btn')) {
                activeLink.classList.add('active');
            }
        }
    });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

// ── Lightbox Logic ──
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

window.openLightbox = function(src) {
    if(!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

if(lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    });
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

// ── Vanilla Tilt on project cards (desktop only) ──
if (window.innerWidth > 768 && typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.project-card'), {
        max: 3,
        speed: 500,
        glare: false,
        scale: 1.01
    });
}
