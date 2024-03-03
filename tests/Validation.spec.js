const { test, expect } = require("@playwright/test");

test("pop up validation", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://google.com");

    // to goback to the google.com to rahulshettyacademy
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test.only("handle pop ups", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://google.com");

    // to goback to the google.com to rahulshettyacademy
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    //   page.on helps in listening the event 
    page.on('dialog', dialog => dialog.accept()) //when want to click the OK
        // page.on('dialog',dialog=>dialog.dismiss()) when want to click the cancel
    await page.locator("#confirmbtn").click();
});

test("handle the hover up click concept", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://google.com");

    // to goback to the google.com to rahulshettyacademy
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    //   page.on helps in listening the event 
    page.on('dialog', dialog => dialog.accept()) //when want to click the OK
        // page.on('dialog',dialog=>dialog.dismiss()) when want to click the cancel
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
});

test.only("handle frames", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://google.com");
    // to goback to the google.com to rahulshettyacademy
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    //   page.on helps in listening the event 
    page.on('dialog', dialog => dialog.accept()) //when want to click the OK
        // page.on('dialog',dialog=>dialog.dismiss()) when want to click the cancel
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    // switch from the normal page to the frame page
    const framesPage = page.frameLocator("#courses-iframe");
    //    to tell to locate only visible elem
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textcheck = await framesPage.locator(".text h2").textContent();
    console.log(textcheck.split(" ")[1]);
});