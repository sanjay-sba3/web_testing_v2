import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class ProfilePage extends BasePage {
  get backToDashboardLink() { return this.page.getByRole('link', { name: '← Back to dashboard' }); }

  getProfileNameElement(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  getFirstNameDefinition(): Locator {
    return this.page.locator('dt:text-is("First name") + dd');
  }

  async clickBackToDashboard(): Promise<void> {
    await this.click(this.backToDashboardLink);
  }
}
