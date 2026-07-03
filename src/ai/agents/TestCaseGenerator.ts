import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

async function generateTests() {
  if (!process.env.GEMINI_API_KEY) {
    console.log("❌ Missing GEMINI_API_KEY");
    return;
  }

  const prompt = `
You are a Senior QA Engineer.

Generate BDD test cases in Gherkin format for:
1. Login Page (valid, invalid, empty credentials)
2. Dashboard
3. REST API

Return only valid Gherkin feature content.
`;

  console.log("🤖 Generating test cases using Gemini...\n");

  const response = await ai.models.generateContent({
    model: process.env.MODEL || "gemini-2.5-flash",
    contents: prompt,
  });

  const output = response.text || "";

  console.log(output);

  const outputDir = path.join(process.cwd(), "src/features/generated");
  fs.mkdirSync(outputDir, { recursive: true });

  fs.writeFileSync(
    path.join(outputDir, "ai-generated-tests.feature"),
    output
  );

  console.log("\n✅ Feature file generated successfully.");
}

generateTests().catch(console.error);