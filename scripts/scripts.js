// Nav Bar
document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle the side menu's visibility
    function toggleMenu() {
        var menu = document.getElementById("side-menu");
        // Check if the menu is currently closed (width is 0px or unset)
        // If so, open it by setting width to 250px; otherwise, close it by setting width to 0px
        if (menu.style.width === "0px" || menu.style.width === "") {
            menu.style.width = "250px";
        } else {
            menu.style.width = "0px";
        }
    }

    // Function to close the side menu
    function closeMenu() {
        // Set the menu's width to 0px to close it immediately
        document.getElementById("side-menu").style.width = "0px";
    }

    // Add an event listener to the menu icon for toggling the side menu
    document.querySelector('.menu-icon').addEventListener('click', toggleMenu);
    // Add an event listener to the close button for closing the side menu
    document.querySelector('.close-btn').addEventListener('click', closeMenu);

});

// Contact Us Form Validation
document.addEventListener('DOMContentLoaded', function () {
    // Get references to form elements and related UI components
    const form = document.getElementById('contact-form');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const charCounter = document.getElementById('char-counter');
    const successBanner = document.getElementById('success-banner');

    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Update character count for the message field
    messageField.addEventListener('input', function () {
        const messageLength = messageField.value.length;
        charCounter.textContent = `${messageLength}/250`;

        // Check if the message exceeds the character limit
        if (messageLength > 250) {
            messageField.classList.add('exceeded');
            document.getElementById('message-error').textContent = "You can directly email us at poudelrohan58@gmail.com";
        } else {
            messageField.classList.remove('exceeded');
            document.getElementById('message-error').textContent = "";
        }
    });

    // Form submission validation and handling
    form.addEventListener('submit', function (e) {
        // Prevent the default form submission behavior
        e.preventDefault();

        let hasError = false;

        // Validate the name field (must be between 3 and 30 characters)
        if (nameField.value.length < 3 || nameField.value.length > 30) {
            document.getElementById('name-error').textContent = "Name must be at least 3 characters long";
            nameField.classList.add('exceeded');
            hasError = true;
        } else {
            document.getElementById('name-error').textContent = "";
            nameField.classList.remove('exceeded');
        }

        // Validate the email field (must be a valid format and less than 50 characters)
        if (emailField.value.length > 50 || !emailRegex.test(emailField.value)) {
            document.getElementById('email-error').textContent = "Please enter a valid email";
            emailField.classList.add('exceeded');
            hasError = true;
        } else {
            document.getElementById('email-error').textContent = "";
            emailField.classList.remove('exceeded');
        }

        // Validate the message field (must be between 3 and 250 characters)
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

        // If no validation errors exist, submit the form
        if (!hasError) {
            // Clear the form fields and reset the character counter
            nameField.value = "";
            emailField.value = "";
            messageField.value = "";
            charCounter.textContent = "0/250";

            // Display the success banner for 5 seconds
            successBanner.textContent = "Thank you! Your message has been sent.";
            successBanner.style.display = "block";
            setTimeout(() => {
                successBanner.style.display = "none";
            }, 5000);
        }
    });
});

// Investing Form Validation
document.addEventListener('DOMContentLoaded', function () {
    // Get reference to the form element
    const form = document.querySelector('form');

    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
        // Define an array of compulsory fields with their corresponding IDs and names
        const compulsoryFields = [
            { id: 'company', name: 'Company Symbol' },
            { id: 'current-price', name: 'Current Price' },
            { id: 'holding-time', name: 'Holding Time' },
            { id: 'pe-ratio', name: 'P/E Ratio' },
            { id: 'book-value', name: 'Book Value' },
            { id: '50day-ma', name: '50-Day Moving Average' },
            { id: 'rsi', name: 'Current RSI' }
        ];

        // Define an array of Bollinger Band fields with their corresponding IDs and names
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

            // Check if the input field is empty
            if (inputElement.value.trim() === '') {
                isValid = false;
                // Show error message if field is empty
                errorElement.textContent = `${field.name} is required.`;
                errorElement.style.display = 'block';
                // Add error class to the input field
                inputElement.classList.add('error');
            } else {
                // Hide error message if field is not empty
                errorElement.textContent = '';
                errorElement.style.display = 'none';
                // Remove error class from the input field
                inputElement.classList.remove('error');
            }
        });

        // Validate Bollinger Band fields if any of them are filled
        const bbUpper = document.getElementById('bb-upper').value.trim();
        const bbMid = document.getElementById('bb-mid').value.trim();
        const bbLower = document.getElementById('bb-lower').value.trim();

        if (bbUpper || bbMid || bbLower) {
            // If any Bollinger Band field is filled, ensure all are filled
            bollingerFields.forEach(function(field) {
                const inputElement = document.getElementById(field.id);
                const errorElement = document.getElementById(`${field.id}-error`);

                if (inputElement.value.trim() === '') {
                    isValid = false;
                    // Show error message if any Bollinger Band field is empty
                    errorElement.textContent = `All Bollinger Band values are required`;
                    errorElement.style.display = 'block';
                    // Add error class to the input field
                    inputElement.classList.add('error');
                } else {
                    // Hide error message if the field is not empty
                    errorElement.textContent = '';
                    errorElement.style.display = 'none';
                    // Remove error class from the input field
                    inputElement.classList.remove('error');
                }
            });
        }

        // If the form is invalid, prevent form submission
        if (!isValid) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });
});

// Local Storage for Dark Mode
document.addEventListener('DOMContentLoaded', function() {
    // Check if dark mode was enabled in the previous session
    if (localStorage.getItem('dark-mode') === 'enabled') {
        enableDarkMode(); // Enable dark mode if it was previously enabled
        document.getElementById('mode-toggle').checked = true; // Set the toggle switch to "checked"
    }

    // Add event listener for the dark mode toggle switch
    document.getElementById('mode-toggle').addEventListener('change', function() {
        if (this.checked) {
            enableDarkMode(); // Enable dark mode when the toggle is switched on
            localStorage.setItem('dark-mode', 'enabled'); // Save the dark mode status to localStorage
        } else {
            disableDarkMode(); // Disable dark mode when the toggle is switched off
            localStorage.setItem('dark-mode', 'disabled'); // Save the dark mode status to localStorage
        }
    });
});

// Enable Dark Mode
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

// Disable Dark mode
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

// screenshot validation 3MB, png, jpg, jpeg
document.addEventListener('DOMContentLoaded', function () {
    // Get reference to the file input element
    const fileInput = document.getElementById('chart-upload');

    // Add event listener for when a file is selected
    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0]; // Get the selected file
        const allowedExtensions = ['image/png', 'image/jpeg', 'image/jpg']; // Allowed file types
        const maxSize = 3 * 1024 * 1024; // Maximum allowed file size (3MB in bytes)

        if (file) {
            // Check if the selected file type is not allowed
            if (!allowedExtensions.includes(file.type)) {
                alert('Invalid file type. Please upload a PNG, JPEG, or JPG file.');
                fileInput.value = ''; // Clear the file input to allow for a new selection
            } 
            // Check if the selected file size exceeds the allowed limit
            else if (file.size > maxSize) {
                alert('File size exceeds 3MB. Please upload a smaller file.');
                fileInput.value = ''; // Clear the file input to allow for a new selection
            }
        }
    });
});

// header to the home page
document.addEventListener("DOMContentLoaded", function() {
    // Get reference to the button element with the class 'head-button'
    let button = document.querySelector(".head-button");

    // Add a click event listener to the button
    button.addEventListener("click", function() {
        // Redirect the user to the 'index.html' page in the parent directory
        window.location.href = "../index.html";
    });
});

// Footer to github page
document.addEventListener("DOMContentLoaded", function() {
    // Get reference to the button element with the class 'foot-button-github'
    const button = document.querySelector(".foot-button-github");

    // Add a click event listener to the button
    button.addEventListener("click", function() {
        // Open the GitHub URL in a new browser tab/window
        window.open("https://github.com/rohanrajpoudel", "_blank");
    });
});

// basic-advance toggle
document.addEventListener("DOMContentLoaded", function() {
    // Get the toggle switch element for basic/advanced investing
    const toggleSwitch = document.getElementById('basic-advance-toggle');
    
    // Add event listener for toggle switch change
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
            if (localStorage.getItem('dark-mode') === 'enabled') {
                mainForm.setAttribute('class', 'section big dark-mode');
            } else {
                mainForm.setAttribute('class', 'section big');
            }
        } else {
            heading.textContent = 'Start Investing (Basic)';
            advancedFields.style.display = 'none';
            tooltip.setAttribute('title', 'Advance Investing Off');
            if (localStorage.getItem('dark-mode') === 'enabled') {
                mainForm.setAttribute('class', 'section small dark-mode');
            } else {
                mainForm.setAttribute('class', 'section small');
            }
        }

        // Apply dark mode class if dark mode is enabled
        if (isDarkModeEnabled) {
            mainForm.classList.add('dark-mode');
        }
    });

    // Apply dark mode class to the main form on initial load if dark mode is enabled
    if (isDarkModeEnabled) {
        const mainForm = document.getElementById('main-form');
        mainForm.classList.add('dark-mode');
    }
});

// home, about, contact, invest switcher
document.addEventListener('DOMContentLoaded', function() {
    // Function to show a specific section and hide the others
    function showSection(section) {
        // Get references to all the sections by their IDs
        const homeSection = document.getElementById('home-section');
        const aboutSection = document.getElementById('about-section');
        const contactSection = document.getElementById('contact-section');
        const investSection = document.getElementById('invest-section');

        // Hide all sections by setting their display style to 'none'
        homeSection.style.display = 'none';
        aboutSection.style.display = 'none';
        contactSection.style.display = 'none';
        investSection.style.display = 'none';

        // Show the requested section based on the 'section' parameter
        if (section === 'home') {
            homeSection.style.display = 'block'; // Show the Home section
        } else if (section === 'about') {
            aboutSection.style.display = 'block'; // Show the About section
        } else if (section === 'contact') {
            contactSection.style.display = 'block'; // Show the Contact section
        } else if (section === 'invest') {
            investSection.style.display = 'block'; // Show the Invest section
        }
    }

    // Add click event listener for the "Start Investing" button
    document.querySelector('.start-invest').addEventListener('click', function() {
        showSection('invest'); // Show the Invest section when the button is clicked
    });

    // Add click event listeners to the other menu items for navigation
    document.getElementById('home').addEventListener('click', function() {
        showSection('home'); // Show the Home section when clicked
    });

    document.getElementById('about').addEventListener('click', function() {
        showSection('about'); // Show the About section when clicked
    });

    document.getElementById('contact').addEventListener('click', function() {
        showSection('contact'); // Show the Contact section when clicked
    });

    // Initially show the Home section when the page loads
    showSection('home');
});


