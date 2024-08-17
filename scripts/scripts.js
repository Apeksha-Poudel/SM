document.addEventListener('DOMContentLoaded', function() {
    // Side Menu Toggle and Close Functions
    function toggleMenu() {
        var menu = document.getElementById("side-menu");
        // Toggle menu width between 0px (closed) and 250px (open)
        if (menu.style.width === "0px" || menu.style.width === "") {
            menu.style.width = "250px";
        } else {
            menu.style.width = "0px";
        }
    }

    function closeMenu() {
        // Directly set menu width to 0px to close it
        document.getElementById("side-menu").style.width = "0px";
    }

    // Add event listener for side menu toggle
    document.querySelector('.menu-icon').addEventListener('click', toggleMenu);
    // Add event listener for side menu close button
    document.querySelector('.close-btn').addEventListener('click', closeMenu);

});
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const charCounter = document.getElementById('char-counter');
    const successBanner = document.getElementById('success-banner');

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Character count update for the message field
    messageField.addEventListener('input', function () {
        const messageLength = messageField.value.length;
        charCounter.textContent = `${messageLength}/250`;

        if (messageLength > 250) {
            messageField.classList.add('exceeded');
            document.getElementById('message-error').textContent = "You can directly email us at poudelrohan58@gmail.com";
        } else {
            messageField.classList.remove('exceeded');
            document.getElementById('message-error').textContent = "";
        }
    });

    // Form submission validation
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let hasError = false;

        // Name validation
        if (nameField.value.length < 3 || nameField.value.length > 30) {
            document.getElementById('name-error').textContent = "Name must be at least 3 characters long";
            nameField.classList.add('exceeded');
            hasError = true;
        } else {
            document.getElementById('name-error').textContent = "";
            nameField.classList.remove('exceeded');
        }

        // Email validation
        if (emailField.value.length > 50 || !emailRegex.test(emailField.value)) {
            document.getElementById('email-error').textContent = "Please enter a valid email";
            emailField.classList.add('exceeded');
            hasError = true;
        } else {
            document.getElementById('email-error').textContent = "";
            emailField.classList.remove('exceeded');
        }

        // Message validation
        if (messageField.value.length < 3) {
            document.getElementById('message-error').textContent = "Message must be at least 3 characters long";
            messageField.classList.add('exceeded');
            hasError = true;
        } else if (messageField.value.length > 250) {
            messageField.classList.add('exceeded');
            document.getElementById('message-error').textContent = "You can directly email us at poudelrohan58@gmail.com";
            hasError = true;
        } else {
            messageField.classList.remove('exceeded');
            document.getElementById('message-error').textContent = "";
        }

        if (!hasError) {
            // Clear fields and show success banner
            nameField.value = "";
            emailField.value = "";
            messageField.value = "";
            charCounter.textContent = "0/250";
            successBanner.textContent = "Thank you! Your message has been sent.";
            successBanner.style.display = "block";

            setTimeout(() => {
                successBanner.style.display = "none";
            }, 5000);
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
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
                errorElement.textContent = `${field.name} is required.`;
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
                    errorElement.textContent = `All Bollinger Band value are required`;
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
});

document.addEventListener('DOMContentLoaded', function() {
    // Check if dark mode was previously enabled
    if (localStorage.getItem('dark-mode') === 'enabled') {
        enableDarkMode();
        document.getElementById('mode-toggle').checked = true;
    }

    // Add event listener for the toggle switch
    document.getElementById('mode-toggle').addEventListener('change', function() {
        if (this.checked) {
            enableDarkMode();
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            disableDarkMode();
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
});

function enableDarkMode() {
    document.body.classList.add('dark-mode');

    const elementsToToggle = [
        document.querySelector('.header'),
        document.querySelector('.footer'),
        document.querySelector('.side-menu'),
        ...document.querySelectorAll('input[type="text"]'),
        ...document.querySelectorAll('input[type="number"]'),
        ...document.querySelectorAll('textarea.large.message-box'),
        ...document.querySelectorAll('.menu-icon'),
        ...document.querySelectorAll('.side-menu ul li a'),
        ...document.querySelectorAll('.side-menu ul li a:hover'),
        ...document.querySelectorAll('.footer a'),
        ...document.querySelectorAll('.tooltip .tooltiptext'),
        ...document.querySelectorAll('select'),
        ...document.querySelectorAll('.close-btn'),
        ...document.querySelectorAll('.head-button'),
        ...document.querySelectorAll('.head-button:hover'),
        ...document.querySelectorAll('.foot-button-github'),
        ...document.querySelectorAll('.foot-button-github:hover'),
        ...document.querySelectorAll('.section.small'),
        ...document.querySelectorAll('.section.big'),
        ...document.querySelectorAll('input[type="file"]')
    ];

    elementsToToggle.forEach(element => {
        element.classList.add('dark-mode');
    });
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');

    const elementsToToggle = [
        document.querySelector('.header'),
        document.querySelector('.footer'),
        document.querySelector('.side-menu'),
        ...document.querySelectorAll('input[type="text"]'),
        ...document.querySelectorAll('input[type="number"]'),
        ...document.querySelectorAll('textarea.large.message-box'),
        ...document.querySelectorAll('.menu-icon'),
        ...document.querySelectorAll('.side-menu ul li a'),
        ...document.querySelectorAll('.side-menu ul li a:hover'),
        ...document.querySelectorAll('.footer a'),
        ...document.querySelectorAll('.tooltip .tooltiptext'),
        ...document.querySelectorAll('select'),
        ...document.querySelectorAll('.close-btn'),
        ...document.querySelectorAll('.head-button'),
        ...document.querySelectorAll('.head-button:hover'),
        ...document.querySelectorAll('.foot-button-github'),
        ...document.querySelectorAll('.foot-button-github:hover'),
        ...document.querySelectorAll('.section.small'),
        ...document.querySelectorAll('.section.big'),
        ...document.querySelectorAll('input[type="file"]')
    ];

    elementsToToggle.forEach(element => {
        element.classList.remove('dark-mode');
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('chart-upload');

    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        const allowedExtensions = ['image/png', 'image/jpeg', 'image/jpg'];
        const maxSize = 3 * 1024 * 1024; // 5MB in bytes

        if (file) {
            if (!allowedExtensions.includes(file.type)) {
                alert('Invalid file type. Please upload a PNG, JPEG, or JPG file.');
                fileInput.value = ''; // Clear the file input
            } else if (file.size > maxSize) {
                alert('File size exceeds 3MB. Please upload a smaller file.');
                fileInput.value = ''; // Clear the file input
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    let button = document.querySelector(".head-button");

    button.addEventListener("click", function() {
        window.location.href = "../index.html";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector(".foot-button-github");

    button.addEventListener("click", function() {
        window.open("https://github.com/rohanrajpoudel", "_blank");
    });
});

document.addEventListener("DOMContentLoaded", function() {
 // Advanced Investing Toggle Function
 const toggleSwitch = document.getElementById('basic-advance-toggle');
 toggleSwitch.addEventListener('change', function() {
     // Get the heading element
     const heading = document.getElementById('heading');
     // Get the advanced fields container
     const advancedFields = document.getElementById('advanced-fields');
     // Get the tooltip element
     const tooltip = document.getElementById('toggle-tooltip');
     // Get the main-form element
     const mainForm = document.getElementById('main-form');
     
     // Toggle between showing and hiding advanced fields
     if (toggleSwitch.checked) {
         heading.textContent = 'Start Investing (Advanced)';
         advancedFields.style.display = 'block';
         tooltip.setAttribute('title', 'Advance Investing On');
         mainForm.setAttribute('class', 'section big');
     } else {
         heading.textContent = 'Start Investing (Basic)';
         advancedFields.style.display = 'none';
         tooltip.setAttribute('title', 'Advance Investing Off');
         mainForm.setAttribute('class', 'section small');
     }
 });
});

document.addEventListener('DOMContentLoaded', function() {
    // Function to show a specific section and hide the others
    function showSection(section) {
        const homeSection = document.getElementById('home-section');
        const aboutSection = document.getElementById('about-section');
        const contactSection = document.getElementById('contact-section');
        const investSection = document.getElementById('invest-section');

        // Hide all sections
        homeSection.style.display = 'none';
        aboutSection.style.display = 'none';
        contactSection.style.display = 'none';
        investSection.style.display = 'none';

        // Show the requested section
        if (section === 'home') {
            homeSection.style.display = 'block';
        } else if (section === 'about') {
            aboutSection.style.display = 'block';
        } else if (section === 'contact') {
            contactSection.style.display = 'block';
        } else if (section === 'invest') {
            investSection.style.display = 'block';
        }
    }

    // Add click event listener for the "Start Investing" button
    document.querySelector('.start-invest').addEventListener('click', function() {
        showSection('invest');
    });

    // Add click event listeners to the other menu items
    document.getElementById('home').addEventListener('click', function() {
        showSection('home');
    });

    document.getElementById('about').addEventListener('click', function() {
        showSection('about');
    });

    document.getElementById('contact').addEventListener('click', function() {
        showSection('contact');
    });

    // Initially show the home section
    showSection('home');
});

