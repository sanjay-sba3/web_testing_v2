import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { config, requireEnv } from '../support/config.js';
import { loadTestData } from '../support/testData.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

When('I register a new user', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = 'ValidPass123!';

  await registerPage.fillForm({
    firstName: 'John',
    lastName: 'Doe',
    email: this.email,
    age: '30',
    gender: 'Male',
    password: this.password,
    confirmPassword: this.password,
    acceptTerms: true,
  });
  await registerPage.createAccountButton.click();
});

When('I sign in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('New user credentials not found in world context.');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);

  await this.page.waitForURL('**/otp');
  const otpPage = new OtpPage(this.page);
  const testData = loadTestData('test_25_11_26_demo_app_03');
  await otpPage.enterOtp(testData.otp);

  await this.page.waitForURL('**/dashboard');
});

When('I attempt to register with an existing email', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.fillForm({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com', // Pre-existing email
    age: '25',
    gender: 'Prefer not to say',
    password: 'password123',
    confirmPassword: 'password123',
    acceptTerms: true,
  });
  await registerPage.createAccountButton.click();
});

When('I fill the registration form with an invalid {string}', async function (this: CustomWorld, invalidField: string) {
  const registerPage = new RegisterPage(this.page);
  const validData = {
    firstName: 'Valid',
    lastName: 'User',
    email: generateValue('email'),
    age: '25',
    gender: 'Male',
    password: 'password123',
    confirmPassword: 'password123',
    acceptTerms: true,
  };

  await registerPage.fillForm(validData);

  switch (invalidField) {
    case 'First name':
      await registerPage.firstName.fill('');
      break;
    case 'Last name':
      await registerPage.lastName.fill('');
      break;
    case 'Email address':
      await registerPage.emailAddress.fill('invalid-email');
      break;
    case 'Age (years)':
      await registerPage.ageYears.fill('12'); // Below min 13
      break;
    case 'Confirm password':
      await registerPage.confirmPassword.fill('mismatched-password');
      break;
    case 'I accept the terms and conditions':
      await registerPage.acceptTerms.uncheck();
      break;
    default:
      throw new Error(`Invalid field specified for negative test: ${invalidField}`);
  }
});

Given('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open('http://localhost:3000/login');
  await loginPage.login(config.username, config.password);

  await this.page.waitForURL('**/otp');
  const otpPage = new OtpPage(this.page);
  await otpPage.enterOtp(requireEnv('APP_OTP'));

  await this.page.waitForURL('**/dashboard');
});
