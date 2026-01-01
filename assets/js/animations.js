/**
 * Animations Component
 * Handles scroll-triggered animations using Intersection Observer
 */

export class Animations {
    constructor() {
        this.animatedElements = document.querySelectorAll('[data-animate]');

        if (this.animatedElements.length > 0) {
            this.init();
        }
    }

    init() {
        this.setupScrollAnimations();
        this.setupSmoothScroll();
    }

    /**
     * Set up intersection observer for scroll animations
     */
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        this.animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Set up smooth scrolling for anchor links
     */
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');

                // Skip if just "#"
                if (targetId === '#') return;

                const target = document.querySelector(targetId);

                if (target) {
                    e.preventDefault();

                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY;

                    window.scrollTo({
                        top: targetPosition - headerHeight - 20,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}
