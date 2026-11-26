const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const LoginPage = require('../../pageobjects/LoginPage');
const loginData = require('../../helper/util/testdata/loginUser.json');

setDefaultTimeout(60 * 1000);

Given('User navigates to the application', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.navigateToLoginPage();
});

When('User logs in as the {string}', async function (userType) {
    const user = loginData[userType];   // e.g. "validUser" -> { username, password }
    if (!user) {
        throw new Error(`No test data found for user type: "${userType}"`);
    }

    await this.loginPage.enterUserName(user.username);
    await this.loginPage.enterPassword(user.password);
    await this.loginPage.clickLoginButton();
});

Then('Login should be successful', async function () {
    await this.loginPage.verifyLoginSuccessful();
});

Then('Login should fail with error {string}', async function (errorMessage) {
    await this.loginPage.verifyLoginFailed(errorMessage);
});