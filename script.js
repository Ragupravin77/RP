/*
 * JavaScript for RP's futuristic portfolio
 * Handles navigation behaviour, theme switching, scroll indicators,
 * gallery lightbox, timeline reveal, birthday countdown and more.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Navigation highlight on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateNavHighlight() {
        const scrollPos = window.scrollY + 100;
        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach((link) => link.classList.remove('active'));
                const activeLink = document.querySelector(
                    `.nav-link[href="#${id}"]`
                );
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }
    updateNavHighlight();
    window.addEventListener('scroll', updateNavHighlight);

    // Scroll progress bar
    const progressBar = document.getElementById('progress-bar');
    function updateProgressBar() {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        const percent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${percent}%`;
    }
    updateProgressBar();
    window.addEventListener('scroll', updateProgressBar);

    // Mobile nav toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });

    // Theme switcher
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach((btn) => {
        btn.style.backgroundColor = btn.dataset.color;
        btn.addEventListener('click', () => {
            const newColor = btn.dataset.color;
            document.documentElement.style.setProperty(
                '--accent-color',
                newColor
            );
        });
    });

    // Back to top
    const backToTop = document.getElementById('back-to-top');
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Lightbox for gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightbox.classList.add('show');
        });
    });
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('show');
    });
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
        }
    });

    // Initialize Vanilla Tilt for cards & hobbies
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.3,
        });
    }

    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
        });
    }

    // Birthday countdown
    function startCountdown() {
        const ageSpan = document.getElementById('age-value');
        const daysEl = document.getElementById('cd-days');
        const hoursEl = document.getElementById('cd-hours');
        const minsEl = document.getElementById('cd-mins');
        const secsEl = document.getElementById('cd-secs');
        const birthday = { day: 6, month: 7 }; // 0-indexed month: August = 7
        const birthYear = 2008;
        function update() {
            const now = new Date();
            // Determine next birthday year
            let currentYear = now.getFullYear();
            let nextBirthday = new Date(
                currentYear,
                birthday.month,
                birthday.day
            );
            if (now > nextBirthday) {
                nextBirthday = new Date(
                    currentYear + 1,
                    birthday.month,
                    birthday.day
                );
            }
            const diff = nextBirthday - now;
            const seconds = Math.floor(diff / 1000);
            const days = Math.floor(seconds / (3600 * 24));
            const hours = Math.floor((seconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = Math.floor(seconds % 60);
            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minsEl.textContent = minutes.toString().padStart(2, '0');
            secsEl.textContent = secs.toString().padStart(2, '0');
            // Calculate age based on birth date and current date
            let age = currentYear - birthYear;
            const currentBirthday = new Date(
                currentYear,
                birthday.month,
                birthday.day
            );
            if (now < currentBirthday) {
                age--;
            }
            ageSpan.textContent = age;
        }
        update();
        setInterval(update, 1000);
    }
    startCountdown();
});