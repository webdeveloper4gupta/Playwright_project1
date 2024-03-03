const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APiUtils');
const loginPayLoad = { userEmail: "mahajan@gmail.com", userPassword: "Aman@123" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] };
let token;
let orderId;
test.beforeAll(async() => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: loginPayLoad });

    // expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);
    // const apiUtils = new APIUtils(apiContext);
    // token = apiUtils.getTokens();
    // second method
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: orderPayLoad,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },

    });
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);

    orderId = orderResponseJson.orders[0];

});
// test.beforeEach(() => {

// });
// test case for creating the order
test("end to end testing", async({ page }) => {
    // here i insert the token in the session storage
    // const apiUtils = new APIUtils(apiContext);
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");
    const email = "mahajan@gmail.com";
    // const email = "";
    const productName = 'zara coat 3';

    // const products = page.locator(".card-body");
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

    // await page.locator("[routerlink*='cart']").click();
    // // way of waiting for first item to render
    // await page.locator("div li").first().waitFor();
    // // waitFor -->wait until the div li render in the page 
    // const bool = await page.locator("h3:has-text('zara coat 3')").isVisible(); // it does not have general check , like it does not wait specific for command

    // expect(bool).toBeTruthy();
    // await page.locator("text=Checkout").click();
    // // way to deal with dynamic dropdown
    // await page.locator("[placeholder*='Country']").type("ind", { delay: 100 });
    // const dropdown = page.locator(".ta-results");
    // await dropdown.waitFor(); //wait for dropdown clearly visible
    // const optionsCount = await dropdown.locator("button").count()
    // console.log(optionsCount);
    // for (let i = 0; i < optionsCount; ++i) {
    //     const text = await dropdown.locator("button").nth(i).textContent();
    //     if (text === " India") {
    //         await dropdown.locator("button").nth(i).click();
    //         break;
    //     }
    // }


    // expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    // await page.locator(".action__submit").click();
    // await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    // const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    // console.log(orderId);


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
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

// https://rahulshettyacademy.com/api/ecom/order/create-order  --->api test