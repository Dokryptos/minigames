import { defineConfig, devices } from '@playwright/test';

import * as dotenv from 'dotenv';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config();

export const STORAGE_STATE = new URL('./playwright/.auth/user.json', import.meta.url).pathname;
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  // screenshot: "only-on-failure",
  outputDir: 'playwright-report',
  snapshotDir: 'playwright-snapshots',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'line' : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

    actionTimeout: 0,
    baseURL: process.env.CI ? process.env.PREVIEW_URL : 'http://localhost:5137',
    trace: 'on-first-retry',
    screenshot: 'on',
    // if true then the browser will be launched in headless mode. Defaults to true unless the devtools option is true.
    headless: true,
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: 'setup.ts',
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], storageState: STORAGE_STATE },
    },
    // {
    //   name: 'firefox',
    //   dependencies: ['setup'],
    //   use: { ...devices['Desktop Firefox'], storageState: STORAGE_STATE },
    // },
    // {
    //   name: 'webkit',
    //   dependencies: ['setup'],
    //   use: { ...devices['Desktop Safari'], storageState: STORAGE_STATE },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  webServer: process.env.CI
    ? {
        url: process.env.PREVIEW_URL,
        command: 'echo "Running on CI"',
        reuseExistingServer: true,
      }
    : {
        command: 'pnpm dev --port 5137',
        port: 3000,
      },
});
