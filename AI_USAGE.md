# AI Usage Log

This document describes every AI tool used during the implementation of this assignment.

---

## 1. ChatGPT

### Purpose

ChatGPT was used as an engineering assistant throughout the development process.

### Tasks Performed

* Designed the Playwright + TypeScript project structure
* Assisted with Cucumber framework setup
* Helped implement the Page Object Model (POM)
* Generated and refined Playwright automation code
* Assisted with REST API automation using Axios
* Helped debug Playwright, Cucumber, and TypeScript issues
* Assisted in implementing the Self-Healing Agent
* Helped integrate Google Gemini for AI-generated test cases
* Assisted in resolving framework configuration and execution issues
* Helped document the project

---

## 2. Google Gemini API

### Purpose

Google Gemini was integrated into the framework to automatically generate production-ready BDD test cases.

### Prompt Used

Generate production-ready BDD test cases in Gherkin format for:

* Login module
* Dashboard module
* REST API module

Requirements:

* Use proper Gherkin syntax
* Include Feature and Scenario definitions
* Return only valid feature file content

### Output

The generated feature file is automatically saved to:

```
src/features/generated/ai-generated-tests.feature
```

---

## AI-Assisted Features Delivered

### AI Test Case Generation

Generates Gherkin feature files automatically for supported modules.

---

### Self-Healing Agent

A self-healing mechanism attempts alternative locator strategies when the primary locator fails, reducing maintenance caused by UI changes.

---

## Outcome

AI was used to enhance productivity by:

* Reducing manual test case creation
* Assisting with automation framework development
* Improving debugging efficiency
* Demonstrating AI-assisted test automation capabilities through test generation and self-healing techniques
