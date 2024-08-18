
---

# SM Analyzer

**SM Analyzer** is a cutting-edge AI-powered platform designed to assist investors in analyzing and predicting stock market trends with precision. This tool was developed during the **Turboline Hackathon** in August 2024 and utilizes advanced algorithms along with OpenAI APIs to deliver comprehensive insights into the stock market, aiding users in making informed investment decisions.

## Important Usage Information

To use the SM Analyzer, please visit [this link](https://apeksha-poudel.github.io/SM/).

**Note:** Due to Cross-Origin Resource Sharing (CORS) restrictions, it is necessary to disable web security in your browser to access and utilize the full functionality of the SM Analyzer. This step is essential as the CORS policy prevents the website from making requests to external servers, which is required for the analyzer to fetch and process the necessary data.

### How to Disable Web Security

If you are using Windows, follow these steps to disable web security in Google Chrome:

1. Open the Command Prompt (`cmd`).
2. Navigate to the directory where `chrome.exe` is located. This is usually found in the Chrome application folder.
3. Run the following command:
   ```bash
   chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
   ```
4. Press `Enter`.

This will launch a new session of Chrome with web security disabled. Please note that this configuration should only be used for development and testing purposes, as disabling web security can expose your browser to potential security risks.

## Project Overview

SM Analyzer offers two primary modes of operation:
- **Basic Analyzer**: Ideal for beginners, providing an intuitive interface and essential financial metrics.
- **Advanced Analyzer**: Tailored for seasoned investors, offering detailed financial indicators and technical analysis tools.

### Key Features
- **Global Stock Exchange Support**: Select and analyze stocks from various global exchanges, including NASDAQ, LSE, BSE SENSEX, and more.
- **Financial Metrics Evaluation**: Input and evaluate critical metrics such as P/E ratio, book value, RSI, moving averages, and more.
- **Advanced Analysis Tools**: Utilize advanced options like Bollinger Bands, Alpha/Beta values, debt-to-equity ratio, and dividend yield for in-depth analysis.
- **AI-Driven Pattern Recognition**: Upload chart screenshots for AI-driven pattern recognition and receive tailored investment predictions.
- **Dark Mode**: Toggle between light and dark mode for enhanced user experience.
- **User-Friendly Interface**: Easily switch between basic and advanced investing modes based on your preference and expertise.

## Project Structure

The project is structured as follows:

```
SM
│   LICENSE
│   README.md
│   index.html
│
├───css
│       styles.css
│
├───images
│       fb.png
│       gh.png
│       ln.png
│       pp.JPG
│       sm.png
│       stock-image.webp
│
└───scripts
        scripts.js
```

### Technologies Used
- **HTML**: For structuring the web pages.
- **CSS**: For styling the web pages and enhancing user experience.
- **JavaScript**: For adding interactivity and handling user actions.
- **OpenAI API**: Integrated to provide advanced stock prediction capabilities.

## Installation and Usage

To run the SM Analyzer locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/sm-analyzer.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd sm-analyzer
   ```
3. **Open `index.html` in your preferred web browser.**

That's it! You can now explore the features of SM Analyzer directly from your browser.

## Upcoming Features

### Enhanced OpenAI API Integration
We are continuously working to improve the integration of the OpenAI API to provide even more advanced stock prediction capabilities. This feature will allow users to receive AI-generated predictions based on the latest market trends and data, further enhancing the decision-making process for investors.

## About Turboline Hackathon

SM Analyzer was conceived and developed during the **Turboline Hackathon** in August 2024. This hackathon provided the platform and resources necessary to bring this project to life, enabling developers to create innovative solutions using AI and other advanced technologies.

For more information about the hackathon, visit: [Turboline Hackathon](https://turboline.ai/hackathon/).

## About the Creator

**Rohan Raj Poudel** is a graduate in Electronics Communication and Information Engineering, currently excelling as a QA Automation Engineer. He is passionate about lifelong learning, with interests in machine learning, data science, and artificial intelligence. Rohan has contributed to various projects and has been actively involved in training sessions focused on Robotics, Linux, and Python programming.

Connect with Rohan:
- [Facebook](https://www.facebook.com/rohanrajpoudel.58)
- [LinkedIn](https://www.linkedin.com/in/rcrrrpoudel/)
- [GitHub](https://github.com/rohanrajpoudel)

---
