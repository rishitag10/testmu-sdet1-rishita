import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../hooks/customWorld";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

Given("I am logged into OrangeHRM", async function (this: CustomWorld) {

    const loginPage = new LoginPage(this.page);

    await loginPage.openApplication();
    await loginPage.login("Admin", "admin123");

});

Then("I should see the dashboard header", async function (this: CustomWorld) {

    const dashboardPage = new DashboardPage(this.page);

    await dashboardPage.verifyDashboardHeader();

});

Then("I should see the left navigation menu", async function (this: CustomWorld) {

    const dashboardPage = new DashboardPage(this.page);

    await dashboardPage.verifySideMenu();

});

Then("I should see the user profile icon", async function (this: CustomWorld) {

    const dashboardPage = new DashboardPage(this.page);

    await dashboardPage.verifyProfileIcon();

});

When("I logout", async function (this: CustomWorld) {

    const dashboardPage = new DashboardPage(this.page);

    await dashboardPage.logout();

});

Then("I should be redirected to login page", async function (this: CustomWorld) {

    const dashboardPage = new DashboardPage(this.page);

    await dashboardPage.verifyLoginPage();

});