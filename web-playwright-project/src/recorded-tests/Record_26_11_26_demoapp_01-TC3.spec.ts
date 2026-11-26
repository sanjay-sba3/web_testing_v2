import { test, expect } from '@playwright/test';
import { config } from '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('Record_26_11_26_demoapp_01.recorded');

test('TC3', async ({ page }) => {
  await test.step('Navigate to login page and sign in to reach OTP screen', async () => {
    await page.goto(new URL('/login', config.baseUrl).toString());
    await page.getByRole('textbox', { name: 'Email' }).fill(data.TC3.username);
    await page.getByRole('textbox', { name: 'Password' }).fill(data.TC3.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL(new RegExp('/otp'));
  });

  await test.step('Enter incorrect OTP and submit', async () => {
    await page.getByRole('textbox', { name: 'Digit 1' }).fill('9');
    await page.getByRole('textbox', { name: 'Digit 2' }).fill('9');
    await page.getByRole('textbox', { name: 'Digit 3' }).fill('9');
    await page.getByRole('textbox', { name: 'Digit 4' }).fill('9');
    await page.getByRole('textbox', { name: 'Digit 5' }).fill('9');
    await page.getByRole('textbox', { name: 'Digit 6' }).fill('9');
    await page.getByRole('button', { name: 'Submit' }).click();
  });

  await test.step('Verify user remains on OTP page with an error', async () => {
    await expect(page).toHaveURL(new RegExp('/otp'));
    await expect(page).not.toHaveURL(new RegExp('/dashboard'));
    await expect(page.getByRole('status')).not.toBeEmpty();
  });
});
