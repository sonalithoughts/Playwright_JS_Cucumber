const { expect } = require("@playwright/test");
const PlaywrightWrapper = require('../helper/wrapper/PlaywrightWrapper');
const config = require("../../config");

class LoginPage {

    constructor(page) {
        this.page = page;
        this.base = new PlaywrightWrapper(page);

        // SauceDemo puts a data-test attribute on every key element
        this.userInput    = page.locator("[data-test='username']");
        this.password     = page.locator("[data-test='password']");
        this.loginBtn     = page.locator("[data-test='login-button']");
        this.errorMessage = page.locator("[data-test='error']");
        this.pageTitle    = page.locator("[data-test='title']");   // "Products" after login
    }

    async navigateToLoginPage() {
        await this.base.goto(config.baseUrl);
    }

    async enterUserName(username) {
        await this.userInput.fill(username);
    }

    async enterPassword(password) {
        await this.password.fill(password);
    }

    async clickLoginButton() {
        await this.base.waitAndClick(this.loginBtn);
    }

    async verifyLoginSuccessful() {
        await expect(this.page).toHaveURL(/inventory\.html/);
        await expect(this.pageTitle).toHaveText("Products");
    }

    async verifyLoginFailed(expectedError) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedError);
    }
}

module.exports = LoginPage;