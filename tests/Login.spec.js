// @ts-check
const { test, expect } = require('@playwright/test');
const exp = require('constants');
//trước khi chạy mỗi test case
test.beforeEach(async ({ page }) => {
  await page.goto('https://aptech-tester.web.app/login');
});
//testCase 1: Đăng nhập thành công với tài khoản đúng thông tin
test('TC-01-Login: OK',async({page})=>{
  //Điền tên đăng nhập
  await page.locator('#login-form_username').fill('admin');
  //Điền mật khẩu
  await page.locator('#login-form_password').fill('Tester@123');
  //click vào nút đăng nhập
  await page.locator('button:has-text("Đăng nhập")').click();
  
  const actualResult = await page.locator('div.ant-form-item-explain-error');

  // Không xuất hiện thông báo lỗi
  await expect(actualResult).not.toBeInViewport();
  //Kiểm tra URL sau khi đăng nhập thành công
  await expect(page).toHaveURL('https://aptech-tester.web.app/home');

});
//testCase 2: Đăng nhập khi username sai
test('TC-02-Login: UserName Failed', async({page})=>{
  await page.locator('#login-form_username').fill('adm');
  await page.locator('#login-form_password').fill('Tester@123');
  await page.locator('button:has-text("Đăng nhập")').click();
  const actualResult = await page.locator('div.ant-form-item-explain-error');
  await expect(actualResult).not.toBeInViewport();
  await expect(page).toHaveURL('https://aptech-tester.web.app/login');
  
  
});
//TestCase 3: Đăng nhập khi Pass sai
test('TC-03-Login: Password Failed', async({page})=>{
  await page.locator('#login-form_username').fill("admin");
  await page.locator('#login-form_password').fill("test123");
  await page.locator('button:has-text("Đăng nhập")').click();
  const actualResult = await page.locator('div.ant-form-item-explain-error');
  await expect(actualResult).not.toBeInViewport();
  await expect(page).toHaveURL('https://aptech-tester.web.app/login');
});
//TestCase 4: Đăng nhập khi Pass và Username sai
test('TC-04-Login: User and Pass Failed', async({page})=>{
  await page.locator('#login-form_username').fill("admin1");
  await page.locator('#login-form_password').fill("test123");
  await page.locator('button:has-text("Đăng nhập")').click();
  const actualResult= await page.locator('div.ant-form-item-explain-error');
  await expect(actualResult).not.toBeInViewport();
  await expect(page).toHaveURL('https://aptech-tester.web.app/login');
});
//1. Viết test cases để kiểm thử: Tên đăng nhập >= 3 và <= 30 ký tự

//TestCase : khi tên đăng nhập =3
test('TC-Login-01: Username =3', async({page})=>{
  await page.locator('#login-form_username').fill('adm');
  await page.locator('#login-form_password').fill('Tester@123');
  await page.locator('button:has-text("Đăng nhập")').click();
  const actualResult=await page.locator('div.ant-form-item-explain-error');
  await expect(actualResult).not.toBeInViewport();


});
//TestCase : khi tên đăng nhập = 2 ký tự
test('TC-Login-02:Username =2 ', async({page})=>{
  await page.locator('#login-form_username').fill("ad");
  await page.locator('#login-form_password').fill("Tester@123");
  await page.locator('button:has-text("Đăng nhập")').click();
  const actualResult=await page.locator('div.ant-form-item-explain-error');
  await expect(actualResult).toHaveText("Độ dài tên đăng nhập phải nằm trong khoảng 3 đến 30 ký tự");
});
//TestCase : khi tên đăng nhập =4 ký tự
test('TC-Login-03:Username = 4', async({page})=>{
  await page.locator('#login-form_username').fill("admi");
  await page.locator('#login-form_password').fill("Tester@123");
  await page.locator('button:Has-text("Đăng nhập")').click();
  const actualResult=await page.locator('div.ant-form-item-explain-error');
  await expect(actualResult).not.toBeInViewport();
});
//TestCase: khi tên đăng nhập =30 ký tự
test('TC-Login-04: Username =30',async({page})=>{
  await page.locator('#login-form_username').fill("adminadminadminadminadminadmin");
  await page.locator('#login-form_password').fill("Tester@123");
  await page.locator('button:Has-text("Đăng nhập")').click();
  const actualResult=await page.locator('div.ant-form-item-explain-error');
  await expect(actualResult).not.toBeInViewport();
});
//TestCase: khi tên đăng nhập = 29 ký tự
test('TC-Login-05: Username =29',async({page})=>{
  await page.locator('#login-form_username').fill("adminadminadminadminadminadmi");
  await page.locator('#login-form_password').fill("Tester@123");
  await page.locator('button:Has-text("Đăng nhập")').click();
  const actualResult= await page.locator('div.ant-form-item-explain-error');
  await expect(actualResult).not.toBeInViewport();
});
//Testcae: khi tên đăng nhập = 31 ký tự
test('TC-Login-06:Username =31', async({page})=>{
  await page.locator('#login-form_username').fill("adminadminadminadminadminadmin1");
  await page.locator('#login-form_password').fill("Tester@123");
  await page.locator('button:Has-text("Đăng nhập")').click();
  const actualResult = await page.locator('div.ant-form-item-explain-error');
  await expect(actualResult).toHaveText("Độ dài tên đăng nhập phải nằm trong khoảng 3 đến 30 ký tự");
})




// Viết test cases để kiểm thử: Mật khẩu >= 6 và <=10 ký tự
// Viết test cases để kiểm thử: Khi nhập sai Tên đăng nhập hoặc Mật khẩu: "Tên đăng nhập hoặc Mật khẩu đã nhập sai"

