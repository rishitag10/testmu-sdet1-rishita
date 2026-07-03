import fs from "fs";
import path from "path";
import { geminiClient, GEMINI_MODEL } from "../../utils/geminiClient";

interface ModulePrompt {
  name: string;
  prompt: string;
}

const modules: ModulePrompt[] = [
  {
    name: "login",
    prompt: `Generate Gherkin BDD test cases for a Login page. Cover: valid credentials (successful login), invalid credentials (wrong password), empty username, empty password, and one edge case such as SQL injection attempt or excessive-length input.`,
  },
  {
    name: "dashboard",
    prompt: `Generate Gherkin BDD test cases for a Dashboard page shown after login. Cover: dashboard header is visible, left navigation menu is visible, user profile dropdown is visible, and logout navigates back to the login page.`,
  },
  {
    name: "api",
    prompt: `Generate Gherkin BDD test cases for a REST API (booking service). Cover: create booking returns 200 with a booking ID, get booking by ID returns correct data, update booking returns 200, and get booking with an invalid ID returns 404.`,
  },
];

async function generateFeature(module: ModulePrompt): Promise<void> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const fullPrompt = `
You are a Senior QA Engineer writing BDD test cases.

${module.prompt}

Requirements:
- Use proper Gherkin syntax (Feature, Scenario, Given/When/Then)
- Exactly ONE "Feature:" block
- Return ONLY the raw Gherkin content
- Do NOT wrap the output in markdown code fences
- Do NOT include any explanation text before or after the Gherkin
`;

  const response = await geminiClient.models.generateContent({
    model: GEMINI_MODEL,
    contents: fullPrompt,
  });

  let output = (response.text || "").trim();
  output = output.replace(/^```[a-z]*\n?/i, "").replace(/```$/, "").trim();

  if (!output.startsWith("Feature:")) {
    console.log(`⚠️ ${module.name}: output didn't start with "Feature:" — check manually.`);
  }

  const outputDir = path.join(process.cwd(), "src/features/generated");
  fs.mkdirSync(outputDir, { recursive: true });

  const outPath = path.join(outputDir, `${module.name}.feature`);
  fs.writeFileSync(outPath, output);
  console.log(`✅ ${module.name}.feature generated → ${outPath}`);
}

async function generateTests() {
  console.log("🤖 Generating test cases using Gemini...\n");

  for (const module of modules) {
    try {
      await generateFeature(module);
    } catch (err) {
      console.log(`❌ Failed to generate ${module.name}.feature: ${(err as Error).message}`);
    }
  }
}

generateTests().catch(console.error);