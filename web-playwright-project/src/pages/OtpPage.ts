import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class OtpPage extends BasePage {
  getDigitBox(digit: number): Locator {
    return this.page.getByRole('textbox', { name: `Digit ${digit}` });
  }

  get submitButton(): Locator { return this.page.getByRole('button', { name: 'Submit' }); }

  async enterOtp(code: string): Promise<void> {
    const digits = code.split('');
    for (let i = 0; i < digits.length; i++) {
      await this.fill(this.getDigitBox(i + 1), digits[i]);
    }
    await this.click(this.submitButton);
  }
}
