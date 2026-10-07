'use strict';

// One-time interactive login. Run headed, log in to the demo tenant by hand, and the browser
// session is written to storageState.json for every later capture run.
//
//   npm run auth        (= playwright test --project=setup --headed)
//
// Re-run when captures start failing with "Redirected to login".

const fs = require('node:fs');
const path = require('node:path');
const { test, expect } = require('@playwright/test');

const STORAGE_STATE = path.join(__dirname, 'storageState.json');
const LOGIN_TIMEOUT_MS = 10 * 60 * 1000;

test('log in to the demo tenant and save the session', async ({ page }) => {
  test.setTimeout(LOGIN_TIMEOUT_MS + 30_000);
  await page.goto('/');
  console.log('\nLog in to the demo tenant in the browser window. The session is saved once the Dashboard loads.\n');
  await page.waitForURL(/\/dashboard\//, { timeout: LOGIN_TIMEOUT_MS });
  await page.waitForLoadState('networkidle');
  await page.context().storageState({ path: STORAGE_STATE });
  expect(fs.existsSync(STORAGE_STATE)).toBe(true);
  console.log(`Saved ${STORAGE_STATE}`);
});
