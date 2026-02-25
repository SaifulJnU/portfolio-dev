// ==================== //
// Theme Switching      //
// ==================== //

let currentTheme = localStorage.getItem('theme') || 'dark';

function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('theme', theme);

    if (theme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }

    // Update active button
    document.querySelectorAll('.theme-btn').forEach(btn => {
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ==================== //
// Language Switching   //
// ==================== //

let currentLang = localStorage.getItem('language') || 'de';

// Helper function for safe element updates
function safeUpdate(selector, updateFn) {
    try {
        const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (element && updateFn) {
            updateFn(element);
            return true;
        }
    } catch (e) {
        console.warn('Failed to update element:', selector, e);
    }
    return false;
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);

    if (!translations || !translations[lang]) {
        console.error('Translation not found for language:', lang);
        return;
    }

    const t = translations[lang];

    // Update navigation
    document.querySelectorAll('.nav-link').forEach((link, index) => {
        const keys = Object.keys(t.nav);
        if (keys[index]) {
            link.textContent = t.nav[keys[index]];
        }
    });

    // Update hero section
    document.querySelector('.greeting').textContent = t.hero.greeting;
    document.querySelector('.hero-description').textContent = t.hero.description;
    document.querySelector('.btn-primary').innerHTML = `<i class="fas fa-envelope"></i> ${t.hero.getInTouch}`;
    document.querySelector('.btn-secondary').innerHTML = `<i class="fas fa-download"></i> ${t.hero.downloadCV}`;

    // Update typing animation with new roles
    textArray.length = 0;
    textArray.push(...t.hero.roles);

    // Update about section
    document.querySelector('#about .section-title').textContent = t.about.title;
    document.querySelector('#about .section-subtitle').textContent = t.about.subtitle;
    document.querySelector('.about-intro').textContent = t.about.intro;

    // Update stats
    const statLabels = document.querySelectorAll('.stat-label');
    const statKeys = Object.keys(t.about.stats);
    statLabels.forEach((label, index) => {
        if (statKeys[index]) {
            label.textContent = t.about.stats[statKeys[index]];
        }
    });

    // Update education
    document.querySelector('.subsection-title').innerHTML = `<i class="fas fa-graduation-cap"></i> ${t.about.education.title}`;

    const eduContents = document.querySelectorAll('.edu-content');
    if (eduContents[0]) {
        eduContents[0].querySelector('h4').textContent = t.about.education.msc.degree;
        eduContents[0].querySelector('.edu-institution').textContent = t.about.education.msc.university;
        eduContents[0].querySelector('.edu-location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${t.about.education.msc.location}`;
        eduContents[0].querySelector('.edu-date').textContent = t.about.education.msc.date;
    }
    if (eduContents[1]) {
        eduContents[1].querySelector('h4').textContent = t.about.education.bsc.degree;
        eduContents[1].querySelector('.edu-institution').textContent = t.about.education.bsc.university;
        eduContents[1].querySelector('.edu-location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${t.about.education.bsc.location}`;
        eduContents[1].querySelector('.edu-date').textContent = t.about.education.bsc.date;
        eduContents[1].querySelector('.edu-gpa').innerHTML = `<i class="fas fa-award"></i> ${t.about.education.bsc.gpa}`;
    }

    // Update experience section
    document.querySelector('#experience .section-title').textContent = t.experience.title;
    document.querySelector('#experience .section-subtitle').textContent = t.experience.subtitle;

    const timelineContents = document.querySelectorAll('.timeline-content');
    const jobKeys = Object.keys(t.experience.jobs);
    timelineContents.forEach((content, index) => {
        if (jobKeys[index]) {
            const job = t.experience.jobs[jobKeys[index]];
            content.querySelector('h3').textContent = job.title;
            content.querySelector('.company').innerHTML = `<i class="fas fa-building"></i> ${job.company}`;
            content.querySelector('.timeline-date').innerHTML = `<i class="fas fa-calendar"></i> ${job.date}`;
            content.querySelector('.timeline-location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${job.location}`;

            const responsibilities = content.querySelectorAll('.timeline-responsibilities li');
            responsibilities.forEach((resp, i) => {
                if (job.responsibilities[i]) {
                    resp.innerHTML = `<i class="fas fa-check-circle"></i> ${job.responsibilities[i]}`;
                }
            });
        }
    });

    // Update research section
    safeUpdate('#research .section-title', el => el.textContent = t.research.title);
    safeUpdate('#research .section-subtitle', el => el.textContent = t.research.subtitle);

    const pubCards = document.querySelectorAll('.publication-card');
    pubCards.forEach((card, index) => {
        if (t.research.publications[index]) {
            const pub = t.research.publications[index];
            safeUpdate(card.querySelector('.publication-title'), el => el.textContent = pub.title);
            safeUpdate(card.querySelector('.publication-authors'), el => el.innerHTML = pub.authors.replace('M. S. Islam', '<strong>M. S. Islam</strong>'));
            safeUpdate(card.querySelector('.publication-venue'), el => el.innerHTML = `<i class="fas fa-book"></i> ${pub.venue}`);
            safeUpdate(card.querySelector('.publication-description'), el => el.textContent = pub.description);

            const tagContainer = card.querySelector('.publication-tags');
            if (tagContainer) {
                tagContainer.innerHTML = '';
                pub.tags.forEach(tag => {
                    tagContainer.innerHTML += `<span class="tag">${tag}</span>`;
                });
            }

            // Update "View Paper" button text
            const pubLink = card.querySelector('.publication-link');
            if (pubLink) {
                pubLink.innerHTML = `<i class="fas fa-external-link-alt"></i> ${t.research.viewPaper}`;
            }
        }
    });

    // Update skills section
    document.querySelector('#skills .section-title').textContent = t.skills.title;
    document.querySelector('#skills .section-subtitle').textContent = t.skills.subtitle;

    const categoryHeaders = document.querySelectorAll('.category-header h3');
    const catKeys = Object.keys(t.skills.categories);
    categoryHeaders.forEach((header, index) => {
        if (catKeys[index]) {
            header.textContent = t.skills.categories[catKeys[index]];
        }
    });

    // Update projects section
    document.querySelector('#projects .section-title').textContent = t.projects.title;
    document.querySelector('#projects .section-subtitle').textContent = t.projects.subtitle;

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        if (t.projects.list[index]) {
            const project = t.projects.list[index];
            card.querySelector('h3').textContent = project.title;
            card.querySelector('.project-description').textContent = project.description;
            card.querySelector('.project-link').innerHTML = `<i class="fab fa-github"></i> ${project.link}`;
        }
    });

    // Update achievements section
    safeUpdate('#achievements .section-title', el => el.textContent = t.achievements.title);
    safeUpdate('#achievements .section-subtitle', el => el.textContent = t.achievements.subtitle);

    // Update horizontal achievement section
    safeUpdate('.achievement-horizontal-title', el => el.innerHTML = `<i class="fas fa-award"></i> ${t.achievements.companyAcademic.title}`);

    const horizAchievements = document.querySelectorAll('.achievement-horizontal-item');
    horizAchievements.forEach((item, index) => {
        if (t.achievements.companyAcademic.list[index]) {
            const ach = t.achievements.companyAcademic.list[index];
            safeUpdate(item.querySelector('h4'), el => el.textContent = ach.title);
            safeUpdate(item.querySelector('p'), el => el.textContent = ach.description);
        }
    });

    const achievementCategories = document.querySelectorAll('.achievement-category h3');
    achievementCategories[0].innerHTML = `<i class="fas fa-trophy"></i> ${t.achievements.hackathons.title}`;
    achievementCategories[1].innerHTML = `<i class="fas fa-code"></i> ${t.achievements.problemSolving.title}`;
    achievementCategories[2].innerHTML = `<i class="fas fa-hands-helping"></i> ${t.achievements.community.title}`;

    // Update hackathons
    const hackathonItems = document.querySelectorAll('.achievement-category')[0].querySelectorAll('.achievement-item');
    hackathonItems.forEach((item, index) => {
        if (t.achievements.hackathons.list[index]) {
            const hack = t.achievements.hackathons.list[index];
            item.querySelector('h4').textContent = hack.name;
            item.querySelector('.achievement-rank').textContent = hack.rank;
            item.querySelector('.achievement-team').textContent = hack.team;
        }
    });

    // Update problem solving
    const psItems = document.querySelectorAll('.achievement-category')[1].querySelectorAll('.achievement-item');
    psItems.forEach((item, index) => {
        if (t.achievements.problemSolving.list[index]) {
            const ps = t.achievements.problemSolving.list[index];
            item.querySelector('h4').textContent = ps.platform;
            item.querySelector('.achievement-rank').textContent = ps.achievement;
        }
    });

    // Update community
    const commItems = document.querySelectorAll('.achievement-category')[2].querySelectorAll('.achievement-item');
    commItems.forEach((item, index) => {
        if (t.achievements.community.list[index]) {
            const comm = t.achievements.community.list[index];
            item.querySelector('h4').textContent = comm.event;
            item.querySelector('.achievement-rank').textContent = comm.achievement;
        }
    });

    // Update contact section
    document.querySelector('#contact .section-title').textContent = t.contact.title;
    document.querySelector('#contact .section-subtitle').textContent = t.contact.subtitle;

    const contactItems = document.querySelectorAll('.contact-item h4');
    contactItems[0].textContent = t.contact.email;
    contactItems[1].textContent = t.contact.phone;
    contactItems[2].textContent = t.contact.location;

    const locationPs = document.querySelectorAll('.contact-item')[2].querySelectorAll('p');
    locationPs[0].textContent = t.contact.locationText;
    locationPs[1].textContent = t.contact.locationText2;

    document.querySelector('.contact-links-section h3').textContent = t.contact.connectWith;

    // Update footer
    const footerText = document.querySelector('.footer-content p');
    if (footerText) {
        footerText.innerHTML = `&copy; 2026 Md Saiful Islam. ${t.footer.rights}`;
    }

    // Update language toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });

    // Ensure typing animation starts
    if (typedTextSpan && cursorSpan) {
        startTyping();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initializing...');

    // Initialize typing animation elements
    typedTextSpan = document.querySelector('.typed-text');
    cursorSpan = document.querySelector('.cursor');

    if (!typedTextSpan || !cursorSpan) {
        console.error('Typing elements not found!');
    } else {
        console.log('Typing elements found successfully');
    }

    // Set up theme toggle event listeners
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setTheme(btn.dataset.theme);
        });
    });

    // Set initial theme
    setTheme(currentTheme);

    // Set up language toggle event listeners
    const langButtons = document.querySelectorAll('.lang-btn');
    console.log('Language buttons found:', langButtons.length);

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('Switching to language:', btn.dataset.lang);
            setLanguage(btn.dataset.lang);
        });
    });

    // Set initial language (this will also start typing animation)
    console.log('Setting initial language:', currentLang);
    setLanguage(currentLang);
    console.log('Portfolio initialized!');
});

// ==================== //
// Navigation & Scroll  //
// ==================== //

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile navigation toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== //
// Typing Animation     //
// ==================== //

let typedTextSpan;
let cursorSpan;

let textArray = [
    'Software Engineer',
    'Backend Developer',
    'AI Researcher',
    'Problem Solver'
];

const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;
let typingTimeout = null;
let isTyping = false;

function stopTyping() {
    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }
    isTyping = false;
}

function type() {
    if (!typedTextSpan || !cursorSpan) return;

    isTyping = true;
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        typingTimeout = setTimeout(type, typingDelay);
    } else {
        typingTimeout = setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (!typedTextSpan || !cursorSpan) return;

    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        typingTimeout = setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) {
            textArrayIndex = 0;
        }
        typingTimeout = setTimeout(type, typingDelay + 1100);
    }
}

function startTyping() {
    stopTyping();
    textArrayIndex = 0;
    charIndex = 0;
    if (typedTextSpan) {
        typedTextSpan.textContent = '';
    }
    typingTimeout = setTimeout(type, 500);
}

// ==================== //
// Particles Animation  //
// ==================== //

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(${99 + Math.random() * 100}, ${102 + Math.random() * 100}, ${241}, 0.3)`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';

        // Random animation
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;

        particlesContainer.appendChild(particle);
    }
}

// Create particles on load
window.addEventListener('load', createParticles);

// ==================== //
// Smooth Scroll        //
// ==================== //

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== //
// Scroll Animations    //
// ==================== //

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const animateOnScroll = document.querySelectorAll(
    '.timeline-item, .publication-card, .skill-category, .project-card, ' +
    '.achievement-category, .education-item, .stat-item'
);

animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== //
// Counter Animation    //
// ==================== //

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const suffix = element.textContent.replace(/[0-9]/g, '');

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            animateCounter(entry.target, number);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// ==================== //
// Skills Progress Bar  //
// ==================== //

const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// ==================== //
// Project Links Fix    //
// ==================== //

// Add real links if available, otherwise prevent default
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
            console.log('Project link not configured');
        }
    });
});

// ==================== //
// Copy Email on Click  //
// ==================== //

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.textContent;
        navigator.clipboard.writeText(email).then(() => {
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Email copied!';
            tooltip.style.position = 'fixed';
            tooltip.style.background = '#10b981';
            tooltip.style.color = 'white';
            tooltip.style.padding = '0.5rem 1rem';
            tooltip.style.borderRadius = '8px';
            tooltip.style.top = '50%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translate(-50%, -50%)';
            tooltip.style.zIndex = '10000';
            tooltip.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
            tooltip.style.animation = 'fadeIn 0.3s ease';

            document.body.appendChild(tooltip);

            setTimeout(() => {
                tooltip.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => tooltip.remove(), 300);
            }, 2000);
        });
    });
});

// ==================== //
// Loading Animation    //
// ==================== //

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== //
// Responsive Image Map //
// ==================== //

function adjustForViewport() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', adjustForViewport);
adjustForViewport();

// ==================== //
// Back to Top Button   //
// ==================== //

const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');

    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        z-index: 999;
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
};

createBackToTopButton();

// ==================== //
// Theme Color Meta Tag //
// ==================== //

const metaThemeColor = document.createElement('meta');
metaThemeColor.name = 'theme-color';
metaThemeColor.content = '#6366f1';
document.head.appendChild(metaThemeColor);

// ==================== //
// Performance Monitor  //
// ==================== //

// Log page load time
window.addEventListener('load', () => {
    const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});

// ==================== //
// Easter Egg           //
// ==================== //

let clickCount = 0;
const logo = document.querySelector('.logo a');

logo.addEventListener('click', (e) => {
    clickCount++;
    if (clickCount >= 5) {
        e.preventDefault();
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        document.body.style.transition = 'background 0.5s ease';
        document.body.style.background = colors[Math.floor(Math.random() * colors.length)];

        setTimeout(() => {
            document.body.style.background = '';
        }, 2000);

        clickCount = 0;
    }
});

// ==================== //
// Accessibility        //
// ==================== //

// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #6366f1;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ==================== //
// Print Styles         //
// ==================== //

window.addEventListener('beforeprint', () => {
    console.log('Preparing to print...');
});

window.addEventListener('afterprint', () => {
    console.log('Print completed');
});

// ==================== //
// Console Message      //
// ==================== //

console.log(
    '%c👋 Hello, Developer! ',
    'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;'
);

console.log(
    '%cInterested in the code? Check out my GitHub: https://github.com/SaifulJnU',
    'font-size: 14px; color: #6366f1;'
);

// ==================== //
// Service Worker       //
// ==================== //

// Register service worker for PWA (if needed)
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered', reg))
    //     .catch(err => console.log('Service Worker registration failed', err));
}

// ==================== //
// Analytics Tracking   //
// ==================== //

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionName = entry.target.id;
            console.log(`Section viewed: ${sectionName}`);
            // Add your analytics code here
            // e.g., gtag('event', 'section_view', { section_name: sectionName });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section').forEach(section => {
    if (section.id) {
        sectionObserver.observe(section);
    }
});

// Track button clicks
document.querySelectorAll('.btn, .project-link, .social-links a').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.currentTarget.textContent.trim() || e.currentTarget.getAttribute('aria-label');
        console.log(`Button clicked: ${buttonText}`);
        // Add your analytics code here
    });
});

// ==================== //
// Lazy Loading Images  //
// ==================== //

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== //
// Dark Mode Toggle     //
// ==================== //

// Uncomment to enable dark mode toggle
/*
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.style.cssText = `
    position: fixed;
    top: 50%;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: white;
    color: #1f2937;
    border: 2px solid #e5e7eb;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    z-index: 998;
`;

document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', isDark);
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}
*/

// ==================== //
// End of Script        //
// ==================== //

console.log('Portfolio loaded successfully! 🚀');
