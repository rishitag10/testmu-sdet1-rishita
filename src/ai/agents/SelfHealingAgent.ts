import { Page, Locator } from "@playwright/test";

export class SelfHealingAgent {
  constructor(private page: Page) {}

  async findElement(locators: string[]): Promise<Locator> {
    for (const selector of locators) {
      const locator = this.page.locator(selector);

      if ((await locator.count()) > 0) {
        console.log(`✅ Self-Healing: Found element using "${selector}"`);
        return locator;
      }
    }

    throw new Error("❌ Self-Healing failed. No locator matched.");
  }
}