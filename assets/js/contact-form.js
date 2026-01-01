/**
 * Contact Form Component
 * Handles validation and submission
 */

export class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.submitBtn = this.form?.querySelector('button[type="submit"]');
        this.successMessage = document.querySelector('.contact-form__success');
        this.errorMessage = document.querySelector('.contact-form__error');

        // Get current language for error messages
        this.lang = this.detectLanguage();

        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.bindValidation();
    }

    /**
     * Detect current language from URL
     */
    detectLanguage() {
        const path = window.location.pathname;
        const match = path.match(/^\/(lv|ru|en)\//);
        return match ? match[1] : 'lv';
    }

    /**
     * Bind real-time validation to inputs
     */
    bindValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            // Validate on blur
            input.addEventListener('blur', () => this.validateField(input));

            // Re-validate on input if already showing error
            input.addEventListener('input', () => {
                if (input.classList.contains('form__input--error')) {
                    this.validateField(input);
                }
            });
        });
    }

    /**
     * Validate a single field
     */
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        const name = field.name;

        let isValid = true;
        let errorMsg = '';

        // Required check
        if (required && !value) {
            isValid = false;
            errorMsg = this.getMessages().required;
        }
        // Email validation
        else if (type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMsg = this.getMessages().email;
        }
        // Phone validation
        else if (type === 'tel' && value && !this.isValidPhone(value)) {
            isValid = false;
            errorMsg = this.getMessages().phone;
        }

        this.showFieldError(field, isValid, errorMsg);
        return isValid;
    }

    /**
     * Email validation regex
     */
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * Phone validation - allows various formats
     */
    isValidPhone(phone) {
        // Remove spaces and dashes
        const cleaned = phone.replace(/[\s\-]/g, '');
        // Check for valid phone number format
        return /^[\+]?[\d]{7,15}$/.test(cleaned);
    }

    /**
     * Show or hide field error
     */
    showFieldError(field, isValid, errorMsg) {
        const wrapper = field.closest('.form__group');
        let errorEl = wrapper?.querySelector('.form__error');

        if (!isValid) {
            field.classList.add('form__input--error');

            if (!errorEl && wrapper) {
                errorEl = document.createElement('span');
                errorEl.className = 'form__error';
                wrapper.appendChild(errorEl);
            }

            if (errorEl) {
                errorEl.textContent = errorMsg;
            }
        } else {
            field.classList.remove('form__input--error');

            if (errorEl) {
                errorEl.remove();
            }
        }
    }

    /**
     * Validate all fields
     */
    validateAll() {
        const inputs = this.form.querySelectorAll('input:not([type="hidden"]), textarea, select');
        let isFormValid = true;

        inputs.forEach(input => {
            // Skip honeypot field
            if (input.name === 'website') return;

            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    /**
     * Handle form submission
     */
    async handleSubmit(e) {
        e.preventDefault();

        // Check honeypot (bot detection)
        const honeypot = this.form.querySelector('[name="website"]');
        if (honeypot && honeypot.value) {
            // Bot detected - silently fail
            return;
        }

        // Validate all fields
        if (!this.validateAll()) {
            return;
        }

        this.setLoading(true);
        this.hideMessages();

        try {
            const formData = new FormData(this.form);

            // Submit to FormSubmit.co
            await this.submitToFormSubmit(formData);

            this.showSuccess();
            this.form.reset();

        } catch (error) {
            console.error('Form submission error:', error);
            this.showError();
        } finally {
            this.setLoading(false);
        }
    }

    /**
     * Submit form via FormSubmit.co API
     */
    async submitToFormSubmit(formData) {
        // Add FormSubmit configuration
        formData.append('_subject', 'Jauns ziņojums no vater.lv');
        formData.append('_template', 'table');
        formData.append('_captcha', 'false');

        const response = await fetch('https://formsubmit.co/ajax/info@vater.lv', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Form submission failed');
        }

        return response.json();
    }

    /**
     * Set loading state
     */
    setLoading(isLoading) {
        if (this.submitBtn) {
            this.submitBtn.disabled = isLoading;

            if (isLoading) {
                this.submitBtn.dataset.originalText = this.submitBtn.textContent;
                this.submitBtn.textContent = this.getMessages().sending;
            } else {
                this.submitBtn.textContent = this.submitBtn.dataset.originalText || this.getMessages().send;
            }
        }
    }

    /**
     * Show success message
     */
    showSuccess() {
        if (this.successMessage) {
            this.successMessage.hidden = false;
            this.successMessage.textContent = this.getMessages().success;
        }
    }

    /**
     * Show error message
     */
    showError() {
        if (this.errorMessage) {
            this.errorMessage.hidden = false;
            this.errorMessage.textContent = this.getMessages().error;
        }
    }

    /**
     * Hide all messages
     */
    hideMessages() {
        if (this.successMessage) this.successMessage.hidden = true;
        if (this.errorMessage) this.errorMessage.hidden = true;
    }

    /**
     * Get localized messages
     */
    getMessages() {
        const messages = {
            lv: {
                required: 'Lauks ir obligāts',
                email: 'Lūdzu, ievadiet derīgu e-pasta adresi',
                phone: 'Lūdzu, ievadiet derīgu tālruņa numuru',
                sending: 'Sūta...',
                send: 'Nosūtīt',
                success: 'Paldies! Jūsu ziņojums ir nosūtīts. Mēs ar jums sazināsimies drīzumā.',
                error: 'Atvainojiet, radās kļūda. Lūdzu, mēģiniet vēlreiz.'
            },
            ru: {
                required: 'Поле обязательно для заполнения',
                email: 'Пожалуйста, введите действительный адрес электронной почты',
                phone: 'Пожалуйста, введите действительный номер телефона',
                sending: 'Отправка...',
                send: 'Отправить',
                success: 'Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.',
                error: 'Извините, произошла ошибка. Пожалуйста, попробуйте еще раз.'
            },
            en: {
                required: 'This field is required',
                email: 'Please enter a valid email address',
                phone: 'Please enter a valid phone number',
                sending: 'Sending...',
                send: 'Send',
                success: 'Thank you! Your message has been sent. We will contact you soon.',
                error: 'Sorry, an error occurred. Please try again.'
            }
        };

        return messages[this.lang] || messages.en;
    }
}
