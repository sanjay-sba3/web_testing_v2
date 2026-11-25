import { Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class OtpPage extends BasePage {
  digitInput(n: number): Locator {
    return this.page.getByRole('textbox', { name: `Digit ${n}` });
  }

  get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Submit' });
  }

  async fillOtp(otp: string): Promise<void> {
    const digits = otp.split('');
    for (let i = 0; i < digits.length; i++) {
      await this.fill(this.digitInput(i + 1), digits[i]);
    }
  }
}
