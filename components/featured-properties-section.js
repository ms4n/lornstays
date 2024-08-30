async function loadHTML(url) {
    const response = await fetch(url);
    return await response.text();
}

class FeaturedPropertiesSection extends HTMLElement {
    constructor() {
        super();
        this.currentIndex = 0;
    }

    async connectedCallback() {
        const content = await loadHTML('components/featured-properties-section.html');
        this.innerHTML = content;
        this.initializeCarousel();
    }

    initializeCarousel() {
        const carousel = this.querySelector('#featured-properties-carousel');
        const prevButton = this.querySelector('#prev-button');
        const nextButton = this.querySelector('#next-button');

        if (carousel && prevButton && nextButton) {
            const items = carousel.querySelectorAll('.carousel-item');
            const totalItems = items.length;

            const updateCarousel = () => {
                items.forEach((item, index) => {
                    item.classList.toggle('hidden', index !== this.currentIndex);
                });
            };

            prevButton.addEventListener('click', () => {
                this.currentIndex = (this.currentIndex - 1 + totalItems) % totalItems;
                updateCarousel();
            });

            nextButton.addEventListener('click', () => {
                this.currentIndex = (this.currentIndex + 1) % totalItems;
                updateCarousel();
            });

            // Initialize the carousel
            updateCarousel();
        }
    }
}

customElements.define('featured-properties-section', FeaturedPropertiesSection);