import { test, expect } from '@playwright/test';
import { config } from '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('Record_26_11_26_demoapp_01.recorded');

test('TC5', async ({ page }) => {
  await test.step('Navigate to login page and sign in to reach OTP screen', async () => {
    await page.goto(new URL('/login', config.baseUrl).toString());
    await page.getByRole('textbox', { name: 'Email' }).fill(data.TC5.username);
    await page.getByRole('textbox', { name: 'Password' }).fill(data.TC5.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL(new RegExp('/otp'));
  });

  await test.step('Enter a non-numeric character in an OTP field', async () => {
    await page.getByRole('textbox', { name: 'Digit 1' }).fill('a');
  });

  await test.step('Verify the field remains empty', async () => {
    await expect(page.getByRole('textbox', { name: 'Digit 1' })).toBeEmpty();
  });
});
