const { expect } = require("@playwright/test");

class Assert {

    constructor(page) {
        this.page = page;
    }

    async assertTitle(title) {
        await expect(this.page).toHaveTitle(title);
    }

    async assertTitleContains(title) {
        const pageTitle = await this.page.title();
        expect(pageTitle).toContain(title);
    }

    async assertURL(url) {
        await expect(this.page).toHaveURL(url);
    }

    async assertURLContains(title) {
        const pageURL = this.page.url();
        expect(pageURL).toContain(title);
    }

}

module.exports = Assert;