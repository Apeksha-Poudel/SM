function getStoredFormData() {
    const storedData = localStorage.getItem('investingFormData');
    if (storedData) {
        return JSON.parse(storedData);
    }
    return null;
}
function generateAPIRequestPayload(formData) {
    return {
        model: "davinci", // You can use models like ada, babbage, curie, or davinci
        question: `Based on the following data, please provide an analysis and prediction: ${JSON.stringify(formData)}`,
        examples: [
            {
                question: "Based on the following data: {\"company\": \"AAPL\", \"currentPrice\": \"150.00\", \"peRatio\": \"25.00\"}, what is the future outlook?",
                answer: "The future outlook for AAPL looks promising given the stable P/E ratio and current price trends."
            }
        ],
        examples_context: "You are a financial advisor providing predictions based on stock market data.",
        documents: [], // Leave empty as we're using examples and context
        search_model: "davinci",
        max_rerank: 10,
        temperature: 0.7,
        max_tokens: 150
    };
}
function getAPIResponse(payload) {
    fetch("https://api.turboline.ai/openai/answers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 75e5c3f6d7bd4a3ca277fe2cc97ea695" // Replace with your actual primary API key
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        displayAPIResponse(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayAPIResponse(data) {
    const responseElement = document.getElementById('api-response');
    responseElement.textContent = data.answers[0];
}

document.querySelector('.analyze-button').addEventListener('click', function() {
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
    if (formData) {
        const apiPayload = generateAPIRequestPayload(formData);
        getAPIResponse(apiPayload);
    } else {
        console.error("No form data found in Local Storage.");
    }
});

