const { chromium, firefox, webkit } = require('playwright');
const config = require('../../../config');

const options = {
    headless: config.headless,
};

const invokeBrowser = async () => {
    //console.log('launch options:', options);
    switch (config.browser) {
        case 'chrome':
            return await chromium.launch(options);

        case 'firefox':
            return await firefox.launch(options);

        case 'webkit':
            return await webkit.launch(options);

        default:
            throw new Error(`Unsupported browser: ${config.browser}`);
    }
};

module.exports = {
    invokeBrowser
};