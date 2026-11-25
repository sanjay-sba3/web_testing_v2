import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { loadTestData } from '../support/testData.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

const testData = await loadTestData('test_25_11_26_demo_app_03');

const getValidRegistrationData = (overrides = {}) => {
  return {
    firstName: 'John',
    lastName: 'Doe',
    email: generateValue('email'),
    age: '30',
    gender: 'Male',
    password: testData.password,
    acceptTerms: true,
    ...overrides,
  };
};

When('I register a new user', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  const data = getValidRegistrationData();
  this.email = data.email;
  this.password = data.password;
  await registerPage.fillAndSubmit(data);
});

When('I attempt to register with the email {string}', async function (this: JourneyWorld, email: string) {
  const registerPage = new RegisterPage(this.page);
  const data = getValidRegistrationData({ email });
  await registerPage.fillAndSubmit(data);
});

When('I sign in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found in world context');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I enter the correct OTP', async function (this: CustomWorld) {
  const otpPage = new OtpPage(this.page);
  await otpPage.enterOtp('123456');
});

When('I submit the registration form with the first name empty', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  const data = getValidRegistrationData({ firstName: '' });
  await registerPage.fillAndSubmit(data);
});

When('I submit the registration form with the last name empty', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  const data = getValidRegistrationData({ lastName: '' });
  await registerPage.fillAndSubmit(data);
});

When('I submit the registration form with mismatched passwords', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  const data = getValidRegistrationData();
  await registerPage.fillForm({ ...data, confirmPassword: 'different_password' });
  await registerPage.click(registerPage.createAccountButton);
});

When('I submit the registration form with an age of {string}', async function (this: CustomWorld, age: string) {
  const registerPage = new RegisterPage(this.page);
  const data = getValidRegistrationData({ age });
  await registerPage.fillAndSubmit(data);
});

When('I submit the registration form without accepting the terms', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  const data = getValidRegistrationData({ acceptTerms: false });
  await registerPage.fillAndSubmit(data);
});
