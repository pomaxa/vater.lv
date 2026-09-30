/**
 * VATER Main JavaScript
 * Entry point for all site functionality
 */

import { Navigation } from './navigation.js';
import { Gallery } from './gallery.js';
import { ContactForm } from './contact-form.js';
import { Animations } from './animations.js';
import { CookieConsent } from './cookie-consent.js';

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
