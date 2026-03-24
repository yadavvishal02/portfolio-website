console.log('Portfolio | Vishal Yadav');

// =============================================
// TYPED.JS — Hero typing animation
// =============================================
var typed = new Typed('#element', {
    strings: ['AI/ML Developer','Web Developer','Freelancer'],
    typeSpeed: 60,
    loop: true,
    backSpeed: 25,
    backDelay: 1200,
});

// =============================================
// HAMBURGER MENU
// =============================================
let bars = document.getElementById('menu');
let nav = document.querySelector('.navbar');

bars.addEventListener('click', () => {
    nav.classList.toggle('nav-toggle');
    bars.classList.toggle('fa-times');
});

// =============================================
// NAVBAR SMOOTH SCROLL + CLOSE MENU ON CLICK
// =============================================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }
        // Close mobile menu
        nav.classList.remove('nav-toggle');
        bars.classList.remove('fa-times');
    });
});


document.querySelectorAll('.footer a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// =============================================
// ACTIVE NAV LINK ON SCROLL
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let currentSection = '';
    const scrollY = window.pageYOffset;
    const headerH = document.querySelector('.header').offsetHeight + 10;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerH;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// =============================================
// SCROLL REVEAL ANIMATION
// =============================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
        // Keep shown once revealed (remove else for one-way reveal)
    });
}, { threshold: 0.1 });

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// =============================================
// DARK / LIGHT THEME TOGGLE
// =============================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlEl = document.documentElement;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';

    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    updateThemeIcon(next);

    // Small scale animation on toggle
    themeToggle.style.transform = 'scale(0.85)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 200);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeToggle.title = 'Switch to Light Mode';
    } else {
        themeIcon.className = 'fas fa-moon';
        themeToggle.title = 'Switch to Dark Mode';
    }
}

// =============================================
// GSAP — Header entrance animation
// =============================================
if (typeof gsap !== 'undefined') {
    gsap.from('.header', { duration: 0.8, y: '-100%', ease: 'power2.out' });
    gsap.from('.home .content', { duration: 1, x: '-60px', opacity: 0, ease: 'power2.out', delay: 0.3 });
    gsap.from('.home .image img', { duration: 1, x: '60px', opacity: 0, ease: 'power2.out', delay: 0.5 });
}