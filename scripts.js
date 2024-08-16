// Handle the advanced toggle to show/hide advanced fields
document.getElementById('advance-toggle').addEventListener('change', function() {
    const container = document.querySelector('.container');
    const advancedFields = document.getElementById('advanced-fields');
    
    if (this.checked) {
        container.classList.add('full-page');
        advancedFields.style.display = 'block'; // Show advanced fields
    } else {
        container.classList.remove('full-page');
        advancedFields.style.display = 'none'; // Hide advanced fields
    }
});

// Handle form submission
document.querySelector('form').addEventListener('submit', function(event) {
    // Get all the compulsory fields
    const compulsoryFields = [
        { id: 'company', name: 'Company Symbol' },
        { id: 'current-price', name: 'Current Price' },
        { id: 'holding-time', name: 'Holding Time' },
        { id: 'pe-ratio', name: 'P/E Ratio' },
        { id: 'book-value', name: 'Book Value' },
        { id: '50day-ma', name: '50-Day Moving Average' },
        { id: 'rsi', name: 'Current RSI' }
    ];

    // Get all the Bollinger Band fields
    const bollingerFields = [
        { id: 'bb-upper', name: 'Bollinger Band - Upper' },
        { id: 'bb-mid', name: 'Bollinger Band - Middle' },
        { id: 'bb-lower', name: 'Bollinger Band - Lower' }
    ];

    let isValid = true; // Assume the form is valid initially

    // Validate compulsory fields
    compulsoryFields.forEach(function(field) {
        const inputElement = document.getElementById(field.id);
        const errorElement = document.getElementById(`${field.id}-error`);

        if (inputElement.value.trim() === '') {
            isValid = false;
            // Show error message
            errorElement.textContent = `${field.name} can't be empty.`;
            errorElement.style.display = 'block';
            // Add error class to input field
            inputElement.classList.add('error');
        } else {
            // Hide error message if input is not empty
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            // Remove error class from input field
            inputElement.classList.remove('error');
        }
    });

    // Validate Bollinger Band fields if any are filled
    const bbUpper = document.getElementById('bb-upper').value.trim();
    const bbMid = document.getElementById('bb-mid').value.trim();
    const bbLower = document.getElementById('bb-lower').value.trim();

    if (bbUpper || bbMid || bbLower) {
        bollingerFields.forEach(function(field) {
            const inputElement = document.getElementById(field.id);
            const errorElement = document.getElementById(`${field.id}-error`);

            if (inputElement.value.trim() === '') {
                isValid = false;
                // Show error message
                errorElement.textContent = `${field.name} is required if any Bollinger Band values are provided.`;
                errorElement.style.display = 'block';
                // Add error class to input field
                inputElement.classList.add('error');
            } else {
                // Hide error message if input is not empty
                errorElement.textContent = '';
                errorElement.style.display = 'none';
                // Remove error class from input field
                inputElement.classList.remove('error');
            }
        });
    }

    // If the form is invalid, prevent submission
    if (!isValid) {
        event.preventDefault(); // Prevent form submission
    }
});

document.getElementById('advance-toggle').addEventListener('change', function() {
    const tooltip = document.getElementById('toggle-tooltip');
    const heading = document.getElementById('heading');
    if (this.checked) {
        tooltip.title = 'Advance Investing On';
        heading.textContent = 'Start Investing (Advanced)';
    } else {
        tooltip.title = 'Advance Investing Off';
        heading.textContent = 'Start Investing (Basic)';
    }
});
