const { test, expect } = require('@playwright/test');

test("end to end testing", async({ page }) => {
    const email = "mahajan@gmail.com";
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").type("Aman@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    console.log(count);
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    // await page.pause();
    await page.locator("[routerlink*='cart']").click();
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


    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
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