import { BasePage } from './BasePage.js';

export class OtpPage extends BasePage {
  getDigitInput(digit: number) { return this.page.getByRole('textbox', { name: `Digit ${digit}` }); }
  get submitButton() { return this.page.getByRole('button', { name: 'Submit' }); }

  async enterOtp(otp: string): Promise<void> {
    const digits = otp.split('');
    for (let i = 0; i < digits.length; i++) {
      await this.fill(this.getDigitInput(i + 1), digits[i]);
    }
    await this.click(this.submitButton);
    await this.page.waitForURL((url) => !url.pathname.includes('/otp'));
  }
}
