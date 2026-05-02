import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly userIdInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userIdInput = page.locator('input[name="uid"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[name="btnLogin"]');
  }

  async goto() {
    await this.page.goto('/index.php');
    await this.userIdInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  async login(userId: string, password: string) {
    await this.userIdInput.fill(userId);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginError() {
    await expect(this.page.locator('.heading3'))
      .toContainText('User or Password is not valid');
  }
}