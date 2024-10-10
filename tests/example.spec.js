// @ts-check
const { test, expect } = require('@playwright/test');

test('TC-01-CHECK TITLE', async ({ page }) => {
  await page.goto('https://www.aptech-danang.edu.vn/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Softech Aptech | Lập trình viên quốc tế');
});



