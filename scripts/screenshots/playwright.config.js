'use strict';

// Playwright Test config for Dashboard screenshot capture and diffing.
// Snapshots are the committed images under main/docs/images, so `playwright test` is the diff
// mode (fails when the live Dashboard differs) and `--update-snapshots` is the capture mode.

const path = require('node:path');
const { defineConfig } = require('@playwright/test');

const STORAGE_STATE = path.join(__dirname, 'storageState.json');

module.exports = defineConfig({
  testDir: __dirname,
  fullyParallel: false,
  workers: 2,
  retries: 0,
  timeout: 90_000,
  reporter: [['list'], ['json', { outputFile: path.join(__dirname, 'test-results', 'results.json') }]],
  outputDir: path.join(__dirname, 'test-results'),

  // toHaveScreenshot(['dashboard', 'applications', 'x-light.png']) -> main/docs/images/dashboard/applications/x-light.png
  snapshotPathTemplate: '{testDir}/../../main/docs/images/{arg}{ext}',

  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
    },
  },

  use: {
    baseURL: process.env.DASHBOARD_BASE_URL || 'https://manage.auth0.com',
    browserName: 'chromium',
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    locale: 'en-US',
    timezoneId: 'UTC',
    trace: 'retain-on-failure',
  },

  projects: [
    { name: 'setup', testMatch: /auth\.setup\.js/ },
    { name: 'capture', testMatch: /capture\.spec\.js/, use: { storageState: STORAGE_STATE } },
  ],
});
