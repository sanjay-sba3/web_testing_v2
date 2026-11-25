import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

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
  get createAccountButton() { return this.page.getByRole('button', { name: 'Create account' }); }
  get successHeading() { return this.page.getByRole('heading', { name: 'Registration successful' }); }
  get goToLoginLink() { return this.page.getByRole('link', { name: 'Go to login' }); }

  async fillFirstName(value: string) { await this.fill(this.firstName, value); }
  async fillLastName(value: string) { await this.fill(this.lastName, value); }
  async fillEmailAddress(value: string) { await this.fill(this.emailAddress, value); }
  async fillMobileNumber(value: string) { await this.fill(this.mobileNumber, value); }
  async fillAge(value: string) { await this.fill(this.ageYears, value); }
  async selectGender(option: string) { await this.select(this.genderIdentity, option); }
  async fillPassword(value: string) { await this.fill(this.accountPassword, value); }
  async fillConfirmPassword(value: string) { await this.fill(this.confirmPassword, value); }
  async checkTerms() { await this.check(this.acceptTerms); }
  async clickCreateAccount() { await this.click(this.createAccountButton); }
  async clickGoToLogin() { await this.click(this.goToLoginLink); }
}
