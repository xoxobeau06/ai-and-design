/* 
   The Visual System Guide - GSAP Whimsical Interactivity
*/

document.addEventListener("DOMContentLoaded", () => {
    // Ensure GSAP and ScrollTrigger are loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn("GSAP is not loaded.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /* 1. Infinite Floating Background Orbs + Scroll Parallax */
    const shapes = gsap.utils.toArray('.bg-shape');
    
    shapes.forEach((shape, i) => {
        // Continuous organic float
        gsap.to(shape, {
            y: `+=${Math.random() * 50 + 30}`,
            x: `+=${Math.random() * 40 - 20}`,
            rotation: Math.random() * 30,
            duration: Math.random() * 4 + 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.5
        });

        // Scroll Parallax (Move opposite to scroll direction at different speeds)
        const depth = (i + 1) * 0.2; // Different speed for each orb
        gsap.to(shape, {
            yPercent: 50 * depth,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5 // Smooth scrubbing
            }
        });
    });

    /* 2. Page Load Animations (Hero Section) */
    const heroTimeline = gsap.timeline();
    
    heroTimeline.from('.gs-hero-title', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.75)"
    })
    .from('.sparkle', {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    }, "-=0.8")
    .from('.gs-hero-element', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    }, "-=0.6")
    .from('.gs-reveal-sidebar', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=1.0");

    /* 3. ScrollTrigger Animations: Staggered Concept Cards */
    gsap.from('.gs-stagger-card', {
        scrollTrigger: {
            trigger: "#why",
            start: "top 75%",
        },
        y: 80,
        rotation: 5,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "back.out(1.5)"
    });

    /* 4. ScrollTrigger: Reveal Up (General Headers/Text) */
    gsap.utils.toArray('.gs-reveal-up').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    /* 5. ScrollTrigger: Reveal Left (Walkthrough Steps) with slight rotation */
    gsap.utils.toArray('.gs-reveal-left').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 80%",
            },
            x: -60,
            rotation: -2,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.2)"
        });
    });

    /* 6. ScrollTrigger: Scale Reveal (Glass Cards) */
    gsap.utils.toArray('.gs-reveal-scale').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
            },
            scale: 0.9,
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    /* 7. Active Navigation Highlighting Sync */
    const sections = gsap.utils.toArray('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach((section) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onToggle: self => {
                if (self.isActive) {
                    const id = section.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    });

    /* 8. Interactive 3D Mouse Tilt on Cards */
    const interactiveCards = document.querySelectorAll('.concept-card, .tool-card, .focus-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation based on cursor position (-10 to 10 degrees)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.4,
                ease: "power1.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            // Reset to 0 when mouse leaves
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.5)"
            });
        });
    });
});
