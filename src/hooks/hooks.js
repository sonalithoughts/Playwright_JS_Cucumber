const {chromium, page, context} =require('@playwright/test');
const {Before, BeforeAll, After, AfterAll, AfterStep, Status} = require('@cucumber/cucumber');
const { invokeBrowser } = require('../helper/browsers/browserManager');
const allure = require('allure-js-commons');
const { ContentType } = require('allure-js-commons');
const fs = require('fs-extra');

let browser;

BeforeAll(async function() {

    browser = await invokeBrowser();

});

Before(async function(){

    this.context = await browser.newContext({
    recordVideo: { dir: 'test-results/videos/' }
});
    await this.context.tracing.start({ screenshots: true, snapshots: true, sources: true });
    this.page = await this.context.newPage();

});


AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED) {
    const screenshot = await this.page.screenshot();

    await this.attach(
      screenshot,
      'image/png'
    );
  }
});


After(async function ({ pickle, result }) {

    const name = pickle.name.replace(/[^a-z0-9]+/gi, '_');
    const video = this.page.video();

    if (result.status === Status.FAILED) {
        
        const tracePath = `./test-results/traces/${name}.zip`;
        await this.context.tracing.stop({ path: tracePath });
        await this.attach(await fs.readFile(tracePath), 'application/zip');
    }

    await this.page.close();
    await this.context.close();

if (video) {

    if (result.status === Status.FAILED) {
       await fs.move(
            await video.path(),
            `test-results/videos/${pickle.name.replace(/[^a-zA-Z0-9]/g, "_")}.webm`,
            { overwrite: true }
        );
    } else {
        await video.delete();
    }
}

});

AfterAll(async function () {
    await browser.close();
});