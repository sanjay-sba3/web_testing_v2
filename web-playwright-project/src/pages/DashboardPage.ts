import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  get welcomeHeading() { return this.page.getByRole('heading', { name: /Welcome back/ }); }
  get viewProfileLink() { return this.page.getByRole('link', { name: 'View profile →' }); }
  get logoutButton() { return this.page.getByRole('button', { name: 'Logout' }); }
}
