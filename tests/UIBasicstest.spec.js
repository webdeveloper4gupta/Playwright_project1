const { test, expect } = require('@playwright/test');
// browser context example
test('First playwright test', async({ browser }) => { //bowser is the feature that comes by default in playwright //to evaulate as the playwright feature write --> {playwright}
    //   playwright code --
    // js is async in nature
    // you have to explicitly tell that you have to run  only one command at once
    // you have to write await before every steps
    // here i tell the browser to start new browser
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test('direct using page', async({ page }) => { //{ppage} is fixture
    await page.goto("https://google.com");
    // get title ----- assertion

    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});
test("locators", async({ browser }) => {
    // we have two selectors one css,xpath
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // await page.locator('#username').type("sukritan gupta");
    await userName.type("rahulshettyacademy");
    await page.locator("[type='password']").type("learning");
    await page.locator("#signInBtn").click();
    // if I put wrong credentials
    // console.log(await page.locator("[style*='block']").textContent());
    // await expect(page.locator("[style*='block']")).toContainText('Incorrect');


    // method to write text in the input tag
    // await userName.fill("");
    // await userName.fill("rahulshettyacademy");
    // await page.locator("[type='password']").type("learning");
    // await page.locator("#signInBtn").click();

    // race condition
    await Promise.all(
        [
            page.waitForNavigation(),
            signIn.click(),
        ]
    );



    // if  I comment this line , then it throws error in below code as I know textContent action wait until the element attach with the dom.
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(0).textContent());
    console.log(await page.locator(".card-body a").last().textContent());

    // text of all the product in list format
    //for allTextContents() method it does not wait until element attach with the dom
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles); //you got array back


});

// command to run in the head mode 
// npx playwright test --headed


// if you want to generate the trace only when the test failed