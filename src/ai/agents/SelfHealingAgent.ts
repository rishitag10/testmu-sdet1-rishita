import { Page, Locator } from "@playwright/test";
import fs from "fs";
import path from "path";
import { geminiClient, GEMINI_MODEL } from "../../utils/geminiClient";

interface HealingRecord {
  originalSelector: string;
  healedSelector: string;
  description: string;
  timestamp: string;
}

const HISTORY_PATH = path.join(process.cwd(), "self-healing-history.json");
const MAX_DOM_CHARS = 15000;

export class SelfHealingAgent {
  constructor(private page: Page) {}

  async findElement(locators: string[], description: string): Promise<Locator> {
    for (const selector of locators) {
      const locator = this.page.locator(selector);
      if ((await locator.count()) > 0) return locator;
    }

    console.log(`⚠️ All known locators failed for "${description}". Attempting AI healing...`);

    const history = this.loadHistory();
    const pastHeal = history.find(h => h.description === description);
    if (pastHeal) {
      const cached = this.page.locator(pastHeal.healedSelector);
      if ((await cached.count()) > 0) {
        console.log(`♻️ Reusing previously healed selector: "${pastHeal.healedSelector}"`);
        return cached;
      }
    }

    const suggested = await this.askLLMForSelector(locators, description);
    const healedLocator = this.page.locator(suggested);

    if ((await healedLocator.count()) > 0) {
      this.saveHealing(locators[0], suggested, description, history);
      console.log(`🤖 AI healed "${description}" → "${suggested}"`);
      return healedLocator;
    }

    throw new Error(
      `❌ Self-healing failed for "${description}". Tried: [${locators.join(", ")}], AI suggested: "${suggested}" (not found).`
    );
  }

  private async askLLMForSelector(failedLocators: string[], description: string): Promise<string> {
    const domSnapshot = (await this.page.content()).slice(0, MAX_DOM_CHARS);

    const prompt = `
You are a test automation engineer fixing a broken Playwright locator.

Element description: "${description}"
These CSS selectors were tried and none matched: ${JSON.stringify(failedLocators)}

Current page HTML (truncated):
${domSnapshot}

Return ONLY the single best CSS selector for the described element.
No explanation, no markdown, no quotes — just the raw selector.
`;

    try {
      const response = await geminiClient.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
      });
      const raw = (response.text || "").trim();
      return raw.replace(/^```[a-z]*|```$/g, "").replace(/^["']|["']$/g, "").trim();
    } catch (err) {
      throw new Error(`Gemini call failed during self-healing: ${(err as Error).message}`);
    }
  }

  private loadHistory(): HealingRecord[] {
    if (!fs.existsSync(HISTORY_PATH)) return [];
    try {
      return JSON.parse(fs.readFileSync(HISTORY_PATH, "utf-8"));
    } catch {
      return [];
    }
  }

  private saveHealing(original: string, healed: string, description: string, history: HealingRecord[]) {
    history.push({ originalSelector: original, healedSelector: healed, description, timestamp: new Date().toISOString() });
    fs.writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2));
  }
}