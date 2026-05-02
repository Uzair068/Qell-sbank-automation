import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly welcomeMessage: Locator;
  readonly newCustomerLink: Locator;
  readonly newAccountLink: Locator;
  readonly fundTransferLink: Locator;
  readonly balanceEnquiryLink: Locator;
  readonly miniStatementLink: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.locator('td[class="heading3"]');
    this.newCustomerLink = page.locator('a', { has: page.locator('text=New Customer') }).or(page.getByRole('link', { name: 'New Customer' }));
    this.newAccountLink = page.locator('a', { has: page.locator('text=New Account') }).or(page.getByRole('link', { name: 'New Account' }));
    this.fundTransferLink = page.locator('a', { has: page.locator('text=Fund Transfer') }).or(page.getByRole('link', { name: 'Fund Transfer' }));
    this.balanceEnquiryLink = page.locator('a', { has: page.locator('text=Balance Enquiry') }).or(page.getByRole('link', { name: 'Balance Enquiry' }));
    this.miniStatementLink = page.locator('a', { has: page.locator('text=Mini Statement') }).or(page.getByRole('link', { name: 'Mini Statement' }));
    this.logoutLink = page.locator('a', { has: page.locator('text=Log out') }).or(page.getByRole('link', { name: 'Log out' }));
  }

  async expectDashboard() {
    await expect(this.welcomeMessage)
      .toContainText('Manger Id');
  }

  async goToNewCustomer() {
    await this.newCustomerLink.click();
  }

  async goToNewAccount() {
    await this.newAccountLink.click();
  }

  async goToFundTransfer() {
    await this.fundTransferLink.click();
  }

  async goToBalanceEnquiry() {
    await this.balanceEnquiryLink.click();
  }
}   