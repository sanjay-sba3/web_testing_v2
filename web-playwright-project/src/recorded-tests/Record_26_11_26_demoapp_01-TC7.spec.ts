import { test, expect } from '@playwright/test';
import { config } from '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('Record_26_11_26_demoapp_01.recorded');

test('TC7', async ({ page }) => {
  await test.step('Open the landing page and navigate to login', async () => {
    await page.goto(new URL('/', config.baseUrl).toString());
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page).toHaveURL(new RegExp('/login'));
  });

  await test.step('Enter password only and click sign in', async () => {
    await page.getByRole('textbox', { name: 'Password' }).fill(data.TC7.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
  });

  await test.step('Verify form is not submitted and email field is invalid', async () => {
    await expect(page).toHaveURL(new RegExp('/login'));
    const emailField = page.getByRole('textbox', { name: 'Email' });
    expect(await emailField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
  });
});
