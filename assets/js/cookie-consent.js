/**
 * Cookie Consent Manager
 * GDPR-compliant cookie consent for Google Analytics/GTM
 */

export class CookieConsent {
    constructor() {
        this.consentKey = 'vater_cookie_consent';
        this.gtmId = 'GTM-MJXCB58K';

        this.translations = {
            lv: {
                message: 'Mēs izmantojam Google Analytics, lai apkopotu anonīmus datus par vietnes apmeklējumiem un uzlabotu lietotāja pieredzi.',
                accept: 'Piekrītu',
                decline: 'Noraidīt'
            },
            en: {
                message: 'We use Google Analytics to collect anonymous data about site visits and improve user experience.',
                accept: 'Accept',
                decline: 'Decline'
            },
            ru: {
                message: 'Мы используем Google Analytics для сбора анонимных данных о посещениях сайта и улучшения пользовательского опыта.',
                accept: 'Принять',
                decline: 'Отклонить'
            }
        };

        this.init();
    }

    init() {
        const consent = this.getConsent();

        if (consent === 'accepted') {
            this.loadGTM();
        } else if (consent === null) {
            this.showBanner();
        }
    }

    getConsent() {
        return localStorage.getItem(this.consentKey);
    }

    setConsent(value) {
        localStorage.setItem(this.consentKey, value);
    }

    getLang() {
        const path = window.location.pathname;
        if (path.includes('/ru/')) return 'ru';
        if (path.includes('/en/')) return 'en';
        return 'lv';
    }

    showBanner() {
        const lang = this.getLang();
        const t = this.translations[lang];

        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-banner__content">
                <p class="cookie-banner__text">${t.message}</p>
                <div class="cookie-banner__actions">
                    <button class="cookie-banner__btn cookie-banner__btn--accept">${t.accept}</button>
                    <button class="cookie-banner__btn cookie-banner__btn--decline">${t.decline}</button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Add event listeners
        banner.querySelector('.cookie-banner__btn--accept').addEventListener('click', () => {
            this.acceptCookies(banner);
        });

        banner.querySelector('.cookie-banner__btn--decline').addEventListener('click', () => {
            this.declineCookies(banner);
        });

        // Animate in
        requestAnimationFrame(() => {
            banner.classList.add('cookie-banner--visible');
        });
    }

    acceptCookies(banner) {
        this.setConsent('accepted');
        this.hideBanner(banner);
        this.loadGTM();
    }

    declineCookies(banner) {
        this.setConsent('declined');
        this.hideBanner(banner);
    }

    hideBanner(banner) {
        banner.classList.remove('cookie-banner--visible');
        setTimeout(() => {
            banner.remove();
        }, 300);
    }

    loadGTM() {
        // Google Tag Manager
        (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', this.gtmId);

        // Add noscript fallback
        const noscript = document.createElement('noscript');
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.googletagmanager.com/ns.html?id=${this.gtmId}`;
        iframe.height = '0';
        iframe.width = '0';
        iframe.style.display = 'none';
        iframe.style.visibility = 'hidden';
        noscript.appendChild(iframe);
        document.body.insertBefore(noscript, document.body.firstChild);
    }
}
