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

// ---------- Project details (shown in the dialog when a card is clicked) ----------
const PROJECTS = {
    maizenex: {
        kind: 'Android app · Capstone project',
        title: 'MaizeNex: Corn Nutrient Deficiency Detector',
        role: 'Front-End Developer & UI/UX Designer · Team project',
        desc: 'An Android app that detects nitrogen, phosphorus, and potassium deficiencies from a photo of a corn leaf using an on-device TensorFlow Lite (MobileNetV3) model, then recommends matching fertilizers.',
        points: [
            'Designed and built 12 screens, including camera capture, results, a multi-sample field assessment with severity rating, scan history, weather, and a community feed',
            'Dark mode and English/Filipino language support',
            'Connected Firebase Auth, Firestore, and Storage, and sent weather requests through Cloud Functions so the API key never ships in the app',
            "Merged and tested teammates' feature branches over 8 integration rounds while keeping the build, tests, and lint passing"
        ],
        tags: ['Kotlin', 'XML', 'Firebase', 'TensorFlow Lite', 'CameraX', 'ML Kit', 'Android Studio'],
        showcase: true,
        note: 'Capstone code is private (team project).',
        links: []
    },
    curra: {
        kind: 'Full-stack web app',
        title: 'Curra: Personal Finance Tracker',
        role: 'Full-Stack Web Developer',
        desc: 'Log income and expenses, track savings goals, and set daily spending budgets.',
        points: [
            'Responsive Chart.js dashboards, PDF reports, CSV import/export, live exchange rates, notifications, and a light/dark theme',
            'Designed the Supabase (PostgreSQL) database with Row Level Security so each user sees only their own records',
            'Savings goals that can be shared across groups of users'
        ],
        tags: ['HTML5/CSS3', 'JavaScript', 'Bootstrap', 'Chart.js', 'Supabase', 'PostgreSQL'],
        gallery: [
            { src: 'img/projects/curra-dashboard.webp', caption: 'Dashboard: savings, monthly income and expenses, and a savings vs expenses chart', alt: 'Curra dashboard with savings, expenses, and income cards and a savings vs expenses chart' },
            { src: 'img/projects/curra-savings.webp', caption: 'Savings: add or take out money and see how savings grew', alt: 'Curra savings page with an add-to-savings form and a growth chart' },
            { src: 'img/projects/curra-expenses.webp', caption: 'Daily expense tracker with categories and a daily receipt', alt: 'Curra daily expense tracker with a week strip, expense form, and receipt' },
            { src: 'img/projects/curra-login.webp', caption: 'Login page', alt: 'Curra login page' }
        ],
        links: [{ label: 'Live site', href: 'https://she1028.github.io/Curra/', icon: 'box-arrow-up-right' }]
    },
    ymzm: {
        kind: 'Catering booking site',
        title: 'YMZM Catering & Event Rentals',
        role: 'Front-End Developer & UI/UX Designer',
        desc: 'The responsive front end of a catering booking and event rental website.',
        points: [
            'Built the landing page, catering packages, food menu, rentals catalog, and sign-in/sign-up pages',
            'Designed the booking flow, from choosing and customizing a package to requesting a quote and confirming a reservation',
            'Automatic email confirmations and quotations for customers, plus an admin side where the catering head approves and manages bookings'
        ],
        tags: ['PHP', 'CSS3', 'JavaScript', 'Bootstrap', 'Email Integration', 'MySQL'],
        gallery: [
            { src: 'img/projects/ymzm-home.webp', caption: 'Homepage: catering and event rentals', alt: 'YMZM Catering homepage with the headline Good food, beautifully served' },
            { src: 'img/projects/ymzm-menu.webp', caption: 'Food menu highlights', alt: 'YMZM food menu section with Chicken Adobo, Garlic Butter Shrimp, Lumpiang Sariwa, and Onion Rings' },
            { src: 'img/projects/ymzm-rentals.webp', caption: 'Event rentals by category', alt: 'YMZM rentals section with tenting, chairs, tableware, and decorations' }
        ],
        links: [{ label: 'View code', href: 'https://github.com/she1028/YMZM', icon: 'github' }]
    },
    elnido: {
        kind: 'Travel website',
        title: 'El Nido, Palawan',
        role: 'Designer & Developer',
        desc: 'A travel site for El Nido with a photo gallery, tour packages you can filter by tour type, guides to the top spots, and an embedded Google Map.',
        points: [],
        tags: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
        img: 'img/projects/elnido.jpg', alt: 'El Nido website hero',
        links: [
            { label: 'Live site', href: 'https://she1028.github.io/ElNido/', icon: 'box-arrow-up-right' },
            { label: 'View code', href: 'https://github.com/she1028/ElNido', icon: 'github' }
        ]
    },
    recimeals: {
        kind: 'Recipe website',
        title: 'ReciMeals',
        role: 'Designer & Developer',
        desc: 'A recipe website with breakfast, lunch and dinner, and dessert categories, a recipe search page, and pages for each recipe.',
        points: [],
        tags: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'API Integration'],
        img: 'img/projects/recimeals.jpg', alt: 'ReciMeals website hero',
        links: [
            { label: 'Live site', href: 'https://she1028.github.io/ReciMeals/', icon: 'box-arrow-up-right' },
            { label: 'View code', href: 'https://github.com/she1028/ReciMeals', icon: 'github' }
        ]
    },
    renaissance: {
        kind: 'Early project',
        title: 'Renaissance Gallery',
        role: 'Designer & Developer',
        desc: 'An art gallery site showcasing Renaissance paintings and sculptures, with artwork details loaded from a JavaScript data file.',
        points: [],
        tags: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
        img: 'img/projects/renaissance.jpg', alt: 'Renaissance Gallery hero',
        links: [
            { label: 'Live site', href: 'https://she1028.github.io/Renaissance_Gallery/', icon: 'box-arrow-up-right' },
            { label: 'View code', href: 'https://github.com/she1028/Renaissance_Gallery', icon: 'github' }
        ]
    },
    ipad: {
        kind: 'Early project',
        title: 'iPad Air Product Page',
        role: 'Designer & Developer',
        desc: "A product landing page in the style of Apple's iPad Air page, with a hero video, feature sections, and tech specs.",
        points: [],
        tags: ['HTML', 'CSS', 'Bootstrap'],
        img: 'img/projects/ipad-air.jpg', alt: 'iPad Air product page hero',
        links: [
            { label: 'Live site', href: 'https://she1028.github.io/Apple_iPad_Air/', icon: 'box-arrow-up-right' },
            { label: 'View code', href: 'https://github.com/she1028/Apple_iPad_Air', icon: 'github' }
        ]
    },
    calculator: {
        kind: 'Early project',
        title: 'Calculator',
        role: 'Designer & Developer',
        desc: 'A working calculator with basic operations, percent, delete, clear, and a calculation history.',
        points: [],
        tags: ['HTML', 'CSS', 'JavaScript'],
        img: 'img/projects/calculator.jpg', alt: 'Calculator app',
        links: [
            { label: 'Live site', href: 'https://she1028.github.io/Calculator/', icon: 'box-arrow-up-right' },
            { label: 'View code', href: 'https://github.com/she1028/Calculator', icon: 'github' }
        ]
    }
};

const projectDialog = document.getElementById('projectDialog');
if (projectDialog) {
    const q = sel => projectDialog.querySelector(sel);
    const el = (tag, cls, text) => {
        const node = document.createElement(tag);
        if (cls) node.className = cls;
        if (text) node.textContent = text;
        return node;
    };

    // Screenshot gallery: arrows and dots step through a project's screenshots
    let gallery = [];
    let galleryIndex = 0;
    const galleryImg = q('.pd-gallery-img');
    const dots = q('.pd-dots');

    function showShot(index) {
        galleryIndex = (index + gallery.length) % gallery.length;
        const shot = gallery[galleryIndex];
        galleryImg.src = shot.src;
        galleryImg.alt = shot.alt;
        // Restart the fade each time the picture changes
        galleryImg.style.animation = 'none';
        void galleryImg.offsetWidth;
        galleryImg.style.animation = '';
        q('.pd-caption').textContent = shot.caption;
        [...dots.children].forEach((dot, i) => {
            dot.classList.toggle('is-active', i === galleryIndex);
            dot.setAttribute('aria-selected', i === galleryIndex ? 'true' : 'false');
        });
    }

    function setGallery(shots) {
        gallery = shots;
        dots.replaceChildren(...shots.map((shot, i) => {
            const dot = el('button');
            dot.type = 'button';
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', 'Screenshot ' + (i + 1) + ': ' + shot.caption);
            dot.addEventListener('click', () => showShot(i));
            return dot;
        }));
        const single = shots.length < 2;
        q('.pd-prev').hidden = single;
        q('.pd-next').hidden = single;
        dots.hidden = single;
        showShot(0);
    }

    q('.pd-prev').addEventListener('click', () => showShot(galleryIndex - 1));
    q('.pd-next').addEventListener('click', () => showShot(galleryIndex + 1));
    q('.pd-gallery').addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); showShot(galleryIndex + 1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); showShot(galleryIndex - 1); }
    });
    // Swipe on touch screens
    let galleryTouchX = null;
    q('.pd-gallery').addEventListener('touchstart', (e) => { galleryTouchX = e.touches[0].clientX; }, { passive: true });
    q('.pd-gallery').addEventListener('touchend', (e) => {
        if (galleryTouchX === null) return;
        const dx = e.changedTouches[0].clientX - galleryTouchX;
        if (Math.abs(dx) > 40) showShot(galleryIndex + (dx < 0 ? 1 : -1));
        galleryTouchX = null;
    });

    function openProject(id) {
        const p = PROJECTS[id];
        if (!p) return;
        q('.pd-kind').textContent = p.kind;
        q('.pd-title').textContent = p.title;
        q('.pd-role').textContent = p.role;
        q('.pd-desc').textContent = p.desc;

        const points = q('.pd-points');
        points.replaceChildren(...p.points.map(text => {
            const li = el('li');
            li.append(el('i', 'bi bi-check2'), el('span', '', text));
            return li;
        }));
        points.hidden = p.points.length === 0;

        q('.pd-tags').replaceChildren(...p.tags.map(t => el('span', 'tag', t)));

        const links = q('.pd-links');
        links.replaceChildren(...p.links.map(l => {
            const a = el('a');
            a.href = l.href;
            a.target = '_blank';
            a.rel = 'noopener';
            a.append(el('i', 'bi bi-' + l.icon), document.createTextNode(l.label));
            return a;
        }));
        if (p.note) links.append(el('span', 'pd-note', p.note));

        // MaizeNex shows the phone slideshow, projects with several screenshots
        // show the gallery, and the rest show a single screenshot
        const img = q('.pd-img');
        const hasGallery = !!(p.gallery && p.gallery.length);
        q('.phone-showcase').hidden = !p.showcase;
        q('.pd-gallery').hidden = !hasGallery;
        img.hidden = !!p.showcase || hasGallery;
        if (hasGallery) {
            setGallery(p.gallery);
        } else if (!p.showcase) {
            img.src = p.img;
            img.alt = p.alt;
        }

        projectDialog.showModal();
        projectDialog.scrollTop = 0;
        if (p.showcase) document.dispatchEvent(new CustomEvent('showcase:open'));
    }

    document.querySelectorAll('.bento-hit').forEach(btn => {
        btn.addEventListener('click', () => openProject(btn.dataset.open));
    });
    q('.pd-close').addEventListener('click', () => projectDialog.close());
    // Clicking the dark backdrop (outside the panel) closes it
    projectDialog.addEventListener('click', (e) => {
        if (e.target === projectDialog) projectDialog.close();
    });
}

// ---------- Websites reel: "Spin the reel" swaps the front screenshot ----------
const reelCard = document.querySelector('.reel-card-wrap');
if (reelCard) {
    const items = [...reelCard.querySelectorAll('.reel-item')];
    const hit = reelCard.querySelector('.bento-hit');
    const nameEl = reelCard.querySelector('.reel-name');
    let front = 0;
    const reel = reelCard.querySelector('.reel');
    reelCard.querySelector('.reel-spin').addEventListener('click', (e) => {
        e.stopPropagation();
        // Replay the toss animation on every click
        reel.classList.remove('is-spinning');
        void reel.offsetWidth;
        reel.classList.add('is-spinning');
        front = (front + 1) % items.length;
        items.forEach((item, i) => item.classList.toggle('is-front', i === front));
        const { id, name } = items[front].dataset;
        nameEl.textContent = name;
        hit.dataset.open = id;
        hit.setAttribute('aria-label', 'Open ' + name + ' details');
    });
}

// ---------- Fade-in on scroll ----------
// Elements fade and slide up when they enter the screen. Items that appear
// together (e.g. a row of cards) come in one after another.
const revealGroups = [
    { selector: '.hero-container1 > *', from: 'up' },
    { selector: '.hero-photo-wrap', from: 'right' },
    { selector: '.section .eyebrow, .section .section-title', from: 'up' },
    { selector: '#about .lead-text, .fact-card', from: 'up' },
    { selector: '.stat-card', from: 'up' },
    { selector: '.skill-card, .learning-note', from: 'up' },
    { selector: '#projects .lead-text, .bento-card', from: 'up' },
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

// ---------- Border Glow on skill cards ----------
// Tracks how close the mouse is to a card's edge (0 = center, 100 = edge)
// and which direction it's in, so the CSS can light up that part of the border.
document.querySelectorAll('.skill-card').forEach(card => {
    card.classList.add('border-glow-card');

    // Outer glow layer, plus a wrapper that keeps the content above the glow
    const inner = document.createElement('div');
    inner.className = 'border-glow-inner';
    inner.append(...card.childNodes);
    const light = document.createElement('span');
    light.className = 'edge-light';
    card.append(light, inner);

    card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dx = e.clientX - rect.left - cx;
        const dy = e.clientY - rect.top - cy;

        // Edge proximity: 1 when the pointer touches the nearest edge
        const kx = dx !== 0 ? cx / Math.abs(dx) : Infinity;
        const ky = dy !== 0 ? cy / Math.abs(dy) : Infinity;
        const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);

        // Angle of the pointer around the card's center (0deg = top)
        let angle = 0;
        if (dx !== 0 || dy !== 0) {
            angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
            if (angle < 0) angle += 360;
        }

        card.style.setProperty('--edge-proximity', (edge * 100).toFixed(3));
        card.style.setProperty('--cursor-angle', angle.toFixed(3) + 'deg');
    });
});

// ---------- Count-up stats ----------
// Each number counts up from 0 when its card scrolls into view. Cards with
// data-count-from count the matching elements on the page, so the numbers
// stay correct when projects, skills, or certificates are added.
const statEls = document.querySelectorAll('.stat-count');
statEls.forEach(el => {
    const selector = el.dataset.countFrom;
    if (selector === 'projects-data') {
        // One entry per project in PROJECTS above
        el.textContent = Object.keys(PROJECTS).length;
    } else if (selector) {
        const found = document.querySelectorAll(selector);
        // Ignore duplicate skill names (e.g. "Git" listed twice)
        const unique = new Set([...found].map(n => n.textContent.trim().toLowerCase()));
        el.textContent = selector.includes('.chip') ? unique.size : found.length;
    }
    el.dataset.target = el.textContent.trim();
});

function countUp(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1400;
    const start = performance.now();
    function step(now) {
        // Clamp to 0..1: the first frame's timestamp can be slightly before `start`
        const t = Math.min(Math.max((now - start) / duration, 0), 1);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out: fast start, gentle finish
        el.textContent = Math.round(eased * target);
        if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

if (!reduceMotion && 'IntersectionObserver' in window) {
    statEls.forEach(el => { el.textContent = '0'; });
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            countUp(entry.target);
            statObserver.unobserve(entry.target);
        });
    }, { threshold: 0.6 });
    statEls.forEach(el => statObserver.observe(el));
}

// ---------- MaizeNex phone showcase ----------
// Cycles through app screens. Tabs, arrows, swipe, and arrow keys switch
// screens; autoplay pauses on hover/focus and when the card is off screen.
const showcase = document.querySelector('.phone-showcase');
if (showcase) {
    const screens = [...showcase.querySelectorAll('.app-screen')];
    const tabs = [...showcase.querySelectorAll('.screen-tabs button')];
    const caption = showcase.querySelector('.screen-caption');
    const SLIDE_MS = 4000;
    showcase.style.setProperty('--slide-ms', SLIDE_MS + 'ms');
    let current = 0;
    let timer = null;
    let hovering = false;
    let onScreen = false;

    function show(index) {
        current = (index + screens.length) % screens.length;
        screens.forEach((img, i) => img.classList.toggle('is-active', i === current));
        tabs.forEach((tab, i) => {
            tab.classList.toggle('is-active', i === current);
            tab.setAttribute('aria-selected', i === current ? 'true' : 'false');
        });
        caption.textContent = screens[current].dataset.caption;
        restartTimer();
    }

    function stopTimer() {
        clearTimeout(timer);
        timer = null;
        showcase.classList.remove('is-playing');
    }

    function restartTimer() {
        stopTimer();
        if (reduceMotion || hovering || !onScreen || document.hidden) return;
        // Re-trigger the tab progress animation from the start
        void showcase.offsetWidth;
        showcase.classList.add('is-playing');
        timer = setTimeout(() => show(current + 1), SLIDE_MS);
    }

    tabs.forEach((tab, i) => tab.addEventListener('click', () => show(i)));
    showcase.querySelector('.prev').addEventListener('click', () => show(current - 1));
    showcase.querySelector('.next').addEventListener('click', () => show(current + 1));

    showcase.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
    });

    // Swipe on touch screens
    let touchX = null;
    showcase.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    showcase.addEventListener('touchend', (e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
        touchX = null;
    });

    // Pause while the visitor is looking closely or using the controls
    showcase.addEventListener('mouseenter', () => { hovering = true; stopTimer(); });
    showcase.addEventListener('mouseleave', () => { hovering = false; restartTimer(); });
    showcase.addEventListener('focusin', () => { hovering = true; stopTimer(); });
    showcase.addEventListener('focusout', (e) => {
        if (!showcase.contains(e.relatedTarget)) { hovering = false; restartTimer(); }
    });
    document.addEventListener('visibilitychange', restartTimer);

    // Start from the first screen each time the MaizeNex details open; stop when closed
    document.addEventListener('showcase:open', () => { onScreen = true; hovering = false; show(0); });
    const dialog = showcase.closest('dialog');
    if (dialog) dialog.addEventListener('close', () => { onScreen = false; stopTimer(); });

    // Only autoplay while the showcase is on screen
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(([entry]) => {
            onScreen = entry.isIntersecting;
            restartTimer();
        }, { threshold: 0.4 }).observe(showcase);
    } else {
        onScreen = true;
        restartTimer();
    }
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
