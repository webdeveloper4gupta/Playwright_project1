const { test, expect } = require("@playwright/test");


test("Screenshot whole and parial", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    // taking screenshot of whole page
    await page.screenshot({ path: 'screenshot.png' });
    // taking the screenshot of the particular component
    await page.locator('#displayed-text').screenshot({ path: 'partial_Screenshot.png' });
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test.only("Visual Testing", async({ page }) => {
    await page.goto("https://flightaware.com/");
    // here it fails because it working well with the page that does not contains timestamp
    // if page contains timestamp then it throws error 
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});