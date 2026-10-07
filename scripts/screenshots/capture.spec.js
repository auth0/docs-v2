'use strict';

// One Playwright test per manifest entry: open the Dashboard deep link, run the entry's steps,
// mask volatile elements, and compare the cropped element against the committed image.
//
//   npm run diff                      diff every entry not yet approved; writes -actual/-diff on failure
//   npm run capture -- --grep @x      overwrite the committed images for one section
//   CAPTURE_ALL=1 npm run diff        include approved entries too

const fs = require('node:fs');
const path = require('node:path');
const { test, expect } = require('@playwright/test');
const manifest = require('./lib/manifest');
const tenant = require('./lib/tenant');

const STORAGE_STATE = path.join(__dirname, 'storageState.json');
const LOGIN_RE = /\/login|\/u\/login|\/authorize|auth0\.com\/u\//;

const entries = manifest.load().filter((e) => (process.env.CAPTURE_ALL ? true : e.status !== 'approved' && e.status !== 'rewritten'));

test.beforeAll(() => {
  if (!fs.existsSync(STORAGE_STATE)) throw new Error('storageState.json is missing. Run `npm run auth` first.');
});

async function runStep(page, step) {
  if (step.click) return page.locator(step.click).first().click();
  if (step.hover) return page.locator(step.hover).first().hover();
  if (step.fill) return page.locator(step.fill.selector).first().fill(step.fill.value);
  if (step.waitFor) return page.locator(step.waitFor).first().waitFor({ state: 'visible' });
  if (step.wait) return page.waitForTimeout(step.wait);
  throw new Error(`Unknown step: ${JSON.stringify(step)}`);
}

for (const entry of entries) {
  const problems = manifest.validate(entry);
  test(`${entry.id} @${manifest.sectionOf(entry)}`, async ({ page }) => {
    test.skip(problems.length > 0, `manifest entry invalid: ${problems.join(', ')}`);
    test.skip(!entry.dashboardUrl, 'dashboardUrl not filled in yet');

    const url = await tenant.resolveUrl(entry.dashboardUrl);
    await page.goto(url, { waitUntil: 'networkidle' });
    if (LOGIN_RE.test(page.url())) throw new Error('Redirected to login: the saved session expired. Run `npm run auth`.');

    for (const step of entry.steps || []) await runStep(page, step);

    const target = page.locator(entry.crop || 'main').first();
    await target.waitFor({ state: 'visible' });
    await target.scrollIntoViewIfNeeded();

    await expect(target).toHaveScreenshot(manifest.snapshotName(entry), {
      mask: (entry.mask || []).map((sel) => page.locator(sel)),
    });
  });
}

if (entries.length === 0) {
  test('manifest has no pending entries', () => {
    console.log('Nothing to capture. Add entries to manifest.json or set CAPTURE_ALL=1.');
  });
}
