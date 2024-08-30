async function loadHTML(url) {
    const response = await fetch(url);
    return await response.text();
}

class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.scrollThreshold = 50;
    }

    async connectedCallback() {
        const content = await loadHTML('components/header-component.html');
        this.innerHTML = content;
        this.initializeComponent();
    }

    initializeComponent() {
        this.setupMobileMenu();
        this.setupScrollEffect();
    }

    setupMobileMenu() {
        const mobileMenuButton = this.querySelector('#mobile-menu-button');
        const mobileMenu = this.querySelector('#mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }

    setupScrollEffect() {
        window.addEventListener('scroll', () => {
            const header = this.querySelector('header');
            if (header) {
                if (window.scrollY > this.scrollThreshold) {
                    header.classList.add('bg-gray-100', 'shadow-md');
                    header.classList.remove('bg-white');
                } else {
                    header.classList.remove('bg-gray-100', 'shadow-md');
                    header.classList.add('bg-white');
                }
            }
        });
    }
}

customElements.define('header-component', HeaderComponent);