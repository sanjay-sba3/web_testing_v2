import { test, expect } from '@playwright/test';
import { config } from '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('Record_26_11_26_demoapp_01.recorded');

test('TC2', async ({ page }) => {
  await test.step('Open the landing page and navigate to login', async () => {
    await page.goto(new URL('/', config.baseUrl).toString());
    await page.getByRole('link', { name: 'Login' }).click();
  });

  await test.step('Enter credentials and sign in', async () => {
    await page.getByRole('textbox', { name: 'Email' }).fill(data.TC2.username);
    await page.getByRole('textbox', { name: 'Password' }).fill(data.TC2.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
  });

  await test.step('Verify OTP page, paste code, and verify distribution', async () => {
    await expect(page).toHaveURL(new RegExp('/otp'));
    await page.getByRole('textbox', { name: 'Digit 1' }).fill('123456');
    await expect(page.getByRole('textbox', { name: 'Digit 2' })).toHaveValue('2');
    await expect(page.getByRole('textbox', { name: 'Digit 6' })).toHaveValue('6');
  });

  await test.step('Submit OTP and verify login', async () => {
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page).toHaveURL(new RegExp('/dashboard'));
    await expect(page.getByRole('heading', { name: /Welcome back/ })).toBeVisible();
  });
});
