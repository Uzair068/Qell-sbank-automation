import { Page, Locator, expect } from '@playwright/test';

export class FundTransferPage {
  readonly page: Page;
  readonly fromAccountInput: Locator;
  readonly toAccountInput: Locator;
  readonly amountInput: Locator;
  readonly descriptionInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fromAccountInput = page.locator('[name="payeraccno"]');
    this.toAccountInput = page.locator('[name="payeeaccno"]');
    this.amountInput = page.locator('[name="ammount"]');
    this.descriptionInput = page.locator('[name="desc"]');
    this.submitButton = page.locator('[name="sub"]');
  }

  async goto() {
    await this.page.goto('https://demo.guru99.com/V4/manager/FundTransInput.php');
  }

  async transferFunds(fromAccount: string, toAccount: string, amount: string, description: string) {
    await this.fromAccountInput.fill(fromAccount);
    await this.toAccountInput.fill(toAccount);
    await this.amountInput.fill(amount);
    await this.descriptionInput.fill(description);
    await this.submitButton.click();
  }

  async expectTransferSuccess() {
    await expect(this.page.getByText('Fund Transfer Successfully!!!')).toBeVisible();
  }
}