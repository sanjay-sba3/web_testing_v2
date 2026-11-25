import { Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class RegisterPage extends BasePage {
  get firstName(): Locator {
    return this.page.getByRole('textbox', { name: 'First name' });
  }

  get lastName(): Locator {
    return this.page.getByRole('textbox', { name: 'Last name' });
  }

  get emailAddress(): Locator {
    return this.page.getByRole('textbox', { name: 'Email address' });
  }

  get mobileNumber(): Locator {
    return this.page.getByRole('textbox', { name: 'Mobile number' });
  }

  get ageYears(): Locator {
    return this.page.getByRole('spinbutton', { name: 'Age (years)' });
  }

  get genderIdentity(): Locator {
    return this.page.getByRole('combobox', { name: 'Gender identity' });
  }

  get accountPassword(): Locator {
    return this.page.getByRole('textbox', { name: 'Account password' });
  }

  get confirmPassword(): Locator {
    return this.page.getByRole('textbox', { name: 'Confirm password' });
  }

  get acceptTerms(): Locator {
    return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' });
  }

  get createAccountButton(): Locator {
    return this.page.getByRole('button', { name: 'Create account' });
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    age: string,
    gender: string,
    password: string,
    confirmPass: string
  ): Promise<void> {
    await this.fill(this.firstName, firstName);
    await this.fill(this.lastName, lastName);
    await this.fill(this.emailAddress, email);
    await this.fill(this.ageYears, age);
    await this.select(this.genderIdentity, gender);
    await this.fill(this.accountPassword, password);
    await this.fill(this.confirmPassword, confirmPass);
    await this.check(this.acceptTerms);
    await this.click(this.createAccountButton);
  }
}
