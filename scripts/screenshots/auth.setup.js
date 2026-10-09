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

// The account used for login defaults to the OLD Dashboard UI until "Enable new navigation" is
// turned on from the account menu (top-right avatar). That menu is reached, the first time, by
// clicking through a one-time "Meet your new navigation" tour card (Maybe later -> Show me opens
// the menu). The toggle is a persisted account preference, not a one-time session thing, so this
// only has real work to do on a brand-new account; on later re-runs these are all no-ops.
async function enableNewNavigation(page) {
  try {
    await page.getByRole('button', { name: 'Accept All' }).first().click({ timeout: 3000 });
  } catch {
    // no cookie banner
  }
  try {
    await page.getByRole('button', { name: 'Maybe later' }).first().click({ timeout: 3000 });
    await page.getByRole('button', { name: 'Show me', exact: false }).first().click({ timeout: 3000 });
  } catch {
    // tour card not present (already dismissed on a prior run, or new-nav is already on)
  }
  try {
    const toggle = page.getByText('Enable new navigation');
    if (await toggle.count() > 0) {
      await toggle.first().click({ timeout: 3000 });
      await page.waitForTimeout(1500);
      console.log('Enabled new Dashboard navigation.');
    }
  } catch {
    // menu did not open, or new-nav already on; leave it, do not block login capture on this
  }
  // Close whatever menu/overlay might still be open before moving on.
  await page.keyboard.press('Escape').catch(() => {});
}

test('log in to the demo tenant and save the session', async ({ page }) => {
  test.setTimeout(LOGIN_TIMEOUT_MS + 30_000);
  await page.goto('/');
  console.log('\nLog in to the demo tenant in the browser window. The session is saved once the Dashboard loads.\n');
  await page.waitForURL(/\/dashboard\//, { timeout: LOGIN_TIMEOUT_MS });
  await page.waitForLoadState('networkidle');
  await enableNewNavigation(page);
  await page.context().storageState({ path: STORAGE_STATE });
  expect(fs.existsSync(STORAGE_STATE)).toBe(true);
  console.log(`Saved ${STORAGE_STATE}`);
});
