// script.js

// --- Custom Cursor ---
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
const interactiveElements = document.querySelectorAll('a, button, .tilt-card, .profile-wrapper, .hamburger, .social-icon, .tech-icons i, .skill-tag');

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot && cursorOutline) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 300, fill: "forwards" });
    }
});

interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
        if (cursorOutline) cursorOutline.classList.add("cursor-hover");
        if (cursorDot) cursorDot.style.opacity = "0";
    });
    el.addEventListener("mouseleave", () => {
        if (cursorOutline) cursorOutline.classList.remove("cursor-hover");
        if (cursorDot) cursorDot.style.opacity = "1";
    });
});

document.addEventListener("mouseleave", () => {
    if (cursorDot) cursorDot.style.opacity = "0";
    if (cursorOutline) cursorOutline.style.opacity = "0";
});
document.addEventListener("mouseenter", () => {
    if (cursorDot) cursorDot.style.opacity = "1";
    if (cursorOutline) cursorOutline.style.opacity = "1";
});


// --- Typeswriter Effect ---
const typingText = document.querySelector('.typing-text');
const words = ["performant React apps.", "scalable UI systems.", "seamless experiences.", "pixel-perfect designs."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function type() {
    if (!typingText) return;
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 30;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1500); // Initial delay
});


// --- Mobile Navigation ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}


// --- Scroll Visibility Animations (Intersection Observer) ---
const fadeUpElements = document.querySelectorAll('.fade-up');

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const appearanceObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
    });
}, observerOptions);

fadeUpElements.forEach(el => appearanceObserver.observe(el));


// --- Navbar Scroll Effect ---
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (!navbar) return;

    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (scrollTop > lastScrollTop && scrollTop > 200) {
        // Scroll Down - Hide Navbar
        navbar.classList.add('scroll-down');
    } else {
        // Scroll Up - Show Navbar
        navbar.classList.remove('scroll-down');
    }

    lastScrollTop = scrollTop;
});

window.dispatchEvent(new Event('scroll'));

// --- Vanilla Tilt Initialization (Desktop Only) ---
if (window.innerWidth > 768 && typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
        scale: 1.02
    });

    VanillaTilt.init(document.querySelector(".tilt-box"), {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.03
    });
}
