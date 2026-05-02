import { Page, Locator, expect } from '@playwright/test';

export class FundTransferPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://demo.guru99.com/V4/manager/FundTransInput.php');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async transferFunds(
    fromAccount: string,
    toAccount: string,
    amount: string,
    description: string
  ) {
    // Use nth() to target fields by position since they have no unique names
    const inputs = this.page.locator('input[type="text"]');

    await inputs.nth(0).fill(fromAccount);  // Payers account
    await inputs.nth(0).press('Tab');
    await inputs.nth(1).fill(toAccount);    // Payees account
    await inputs.nth(1).press('Tab');
    await inputs.nth(2).fill(amount);       // Amount
    await inputs.nth(2).press('Tab');
    await inputs.nth(3).fill(description);  // Description
    await inputs.nth(3).press('Tab');

    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async expectTransferSuccess() {
  await expect(this.page.getByText('Fund Transfer Details'))
    .toBeVisible({ timeout: 15000 });
  console.log('✅ Fund transfer completed successfully');
}
}