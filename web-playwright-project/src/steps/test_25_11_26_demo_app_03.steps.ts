import { When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type E2eWorld = CustomWorld & { email?: string; password?: string };

When('I register a new user with valid details', async function (this: E2eWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = requireEnv('APP_PASSWORD');

  await registerPage.firstName.fill('John');
  await registerPage.lastName.fill('Doe');
  await registerPage.emailAddress.fill(this.email);
  await registerPage.ageYears.fill('30');
  await registerPage.genderIdentity.selectOption('Male');
  await registerPage.accountPassword.fill(this.password);
  await registerPage.confirmPassword.fill(this.password);
  await registerPage.acceptTerms.check();
  await registerPage.createAccountButton.click();
});

When('I sign in as the new user', async function (this: E2eWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found in world context. Was a user registered in this scenario?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I enter the OTP', async function (this: CustomWorld) {
  const otpPage = new OtpPage(this.page);
  await otpPage.enterOtp(requireEnv('APP_OTP'));
});

When('I view my profile', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.goToProfile();
});

When('I go back to the dashboard', async function (this: CustomWorld) {
  const profilePage = new ProfilePage(this.page);
  await profilePage.goBackToDashboard();
});

When('I log out', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.logout();
});
