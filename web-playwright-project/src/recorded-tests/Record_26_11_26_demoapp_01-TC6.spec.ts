import { test, expect } from '@playwright/test';
import { config } from '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('Record_26_11_26_demoapp_01.recorded');

test('TC6', async ({ page }) => {
  await test.step('Attempt to open the dashboard page directly', async () => {
    await page.goto(new URL('/dashboard', config.baseUrl).toString());
  });

  await test.step('Verify redirection to the login page', async () => {
    await expect(page).toHaveURL(new RegExp('/login'));
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  });
});
