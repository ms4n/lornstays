class TestimonialsSection extends HTMLElement {
    constructor() {
        super();
        this.currentIndex = 0;
        this.testimonials = [
            {
                name: "Neel Seth",
                review: "My stay was perfect as always",
                stars: 5
            },
            {
                name: "Priyanshu Raj",
                review: "The stay was incredibly comforting, with a cozy, well-equipped room. Loved the convenient market access right outside, making it easy to explore.",
                stars: 5
            },
            {
                name: "Vikas Wakde",
                review: "One of the best experience I had in life, the rooms are well maintained, & all the top facilities are provided. Any requirements are resolved within a fraction of minutes. I am satisfied with the service provided.",
                stars: 5
            },
            {
                name: "Sanjay M",
                review: "The rooms are pretty and have big sliding windows/doors with balcony, feels airy and open, nice rooms to work from.",
                stars: 5
            },
            {
                name: "Aditya Lingwal",
                review: "My recent stay was quite pleasant. The swimming pool was a highlight - well-maintained and enjoyable. I appreciated the regular cleaning throughout the hotel, which kept everything tidy. The dedicated washing machine was convenient for longer stays. The beds were clean and comfortable, ensuring a good night's rest. Overall, the hotel's commitment to cleanliness and guest comfort was evident.",
                stars: 5
            },
        ];
    }

    connectedCallback() {
        this.innerHTML = `
            <section id="testimonials-section" class="bg-gray-100 py-16">
                <div class="container mx-auto px-4">
                    <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">What Our Guests Say</h2>
                    
                    <div id="testimonials-carousel" class="relative max-w-3xl mx-auto">
                        <div class="overflow-hidden">
                            <div class="flex transition-transform duration-300 ease-in-out">
                                ${this.testimonials.map(this.createTestimonialHTML).join('')}
                            </div>
                        </div>
                        
                        <button id="prev-testimonial" class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-600">
                            <i class="fas fa-chevron-left text-gray-800"></i>
                        </button>
                        <button id="next-testimonial" class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-600">
                            <i class="fas fa-chevron-right text-gray-800"></i>
                        </button>
                        
                        <div class="flex justify-center mt-8">
                            ${this.testimonials.map((_, index) => `
                                <button class="h-3 w-3 rounded-full ${index === 0 ? 'bg-cyan-600' : 'bg-gray-300'} mx-1 focus:outline-none navigation-dot"></button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </section>
        `;

        this.initializeCarousel();
    }

    createTestimonialHTML(testimonial) {
        return `
            <div class="w-full flex-shrink-0 px-4">
                <div class="bg-white shadow-lg rounded-lg overflow-hidden p-6">
                    <div class="uppercase tracking-wide text-sm text-cyan-600 font-semibold mb-2">${testimonial.name}</div>
                    <p class="text-gray-600 mb-4">"${testimonial.review}"</p>
                    <div class="flex">
                        ${Array(testimonial.stars).fill().map(() => '<i class="fas fa-star text-amber-400"></i>').join('')}
                    </div>
                </div>
            </div>
        `;
    }

    initializeCarousel() {
        this.carouselTrack = this.querySelector('.flex');
        this.prevButton = this.querySelector('#prev-testimonial');
        this.nextButton = this.querySelector('#next-testimonial');
        this.navigationDots = this.querySelectorAll('.navigation-dot');

        this.prevButton.addEventListener('click', () => this.showPreviousTestimonial());
        this.nextButton.addEventListener('click', () => this.showNextTestimonial());
        this.navigationDots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.showTestimonial(index));
        });

        this.showTestimonial(0);
    }

    showTestimonial(index) {
        this.currentIndex = index;
        this.carouselTrack.style.transform = `translateX(-${index * 100}%)`;
        this.updateNavigationDots();
    }

    showNextTestimonial() {
        this.showTestimonial((this.currentIndex + 1) % this.testimonials.length);
    }

    showPreviousTestimonial() {
        this.showTestimonial((this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length);
    }

    updateNavigationDots() {
        this.navigationDots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('bg-cyan-600');
                dot.classList.remove('bg-gray-300');
            } else {
                dot.classList.remove('bg-cyan-600');
                dot.classList.add('bg-gray-300');
            }
        });
    }
}

customElements.define('testimonials-section', TestimonialsSection);