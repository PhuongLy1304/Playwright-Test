// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://os-admin.aptech.io/login');
  await page.getByPlaceholder('Enter email').fill('tungnt@softech.vn');
  await page.getByPlaceholder('Enter password').fill('123456789');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.waitForURL('https://os-admin.aptech.io/dashboard');
  await page.goto('https://os-admin.aptech.io/online-shop/data-management/categories');

});
//TestCase 1: Thêm category thành công
test('TC01:-Category:Ok', async ({ page }) => {
   const name='Balo Dim';
   const description ='balo cao cấp';
   await page.getByRole('textbox', { name: '* Name :' }).fill(name);
   await page.getByLabel('Description').fill(description);
   await page.getByRole('button', { name: 'Save' }).click();
   //đảm bảo không có lỗi 
   await expect(page.getByRole('alert')).not.toBeVisible();
   await page.waitForTimeout(1000);
   //dong đầu tiên
   const firstrow = await page.locator('.ant-table-row-level-0:nth-child(1)');
   const newname = await firstrow.locator('.ant-table-cell:nth-child(2)').textContent();
   const newdescription = await firstrow.locator('.ant-table-cell:nth-child(3)').textContent();

   // kiểm tra 
   await expect(name).toEqual(newname);
   await expect(description).toEqual(newdescription);

});