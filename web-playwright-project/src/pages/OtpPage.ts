import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';

export class OtpPage extends BasePage {
  get digitInputs() { return this.page.getByRole('group', { name: 'One-time password' }).getByRole('textbox'); }
  get submitButton() { return this.page.getByRole('button', { name: 'Submit' }); }

  async submitOtp(otp: string): Promise<void> {
    const digits = otp.split('');
    const inputs = this.digitInputs;
    for (let i = 0; i < digits.length; i++) {
      await this.fill(inputs.nth(i), digits[i]);
    }
    await this.click(this.submitButton);
    await this.page.waitForURL(/.*\/dashboard/);
    await expect(this.page.getByRole('heading', { name: 'Welcome back, Test' })).toBeVisible();
  }
}
