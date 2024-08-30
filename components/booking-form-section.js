async function loadHTML(url) {
    const response = await fetch(url);
    return await response.text();
}

class BookingFormSection extends HTMLElement {
    constructor() {
        super();
        this.formData = {};
    }

    async connectedCallback() {
        const content = await loadHTML('components/booking-form-section.html');
        this.innerHTML = content;
        this.initializeForm();
    }

    initializeForm() {
        const form = this.querySelector('#booking-form');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }

        const inputs = this.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', this.handleInput.bind(this));
        });
    }

    handleInput(event) {
        const { name, value } = event.target;
        this.formData[name] = value;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validateForm()) {
            this.showMessage('Booking submitted successfully!', 'success');
            // Here you would typically send the data to a server
            console.log('Form data:', this.formData);
        }
    }

    validateForm() {
        let isValid = true;

        // Check if all required fields are filled
        const requiredFields = ['check-in', 'check-out', 'guests', 'property', 'name', 'email'];
        requiredFields.forEach(field => {
            const input = this.querySelector(`[name="${field}"]`);
            if (input && !input.value.trim()) {
                this.showError(input, 'This field is required');
                isValid = false;
            } else {
                this.clearError(input);
            }
        });

        // Validate date format and ensure check-out is after check-in
        const checkIn = new Date(this.formData['check-in']);
        const checkOut = new Date(this.formData['check-out']);
        if (checkOut <= checkIn) {
            const checkOutInput = this.querySelector('[name="check-out"]');
            this.showError(checkOutInput, 'Check-out date must be after check-in date');
            isValid = false;
        }

        // Validate email format
        const emailInput = this.querySelector('[name="email"]');
        if (emailInput && !this.isValidEmail(emailInput.value)) {
            this.showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        // Ensure number of guests is a positive integer
        const guestsInput = this.querySelector('[name="guests"]');
        if (guestsInput && (!Number.isInteger(Number(guestsInput.value)) || Number(guestsInput.value) <= 0)) {
            this.showError(guestsInput, 'Please enter a positive whole number');
            isValid = false;
        }

        return isValid;
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showError(input, message) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        } else {
            const error = document.createElement('p');
            error.textContent = message;
            error.classList.add('error-message', 'text-red-500', 'text-sm', 'mt-1');
            input.parentNode.insertBefore(error, input.nextSibling);
        }
        input.classList.add('border-red-500');
    }

    clearError(input) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.classList.add('hidden');
        }
        input.classList.remove('border-red-500');
    }

    showMessage(message, type) {
        const messageElement = this.querySelector('#form-message');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');
            if (type === 'error') {
                messageElement.classList.add('bg-red-100', 'text-red-700');
            } else {
                messageElement.classList.add('bg-green-100', 'text-green-700');
            }
            messageElement.classList.add('p-3', 'rounded', 'mb-4', 'transition-all', 'duration-300', 'ease-in-out');
            setTimeout(() => {
                messageElement.classList.add('hidden');
            }, 5000);
        }
    }
}

customElements.define('booking-form-section', BookingFormSection);