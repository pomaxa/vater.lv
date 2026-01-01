/**
 * Gallery Component
 * Handles filtering and lightbox functionality
 */

export class Gallery {
    constructor() {
        this.gallery = document.querySelector('.gallery');
        this.filterButtons = document.querySelectorAll('.gallery__filter-btn');
        this.items = document.querySelectorAll('.gallery__item');
        this.lightbox = null;
        this.currentIndex = 0;
        this.filteredItems = [];

        this.init();
    }

    init() {
        this.createLightbox();
        this.bindFilters();
        this.bindLightbox();
        this.bindKeyboard();
        this.updateFilteredItems();
    }

    /**
     * Create lightbox elements
     */
    createLightbox() {
        const lightboxHTML = `
            <div class="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
                <button class="lightbox__close" aria-label="Close">&times;</button>
                <button class="lightbox__prev" aria-label="Previous image">&#8249;</button>
                <button class="lightbox__next" aria-label="Next image">&#8250;</button>
                <div class="lightbox__content">
                    <img class="lightbox__image" src="" alt="">
                    <p class="lightbox__caption"></p>
                </div>
                <div class="lightbox__counter"></div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        this.lightbox = document.querySelector('.lightbox');

        this.bindLightboxControls();
    }

    /**
     * Bind lightbox control events
     */
    bindLightboxControls() {
        const closeBtn = this.lightbox.querySelector('.lightbox__close');
        const prevBtn = this.lightbox.querySelector('.lightbox__prev');
        const nextBtn = this.lightbox.querySelector('.lightbox__next');

        closeBtn.addEventListener('click', () => this.closeLightbox());
        prevBtn.addEventListener('click', () => this.navigate(-1));
        nextBtn.addEventListener('click', () => this.navigate(1));

        // Close on backdrop click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });
    }

    /**
     * Bind filter button events
     */
    bindFilters() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                this.filterItems(category);
                this.updateActiveFilter(btn);
            });
        });
    }

    /**
     * Filter gallery items by category
     */
    filterItems(category) {
        this.items.forEach(item => {
            const shouldShow = category === 'all' || item.dataset.category === category;
            item.classList.toggle('gallery__item--hidden', !shouldShow);
        });

        this.updateFilteredItems();
    }

    /**
     * Update active filter button state
     */
    updateActiveFilter(activeBtn) {
        this.filterButtons.forEach(btn => {
            btn.classList.remove('gallery__filter-btn--active');
        });
        activeBtn.classList.add('gallery__filter-btn--active');
    }

    /**
     * Update array of visible items
     */
    updateFilteredItems() {
        this.filteredItems = Array.from(this.items).filter(
            item => !item.classList.contains('gallery__item--hidden')
        );
    }

    /**
     * Bind click events for opening lightbox
     */
    bindLightbox() {
        this.items.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openLightbox(item);
            });
        });
    }

    /**
     * Open lightbox with specific image
     */
    openLightbox(item) {
        const img = item.querySelector('img');
        const fullSrc = item.dataset.fullSrc || img.src;
        const caption = item.dataset.caption || img.alt;

        this.lightbox.querySelector('.lightbox__image').src = fullSrc;
        this.lightbox.querySelector('.lightbox__image').alt = caption;
        this.lightbox.querySelector('.lightbox__caption').textContent = caption;

        // Find index in filtered items
        this.currentIndex = this.filteredItems.indexOf(item);
        this.updateCounter();

        this.lightbox.classList.add('lightbox--open');
        document.body.style.overflow = 'hidden';

        // Focus trap
        this.lightbox.querySelector('.lightbox__close').focus();
    }

    /**
     * Close lightbox
     */
    closeLightbox() {
        this.lightbox.classList.remove('lightbox--open');
        document.body.style.overflow = '';
    }

    /**
     * Navigate to next/previous image
     */
    navigate(direction) {
        this.currentIndex += direction;

        // Loop around
        if (this.currentIndex >= this.filteredItems.length) {
            this.currentIndex = 0;
        } else if (this.currentIndex < 0) {
            this.currentIndex = this.filteredItems.length - 1;
        }

        const item = this.filteredItems[this.currentIndex];
        const img = item.querySelector('img');
        const fullSrc = item.dataset.fullSrc || img.src;
        const caption = item.dataset.caption || img.alt;

        this.lightbox.querySelector('.lightbox__image').src = fullSrc;
        this.lightbox.querySelector('.lightbox__image').alt = caption;
        this.lightbox.querySelector('.lightbox__caption').textContent = caption;

        this.updateCounter();
    }

    /**
     * Update image counter
     */
    updateCounter() {
        const counter = this.lightbox.querySelector('.lightbox__counter');
        counter.textContent = `${this.currentIndex + 1} / ${this.filteredItems.length}`;
    }

    /**
     * Bind keyboard navigation
     */
    bindKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('lightbox--open')) return;

            switch (e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.navigate(-1);
                    break;
                case 'ArrowRight':
                    this.navigate(1);
                    break;
            }
        });
    }
}
