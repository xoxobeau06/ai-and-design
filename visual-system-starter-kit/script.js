document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you want it to trigger only once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with the appear-scroll class
    const elementsToAnimate = document.querySelectorAll('.appear-scroll, .card, .loop-step');
    elementsToAnimate.forEach(el => {
        el.classList.add('appear-scroll'); // Ensure base class is present
        scrollObserver.observe(el);
    });
});
