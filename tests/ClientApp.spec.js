const { test, expect } = require('@playwright/test');

test('test1', async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();
    // way to wait for the specific condition

    // Method1:
    // this is the wait mechanism
    // await page.waitForLoadState('networkidle'); // it wait until network comes in idle state. 

    // Method2:
    // this is also a wait mechanism 
    await page.locator(".card-body b").first().waitFor();

    // here I take all the title of the items;
    const titles = await page.locator(".card-body b").allTextContents();

    console.log(titles);
});


test("Ui test --> static dropdown and radio button", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    // dropdown concept 
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    // assertion to check whether we select the last radio button or not , or dropdown or not
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    // to uncheck 
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    // Another way to check
    console.log(await page.locator(".radiotextsty").last().isChecked());
    // to check the test is blinky or not 
    // Here I validate the attribute 
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    // to pause the execution
    // await page.pause(); //it opens the playwright inspector
});


test("cross browser handling", async({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    // here i write the concept to catch the new page --->cross browsing concept
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ])
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    await page.locator("#username").type(domain);
    // await page.pause();
    console.log(await page.locator("#username").textContent());
});


// to start run test in the debug mode 
// npx playwright test filname --debug


// record and playback scenario
// npx playwright codegen givetheurlthatyouwanttoautomate