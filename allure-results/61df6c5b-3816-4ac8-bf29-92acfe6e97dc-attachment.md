# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.setup.ts >> authenticate as bank manager
- Location: tests\auth.setup.ts:6:6

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[name="uid"]')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]: File not found.
```

# Test source

```ts
  1  | import { test as setup, expect } from '@playwright/test';
  2  | import path from 'path';
  3  | 
  4  | const authFile = path.join(__dirname, '../playwright/.auth/manager.json');
  5  | 
  6  | setup('authenticate as bank manager', async ({ page }) => {
  7  |   
  8  |   // Use direct login URL — not index.php
  9  |   await page.goto('https://demo.guru99.com/V4/combinemodule.php');
  10 |   await page.waitForLoadState('domcontentloaded');
  11 | 
  12 |   // Fill login form
> 13 |   await page.locator('[name="uid"]').fill(process.env.MANAGER_ID!);
     |                                      ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  14 |   await page.locator('[name="password"]').fill(process.env.MANAGER_PASSWORD!);
  15 |   await page.locator('[name="btnLogin"]').click();
  16 | 
  17 |   // Confirm dashboard loaded
  18 |   await expect(page.locator('td.heading3')).toContainText('Manger Id');
  19 | 
  20 |   // Save session
  21 |   await page.context().storageState({ path: authFile });
  22 |   console.log('✅ Manager session saved');
  23 | });
```