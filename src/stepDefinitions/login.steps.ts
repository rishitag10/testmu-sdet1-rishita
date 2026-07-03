import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../hooks/customWorld";
import { LoginPage } from "../pages/LoginPage";

Given("I launch the OrangeHRM application", async function (this: CustomWorld) {

    const loginPage = new LoginPage(this.page);

    await loginPage.openApplication();

});

When(
    "I login with username {string} and password {string}",
    async function (this: CustomWorld, username: string, password: string) {

        const loginPage = new LoginPage(this.page);

        await loginPage.login(username, password);

    }
);

Then("I should be redirected to the dashboard", async function (this: CustomWorld) {

    const loginPage = new LoginPage(this.page);

    await loginPage.verifyDashboard();

});

Then("I should see the login error message", async function (this: CustomWorld) {

    const loginPage = new LoginPage(this.page);

    await loginPage.verifyLoginError();

});

Then("I should see validation messages", async function (this: CustomWorld) {

    const loginPage = new LoginPage(this.page);

    await loginPage.verifyValidationMessages();

});