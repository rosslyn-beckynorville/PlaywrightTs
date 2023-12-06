import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test'

var path = require('path');
export const STORAGE_STATE = path.join(__dirname, '.auth/user.json');

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 7000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  workers: 5,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
      baseURL: 'https://auth-dev.rosslyn.ai/',
      headless: true,
      screenshot: 'on',
      video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'Chrome - Logged In',
      testIgnore: '**/*authtests.spec.ts',
      use: {
        ...devices['Desktop Chrome'], 
        channel: 'chrome',
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },
    {
      name: 'Chrome - Logged Out',
      testMatch: '**/*authtests.spec.ts',
      use: {
        ...devices['Desktop Chrome'], 
        channel: 'chrome',
      }
    },
    {
      name: 'Mobile Safari - Logged In',
      testIgnore: '**/*authtests.spec.ts',
      use: {
        ...devices['iPhone 13'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },
    {
      name: 'Mobile Safari - Logged Out',
      testMatch: '**/*authtests.spec.ts',
      use: {
        ...devices['iPhone 13'],
      },
    },
  ],
};

export default config;
