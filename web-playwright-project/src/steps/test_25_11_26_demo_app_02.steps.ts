import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue, resolveTokens } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & { 
    email?: string; 
    password?: string; 
    firstName?: string; 
    lastName?: string; 
    scriptValue?: string;
};

async function performRegistration(world: JourneyWorld, data: { [key: string]: string }) {
    const registerPage = new RegisterPage(world.page);
    world.email = resolveTokens(data.emailAddress);
    world.password = data.password;
    world.firstName = resolveTokens(data.firstName);
    world.lastName = resolveTokens(data.lastName);

    await registerPage.fillFirstName(world.firstName);
    await registerPage.fillLastName(world.lastName);
    await registerPage.fillEmailAddress(world.email);
    if (data.mobileNumber) {
        await registerPage.fillMobileNumber(data.mobileNumber);
    }
    await registerPage.fillAge(data.ageYears);
    await registerPage.selectGender(data.gender);
    await registerPage.fillPassword(world.password);
    await registerPage.fillConfirmPassword(world.password);
    await registerPage.checkTerms();
    await registerPage.clickCreateAccount();
}

Given('I register a new user', async function (this: JourneyWorld) {
    await this.page.goto('http://localhost:3000/register');
    await performRegistration(this, {
        firstName: '{{random.firstName}}',
        lastName: '{{random.lastName}}',
        emailAddress: '{{random.email}}',
        ageYears: '30',
        gender: 'Male',
        password: 'Password123!',
        mobileNumber: '+1234567890'
    });
});

Given('I register a new user with a script in the first name', async function (this: JourneyWorld) {
    this.scriptValue = generateValue('comment', 'security');
    await this.page.goto('http://localhost:3000/register');
    await performRegistration(this, {
        firstName: this.scriptValue,
        lastName: 'XSS',
        emailAddress: '{{random.email}}',
        ageYears: '40',
        gender: 'Other',
        password: 'XssPass123!',
        mobileNumber: '1122334455'
    });
});

When('I attempt to register the same user again', async function (this: JourneyWorld) {
    await this.page.goto('http://localhost:3000/register');
    await performRegistration(this, {
        firstName: this.firstName || 'DefaultFirst',
        lastName: this.lastName || 'DefaultLast',
        emailAddress: this.email || 'default@test.com',
        ageYears: '30',
        gender: 'Male',
        password: this.password || 'Password123!',
        mobileNumber: '+1234567890'
    });
});

When('I proceed to the login page', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    await registerPage.clickGoToLogin();
    await expect(this.page).toHaveURL(/.*\/login/);
});

When('I log in as the new user', async function (this: JourneyWorld) {
    if (!this.email || !this.password) {
        throw new Error('User credentials (email, password) not found in world context.');
    }
    const loginPage = new LoginPage(this.page);
    const otpPage = new OtpPage(this.page);
    
    await loginPage.login(this.email, this.password);
    await otpPage.submitOtp(requireEnv('APP_OTP'));
});

Then('I should see the registration success message', async function (this: CustomWorld) {
    await expect(this.page.getByRole('heading', { name: 'Registration successful' })).toBeVisible();
});

Then('I should be on the dashboard page', async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/.*\/dashboard/);
    await expect(this.page.getByRole('heading', { name: 'Welcome back, Test' })).toBeVisible();
});

When('I navigate to my profile and back to the dashboard', async function (this: CustomWorld) {
    const dashboardPage = new DashboardPage(this.page);
    const profilePage = new ProfilePage(this.page);
    await dashboardPage.clickProfileLink();
    await expect(this.page).toHaveURL(/.*\/profile/);
    // Per project memory, profile name is hardcoded to 'Test User', not the registered name.
    await expect(profilePage.getProfileNameElement()).toHaveText('Test User');
    await profilePage.clickBackToDashboard();
    await expect(this.page).toHaveURL(/.*\/dashboard/);
});

When('I log out', async function (this: CustomWorld) {
    const dashboardPage = new DashboardPage(this.page);
    await dashboardPage.clickLogout();
});

Then('I should be logged out', async function (this: CustomWorld) {
    // Per SESSION discovery, logout lands on /login.
    await expect(this.page).toHaveURL(/.*\/login/);
    await expect(this.page.getByRole('link', { name: 'Login' })).toBeVisible();
});

Then('the injected script should be displayed as plain text on the profile page', async function (this: JourneyWorld) {
    if (!this.scriptValue) {
        throw new Error('Script value not found in world context.');
    }
    const profilePage = new ProfilePage(this.page);
    // Per project memory, profile name is hardcoded to 'Test User'. We check the 'First name' definition list item.
    await expect(profilePage.getFirstNameDefinition()).toHaveText(this.scriptValue);
});
