import { test, expect } from '@playwright/test';
import { config } from '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('Record_26_11_26_demoapp_01.recorded');

test('TC1', async ({ page }) => {
  await test.step('Open the landing page', async () => {
    await page.goto(new URL('/', config.baseUrl).toString());
  });

  await test.step('Click the "Login" link and verify URL', async () => {
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page).toHaveURL(new RegExp('/login'));
  });

  await test.step('Enter credentials and sign in', async () => {
    await page.getByRole('textbox', { name: 'Email' }).fill(data.TC1.username);
    await page.getByRole('textbox', { name: 'Password' }).fill(data.TC1.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
  });

  await test.step('Verify OTP page and enter code', async () => {
    await expect(page).toHaveURL(new RegExp('/otp'));
    await page.getByRole('textbox', { name: 'Digit 1' }).fill('1');
    await page.getByRole('textbox', { name: 'Digit 2' }).fill('2');
    await page.getByRole('textbox', { name: 'Digit 3' }).fill('3');
    await page.getByRole('textbox', { name: 'Digit 4' }).fill('4');
    await page.getByRole('textbox', { name: 'Digit 5' }).fill('5');
    await page.getByRole('textbox', { name: 'Digit 6' }).fill('6');
    await page.getByRole('button', { name: 'Submit' }).click();
  });

  await test.step('Verify dashboard and navigate to profile', async () => {
    await expect(page).toHaveURL(new RegExp('/dashboard'));
    await page.getByRole('link', { name: 'View profile →' }).click();
    await expect(page).toHaveURL(new RegExp('/profile'));
  });

  await test.step('Navigate back to dashboard', async () => {
    await page.getByRole('link', { name: '← Back to dashboard' }).click();
    await expect(page).toHaveURL(new RegExp('/dashboard'));
  });

  await test.step('Logout and verify', async () => {
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL(new RegExp('/login'));
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  });
});
