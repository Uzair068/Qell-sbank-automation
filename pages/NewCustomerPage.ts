import { Page, Locator, expect } from '@playwright/test';

export class NewCustomerPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly genderMale: Locator;
  readonly dobInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly pinInput: Locator;
  readonly mobileInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('[name="name"]');
    this.genderMale = page.locator('input[value="m"]');
    this.dobInput = page.locator('[name="dob"]');
    this.addressInput = page.locator('[name="addr"]');
    this.cityInput = page.locator('[name="city"]');
    this.stateInput = page.locator('[name="state"]');
    this.pinInput = page.locator('[name="pinno"]');
    this.mobileInput = page.locator('[name="telephoneno"]');
    this.emailInput = page.locator('[name="emailid"]');
    this.passwordInput = page.locator('[name="password"]');
    this.submitButton = page.locator('[name="sub"]');
    this.resetButton = page.locator('[name="res"]');
  }

  async goto() {
    await this.page.goto('https://demo.guru99.com/V4/manager/addcustomerpage.php');
  }

  async createCustomer(customer: {
    name: string;
    dob: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    mobile: string;
    email: string;
    password: string;
  }) {
    await this.nameInput.fill(customer.name);
    await this.genderMale.check();
    await this.dobInput.fill(customer.dob);
    await this.page.keyboard.press('Tab');
    await this.addressInput.fill(customer.address);
    await this.cityInput.fill(customer.city);
    await this.stateInput.fill(customer.state);
    await this.pinInput.fill(customer.pin);
    await this.mobileInput.fill(customer.mobile);
    await this.emailInput.fill(customer.email);
    await this.passwordInput.fill(customer.password);
    await this.submitButton.click();
  }

 async getCustomerId(): Promise<string> {
  // Wait for success message
  await expect(this.page.getByText('Customer Registered Successfully!!!'))
    .toBeVisible({ timeout: 15000 });

  // Get Customer ID from the specific row
  // The table shows: | Customer ID | | 12345 |
  const idLocator = this.page.locator('td').filter({ hasText: /^\d+$/ }).first();
  const id = await idLocator.textContent();
  console.log('Raw ID found:', id);
  return id?.trim() || '';
}
}