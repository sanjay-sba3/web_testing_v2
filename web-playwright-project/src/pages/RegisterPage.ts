import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';

interface RegisterData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber?: string;
  ageYears: string;
  genderIdentity: string;
  accountPassword: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export class RegisterPage extends BasePage {
  get firstName() { return this.page.getByRole('textbox', { name: 'First name' }); }
  get lastName() { return this.page.getByRole('textbox', { name: 'Last name' }); }
  get emailAddress() { return this.page.getByRole('textbox', { name: 'Email address' }); }
  get mobileNumber() { return this.page.getByRole('textbox', { name: 'Mobile number' }); }
  get ageYears() { return this.page.getByRole('spinbutton', { name: 'Age (years)' }); }
  get genderIdentity() { return this.page.getByRole('combobox', { name: 'Gender identity' }); }
  get accountPassword() { return this.page.getByRole('textbox', { name: 'Account password' }); }
  get confirmPassword() { return this.page.getByRole('textbox', { name: 'Confirm password' }); }
  get acceptTerms() { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' }); }
  get createAccount() { return this.page.getByRole('button', { name: 'Create account' }); }
  get registrationSuccessfulHeading() { return this.page.getByRole('heading', { name: 'Registration successful', level: 2 }); }
  get goToLoginLink() { return this.page.getByRole('link', { name: 'Go to login' }); }

  async register(data: RegisterData): Promise<void> {
    await this.fill(this.firstName, data.firstName);
    await this.fill(this.lastName, data.lastName);
    await this.fill(this.emailAddress, data.emailAddress);
    if (data.mobileNumber) {
      await this.fill(this.mobileNumber, data.mobileNumber);
    }
    await this.fill(this.ageYears, data.ageYears);
    await this.select(this.genderIdentity, data.genderIdentity);
    await this.fill(this.accountPassword, data.accountPassword);
    await this.fill(this.confirmPassword, data.confirmPassword);
    if (data.acceptTerms) {
      await this.check(this.acceptTerms);
    }
    await this.click(this.createAccount);
    // Add a wait for the success message as a "page loaded" check for the success state
    await this.expectVisible(this.registrationSuccessfulHeading);
  }
}