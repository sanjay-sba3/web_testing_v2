import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { config, requireEnv } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';

type JourneyWorld = CustomWorld & { firstName?: string; lastName?: string; email?: string; password?: string };

When('I register a new user with valid data', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.firstName = generateValue('firstName');
  this.lastName = generateValue('lastName');
  this.email = generateValue('email');
  this.password = 'ValidPassword123!';

  await registerPage.register(this.firstName, this.lastName, this.email, '30', 'Male', this.password, this.password);
});

When('I register with an existing email', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.register('Test', 'User', 'test@test.com', '25', 'Prefer not to say', 'password123', 'password123');
});

When('I sign in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found in world context.');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I enter the OTP', async function (this: CustomWorld) {
  const otpPage = new OtpPage(this.page);
  await otpPage.fillOtp(requireEnv('APP_OTP'));
});

Then('I should see the welcome message for the new user', async function (this: JourneyWorld) {
  if (!this.firstName) {
    throw new Error('First name not found in world context.');
  }
  await expect(this.page.getByRole('heading', { name: `Welcome back, ${this.firstName}` })).toBeVisible();
});

Then('I should see the profile name for the new user', async function (this: JourneyWorld) {
  if (!this.firstName || !this.lastName) {
    throw new Error('User name not found in world context.');
  }
  await expect(this.page.getByRole('heading', { name: `${this.firstName} ${this.lastName}` })).toBeVisible();
});

Given('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open('http://localhost:3000/login');
  await loginPage.login(config.username, config.password);
  await this.page.waitForURL('**/otp');
  const otpPage = new OtpPage(this.page);
  await otpPage.fillOtp(requireEnv('APP_OTP'));
  await otpPage.click(otpPage.submitButton);
  await this.page.waitForURL('**/dashboard');
});
