 // Animate skill bars once they scroll into view
        const bars = document.querySelectorAll('.skill-row');
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const row = entry.target;
                    const pct = row.dataset.pct;
                    row.querySelector('.progress-bar').style.width = pct + '%';
                    io.unobserve(row);
                }
            });
        }, { threshold: 0.4 });
        bars.forEach(row => io.observe(row));

        // Project pagination dots (cosmetic active-state toggle)
        document.querySelectorAll('#dotsNav button').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#dotsNav button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Highlight active nav link on scroll
        const sections = ['home', 'about', 'skills', 'projects', 'contact'].map(id => document.getElementById(id));
        const navLinks = document.querySelectorAll('.nav-link');
        window.addEventListener('scroll', () => {
            let current = sections[0].id;
            sections.forEach(sec => {
                if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
            });
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + current);
            });
        });