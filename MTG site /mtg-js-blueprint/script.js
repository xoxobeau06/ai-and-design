// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // 0. Scroll Progress Bar
    gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3
        }
    });

    // 1. Hero Parallax & Scaledown
    const tlHero = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true
        }
    });

    tlHero.to(".hero-title", { scale: 0.8, opacity: 0, y: -50 }, 0)
        .to(".hero-subtitle", { scale: 0.9, opacity: 0, y: -30 }, 0)
        .to(".layer-back .mana-symbol", { y: -300 }, 0)
        .to(".layer-mid .mana-symbol", { y: -150 }, 0)
        .to(".hero-bg", { y: 150, scale: 1.1 }, 0); // Hero image parallax

    // 2. Contained Cards Reveal (Stagger)
    gsap.from(".js-card", {
        scrollTrigger: {
            trigger: "#cards-section",
            start: "top 70%",
        },
        y: 100,
        opacity: 0,
        rotationY: -15,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)"
    });

    // 3D Tilt Card Effect
    const cards = document.querySelectorAll('[data-tilt]');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                duration: 0.4,
                ease: "power1.out"
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.7, ease: "power2.out" });
        });
    });

    // 3. Narrative Scrub Highlight & Stack Drops
    const scrubTexts = document.querySelectorAll('.js-scrub');

    // Stack items to animate
    const stackItems = [".js-stack-1", ".js-stack-2", ".js-stack-3"];

    scrubTexts.forEach((text, i) => {
        ScrollTrigger.create({
            trigger: text,
            start: "top 60%", // When text enters 60% of viewport
            end: "bottom 40%",
            toggleClass: { targets: text, className: "active" },
            onEnter: () => {
                // Drop the corresponding stack block into place
                if (stackItems[i]) {
                    gsap.to(stackItems[i], { opacity: 1, y: 0, duration: 0.6, ease: "bounce.out" });
                }
            },
            onLeaveBack: () => {
                // Remove block if scrolling back up
                if (stackItems[i]) {
                    gsap.to(stackItems[i], { opacity: 0, y: -50, duration: 0.3 });
                }
            }
        });
    });

    // 4. Pinned Split View
    ScrollTrigger.matchMedia({
        // Desktop only pin
        "(min-width: 1025px)": function () {
            ScrollTrigger.create({
                trigger: "#split-section",
                start: "top top",
                end: "bottom bottom",
                pin: ".split-left",
                pinSpacing: false
            });

            // Float the blue card upward relative to scroll (Parallax scrub)
            gsap.to(".float-card", {
                y: -100,
                scrollTrigger: {
                    trigger: ".split-right",
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1
                }
            });
        }
    });

    // Generic fade up utilities
    gsap.utils.toArray('.fade-up').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: { trigger: elem, start: "top 85%" },
            y: 50, opacity: 0, duration: 1, ease: "power2.out"
        });
    });

    // 5. Magnetic Battlefield Hover
    const magnets = document.querySelectorAll('.js-magnetic');
    magnets.forEach(magnet => {
        magnet.addEventListener('mousemove', (e) => {
            const rect = magnet.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            // Magnetic pull
            gsap.to(magnet, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
        });
        magnet.addEventListener('mouseleave', () => {
            gsap.to(magnet, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        });
    });

    // DOM Target Button Flash Interaction
    const targetBtn = document.getElementById('target-all-btn');
    if (targetBtn) {
        targetBtn.addEventListener('click', () => {
            gsap.to('.node-target', {
                boxShadow: "0 0 30px rgba(255,255,255,0.8), inset 0 0 20px rgba(255,255,255,0.5)",
                borderColor: "white",
                scale: 1.05,
                yoyo: true,
                repeat: 1,
                duration: 0.2,
                stagger: 0.05
            });
        });
    }

    // 6. Grid Bento Intro
    gsap.from(".js-bento", {
        scrollTrigger: {
            trigger: "#grid-section",
            start: "top 70%",
        },
        scale: 0.8,
        opacity: 0,
        rotation: () => gsap.utils.random(-10, 10), // slight random card toss rotation
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.5)"
    });

    // Clear inline rotation after animation to protect hover states if any
    gsap.to(".js-bento", {
        scrollTrigger: { trigger: "#grid-section", start: "top 70%" },
        rotation: 0, delay: 1, duration: 0.4
    });

    // 7. Closing Layout Reveal
    gsap.to(".closing-mana", {
        scrollTrigger: {
            trigger: "#closing-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        y: -200, // Very slow reverse parallax
    });

    gsap.from(".js-fade-in", {
        scrollTrigger: {
            trigger: "#closing-section",
            start: "top 50%",
        },
        opacity: 0,
        y: 40,
        duration: 1.5,
        ease: "power2.out"
    });

});
