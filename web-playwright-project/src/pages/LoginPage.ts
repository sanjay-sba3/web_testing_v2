import { BasePage } from './BasePage.js';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get email() { return this.page.getByRole('textbox', { name: 'Email' }); }
  get password() { return this.page.getByRole('textbox', { name: 'Password' }); }
  get signIn() { return this.page.getByRole('button', { name: 'Sign in' }); }

  async login(user: string, pass: string): Promise<void> {
    await this.fill(this.email, user);
    await this.fill(this.password, pass);
    await this.click(this.signIn);
    // After clicking sign-in, the page should go to /otp
    await this.page.waitForURL(u => u.pathname.startsWith('/otp'));
  }
}