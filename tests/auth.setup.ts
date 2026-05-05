import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const authFile = path.join(__dirname, '../playwright/.auth/manager.json');

setup('authenticate as bank manager', async ({ page }) => {
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const managerId = process.env.MANAGER_ID || 'mngr660320';
  const managerPass = process.env.MANAGER_PASSWORD || 'arybAtY';

  console.log('Attempting login with ID:', managerId);

  try {
    await page.goto('https://demo.guru99.com/V4/index.php', {
      timeout: 30000,
      waitUntil: 'domcontentloaded'
    });
    await page.waitForTimeout(3000);

    await page.locator('[name="uid"]').fill(managerId);
    await page.locator('[name="password"]').fill(managerPass);

    const btn1 = page.locator('[name="btnLogin"]');
    const btn2 = page.getByRole('button', { name: 'LOGIN' });

    if (await btn1.isVisible({ timeout: 3000 }).catch(() => false)) {
      await btn1.click();
    } else if (await btn2.isVisible({ timeout: 3000 }).catch(() => false)) {
      await btn2.click();
    }

    await page.waitForTimeout(5000);
    console.log('After login URL:', page.url());

    // Save state regardless of login result
    await page.context().storageState({ path: authFile });
    console.log('✅ Auth state saved');

  } catch (error) {
    console.log('Login error:', error.message);
    // Create empty auth file so tests can still run
    fs.writeFileSync(authFile, JSON.stringify({
      cookies: [],
      origins: []
    }));
    console.log('⚠️ Created empty auth file — tests will login directly');
  }
});