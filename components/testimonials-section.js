async function loadHTML(url) {
    const response = await fetch(url);
    return await response.text();
}

class TestimonialsSection extends HTMLElement {
    constructor() {
        super();
        this.currentIndex = 0;
        this.autoRotateInterval = null;
    }

    async connectedCallback() {
        const content = await loadHTML('components/testimonials-section.html');
        this.innerHTML = content;
        this.initializeCarousel();
    }

    initializeCarousel() {
        this.testimonials = this.querySelectorAll('.testimonial');
        this.navigationDots = this.querySelectorAll('.navigation-dot');
        this.prevButton = this.querySelector('#prev-testimonial');
        this.nextButton = this.querySelector('#next-testimonial');

        if (this.testimonials.length > 0) {
            this.showTestimonial(0);
            this.setupEventListeners();
            this.startAutoRotate();
        }
    }

    setupEventListeners() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.showPreviousTestimonial());
        }
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.showNextTestimonial());
        }
        this.navigationDots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.showTestimonial(index));
        });
    }

    showTestimonial(index) {
        this.testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.classList.remove('hidden');
                testimonial.classList.add('animate__animated', 'animate__fadeIn');
            } else {
                testimonial.classList.add('hidden');
                testimonial.classList.remove('animate__animated', 'animate__fadeIn');
            }
        });

        this.navigationDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('bg-cyan-600');
                dot.classList.remove('bg-gray-300');
            } else {
                dot.classList.remove('bg-cyan-600');
                dot.classList.add('bg-gray-300');
            }
        });

        this.currentIndex = index;
    }

    showNextTestimonial() {
        let nextIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.showTestimonial(nextIndex);
    }

    showPreviousTestimonial() {
        let prevIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.showTestimonial(prevIndex);
    }

    startAutoRotate() {
        this.autoRotateInterval = setInterval(() => {
            this.showNextTestimonial();
        }, 5000);
    }

    stopAutoRotate() {
        clearInterval(this.autoRotateInterval);
    }
}

customElements.define('testimonials-section', TestimonialsSection);