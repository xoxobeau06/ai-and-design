/* 
   The Visual System Starter Kit Scripts 
   Editorial interaction: calm, simple fade-ins.
*/

document.addEventListener("DOMContentLoaded", () => {
    // 1. Intersection Observer for subtle fade-ins as you scroll
    const faders = document.querySelectorAll(
        '.concept-card, .timeline-item, .process-steps li, .tool-card'
    );

    // Initial styling via JS so we don't punish users without JS
    faders.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Apply the visible state
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

});
