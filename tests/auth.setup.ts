import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/manager.json');

setup('authenticate as bank manager', async ({ page }) => {

  await page.goto('https://demo.guru99.com/V4/index.php');
  await page.waitForLoadState('domcontentloaded');

  // Debug logs
  console.log('MANAGER_ID:', process.env.MANAGER_ID);
  console.log('URL:', page.url());

  // Fill login
  await page.locator('[name="uid"]').fill(process.env.MANAGER_ID!);
  await page.locator('[name="password"]').fill(process.env.MANAGER_PASSWORD!);
  await page.locator('[name="btnLogin"]').click();

  // Confirm dashboard loaded
  await expect(page.getByText("Welcome To Manager's Page"))
    .toBeVisible({ timeout: 15000 });

  // Save session
  await page.context().storageState({ path: authFile });
  console.log('✅ Manager session saved');
});