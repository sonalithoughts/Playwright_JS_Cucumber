const { Page } = require("@playwright/test");

class PlaywrightWrapper {

    constructor(page) {
        this.page = page;
    }

    async goto(url) {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded"
        });
    }

    async waitAndClick(locator) {
    await locator.waitFor({
        state: "visible"
    });
    await locator.click();
}

    async navigateTo(link) {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click(link)
        ]);
    }

}

module.exports = PlaywrightWrapper;