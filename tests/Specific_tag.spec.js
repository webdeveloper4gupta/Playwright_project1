import { test, expect } from '@playwright/test';

test('playwright special locators', async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    // method1
    // await page.getByLabel("Employed").click();
    // method2
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    // getByPlaceholder
    // await page.getByPlaceholder("Password").type("welcome to code");
    // another method
    await page.getByPlaceholder("Password").fill("welcome to code");
    // getByRole
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByText("Success! The Form has been submit succesfully!.").isVisible(); // it scans the whole page 
    await page.getByRole("link", { name: "shop" }).click();
    // Here I apply the filter on the app-card , and filter the required the card from the list of 4 cards
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();

})