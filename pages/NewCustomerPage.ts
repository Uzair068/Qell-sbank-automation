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
    this.nameInput = page.locator('input[name="name"]');
    this.genderMale = page.locator('input[value="m"]');
    this.dobInput = page.locator('input[name="dob"]');
    this.addressInput = page.locator('input[name="addr"]');
    this.cityInput = page.locator('input[name="city"]');
    this.stateInput = page.locator('input[name="state"]');
    this.pinInput = page.locator('input[name="pinno"]');
    this.mobileInput = page.locator('input[name="telephoneno"]');
    this.emailInput = page.locator('input[name="emailid"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('input[name="sub"]');
    this.resetButton = page.locator('input[name="res"]');
  }

  async fillCustomerDetails(customer: {
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
    await this.addressInput.fill(customer.address);
    await this.cityInput.fill(customer.city);
    await this.stateInput.fill(customer.state);
    await this.pinInput.fill(customer.pin);
    await this.mobileInput.fill(customer.mobile);
    await this.emailInput.fill(customer.email);
    await this.passwordInput.fill(customer.password);
  }

  async submit() {
    await this.submitButton.click();
  }

  // Returns customer ID from success page
  async getCustomerId(): Promise<string> {
    const row = this.page.locator('td[class="heading3"]');
    await expect(row).toContainText('Customer Registered Successfully!!!');
    const idCell = this.page.locator('table td').filter({ hasText: 'Customer ID' }).locator('..').locator('td').last();
    return (await idCell.textContent()) || '';
  }
}