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
    const content = await loadHTML(
      "components/featured-properties-section.html"
    );
    this.innerHTML = content;
    this.initializeCarousel();
  }

  initializeCarousel() {
    const carousel = this.querySelector("#featured-properties-carousel");
    const prevButton = this.querySelector("#prev-button");
    const nextButton = this.querySelector("#next-button");

    if (carousel && prevButton && nextButton) {
      const items = carousel.querySelectorAll(".carousel-item");
      const totalItems = items.length;

      const updateCarousel = () => {
        const isMobile = window.innerWidth < 768; // Adjust breakpoint as needed
        const itemsToShow = isMobile ? 1 : 3;

        items.forEach((item, index) => {
          const isVisible =
            index >= this.currentIndex &&
            index < this.currentIndex + itemsToShow;
          item.classList.toggle("hidden", !isVisible);
        });

        // Disable/enable buttons based on current index
        prevButton.disabled = this.currentIndex === 0;
        nextButton.disabled = this.currentIndex >= totalItems - itemsToShow;
      };

      prevButton.addEventListener("click", () => {
        this.currentIndex = Math.max(0, this.currentIndex - 1);
        updateCarousel();
      });

      nextButton.addEventListener("click", () => {
        const isMobile = window.innerWidth < 768;
        const itemsToShow = isMobile ? 1 : 3;
        this.currentIndex = Math.min(
          totalItems - itemsToShow,
          this.currentIndex + 1
        );
        updateCarousel();
      });

      // Initialize the carousel
      updateCarousel();

      // Update carousel on window resize
      window.addEventListener("resize", updateCarousel);
    }
  }
}

customElements.define("featured-properties-section", FeaturedPropertiesSection);
