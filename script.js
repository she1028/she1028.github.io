// Highlight the active nav link while scrolling
const sections = ['home', 'about', 'skills', 'projects', 'journey', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = sections[0].id;
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    // At the very bottom, the last section is active even if it's short
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = sections[sections.length - 1].id;
    }
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// Close the mobile menu after tapping a link
const navMenu = document.getElementById('navMenu');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('show')) {
            bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
        }
    });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Fade-in on scroll ----------
// Elements fade and slide up when they enter the screen. Items that appear
// together (e.g. a row of cards) come in one after another.
const revealGroups = [
    { selector: '.hero-container1 > *', from: 'up' },
    { selector: '.hero-photo-wrap', from: 'right' },
    { selector: '.section .eyebrow, .section .section-title', from: 'up' },
    { selector: '#about .lead-text, .fact-card', from: 'up' },
    { selector: '.skill-card, .learning-note', from: 'up' },
    { selector: '.project-card', from: 'up' },
    { selector: '#projects .btn-outline-soft', from: 'up' },
    { selector: '.timeline-item', from: 'left' },
    { selector: '#contact .lead-text, #contact .d-flex, .quote-card, .social-row, #contact .small', from: 'up' },
];

if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealEls = [];
    revealGroups.forEach(({ selector, from }) => {
        document.querySelectorAll(selector).forEach(el => {
            if (el.classList.contains('reveal')) return;
            el.classList.add('reveal', 'reveal-' + from);
            revealEls.push(el);
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        // Stagger the elements that became visible in the same moment, top-left first
        const visible = entries
            .filter(e => e.isIntersecting)
            .map(e => e.target)
            .sort((a, b) => {
                const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
                return (ra.top - rb.top) || (ra.left - rb.left);
            });

        visible.forEach((el, i) => {
            const delay = Math.min(i * 90, 600);
            revealObserver.unobserve(el);
            el.style.transitionDelay = delay + 'ms';
            // Make sure the browser has registered the hidden state before showing it,
            // so even elements on screen at page load fade in instead of popping in
            void el.offsetWidth;
            el.classList.add('is-visible');

            // After the fade, remove the reveal styles so hover effects work normally
            setTimeout(() => {
                el.classList.remove('reveal', 'reveal-up', 'reveal-left', 'reveal-right', 'is-visible');
                el.style.transitionDelay = '';
            }, delay + 1000);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
} else {
    // No animation: make sure nothing stays hidden
    document.documentElement.classList.remove('js');
}

// ---------- Typing roles in the hero ----------
const typedEl = document.querySelector('.typed');
if (typedEl && !reduceMotion) {
    const roles = typedEl.dataset.roles.split('|');
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = true;
    typedEl.textContent = roles[0];

    function tick() {
        const role = roles[roleIndex];
        if (deleting) {
            charIndex--;
            typedEl.textContent = role.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                return setTimeout(tick, 350);
            }
            return setTimeout(tick, 40);
        }
        const next = roles[roleIndex];
        charIndex++;
        typedEl.textContent = next.slice(0, charIndex);
        if (charIndex === next.length) {
            deleting = true;
            return setTimeout(tick, 2200); // pause on the full word
        }
        setTimeout(tick, 75);
    }
    setTimeout(tick, 2600); // let the first role sit after the page loads
}

// Cursor glow (mouse only)
const cursorGlow = document.querySelector('.cursor-glow');
if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (event) => {
        cursorGlow.style.left = event.clientX + 'px';
        cursorGlow.style.top = event.clientY + 'px';
    });
} else {
    cursorGlow.style.display = 'none';
}
