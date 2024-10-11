// @ts-check
const { test, expect } = require('@playwright/test');
const exp = require('constants');

test.beforeEach(async ({ page }) => {
  await page.goto('https://os-admin.aptech.io/login');
  await page.getByPlaceholder('Enter email').fill('tungnt@softech.vn');
  await page.getByPlaceholder('Enter password').fill('123456789');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.waitForURL('https://os-admin.aptech.io/dashboard');
  await page.goto('https://os-admin.aptech.io/online-shop/data-management/categories');

});
//TestCase 1: Thêm category thành công
test('TC01:ADD-Category:Ok', async ({ page }) => {
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
   const newName = await firstrow.locator('.ant-table-cell:nth-child(2)').textContent();
   const newDescription = await firstrow.locator('.ant-table-cell:nth-child(3)').textContent();

   // kiểm tra 
   await expect(name).toEqual(newName);
   await expect(description).toEqual(newDescription);

});
//TestCse 2: Thêm Category không thành công : tên đã có
test('TC02:ADD-Category : Name Unique', async ({ page }) => {
  const name='Bút';
  const description='butchi';
  await page.getByRole('textbox', { name: '* Name :' }).fill(name);
   await page.getByLabel('Description').fill(description);
   await page.getByRole('button', { name: 'Save' }).click();
   //đảm bảo có thông lỗi
   const elementError = await page.locator('div.ant-alert-content');
   await expect(elementError).toBeVisible();
   //kiểm tra message lỗi
   const messageError = await page.locator('div.ant-alert-description');
   await expect(messageError).toHaveText('Name must be unique');
  
});
//TestCase 3: Thêm Category không thành công : tên bỏ trống
test('TC03:ADD-Category: Name Required', async ({ page }) => {

  const description='butchi';
  await page.getByLabel('Description').fill(description);
  await page.getByRole('button', { name: 'Save' }).click();
  const actualResult = await page.locator('div.ant-form-item-explain-error');
  
  await expect(actualResult).toHaveText("Category's name is required");
  
});
//TestCase 4: Update Category thành công
test('TC04: UPDATE - Category : OK', async ({ page }) => {
  const name = "Điện thoại";
  const description ="Điện thoại thông minh";
  //lấy dòng 1
  const firstRow = await page.locator('.ant-table-row-level-0:nth-child(1)');

  //lấy id dòng 1
  const id = await firstRow.locator('.ant-table-cell:nth-child(1)').textContent();
  //click nút edit
  await firstRow.locator('.ant-table-cell:nth-child(4)').getByRole('button', { name: 'Edit' }).click();
  //

  await page.getByLabel('Update Category').getByLabel('Name').fill(name);
  await page.getByLabel('Update Category').getByLabel('Description').fill(description);
  await page.getByLabel('Update Category').getByRole('button', { name: 'Save' }).click();
  // kiểm tra ko lỗi
  await expect(page.getByRole('alert')).not.toBeVisible();
  // chờ 1s
  await page.waitForTimeout(1000);
  //xác minh xem update chưa
  const newId = await firstRow.locator('.ant-table-cell:nth-child(1)').textContent();
  const newName = await firstRow.locator('.ant-table-cell:nth-child(2)').textContent();
  const newDesc = await firstRow.locator('.ant-table-cell:nth-child(3)').textContent();

  await expect(id).toEqual(newId);
  await expect(name).toEqual(newName);
  await expect(description).toEqual(newDesc);

});
//TestCase 5 : Update Category không thành công : tên trùng
test('TC05: UPDATE - Category : Name Unique', async ({ page }) => {
  const name="Bút";
  const desc ="Update";
  const firstRow = await page.locator('.ant-table-row-level-0:nth-child(1)');
  //lấy id dòng 1
  const id = await firstRow.locator('.ant-table-cell:nth-child(1)').textContent();
   //click nút edit
   await firstRow.locator('.ant-table-cell:nth-child(4)').getByRole('button', { name: 'Edit' }).click();
   //
 
   await page.getByLabel('Update Category').getByLabel('Name').fill(name);
   await page.getByLabel('Update Category').getByLabel('Description').fill(desc);
   await page.getByLabel('Update Category').getByRole('button', { name: 'Save' }).click();
   //kiểm tra xuất hiện lỗi
   const elementError = await page.locator('div.ant-alert-content');
   await expect(elementError).toBeVisible();
   //kiểm tra message lỗi
   const messageError = await page.locator('div.ant-alert-description');
   await expect(messageError).toHaveText('Name must be unique');
   
});
//TestCase 6: Delete category thành công
test('TC06: DELETE - Category : OK', async ({ page }) => {
  // lấy dòng đầu tiên
  const firstRow = await page.locator('.ant-table-row-level-0:nth-child(1)');
  //lấy id dòng đầu tiên
  const id = await firstRow.locator('.ant-table-cell:nth-child(1)').textContent();
   // Click nút Delete tại dòng đầu tiên
  await firstRow.locator('.ant-table-cell:nth-child(4)').getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByRole('alert')).not.toBeVisible();
  await page.waitForTimeout(1000);
  //xác minh xem đã xóa thành công chưa
  const newId = await firstRow.locator('.ant-table-cell:nth-child(1)').textContent();
  await expect(id).not.toEqual(newId);
  
  
});
//TestCase 7: Hủy Xóa 
test('TC07: DELETE - Category : Hủy', async ({ page }) => {
  // lấy dòng đầu tiên
  const firstRow = await page.locator('.ant-table-row-level-0:nth-child(1)');
  //lấy id dòng đầu tiên
  const id = await firstRow.locator('.ant-table-cell:nth-child(1)').textContent();
   // Click nút Delete tại dòng đầu tiên
  await firstRow.locator('.ant-table-cell:nth-child(4)').getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'No' }).click();
  await expect(page.getByRole('alert')).not.toBeVisible();
  await page.waitForTimeout(1000);
  //xác minh xem đã xóa thành công chưa
  const newId = await firstRow.locator('.ant-table-cell:nth-child(1)').textContent();
  await expect(id).toEqual(newId);
  
  
});
  


