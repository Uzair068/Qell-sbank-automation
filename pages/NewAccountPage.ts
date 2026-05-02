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
    await this.customerIdInput.press('Tab');
    await this.accountTypeSelect.selectOption(type);
    await this.initialDepositInput.fill(deposit);
    await this.submitButton.click();
    // Wait for success page to load
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getAccountId(): Promise<string> {
  await expect(this.page.getByText('Account Generated Successfully!!!'))
    .toBeVisible({ timeout: 15000 });

  // Get all cells
  const cells = await this.page.locator('table tr td').all();
  
  for (let i = 0; i < cells.length; i++) {
    const text = await cells[i].textContent();
    if (text?.trim() === 'Account ID') {
      // Next cell has the actual ID
      const id = await cells[i + 1].textContent();
      console.log('Account ID found:', id?.trim());
      return id?.trim() || '';
    }
  }
  return '';
}
}