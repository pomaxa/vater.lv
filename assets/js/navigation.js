/**
 * Navigation Component
 * Handles mobile menu, sticky header, language switching
 */

export class Navigation {
    constructor() {
        this.header = document.querySelector('.header');
        this.toggle = document.querySelector('.header__toggle');
        this.nav = document.querySelector('.header__nav');
        this.navLinks = document.querySelectorAll('.header__nav-link');
        this.langLinks = document.querySelectorAll('.lang-switch__link');

        this.isMenuOpen = false;
        this.lastScrollY = 0;

        this.init();
    }

    init() {
        this.bindMobileMenu();
        this.bindStickyHeader();
        this.bindNavLinks();
        this.bindLanguageSwitcher();
        this.setActiveNavLink();
    }

    /**
     * Mobile Menu Toggle
     */
    bindMobileMenu() {
        if (!this.toggle || !this.nav) return;

        this.toggle.addEventListener('click', () => {
            this.isMenuOpen = !this.isMenuOpen;
            this.toggle.classList.toggle('header__toggle--active', this.isMenuOpen);
            this.nav.classList.toggle('header__nav--open', this.isMenuOpen);
            document.body.classList.toggle('menu-open', this.isMenuOpen);

            // Accessibility
            this.toggle.setAttribute('aria-expanded', this.isMenuOpen);
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    /**
     * Close mobile menu on link click
     */
    bindNavLinks() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.closeMobileMenu();
                }
            });
        });
    }

    closeMobileMenu() {
        this.isMenuOpen = false;
        this.toggle?.classList.remove('header__toggle--active');
        this.nav?.classList.remove('header__nav--open');
        document.body.classList.remove('menu-open');
        this.toggle?.setAttribute('aria-expanded', 'false');
    }

    /**
     * Sticky Header on Scroll
     */
    bindStickyHeader() {
        if (!this.header) return;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                this.header.classList.add('header--sticky');
            } else {
                this.header.classList.remove('header--sticky');
            }

            this.lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Check initial scroll position
        handleScroll();
    }

    /**
     * Language Switcher - Save preference to localStorage
     */
    bindLanguageSwitcher() {
        this.langLinks.forEach(link => {
            link.addEventListener('click', () => {
                const lang = link.getAttribute('hreflang');
                if (lang) {
                    localStorage.setItem('preferredLang', lang);
                }
            });
        });
    }

    /**
     * Set active navigation link based on current URL
     */
    setActiveNavLink() {
        const currentPath = window.location.pathname;

        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');

            // Remove all active classes first
            link.classList.remove('header__nav-link--active');

            // Check if this link matches current path
            if (href && currentPath.includes(href.replace('.html', ''))) {
                link.classList.add('header__nav-link--active');
            }

            // Special case for homepage
            if (currentPath.match(/^\/(lv|ru|en)\/?$/) && href?.match(/^\/(lv|ru|en)\/?$/)) {
                link.classList.add('header__nav-link--active');
            }
        });
    }
}
