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
            }, 10000);
        }
    });
});

// Investing Form Validation and generating text analysis
document.addEventListener('DOMContentLoaded', function () {
    // Get reference to the form element
    const form = document.querySelector('form');
    const resultContainer = document.getElementById('result-container');
    const analysisContainer = document.getElementById('analysis-container');
    const investFormContainer = document.getElementById('invest-section');
    const summarizedQuestion = document.getElementById('question-from-user');
    const analysisResultAI = document.getElementById('analysis-from-ai');

    // Currency symbols mapping
    const currencySymbols = {
        'NASDAQ': '$',
        'NEPSE': 'NPR',
        'LSE': '£',
        'HKEX': 'HKD',
        'BSE SENSEX': 'INR',
        'JPX': 'Yen'
    };

    // Add event listener for form submission
    form.addEventListener('submit', async function(event) { // <-- Added async here
        event.preventDefault(); // Prevent the default form submission behavior

        // Define an array of compulsory fields with their corresponding IDs and names
        const compulsoryFields = [
            { id: 'exchange', name: 'Stock Exchange' },
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
        let formData = {}; // Initialize formData as an empty object

        // Validate compulsory fields
        let rsiValue = 0;
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
                // Special validation for RSI
                rsiValue = parseFloat(inputElement.value.trim());
                if (field.id === 'rsi') {
                    if (isNaN(rsiValue) || rsiValue < 0 || rsiValue > 100) {
                        isValid = false;
                        errorElement.textContent = `${field.name} must be a number between 0 and 100.`;
                        errorElement.style.display = 'block';
                        inputElement.classList.add('error');
                    } else {
                        errorElement.textContent = '';
                        errorElement.style.display = 'none';
                        inputElement.classList.remove('error');
                        formData[field.id] = inputElement.value.trim();
                    }
                } else {
                    // Hide error message if field is not empty and valid
                    errorElement.textContent = '';
                    errorElement.style.display = 'none';
                    // Remove error class from the input field
                    inputElement.classList.remove('error');
                    // Add the field to formData if it has a value
                    formData[field.id] = inputElement.value.trim();
                }
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
                    errorElement.textContent = `All Bollinger Band values are required.`;
                    errorElement.style.display = 'block';
                    // Add error class to the input field
                    inputElement.classList.add('error');
                } else {
                    // Hide error message if the field is not empty
                    errorElement.textContent = '';
                    errorElement.style.display = 'none';
                    // Remove error class from the input field
                    inputElement.classList.remove('error');
                    // Add the field to formData if it has a value
                    formData[field.id] = inputElement.value.trim();
                }
            });
        }

        // Handle optional advanced fields
        const advancedFields = [
            '100day-ma', '200day-ma', 'alpha-value', 'beta-value', 
            'dividend-yield', 'de-ratio', 'market-sentiment'
        ];

        advancedFields.forEach(function(fieldId) {
            const inputElement = document.getElementById(fieldId);
            if (inputElement && inputElement.value.trim() !== '') {
                formData[fieldId] = inputElement.value.trim();
            }
        });

        // Handle file upload (if any)
        const chartUploadElement = document.getElementById('chart-upload');
        if (chartUploadElement && chartUploadElement.files.length > 0) {
            formData['chart-upload'] = chartUploadElement.files[0].name;
        }

        // If the form is valid, proceed with processing the formData
        if (isValid) {
            // Hide the form
            form.style.display = 'none';

            // Construct the analysis text
            const stockName = formData['company'];
            const exchangeName = formData['exchange'];
            const currentPrice = formData['current-price'];
            rsiValue = formData['rsi'];
            const ma50Value = formData['50day-ma'];
            const sentimentValue = formData['market-sentiment'];
            const holdingTime = formData['holding-time'];
            const currencySymbol = currencySymbols[exchangeName] || '';
            
            let analysisText = `
                <p>What will happen to ${stockName} listed in ${exchangeName} within the next ${holdingTime}? Here are the supporting data for you to decide:</p>
                <div id="result-columns" class="result-columns">`;
            let messageToAPI = ``;
            let otherData = ``;
            
            let fields = compulsoryFields.concat(bollingerFields, advancedFields.map(fieldId => {
                let labelElement = document.querySelector(`label[for='${fieldId}']`);
                let labelName = labelElement ? labelElement.textContent.trim() : fieldId.replace(/-/g, ' ');
            
                // Remove any non-essential characters like 'ⓘ' from the label name
                labelName = labelName.replace(/ ⓘ/g, '').trim(); // Removes ⓘ or similar characters
            
                return {
                    id: fieldId,
                    name: labelName
                };
            }));
            
            fields.forEach(field => {
                if (formData[field.id]) {
                    let value = formData[field.id];
                    // Add currency symbol for relevant fields
                    if (['current-price', 'book-value', '50day-ma', '100day-ma', '200day-ma', 'bb-upper', 'bb-mid', 'bb-lower'].includes(field.id)) {
                        value = `${currencySymbol} ${value}`;
                    }
            
                    analysisText += `
                        <div class="result-item">
                            <span class="field-name">${field.name} :&emsp;</span>
                            <span class="field-value">${value}</span>
                        </div>`;
                    if (!['company', 'current-Price', 'exchange', 'rsi', '50day-ma', 'market-sentiment', 'holding-time'].includes(field.id)) {
                        otherData += `${field.name} : ${value}\n`;
                    }
                }
            });
            messageToAPI += `(For educational purposes) I was looking at ${stockName} stock listed in ${exchangeName} trading at ${currencySymbol}${currentPrice}. I see that the current RSI is ${rsiValue} and 50-day MA is ${currencySymbol}${ma50Value}. I don't know much but I feel the current market sentiment is ${sentimentValue}. On further investigating the financial report of this company, I found out the following:`
            messageToAPI += `\n${otherData}`
            messageToAPI += `\nI've already planned my investment, and I had planned it using only these matrices. Now I want to check if my planning coincides with an AI model like you, and hence asking you. What do you think taking a long position, a short position or taking no position at all is good for the next ${holdingTime}? `
            messageToAPI += `\nJust tell me the following things:`
            messageToAPI += `\n1. Long Position or short Position or no position?`
            messageToAPI += `\n2. Buy Price with Stoploss for Long Position.`
            messageToAPI += `\n3. Sell Price with Stoploss for Short Position.`
            messageToAPI += `\n4. Target price (How much profit can I expect?)`;

            analysisText += `</div>`;
            summarizedQuestion.innerHTML = analysisText;
            investFormContainer.style.display = 'none';
            resultContainer.style.display = 'block';   
            analysisContainer.style.display = 'block';   
            const messageFromAPI = await generateAPIRequest(messageToAPI); // <-- Added await here
            // Convert markdown to HTML using Showdown
            const converter = new showdown.Converter();
            const htmlContent = converter.makeHtml(messageFromAPI);
            analysisResultAI.textContent = htmlContent;
        } else {
            console.log('Form validation failed');
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
document.addEventListener("DOMContentLoaded", function() {
    // Function to handle smooth scrolling to the target section
    function smoothScroll(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Event listeners for each menu item
    document.getElementById("home").addEventListener("click", function() {
        smoothScroll("home-section");
    });

    document.getElementById("about").addEventListener("click", function() {
        smoothScroll("about-section");
    });

    document.getElementById("contact").addEventListener("click", function() {
        smoothScroll("contact-section");
    });

    document.querySelector(".start-invest").addEventListener("click", function() {
        smoothScroll("invest-section");
    });
});

// save form data into the local storage
function storeFormData() {
    const formData = {
        exchange: document.getElementById('exchange').value,
        company: document.getElementById('company').value,
        currentPrice: document.getElementById('current-price').value,
        holdingTime: document.getElementById('holding-time').value,
        peRatio: document.getElementById('pe-ratio').value,
        bookValue: document.getElementById('book-value').value,
        MA50: document.getElementById('50day-ma').value,
        rsi: document.getElementById('rsi').value,
        MA100: document.getElementById('100day-ma').value,
        MA200: document.getElementById('200day-ma').value,
        bbUpper: document.getElementById('bb-upper').value,
        bbMid: document.getElementById('bb-mid').value,
        bbLower: document.getElementById('bb-lower').value,
        alphaValue: document.getElementById('alpha-value').value,
        betaValue: document.getElementById('beta-value').value,
        dividendYield: document.getElementById('dividend-yield').value,
        deRatio: document.getElementById('de-ratio').value,
        marketSentiment: document.getElementById('market-sentiment').value,
        chartUpload: document.getElementById('chart-upload').value,
    };

    localStorage.setItem('investingFormData', JSON.stringify(formData));
}

async function generateAPIRequest(messageToAPI) { // <-- Already async
    const apiUrl = 'https://api.turboline.ai/openai/chat/completions';
    const apiKey = '75e5c3f6d7bd4a3ca277fe2cc97ea695';

    const requestBody = {
        model: "gpt-4o",
        messages: [{
            role: "user",
            content: messageToAPI
        }],
        temperature: 1,
        top_p: 1,
        n: 1,
        stream: false,
        stop: null,
        max_tokens: 4096,
        presence_penalty: 0,
        frequency_penalty: 0,
        logit_bias: null,
        user: "test-user"
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'X-TL-Key': apiKey
        },
        body: JSON.stringify(requestBody)
    });

    const responseBody = await response.json();
    return responseBody.choices[0].message.content;
}
