import { When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { OtpPage } from '../pages/OtpPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';
import { requireEnv } from '../support/config.js';

type UserDataWorld = CustomWorld & {
  registeredEmail?: string;
  registeredPassword?: string;
  registeredFirstName?: string;
  registeredLastName?: string;
};

// Helper function to resolve tokens for registration data
function resolveRegistrationData(data: {
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  mobileNumber?: string;
  ageYears?: string;
  genderIdentity?: string;
  accountPassword?: string;
  confirmPassword?: string;
  acceptTerms?: boolean;
}) {
  return {
    firstName: data.firstName || generateValue('firstName'),
    lastName: data.lastName || generateValue('lastName'),
    emailAddress: data.emailAddress || generateValue('email'),
    mobileNumber: data.mobileNumber || '',
    ageYears: data.ageYears || '25',
    genderIdentity: data.genderIdentity || 'Prefer not to say',
    accountPassword: data.accountPassword || 'P@ssword123',
    confirmPassword: data.confirmPassword || (data.accountPassword || 'P@ssword123'),
    acceptTerms: data.acceptTerms !== undefined ? data.acceptTerms : true,
  };
}

When('I register a new user with details:', async function (this: UserDataWorld, dataTable: any) {
  const data = dataTable.rowsHash();
  const resolvedData = resolveRegistrationData({
    firstName: data['First name'],
    lastName: data['Last name'],
    emailAddress: data['Email address'],
    mobileNumber: data['Mobile number'],
    ageYears: data['Age (years)'],
    genderIdentity: data['Gender identity'],
    accountPassword: data['Account password'],
    confirmPassword: data['Confirm password'],
    acceptTerms: data['Accept terms'] === 'true',
  });

  this.registeredFirstName = resolvedData.firstName;
  this.registeredLastName = resolvedData.lastName;
  this.registeredEmail = resolvedData.emailAddress;
  this.registeredPassword = resolvedData.accountPassword;

  const registerPage = new RegisterPage(this.page);
  await registerPage.register(resolvedData);
});

When('I log in with the registered user', async function (this: UserDataWorld) {
  if (!this.registeredEmail || !this.registeredPassword) {
    throw new Error('Registered email or password not set in World.');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.open('http://localhost:3000/login'); // Ensure we are on the login page
  await loginPage.login(this.registeredEmail, this.registeredPassword);
  // LoginPage.login now waits for /otp, so no additional wait here.
});

When('I fill OTP with {string}', async function (this: CustomWorld, otpCode: string) {
  const otpPage = new OtpPage(this.page);
  await otpPage.fillOtp(otpCode);
});

When('I fill OTP with the value of env {string}', async function (this: CustomWorld, envKey: string) {
  const otpCode = requireEnv(envKey);
  const otpPage = new OtpPage(this.page);
  await otpPage.fillOtp(otpCode);
});

When('I attempt to register with the previously registered email', async function (this: UserDataWorld) {
  if (!this.registeredEmail) {
    throw new Error('Registered email not set in World for re-registration attempt.');
  }
  const registerPage = new RegisterPage(this.page);
  await registerPage.register({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    emailAddress: this.registeredEmail,
    mobileNumber: '0987654321',
    ageYears: '25',
    genderIdentity: 'Female',
    accountPassword: 'SecurePass1!',
    confirmPassword: 'SecurePass1!',
    acceptTerms: true,
  });
});

Then('I should see the text of the registered first name', async function (this: UserDataWorld) {
  if (!this.registeredFirstName) {
    throw new Error('Registered first name not set in World.');
  }
  await expect(this.page.getByText(this.registeredFirstName).first()).toBeVisible();
});

Then('I should see the text of the registered last name', async function (this: UserDataWorld) {
  if (!this.registeredLastName) {
    throw new Error('Registered last name not set in World.');
  }
  await expect(this.page.getByText(this.registeredLastName).first()).toBeVisible();
});

Then('I should see the greeting for the registered user', async function (this: UserDataWorld) {
  if (!this.registeredFirstName) {
    throw new Error('Registered first name not set in World.');
  }
  // Assert only the fixed part "Hi," as per rules.
  await expect(this.page.getByText(`Hi,`).first()).toBeVisible();
});

Then('I should see the text "Welcome back, {string}"', async function (this: UserDataWorld, name: string) {
  // Assert only the fixed part "Welcome back," as per rules.
  await expect(this.page.getByText(`Welcome back,`).first()).toBeVisible();
});