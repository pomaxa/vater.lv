/**
 * VATER Main JavaScript
 * Entry point for all site functionality
 */

import { Navigation } from './navigation.js?v=20260930';
import { Gallery } from './gallery.js?v=20260930';
import { ContactForm } from './contact-form.js?v=20260930';
import { Animations } from './animations.js?v=20260930';
import { CookieConsent } from './cookie-consent.js?v=20260930';

// Initialize each component in isolation so one failure
// doesn't break the rest of the page
function safeInit(name, init) {
    try {
        init();
    } catch (error) {
        console.error(`[VATER] ${name} failed to initialize`, error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Always present
    safeInit('Navigation', () => new Navigation());
    safeInit('Animations', () => new Animations());
    safeInit('CookieConsent', () => new CookieConsent());

    // Initialize gallery only on gallery pages
    if (document.querySelector('.gallery')) {
        safeInit('Gallery', () => new Gallery());
    }

    // Initialize contact form only on contact pages
    if (document.querySelector('.contact-form')) {
        safeInit('ContactForm', () => new ContactForm());
    }
});
