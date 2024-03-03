class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInbutton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }
    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client")
    }
    async validLogin(username, password) {
        await this.userName.type(username);
        await this.password.type(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }
}



module.exports = { LoginPage }
    /*
      await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill(email);
        await page.locator("#userPassword").type("Aman@123");
        await page.locator("[value='Login']").click();
    */


// await write when you perform some operation