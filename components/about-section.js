async function loadHTML(url) {
    const response = await fetch(url);
    return await response.text();
}

class AboutSection extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const content = await loadHTML('components/about-section.html');
        this.innerHTML = content;
        this.initializeAnimation();
    }

    initializeAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__fadeIn');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const animatedElements = this.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));
    }
}

customElements.define('about-section', AboutSection);