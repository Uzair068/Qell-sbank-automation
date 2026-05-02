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
  - waiting for locator('input[name="uid"]')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e5]:
        - link "Home" [ref=e6] [cursor=pointer]:
          - /url: https://demo.guru99.com/
        - link "Demo Site" [ref=e8] [cursor=pointer]:
          - /url: https://demo.guru99.com/
      - generic [ref=e11]:
        - link:
          - /url: https://guru99.live/4ljs1t
        - paragraph [ref=e12]:
          - link "JIRA Top ADS" [ref=e13] [cursor=pointer]:
            - /url: https://guru99.live/4ljs1t
            - img "JIRA Top ADS" [ref=e14]
    - navigation [ref=e16]:
      - list [ref=e19]:
        - listitem [ref=e20]:
          - link "Selenium" [ref=e21] [cursor=pointer]:
            - /url: "#"
            - text: Selenium
        - listitem
        - listitem [ref=e23]:
          - link "Insurance Project" [ref=e24] [cursor=pointer]:
            - /url: http://demo.guru99.com/insurance/v1/index.php
        - listitem [ref=e25]:
          - link "Agile Project" [ref=e26] [cursor=pointer]:
            - /url: http://demo.guru99.com/Agile_Project/Agi_V1/
        - listitem [ref=e27]:
          - link "Bank Project" [ref=e28] [cursor=pointer]:
            - /url: http://demo.guru99.com/V1/index.php
        - listitem [ref=e29]:
          - link "Security Project" [ref=e30] [cursor=pointer]:
            - /url: http://demo.guru99.com/Security/SEC_V1/index.php
        - listitem
        - listitem [ref=e31]:
          - link "Telecom Project" [ref=e32] [cursor=pointer]:
            - /url: http://demo.guru99.com/telecom/index.html
        - listitem [ref=e33]:
          - link "Payment Gateway Project" [ref=e34] [cursor=pointer]:
            - /url: http://demo.guru99.com/payment-gateway/index.php
        - listitem [ref=e35]:
          - link "New Tours" [ref=e36] [cursor=pointer]:
            - /url: http://demo.guru99.com/test/newtours/
        - listitem [ref=e37]:
          - link "SEO" [ref=e38] [cursor=pointer]:
            - /url: "#"
            - text: SEO
  - heading "Guru99 Bank" [level=2] [ref=e41]
  - table [ref=e42]:
    - rowgroup [ref=e43]:
      - row [ref=e44]:
        - cell [ref=e45]
  - generic [ref=e46]:
    - list
    - table [ref=e47]:
      - rowgroup [ref=e48]:
        - row "Enter your email address to get access details to demo site" [ref=e49]:
          - cell "Enter your email address to get access details to demo site" [ref=e50]:
            - heading "Enter your email address to get access details to demo site" [level=2] [ref=e51]:
              - text: Enter your email address to get
              - text: access details to demo site
        - row
        - row
        - row [ref=e52]:
          - cell [ref=e53]
        - row "Email ID" [ref=e54]:
          - cell "Email ID" [ref=e55]
          - cell [ref=e56]:
            - textbox [ref=e57]
        - row "Submit" [ref=e58]:
          - cell [ref=e59]
          - cell "Submit" [ref=e60]:
            - button "Submit" [ref=e61] [cursor=pointer]
  - paragraph [ref=e62]:
    - text: © Copyright - Demo Guru99 2025
    - link [ref=e63] [cursor=pointer]:
      - /url: https://www.linkedin.com/company/guru99/
      - img [ref=e64]
    - link [ref=e65] [cursor=pointer]:
      - /url: https://www.facebook.com/Guru99Official
      - img [ref=e66]
    - link [ref=e67] [cursor=pointer]:
      - /url: https://twitter.com/guru99com
      - img [ref=e68]
    - link [ref=e69] [cursor=pointer]:
      - /url: https://www.guru99.com/newsletters.html
      - img [ref=e70]
  - generic [ref=e71]:
    - link:
      - /url: https://guru99.live/umr9yl
    - paragraph [ref=e72]:
      - link "Random Image" [ref=e73] [cursor=pointer]:
        - /url: https://guru99.live/umr9yl
        - img "Random Image" [ref=e74]
```

# Test source

```ts
  1  | import { test as setup, expect } from '@playwright/test';
  2  | import path from 'path';
  3  | 
  4  | const authFile = path.join(__dirname, '../playwright/.auth/manager.json');
  5  | 
  6  | setup('authenticate as bank manager', async ({ page }) => {
  7  |   await page.goto('/index.php');
  8  | 
  9  |   // Login
> 10 |   await page.locator('input[name="uid"]').fill(process.env.MANAGER_ID!);
     |                                           ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  11 |   await page.locator('input[name="password"]').fill(process.env.MANAGER_PASSWORD!);
  12 |   await page.locator('input[name="btnLogin"]').click();
  13 | 
  14 |   // Confirm logged in
  15 |   await expect(page.locator('td[class="heading3"]'))
  16 |     .toContainText('Manger Id : mngr660320');
  17 | 
  18 |   // Save session
  19 |   await page.context().storageState({ path: authFile });
  20 |   console.log('✅ Manager session saved');
  21 | });
```