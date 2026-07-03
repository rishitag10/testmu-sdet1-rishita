import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {

    readonly page: Page;

    readonly dashboardHeader: Locator;
    readonly sideMenu: Locator;
    readonly profileIcon: Locator;
    readonly logoutLink: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.dashboardHeader = page.locator("h6");
        this.sideMenu = page.locator(".oxd-sidepanel");
        this.profileIcon = page.locator(".oxd-userdropdown-tab");
        this.logoutLink = page.getByText("Logout");
        this.loginButton = page.locator("button[type='submit']");
    }

    async verifyDashboardHeader() {
        await expect(this.dashboardHeader).toHaveText("Dashboard");
    }

    async verifySideMenu() {
        await expect(this.sideMenu).toBeVisible();
    }

    async verifyProfileIcon() {
        await expect(this.profileIcon).toBeVisible();
    }

    async logout() {
        await this.profileIcon.click();
        await this.logoutLink.click();
    }

    async verifyLoginPage() {
        await expect(this.loginButton).toBeVisible();
    }

}