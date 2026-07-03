import { expect, Locator, Page } from "@playwright/test";
import { BASE_URL } from "../../config/env";
import { SelfHealingAgent } from "../ai/agents/SelfHealingAgent";

export class LoginPage {

    readonly page: Page;

    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly dashboardHeader: Locator;
    readonly errorMessage: Locator;
    readonly usernameValidation: Locator;
    readonly passwordValidation: Locator;
    private healer: SelfHealingAgent;

    constructor(page: Page) {

        this.page = page;

        this.username = page.locator("input[name='username']");
        this.password = page.locator("input[name='password']");
        this.loginButton = page.locator("button[type='submit']");
        this.dashboardHeader = page.locator("h6");
        this.errorMessage = page.locator(".oxd-alert-content-text");
        this.usernameValidation = page.locator("input[name='username'] + span");
        this.passwordValidation = page.locator("input[name='password'] + span");
        this.healer = new SelfHealingAgent(page);
    }

    async openApplication() {
    await this.page.goto(BASE_URL, {
        waitUntil: "domcontentloaded",
        timeout: 120000 // 2 minutes
    });

    await this.username.waitFor({
        state: "visible",
        timeout: 60000
    });
    }   

    async login(username: string, password: string) {

    const usernameField = await this.healer.findElement(
  ["#username", "input[placeholder='Username']", "input[name='username']"],
  "username input field"
);

const passwordField = await this.healer.findElement(
    ["input[name='password']", "input[placeholder='Password']", "#password"],
    "password input field"
);

const loginButton = await this.healer.findElement(
    ["button[type='submit']", "button:has-text('Login')", ".oxd-button"],
    "login submit button"
);

    await usernameField.fill(username);
    await passwordField.fill(password);

    await Promise.all([
        this.page.waitForLoadState("networkidle"),
        loginButton.click()
    ]);
}

    async verifyDashboard() {
        await expect(this.dashboardHeader).toHaveText("Dashboard");
    }

    async verifyLoginError() {
        await expect(this.errorMessage).toContainText("Invalid credentials");
    }

    async verifyValidationMessages() {
        await expect(this.page.locator("span.oxd-input-field-error-message")).toHaveCount(2);
    }
}