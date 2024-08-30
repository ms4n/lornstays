async function loadHTML(url) {
    const response = await fetch(url);
    return await response.text();
}

class HeroSection extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const content = await loadHTML('components/hero-section.html');
        this.innerHTML = content;
        this.initializeComponent();
    }

    initializeComponent() {
        this.setupParallaxEffect();
        this.setupAnimations();
    }

    setupParallaxEffect() {
        const heroSection = this.querySelector('#hero-section');
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrollPosition = window.pageYOffset;
                heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
            });
        }
    }

    setupAnimations() {
        const headline = this.querySelector('#hero-headline');
        const subheadline = this.querySelector('#hero-subheadline');
        
        if (headline) {
            headline.classList.add('animate__animated', 'animate__fadeInDown');
        }
        
        if (subheadline) {
            subheadline.classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-1s');
        }
    }
}

customElements.define('hero-section', HeroSection);