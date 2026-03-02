document.addEventListener('DOMContentLoaded', () => {

    lucide.createIcons();


    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = toggle.querySelector('[data-lucide]');
        if (icon) {
            if (navLinks.classList.contains('open')) {
                icon.setAttribute('data-lucide','x');
            } else {
                icon.setAttribute('data-lucide','menu');
            }
        }
        lucide.createIcons();
    });
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            navLinks.classList.remove('open');
            const icon = toggle.querySelector('[data-lucide]');
            if (icon) icon.setAttribute('data-lucide','menu');
            lucide.createIcons();
        });
    });


    gsap.registerPlugin(ScrollTrigger);


    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out"
        });
    });


    const waitForImages = (containerSelector) => {
        const imgs = Array.from(document.querySelectorAll(containerSelector + ' img'));
        return Promise.all(imgs.map(img => {
            if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
            return new Promise(resolve => {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
            });
        }));
    };

    waitForImages('.cat-grid').then(() => {
        if (window.ScrollTrigger) ScrollTrigger.refresh();

        gsap.fromTo('.cat-card',
            { y: 50, autoAlpha: 0 },
            {
                y: 0,
                autoAlpha: 1,
                stagger: 0.2,
                duration: 0.8,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.cat-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });


    gsap.from('.reveal-img', {
        scrollTrigger: {
            trigger: '.about-image',
            start: "top 75%"
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
