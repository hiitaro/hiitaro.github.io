    const mainNav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
      mainNav.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });

    const hamburger  = document.getElementById('hamburger');
    const navOverlay = document.getElementById('nav-overlay');

    function openMenu() {
      navOverlay.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      navOverlay.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () =>
      navOverlay.classList.contains('open') ? closeMenu() : openMenu()
    );
    navOverlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const id     = this.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        const offset = mainNav.getBoundingClientRect().height + 12;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });

    const sections     = Array.from(document.querySelectorAll('section[id]'));
    const desktopLinks = document.querySelectorAll('.nav__links a[data-section]');
    const scrollBar    = document.getElementById('scroll-indicator');

    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollBar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';

      const scrollMid = window.scrollY + window.innerHeight * 0.4;
      let current = '';
      sections.forEach(sec => { if (sec.offsetTop <= scrollMid) current = sec.id; });
      desktopLinks.forEach(a => a.classList.toggle('active', a.dataset.section === current));
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const revealAll = document.querySelectorAll(
      '.reveal, .reveal--left, .reveal--right, .reveal--scale, .reveal--blur, .reveal--line'
    );
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealAll.forEach(el => revealObs.observe(el));

    const parallaxBg = document.getElementById('parallax-bg');
    window.addEventListener('scroll', () => {
      if (parallaxBg && window.scrollY < window.innerHeight * 1.2)
        parallaxBg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
    }, { passive: true });

    document.querySelectorAll('.drink-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    const heroSection = document.getElementById('hero');
    let dot = null;

    heroSection.addEventListener('mouseenter', () => {
      if (!dot) {
        dot = Object.assign(document.createElement('div'), {});
        dot.style.cssText = [
          'position:fixed', 'width:8px', 'height:8px',
          'background:var(--gold)', 'border-radius:50%',
          'pointer-events:none', 'z-index:9999',
          'mix-blend-mode:multiply',
          'transform:translate(-50%,-50%)',
          'transition:opacity 0.3s',
          'opacity:0'
        ].join(';');
        document.body.appendChild(dot);
      }
      dot.style.opacity = '0.55';
    });
    heroSection.addEventListener('mousemove', e => {
      if (dot) { dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px'; }
    });
    heroSection.addEventListener('mouseleave', () => {
      if (dot) dot.style.opacity = '0';
    });