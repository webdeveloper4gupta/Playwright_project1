const { test, expect } = require('@playwright/test');
// const { expect } = require('@playwright/test');
// const { LoginPage } = require('../pageobjects/LoginPage');
// import { DashBoardPage } from '../pageobjects/DashBoardPage';
const { customtest } = require('./utils/test-base');
const { POManager } = require('../pageobjects/POmanager');
// best format of conversion
// Json->string->js object
const dataset = JSON.parse(JSON.stringify(require("./utils/placeorderTestData.json")));
for (const data of dataset) {


    test(`end to end testing ${data.email}`, async({ page }) => {
        // const email = "mahajan@gmail.com";
        // const productName = 'zara coat 3';
        // const password = "Aman@123";
        const products = page.locator(".card-body");
        const Pomanager = new POManager(page);
        const loginPage = Pomanager.getLoginPage(page);
        await loginPage.goTo();
        await loginPage.validLogin(data.email, data.password);


        const dashboardPage = Pomanager.getDashboardPage(page);
        await dashboardPage.searchProduct(data.productName);
        await dashboardPage.navigateToCart();

        // await page.goto("https://rahulshettyacademy.com/client");
        // await page.locator("#userEmail").fill(email);
        // await page.locator("#userPassword").type("Aman@123");
        // await page.locator("[value='Login']").click();
        // await page.waitForLoadState('networkidle');
        // const titles = await page.locator(".card-body b").allTextContents();
        // console.log(titles);
        // const count = await products.count();
        // console.log(count);
        // for (let i = 0; i < count; ++i) {
        //     if (await products.nth(i).locator("b").textContent() === productName) {
        //         //add to cart
        //         await products.nth(i).locator("text= Add To Cart").click();
        //         break;
        //     }
        // }
        // await page.pause();
        // await page.locator("[routerlink*='cart']").click();
        // way of waiting for first item to render
        await page.locator("div li").first().waitFor();
        // waitFor -->wait until the div li render in the page 
        const bool = await page.locator("h3:has-text('zara coat 3')").isVisible(); // it does not have general check , like it does not wait specific for command

        expect(bool).toBeTruthy();
        await page.locator("text=Checkout").click();
        // way to deal with dynamic dropdown
        await page.locator("[placeholder*='Country']").type("ind", { delay: 100 });
        const dropdown = page.locator(".ta-results");
        await dropdown.waitFor(); //wait for dropdown clearly visible
        const optionsCount = await dropdown.locator("button").count()
        console.log(optionsCount);
        for (let i = 0; i < optionsCount; ++i) {
            const text = await dropdown.locator("button").nth(i).textContent();
            if (text === " India") {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }


        expect(page.locator(".user__name [type='text']").first()).toHaveText(data.email);
        await page.locator(".action__submit").click();
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderId);


        // to search the order from the table 
        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        const rows = await page.locator("tbody tr");


        for (let i = 0; i < await rows.count(); ++i) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
        const orderIdDetails = await page.locator(".col-text").textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();
    });
}
customtest.only('custom test concept', async({ page, testDataForOrder }) => {
    const products = page.locator(".card-body");
    const Pomanager = new POManager(page);
    const loginPage = Pomanager.getLoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.email, testDataForOrder.password);


    const dashboardPage = Pomanager.getDashboardPage(page);
    await dashboardPage.searchProduct(testDataForOrder.productName);
    await dashboardPage.navigateToCart();
});