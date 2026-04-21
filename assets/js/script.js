'use strict';

(function () {

    // ── Constants ─────────────────────────────────────────────────────────────
    const TYPING_DELAY          = 100;
    const ERASE_DELAY           = 50;
    const NEW_TEXT_DELAY        = 2000;
    const NAV_SCROLL_THRESHOLD  = 50;
    const SCROLL_OFFSET         = 70;
    const BACK_TO_TOP_THRESHOLD = 500;
    const STORAGE_KEYS          = { THEME: 'theme', LANGUAGE: 'language' };

    // ── State ─────────────────────────────────────────────────────────────────
    let currentTheme    = localStorage.getItem(STORAGE_KEYS.THEME)    || 'dark';
    let currentLang     = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'de';
    let textArray       = [];
    let textArrayIndex  = 0;
    let charIndex       = 0;
    let typingTimeout   = null;
    let typedTextSpan   = null;
    let cursorSpan      = null;

    // ── Utilities ─────────────────────────────────────────────────────────────
    function q(sel, scope)    { return (scope || document).querySelector(sel); }
    function qa(sel, scope)   { return (scope || document).querySelectorAll(sel); }
    function setText(el, val) { if (el && val !== undefined) el.textContent = val; }
    function setHTML(el, val) { if (el && val !== undefined) el.innerHTML = val; }

    function debounce(fn, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // ── Theme ─────────────────────────────────────────────────────────────────
    function setTheme(theme) {
        currentTheme = theme;
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
        document.body.classList.toggle('light-mode', theme === 'light');
        qa('.theme-btn').forEach(btn =>
            btn.classList.toggle('active', btn.dataset.theme === theme)
        );
    }

    // ── Language ──────────────────────────────────────────────────────────────
    function setLanguage(lang) {
        try {
            if (typeof translations === 'undefined' || !translations[lang]) return;
            currentLang = lang;
            localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
            const t = translations[lang];

            // Navigation
            qa('.nav-link').forEach((link, i) => {
                const keys = Object.keys(t.nav);
                if (keys[i]) link.textContent = t.nav[keys[i]];
            });

            // Hero
            setText(q('.greeting'), t.hero.greeting);
            setText(q('.hero-description'), t.hero.description);
            setHTML(q('.btn-primary'), `<i class="fas fa-envelope" aria-hidden="true"></i> ${t.hero.getInTouch}`);
            setHTML(q('.btn-secondary'), `<i class="fas fa-download" aria-hidden="true"></i> ${t.hero.downloadCV}`);
            textArray.length = 0;
            textArray.push(...t.hero.roles);

            // About
            setText(q('#about .section-title'), t.about.title);
            setText(q('#about .section-subtitle'), t.about.subtitle);
            qa('.stat-label').forEach((label, i) => {
                const keys = Object.keys(t.about.stats);
                if (keys[i]) label.textContent = t.about.stats[keys[i]];
            });
            setHTML(
                q('.education-container .subsection-title'),
                `<i class="fas fa-graduation-cap" aria-hidden="true"></i> ${t.about.education.title}`
            );

            const eduContents = qa('.edu-content');
            if (eduContents[0]) {
                setText(q('h4', eduContents[0]), t.about.education.msc.degree);
                setText(q('.edu-institution', eduContents[0]), t.about.education.msc.university);
                setHTML(q('.edu-location', eduContents[0]), `<i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${t.about.education.msc.location}`);
                setText(q('.edu-date', eduContents[0]), t.about.education.msc.date);
            }
            if (eduContents[1]) {
                setText(q('h4', eduContents[1]), t.about.education.bsc.degree);
                setText(q('.edu-institution', eduContents[1]), t.about.education.bsc.university);
                setHTML(q('.edu-location', eduContents[1]), `<i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${t.about.education.bsc.location}`);
                setText(q('.edu-date', eduContents[1]), t.about.education.bsc.date);
                setHTML(q('.edu-gpa', eduContents[1]), `<i class="fas fa-award" aria-hidden="true"></i> ${t.about.education.bsc.gpa}`);
            }

            // Experience
            setText(q('#experience .section-title'), t.experience.title);
            setText(q('#experience .section-subtitle'), t.experience.subtitle);
            const jobKeys = Object.keys(t.experience.jobs);
            qa('#experience .timeline-content').forEach((content, i) => {
                if (!jobKeys[i]) return;
                const job = t.experience.jobs[jobKeys[i]];
                setText(q('h3', content), job.title);
                const companyEl = q('.company', content);
                if (companyEl) {
                    const link = q('a', companyEl);
                    if (link) link.textContent = job.company;
                    else companyEl.innerHTML = `<i class="fas fa-building" aria-hidden="true"></i> ${job.company}`;
                }
                setHTML(q('.timeline-date', content), `<i class="fas fa-calendar" aria-hidden="true"></i> ${job.date}`);
                setHTML(q('.timeline-location', content), `<i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${job.location}`);
                qa('.timeline-responsibilities li', content).forEach((resp, j) => {
                    if (job.responsibilities[j])
                        resp.innerHTML = `<i class="fas fa-check-circle" aria-hidden="true"></i> ${job.responsibilities[j]}`;
                });
            });

            // Volunteering
            setText(q('#volunteering .section-title'), t.volunteering.title);
            setText(q('#volunteering .section-subtitle'), t.volunteering.subtitle);
            const volKeys = Object.keys(t.volunteering.roles);
            qa('#volunteering .timeline-content').forEach((content, i) => {
                if (!volKeys[i]) return;
                const role = t.volunteering.roles[volKeys[i]];
                setText(q('h3', content), role.title);
                const companyEl = q('.company', content);
                if (companyEl) {
                    const link = q('a', companyEl);
                    if (link) link.textContent = role.company;
                    else companyEl.innerHTML = `<i class="fas fa-building" aria-hidden="true"></i> ${role.company}`;
                }
                setHTML(q('.timeline-date', content), `<i class="fas fa-calendar" aria-hidden="true"></i> ${role.date}`);
                setHTML(q('.timeline-location', content), `<i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${role.location}`);
                qa('.timeline-responsibilities li', content).forEach((resp, j) => {
                    if (role.responsibilities[j])
                        resp.innerHTML = `<i class="fas fa-check-circle" aria-hidden="true"></i> ${role.responsibilities[j]}`;
                });
            });

            // Research
            setText(q('#research .section-title'), t.research.title);
            setText(q('#research .section-subtitle'), t.research.subtitle);
            qa('.publication-card').forEach((card, i) => {
                if (!t.research.publications[i]) return;
                const pub = t.research.publications[i];
                setText(q('.publication-title', card), pub.title);
                const authorsEl = q('.publication-authors', card);
                if (authorsEl)
                    authorsEl.innerHTML = pub.authors.replace('M. S. Islam', '<strong>M. S. Islam</strong>');
                setHTML(q('.publication-venue', card), `<i class="fas fa-book" aria-hidden="true"></i> ${pub.venue}`);
                setText(q('.publication-description', card), pub.description);
                const tagContainer = q('.publication-tags', card);
                if (tagContainer)
                    tagContainer.innerHTML = pub.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
                const pubLink = q('.publication-link', card);
                if (pubLink)
                    setHTML(pubLink, `<i class="fas fa-external-link-alt" aria-hidden="true"></i> ${t.research.viewPaper}`);
            });

            // Skills
            setText(q('#skills .section-title'), t.skills.title);
            setText(q('#skills .section-subtitle'), t.skills.subtitle);
            const catKeys = Object.keys(t.skills.categories);
            qa('.category-header h3').forEach((header, i) => {
                if (catKeys[i]) header.textContent = t.skills.categories[catKeys[i]];
            });

            // Projects
            setText(q('#projects .section-title'), t.projects.title);
            setText(q('#projects .section-subtitle'), t.projects.subtitle);
            qa('.project-card').forEach((card, i) => {
                if (!t.projects.list[i]) return;
                const project = t.projects.list[i];
                setText(q('h3', card), project.title);
                setText(q('.project-description', card), project.description);
                setHTML(q('.project-link', card), `<i class="fab fa-github" aria-hidden="true"></i> ${project.link}`);
            });

            // Achievements
            setText(q('#achievements .section-title'), t.achievements.title);
            setText(q('#achievements .section-subtitle'), t.achievements.subtitle);
            setHTML(q('.achievement-horizontal-title'), `<i class="fas fa-award" aria-hidden="true"></i> ${t.achievements.companyAcademic.title}`);
            qa('.achievement-horizontal-item').forEach((item, i) => {
                if (!t.achievements.companyAcademic.list[i]) return;
                const ach = t.achievements.companyAcademic.list[i];
                setText(q('h4', item), ach.title);
                setText(q('p', item), ach.description);
            });

            const achCategories = qa('.achievement-category');
            if (achCategories[0]) setHTML(q('h3', achCategories[0]), `<i class="fas fa-trophy" aria-hidden="true"></i> ${t.achievements.hackathons.title}`);
            if (achCategories[1]) setHTML(q('h3', achCategories[1]), `<i class="fas fa-code" aria-hidden="true"></i> ${t.achievements.problemSolving.title}`);
            if (achCategories[2]) setHTML(q('h3', achCategories[2]), `<i class="fas fa-hands-helping" aria-hidden="true"></i> ${t.achievements.community.title}`);

            if (achCategories[0]) {
                qa('.achievement-item', achCategories[0]).forEach((item, i) => {
                    const hack = t.achievements.hackathons.list[i];
                    if (!hack) return;
                    setText(q('h4', item), hack.name);
                    setText(q('.achievement-rank', item), hack.rank);
                    setText(q('.achievement-team', item), hack.team);
                });
            }
            if (achCategories[1]) {
                qa('.achievement-item', achCategories[1]).forEach((item, i) => {
                    const ps = t.achievements.problemSolving.list[i];
                    if (!ps) return;
                    setText(q('h4', item), ps.platform);
                    setText(q('.achievement-rank', item), ps.achievement);
                });
            }
            if (achCategories[2]) {
                qa('.achievement-item', achCategories[2]).forEach((item, i) => {
                    const comm = t.achievements.community.list[i];
                    if (!comm) return;
                    setText(q('h4', item), comm.event);
                    setText(q('.achievement-rank', item), comm.achievement);
                });
            }

            // Contact
            setText(q('#contact .section-title'), t.contact.title);
            setText(q('#contact .section-subtitle'), t.contact.subtitle);
            const contactHeaders = qa('.contact-item h4');
            if (contactHeaders[0]) contactHeaders[0].textContent = t.contact.email;
            if (contactHeaders[1]) contactHeaders[1].textContent = t.contact.phone;
            if (contactHeaders[2]) contactHeaders[2].textContent = t.contact.location;
            const locationItem = qa('.contact-item')[2];
            if (locationItem) {
                const locationPs = qa('p', locationItem);
                if (locationPs[0]) locationPs[0].textContent = t.contact.locationText;
                if (locationPs[1]) locationPs[1].textContent = t.contact.locationText2;
            }
            setText(q('.contact-links-section h3'), t.contact.connectWith);

            // Footer
            const footerText = q('.footer-content p');
            if (footerText) footerText.innerHTML = `&copy; 2026 Md Saiful Islam. ${t.footer.rights}`;

            // Language toggle state
            qa('.lang-btn').forEach(btn =>
                btn.classList.toggle('active', btn.dataset.lang === lang)
            );

            startTyping();
        } catch (err) {
            console.error('Language switch failed:', err);
        }
    }

    // ── Typing Animation ──────────────────────────────────────────────────────
    function stopTyping() {
        if (typingTimeout) clearTimeout(typingTimeout);
        typingTimeout = null;
    }

    function type() {
        if (!typedTextSpan || !textArray.length) return;
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            typingTimeout = setTimeout(type, TYPING_DELAY);
        } else {
            typingTimeout = setTimeout(erase, NEW_TEXT_DELAY);
        }
    }

    function erase() {
        if (!typedTextSpan || !textArray.length) return;
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            typingTimeout = setTimeout(erase, ERASE_DELAY);
        } else {
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            typingTimeout = setTimeout(type, TYPING_DELAY + 1100);
        }
    }

    function startTyping() {
        stopTyping();
        textArrayIndex = 0;
        charIndex = 0;
        if (typedTextSpan) typedTextSpan.textContent = '';
        typingTimeout = setTimeout(type, 500);
    }

    // ── Particles ─────────────────────────────────────────────────────────────
    function createParticles() {
        const container = q('#particles');
        if (!container) return;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 50; i++) {
            const size     = Math.random() * 5 + 2;
            const duration = Math.random() * 20 + 10;
            const delay    = Math.random() * 5;
            const r        = (99  + Math.random() * 100) | 0;
            const g        = (102 + Math.random() * 100) | 0;
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.setAttribute('aria-hidden', 'true');
            particle.style.cssText =
                `width:${size}px;height:${size}px;` +
                `left:${Math.random() * 100}%;top:${Math.random() * 100}%;` +
                `background:rgba(${r},${g},241,0.3);` +
                `animation:float ${duration}s ${delay}s infinite ease-in-out`;
            fragment.appendChild(particle);
        }
        container.appendChild(fragment);
    }

    // ── Navigation ────────────────────────────────────────────────────────────
    function initNavigation() {
        const navbar    = q('#navbar');
        const navLinks  = qa('.nav-link');
        const hamburger = q('#hamburger');
        const navMenu   = q('#navMenu');

        if (!navbar || !hamburger || !navMenu) return;

        const onScroll = debounce(() => {
            navbar.classList.toggle('scrolled', window.scrollY > NAV_SCROLL_THRESHOLD);
            let current = '';
            qa('section').forEach(section => {
                if (window.scrollY >= section.offsetTop - 100) current = section.id;
            });
            navLinks.forEach(link =>
                link.classList.toggle('active', link.getAttribute('href').slice(1) === current)
            );
        }, 80);

        window.addEventListener('scroll', onScroll, { passive: true });

        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.classList.toggle('active');
            navMenu.classList.toggle('active', isExpanded);
            hamburger.setAttribute('aria-expanded', String(isExpanded));
        });

        navLinks.forEach(link => link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }));
    }

    // ── Smooth Scroll ─────────────────────────────────────────────────────────
    function initSmoothScroll() {
        qa('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = q(this.getAttribute('href'));
                if (!target) return;
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - SCROLL_OFFSET, behavior: 'smooth' });
            });
        });
    }

    // ── Scroll Animations ─────────────────────────────────────────────────────
    function initScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity   = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

        const selector =
            '.timeline-item, .publication-card, .skill-category, .project-card, ' +
            '.achievement-category, .education-item, .stat-item';

        qa(selector).forEach(el => {
            el.style.opacity    = '0';
            el.style.transform  = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ── Counter Animation ─────────────────────────────────────────────────────
    function animateCounter(el, target) {
        if (!target || isNaN(target)) return;
        const suffix    = el.textContent.replace(/[0-9]/g, '');
        const increment = target / (2000 / 16);
        let current     = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target + suffix;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }

    function initCounters() {
        if (!('IntersectionObserver' in window)) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(
                        entry.target,
                        parseInt(entry.target.textContent.replace(/\D/g, ''), 10)
                    );
                }
            });
        }, { threshold: 0.5 });
        qa('.stat-number').forEach(el => observer.observe(el));
    }

    // ── Back to Top ───────────────────────────────────────────────────────────
    function initBackToTop() {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
        button.className = 'back-to-top';
        button.setAttribute('aria-label', 'Back to top');
        button.setAttribute('type', 'button');
        document.body.appendChild(button);

        const onScroll = debounce(() => {
            button.classList.toggle('visible', window.scrollY > BACK_TO_TOP_THRESHOLD);
        }, 80);

        window.addEventListener('scroll', onScroll, { passive: true });
        button.addEventListener('click', () =>
            window.scrollTo({ top: 0, behavior: 'smooth' })
        );
    }

    // ── Toast Notification ────────────────────────────────────────────────────
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.textContent = message;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('toast--visible'));
        setTimeout(() => {
            toast.classList.remove('toast--visible');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    // ── Email Copy ────────────────────────────────────────────────────────────
    function initEmailCopy() {
        if (!navigator.clipboard) return;
        qa('a[href^="mailto:"]').forEach(link => {
            link.addEventListener('click', () => {
                navigator.clipboard.writeText(link.textContent)
                    .then(() => showToast('Email copied!'))
                    .catch(() => { /* mailto: still opens on failure */ });
            });
        });
    }

    // ── Skill Animation Delays ────────────────────────────────────────────────
    function initSkillAnimations() {
        qa('.skill-item').forEach((item, i) => {
            item.style.animationDelay = `${i * 0.1}s`;
        });
    }

    // ── Viewport Height Fix ───────────────────────────────────────────────────
    function setVhProperty() {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }

    // ── Accessibility ─────────────────────────────────────────────────────────
    function initAccessibility() {
        const skipLink = document.createElement('a');
        skipLink.href = '#home';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.addEventListener('focus', () => skipLink.classList.add('skip-link--visible'));
        skipLink.addEventListener('blur',  () => skipLink.classList.remove('skip-link--visible'));
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // ── Bootstrap ─────────────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
        typedTextSpan = q('.typed-text');
        cursorSpan    = q('.cursor');

        setTheme(currentTheme);
        setLanguage(currentLang);

        initNavigation();
        initSmoothScroll();
        initScrollAnimations();
        initCounters();
        initBackToTop();
        initEmailCopy();
        initSkillAnimations();
        initAccessibility();
        createParticles();

        qa('.theme-btn').forEach(btn =>
            btn.addEventListener('click', () => setTheme(btn.dataset.theme))
        );
        qa('.lang-btn').forEach(btn =>
            btn.addEventListener('click', () => setLanguage(btn.dataset.lang))
        );

        // Flip card: support click/touch in addition to CSS hover
        const flipCard = q('.flip-card');
        if (flipCard) {
            flipCard.addEventListener('click', () =>
                flipCard.classList.toggle('flipped')
            );
        }
    });

    window.addEventListener('resize', debounce(setVhProperty, 100), { passive: true });
    setVhProperty();

}());