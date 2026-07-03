import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure"
  },

  timeout: 30000
});