import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.13.0/index.js";

export function initHeroAnimations() {
    const hero = document.querySelector(".hero-content");

    if (!hero) return;

    gsap.set(hero, { visibility: "visible" });

    const tl = gsap.timeline({
        defaults: {
            ease: "power4.out"
        }
    });

    // Animate the highlighted word first
    tl.from(".hero-highlight span", {
        yPercent: 120,
        skewY: 6,
        autoAlpha: 0,
        duration: 0.9
    })

    // Then animate the remaining words
    .from(".hero-title > span", {
        yPercent: 120,
        skewY: 6,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.08
    }, "-=0.55")

    // Paragraph
    .from(".hero-content p", {
        y: 18,
        autoAlpha: 0,
        duration: 0.7
    }, "-=0.45")

    // Button
    .from(".hero-content .btn-primary", {
        y: 18,
        autoAlpha: 0,
        duration: 0.65,
        clearProps: "all"
    }, "-=0.45");
}