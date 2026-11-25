import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
  get profileHeading() { return this.page.getByRole('heading', { name: 'Test User' }); }
  get backToDashboardLink() { return this.page.getByRole('link', { name: '← Back to dashboard' }); }
}
