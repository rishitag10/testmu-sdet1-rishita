# TestMu AI SDET Assignment

## Overview

This repository contains an AI-powered test automation framework built using Playwright, TypeScript, Cucumber (BDD), and Axios.

The framework automates UI and API testing while demonstrating how AI can improve software testing through automatic test case generation and self-healing locators.

---

## Tech Stack

* Playwright
* TypeScript
* Cucumber (BDD)
* Axios
* Google Gemini API
* Node.js

---

## Project Structure

```
src
├── ai
│   └── agents
│       ├── SelfHealingAgent.ts
│       └── TestCaseGenerator.ts
├── api
│   └── LoginAPI.ts
├── features
│   ├── login.feature
│   ├── dashboard.feature
│   └── api.feature
├── hooks
├── pages
├── stepDefinitions
└── utils
```

---

## Features Implemented

### UI Automation

* Login with valid credentials
* Login with invalid credentials
* Login with empty credentials
* Dashboard header validation
* Left navigation menu validation
* User profile validation
* Logout functionality

### API Automation

Using the Restful Booker API:

* Create Booking
* Get Booking
* Update Booking

---

## AI Features

### AI Test Case Generator

The framework integrates Google Gemini to automatically generate production-ready Gherkin feature files for:

* Login module
* Dashboard module
* REST API module

Generated feature files are saved inside:

```
src/features/generated/
```

---

### Self-Healing Agent

A lightweight self-healing agent has been implemented to improve locator resilience.

Instead of relying on a single locator, the agent attempts multiple locator strategies before failing the test. This reduces maintenance effort when UI elements change.

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd testmu-sdet1-rishita
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file.

Example:

```env
BASE_URL=https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

GEMINI_API_KEY=your_api_key_here
```

---

## Running UI & API Tests

```bash
npm test
```

---

## Generating AI Test Cases

```bash
npm run generate-tests
```

The generated feature file will be stored in:

```
src/features/generated/ai-generated-tests.feature
```

---

## Design Patterns Used

* Page Object Model (POM)
* Cucumber BDD
* Hooks
* Reusable Page Classes
* API Utility Layer
* AI Agent Integration

---

## Future Improvements

* AI-powered failure explanation
* Flaky test detection
* Automatic locator learning
* Parallel execution
* Allure reporting

---

## Assignment Coverage

* ✅ Playwright Framework
* ✅ Cucumber BDD
* ✅ UI Automation
* ✅ REST API Automation
* ✅ AI Generated Test Cases
* ✅ Self-Healing Agent
* ✅ TypeScript
* ✅ Page Object Model
* ✅ GitHub Repository

---
