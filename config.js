require('dotenv').config({ override: true, path: `src/helper/browsers/env/.env.${process.env.ENV}` });
const allowedBrowsers = ['chrome', 'firefox', 'webkit'];
const allowedEnvs = ['stage', 'prod', 'test'];

const config = {
  browser: process.env.BROWSER || 'chrome',
  env:     process.env.ENV    || 'prod',
  baseUrl: process.env.BASEURL || 'https://example.com',
  headless: process.env.HEAD === 'true'
};

//console.log('HEAD =', JSON.stringify(process.env.HEAD), '| headless =', config.headless);

if (!allowedBrowsers.includes(config.browser)) {
  throw new Error(`Invalid BROWSER: ${config.browser}`);
}

if (!allowedEnvs.includes(config.env)) {
  throw new Error(`Invalid ENV: ${config.env}`);
}

module.exports = config;