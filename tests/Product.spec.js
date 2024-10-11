// @ts-check
const { test, expect } = require('@playwright/test');
test.beforeEach(async ({ page }) => {
  await page.goto('https://os-admin.aptech.io/login');
  await page.getByPlaceholder('Enter email').fill('tungnt@softech.vn');
  await page.getByPlaceholder('Enter password').fill('123456789');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.waitForURL('https://os-admin.aptech.io/dashboard');
  await page.goto('https://os-admin.aptech.io/online-shop/data-management/products');

});
//TestCase 1: ADD products mới thành công
test('TC01:ADD-Products : OK', async ({ page }) => {
  const name="Kẹo";
  const price ='400';
  const discount = '10';
  const stock = '10.0';
  
  await page.getByRole('combobox', { name: '* Category :' }).click();
  await page.getByTitle('Barrows Drives').click();
  await page.getByRole('combobox', { name: '* Supplier :' }).click();
  await page.getByTitle('Apple 719').locator('div').click();
  
  await page.getByRole('textbox', { name: '* Name :' }).fill(name);
 
  await page.getByRole('spinbutton', { name: '* Price :' }).fill(price);
  
  await page.getByRole('spinbutton', { name: 'Discount :' }).fill(discount);
  
  await page.getByRole('spinbutton', { name: 'Stock :' }).fill(stock);

  await page.getByRole('button', { name: 'Save' }).click();
  // kiểm tra lỗi
  await expect(page.getByRole('alert')).not.toBeVisible();
  //chờ
  await page.waitForTimeout(1000);
  //xác minh thêm thành công chưa?
  const firstRow = await page.locator('.ant-table-row-level-0:nth-child(1)');
  const newCategory = await firstRow.locator('.ant-table-cell:nth-child(2)').textContent();
  const newSupplier = await firstRow.locator('.ant-table-cell:nth-child(3)').textContent();
  const newName = await firstRow.locator('.ant-table-cell:nth-child(4)').textContent();
  const newPrice = await firstRow.locator('.ant-table-cell:nth-child(5)').textContent();
  const newDiscount = await firstRow.locator('.ant-table-cell:nth-child(6)').textContent();
  const newStock = await firstRow.locator('.ant-table-cell:nth-child(7)').textContent();
  //
  await expect(newCategory).toEqual('Barrows Drives');
  await expect(newSupplier).toEqual('Apple 719');
  await expect(newName).toEqual(name);
  await expect(newPrice).toEqual(price+'$');
  await expect(newDiscount).toEqual(discount+'%');
  await expect(newStock).toEqual(stock);
});
//TestCase 2: ADD Products không thành công : Category để trống
test('TC02: ADD-Products: CategoryId Required', async ({ page }) => {
  const name="Áo ấm";
  const price ='400';
  const discount = '10';
  const stock = '10.0';
  
  
  await page.getByRole('combobox', { name: '* Supplier :' }).click();
  await page.getByTitle('Apple 719').locator('div').click();
  
  await page.getByRole('textbox', { name: '* Name :' }).fill(name);
 
  await page.getByRole('spinbutton', { name: '* Price :' }).fill(price);
  
  await page.getByRole('spinbutton', { name: 'Discount :' }).fill(discount);
  
  await page.getByRole('spinbutton', { name: 'Stock :' }).fill(stock);

  await page.getByRole('button', { name: 'Save' }).click();
  // kiểm tra lỗi
  
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.locator('.ant-form-item-explain-error')).toHaveText("Product's category is required");
  
});
//TestCase 3: ADD product không thành công: Supplier trống
test('TC03: ADD-Product: SupplierId Required', async ({ page }) => {
  const name="Áo ấm";
  const price ='400';
  const discount = '10';
  const stock = '10.0';
  
  
  await page.getByRole('combobox', { name: '* Category :' }).click();
  await page.getByTitle('Barrows Drives').click();
  
  await page.getByRole('textbox', { name: '* Name :' }).fill(name);
 
  await page.getByRole('spinbutton', { name: '* Price :' }).fill(price);
  
  await page.getByRole('spinbutton', { name: 'Discount :' }).fill(discount);
  
  await page.getByRole('spinbutton', { name: 'Stock :' }).fill(stock);

  await page.getByRole('button', { name: 'Save' }).click();
  // kiểm tra lỗi
  
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.locator('.ant-form-item-explain-error')).toHaveText("Product's supplier is required");
});

//TestCase 4: ADD Product không thành công : Name bỏ trống
test('TC04: ADD-Product: Name Requred', async ({ page }) => {
  
  const price ='400';
  const discount = '10';
  const stock = '10.0';
  
  await page.getByRole('combobox', { name: '* Category :' }).click();
  await page.getByTitle('Barrows Drives').click();
  await page.getByRole('combobox', { name: '* Supplier :' }).click();
  await page.getByTitle('Apple 719').locator('div').click();
  
  
 
  await page.getByRole('spinbutton', { name: '* Price :' }).fill(price);
  
  await page.getByRole('spinbutton', { name: 'Discount :' }).fill(discount);
  
  await page.getByRole('spinbutton', { name: 'Stock :' }).fill(stock);

  await page.getByRole('button', { name: 'Save' }).click();
  // kiểm tra lỗi
  
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.locator('.ant-form-item-explain-error')).toHaveText("Product's name is required");
  
});
//TestCase 5: ADD Product không thành công : Price bỏ trống
test('TC04: ADD-Product: Price Requred', async ({ page }) => {
  
  const name='Bút chì11'
  const discount = '10';
  const stock = '10.0';
  
  await page.getByRole('combobox', { name: '* Category :' }).click();
  await page.getByTitle('Barrows Drives').click();
  await page.getByRole('combobox', { name: '* Supplier :' }).click();
  await page.getByTitle('Apple 719').locator('div').click();
  
  await page.getByRole('textbox', { name: '* Name :' }).fill(name);
 
  
  
  await page.getByRole('spinbutton', { name: 'Discount :' }).fill(discount);
  
  await page.getByRole('spinbutton', { name: 'Stock :' }).fill(stock);

  await page.getByRole('button', { name: 'Save' }).click();
  // kiểm tra lỗi
  
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.locator('.ant-form-item-explain-error')).toHaveText("Product's price is required");
  
});
//TestCase 5: ADD product không thành công: Discount>90
test('TC05: ADD-Product: Discount>90', async ({ page }) => {
  const name='Bút chì119';
  const price='200';
  const discount = '91';
  const stock = '10.0';
  
  await page.getByRole('combobox', { name: '* Category :' }).click();
  await page.getByTitle('Barrows Drives').click();
  await page.getByRole('combobox', { name: '* Supplier :' }).click();
  await page.getByTitle('Apple 719').locator('div').click();
  
  await page.getByRole('textbox', { name: '* Name :' }).fill(name);
  
  await page.getByRole('spinbutton', { name: '* Price :' }).fill(price);
  
  
  await page.getByRole('spinbutton', { name: 'Discount :' }).fill(discount);
  
  await page.getByRole('spinbutton', { name: 'Stock :' }).fill(stock);

  await page.getByRole('button', { name: 'Save' }).click();
  // kiểm tra lỗi
  
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.locator('.ant-alert-description')).toHaveText("Discount must be less than or equal to 90");
  
});
//TestCase 6: DELETE product thành công
test('TC06:DELETE- Product: Ok', async ({ page }) => {
  const firstRow = await page.locator('.ant-table-row-level-0:nth-child(1)');
  const id = await firstRow.locator('.ant-table-cell:nth-child(1)').textContent();
  await firstRow.locator('.ant-table-cell:nth-child(8)').getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByRole('alert')).not.toBeVisible();
  await page.waitForTimeout(1000);
  const newId = await firstRow.locator('.ant-table-cell:nth-child(1)').textContent();
  await expect(newId).not.toEqual(id);
  
});
//TestCase 7: Chọn Hủy thao tác xóa 
test('TC07: DELETE-Product: Hủy', async ({ page }) => {
  const firstRow = await page.locator('.ant-table-row-level-0:nth-child(1)');
  const id = await firstRow.locator('.ant-table-cell:nth-child(1)').textContent();
  await firstRow.locator('.ant-table-cell:nth-child(8)').getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'No' }).click();
  await expect(page.getByRole('alert')).not.toBeVisible();
  await page.waitForTimeout(1000);
  const newId = await firstRow.locator('.ant-table-cell:nth-child(1)').textContent();
  await expect(newId).toEqual(id);
});
//TestCase 8: UPDATE product thành công
test('TC08: UPDATE - Product: OK', async ({ page }) => {
  const name='Updatesp';
  const price ='450';
  const discount='15';
  const stock='10.0';
  const firstRow= await page.locator('.ant-table-row-level-0:nth-child(1)');
  const id = await firstRow.locator('.ant-table-cell:nth-child(1)').textContent();
  await firstRow.locator('.ant-table-cell:nth-child(8)').click();
  
  await page.getByLabel('Update Product').getByLabel('Name').fill(name);
 
  await page.getByLabel('Update Product').getByLabel('Price').fill(price);
  //await page.getByLabel('Update Product').getByLabel('Discount').click();
  await page.getByLabel('Update Product').getByLabel('Discount').fill(discount);
  //await page.getByLabel('Update Product').getByLabel('Stock').click();
  await page.getByLabel('Update Product').getByLabel('Stock').fill(stock);
  await page.getByLabel('Update Product').getByRole('button', { name: 'Save' }).click();
  //kiêm tra lỗi
  await expect(page.getByRole('alert')).not.toBeVisible();
  //time
  await page.waitForTimeout(1000);
  //xác minh
  const newId= await firstRow.locator('.ant-table-cell:nth-child(1)').textContent();
  
  const newName= await firstRow.locator('.ant-table-cell:nth-child(4)').textContent();
  const newPrice= await firstRow.locator('.ant-table-cell:nth-child(5)').textContent();
  const newDiscount= await firstRow.locator('.ant-table-cell:nth-child(6)').textContent();
  const newStock= await firstRow.locator('.ant-table-cell:nth-child(7)').textContent();
  //
  await expect(newId).toEqual(id);

  await expect(newName).toEqual(name);
  await expect(newPrice).toEqual(price);
  await expect(newDiscount).toEqual(discount);
  await expect(newStock).toEqual(stock);
});
