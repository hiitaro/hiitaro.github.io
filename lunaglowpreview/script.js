document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        lucide.createIcons();
    }
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = quoteForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;
            try {
                const action = quoteForm.action;
                const formData = new FormData(quoteForm);
                const res = await fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    const modal = document.getElementById('successModal');
                    if (modal) modal.classList.add('show');
                    quoteForm.reset();
                } else {
                    const data = await res.json().catch(() => ({}));
                    alert(data.error || 'Ошибка отправки. Попробуйте ещё раз.');
                }
            } catch (err) {
                alert('Ошибка сети. Попробуйте позже.');
            } finally {
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
            }
        });
    }
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    const animItems = document.querySelectorAll('.card, .feature-box, .price-card, .testimonial-card');
    animItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.8s ease-out';
        revealObserver.observe(item);
    });
    const modal = document.getElementById('successModal');
    const modalClose = document.getElementById('modalClose');
    if (modal && modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('show');
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('show');
        });
    }
});