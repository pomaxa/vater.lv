/**
 * VATER Main JavaScript
 * Entry point for all site functionality
 */

import { Navigation } from './navigation.js';
import { Gallery } from './gallery.js';
import { ContactForm } from './contact-form.js';
import { Animations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation (always present)
    new Navigation();

    // Initialize animations (always present)
    new Animations();

    // Initialize gallery only on gallery pages
    if (document.querySelector('.gallery')) {
        new Gallery();
    }

    // Initialize contact form only on contact pages
    if (document.querySelector('.contact-form')) {
        new ContactForm();
    }
});
