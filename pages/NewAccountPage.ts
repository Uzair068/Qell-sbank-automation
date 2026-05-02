import { Page, Locator, expect } from '@playwright/test';

export class NewAccountPage {
  readonly page: Page;
  readonly customerIdInput: Locator;
  readonly accountTypeSelect: Locator;
  readonly initialDepositInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.customerIdInput = page.locator('[name="cusid"]');
    this.accountTypeSelect = page.locator('[name="selaccount"]');
    this.initialDepositInput = page.locator('[name="inideposit"]');
    this.submitButton = page.locator('[name="button2"]');
  }

  async goto() {
    await this.page.goto('https://demo.guru99.com/V4/manager/addAccount.php');
  }

  async createAccount(customerId: string, type: 'Savings' | 'Current', deposit: string) {
    await this.customerIdInput.fill(customerId);
    await this.accountTypeSelect.selectOption(type);
    await this.initialDepositInput.fill(deposit);
    await this.submitButton.click();
  }

  async getAccountId(): Promise<string> {
    await expect(this.page.getByText('Account Generated Successfully!!!')).toBeVisible();
    const rows = this.page.locator('table tr');
    const idRow = rows.filter({ hasText: 'Account ID' });
    const id = await idRow.locator('td').last().textContent();
    return id?.trim() || '';
  }
}