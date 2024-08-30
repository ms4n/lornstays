async function loadHTML(url) {
    const response = await fetch(url);
    return await response.text();
}

class FooterComponent extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const content = await loadHTML('components/footer-component.html');
        this.innerHTML = content;
        this.updateYear();
        this.initializeSmoothTransitions();
    }

    updateYear() {
        const yearElement = this.querySelector('#current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    initializeSmoothTransitions() {
        const links = this.querySelectorAll('a');
        links.forEach(link => {
            link.classList.add('transition', 'duration-300', 'ease-in-out');
        });

        const socialIcons = this.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.classList.add('transition', 'duration-300', 'ease-in-out', 'transform', 'hover:scale-110');
        });
    }
}

customElements.define('footer-component', FooterComponent);