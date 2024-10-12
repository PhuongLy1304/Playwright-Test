// @ts-check
const { test, expect } = require('@playwright/test');
const exp = require('constants');

test.beforeEach(async ({ page }) => {
  await page.goto('https://os-admin.aptech.io/login');
  await page.getByPlaceholder('Enter email').fill('tungnt@softech.vn');
  await page.getByPlaceholder('Enter password').fill('123456789');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.waitForURL('https://os-admin.aptech.io/dashboard');
  await page.goto('https://os-admin.aptech.io/online-shop/data-management/customers');

});
//TestCase 1: ADD Customer thành công
test('TC01: ADD - Customer : Ok', async ({ page }) => {
  const firstName = 'Nguyen';
  const lastName = 'Nam22';
  const phoneNumber ='0708079555';
  const email ='nam1552@gmail.com';
  const address='tố hữu';
  const birthday ='12/2/2004';

  await page.getByRole('textbox', { name: '* First Name :' }).fill(firstName);
  await page.getByRole('textbox', { name: '* Last Name :' }).fill(lastName);
  await page.getByLabel('Phone').fill(phoneNumber);
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Address').fill(address);
  await page.getByLabel('Birthday').fill(birthday);
  await page.getByRole('button', { name: 'Save' }).click();
  //kiểm tra khoogn có lỗi
  await expect(page.getByRole('alert')).not.toBeVisible();
  //time chờ
  await page.waitForTimeout(1000);
  //xác minh đã thêm thành công chưa?

 const firstRow = await page.locator('.ant-table-row-level-0:nth-child(1)');

 const newFirstName = await firstRow.locator('.ant-table-cell:nth-child(2)').textContent();
 const newLastName = await firstRow.locator('.ant-table-cell:nth-child(3)').textContent();
 const newEmail = await firstRow.locator('.ant-table-cell:nth-child(4)').textContent();
 const newphoneNumber = await firstRow.locator('.ant-table-cell:nth-child(5)').textContent();
 const newAddress = await firstRow.locator('.ant-table-cell:nth-child(6)').textContent();
 const newBirthday = await firstRow.locator('.ant-table-cell:nth-child(7)').textContent();
 // xác minh
 await expect(newFirstName).toEqual(firstName);
 await expect(newLastName).toEqual(lastName);
 await expect(newEmail).toEqual(email);
 await expect(newphoneNumber).toEqual(phoneNumber);
 
 await expect(newAddress).toEqual(address);

});
//
//TestCase 2: ADD Customer không thành công : Firstname trống
test('TC02: ADD - Customers : FirstName Required', async ({ page }) => {
  
  const lastName = 'Nam22';
  const phoneNumber ='0708079555';
  const email ='nam1552@gmail.com';
  const address='tố hữu';
  const birthday ='12/2/2004';

  
  await page.getByRole('textbox', { name: '* Last Name :' }).fill(lastName);
  await page.getByLabel('Phone').fill(phoneNumber);
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Address').fill(address);
  await page.getByLabel('Birthday').fill(birthday);
  await page.getByRole('button', { name: 'Save' }).click();
  //kiểm tra hiên thị lỗi
  await expect(page.getByRole('alert')).toBeVisible();
  //kiểm tra message lỗi
  await expect(page.locator('.ant-form-item-explain-error')).toHaveText("Customer's first name is required");
});
//
//TestCase 3: ADD Customer không thành công : LastName trông
test('TC03: ADD - Customer : LastName Required', async ({ page }) => {
  const firstName = 'Nam22';
  const phoneNumber ='0708079555';
  const email ='nam1552@gmail.com';
  const address='tố hữu';
  const birthday ='12/2/2004';

  
  await page.getByRole('textbox', { name: '* First Name :' }).fill(firstName);
  await page.getByLabel('Phone').fill(phoneNumber);
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Address').fill(address);
  await page.getByLabel('Birthday').fill(birthday);
  await page.getByRole('button', { name: 'Save' }).click();
  //kiểm tra hiên thị lỗi
  await expect(page.getByRole('alert')).toBeVisible();
  //kiểm tra message lỗi
  await expect(page.locator('.ant-form-item-explain-error')).toHaveText("Customer's last name is required");
});
//
//TestCase 4: ADD không thành công thành : Phone trống
test('TC04: ADD - Customer : Phone Required', async ({ page }) => {
  
});

