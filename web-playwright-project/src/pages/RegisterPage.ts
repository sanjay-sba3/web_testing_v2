import { BasePage } from './BasePage.js';

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

  async fillForm(data: Record<string, any>): Promise<void> {
    if (data.firstName) await this.fill(this.firstName, data.firstName);
    if (data.lastName) await this.fill(this.lastName, data.lastName);
    if (data.email) await this.fill(this.emailAddress, data.email);
    if (data.age) await this.fill(this.ageYears, data.age);
    if (data.gender) await this.select(this.genderIdentity, data.gender);
    if (data.password) await this.fill(this.accountPassword, data.password);
    const confirmPassword = data.confirmPassword ?? data.password;
    if (confirmPassword) await this.fill(this.confirmPassword, confirmPassword);
    if (data.acceptTerms) {
      await this.check(this.acceptTerms);
    } else {
      await this.uncheck(this.acceptTerms);
    }
  }

  async fillAndSubmit(data: Record<string, any>): Promise<void> {
    await this.fillForm(data);
    await this.click(this.createAccountButton);
  }
}
