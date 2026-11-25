import { BasePage } from './BasePage.js';

export class OtpPage extends BasePage {
  get digit1() { return this.page.getByRole('textbox', { name: 'Digit 1' }); }
  get submitButton() { return this.page.getByRole('button', { name: 'Submit' }); }

  async enterOtp(otp: string): Promise<void> {
    // Pasting into the first box populates all boxes
    await this.fill(this.digit1, otp);
    await this.click(this.submitButton);
    await this.page.waitForURL((u) => !u.pathname.startsWith('/otp'));
  }
}
