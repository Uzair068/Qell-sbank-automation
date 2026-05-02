import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  timeout: 30000,

  reporter: [
    ['html', { open: 'always' }],
    ['list'],
    ['allure-playwright'],
  ],

use: {
  baseURL: process.env.BASE_URL || 'https://demo.guru99.com/V4',
  headless: process.env.CI ? true : false, // ← hidden in CI
  ignoreHTTPSErrors: true,
  launchOptions: {
      slowMo: 400,          // ← Slows down Playwright operations by 100ms (great for learning)
    },
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry',
},

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/manager.json',
      },
      dependencies: ['setup'],
    },
  ],
});