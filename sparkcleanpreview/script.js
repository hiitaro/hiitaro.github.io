document.addEventListener('DOMContentLoaded', () => {

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }


    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            nav.style.padding = '0.5rem 0';
        } else {
            nav.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
            nav.style.padding = '1rem 0';
        }
    });


    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = quoteForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            

            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;


            setTimeout(() => {
                alert("Thank you! Your quote request has been sent. A SparkClean representative will contact you within 2 business hours.");
                quoteForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }


    const observerOptions = {
        threshold: 0.1
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.card, .feature-box, .price-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        revealOnScroll.observe(el);
    });
});
