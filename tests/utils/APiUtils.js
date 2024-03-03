const loginPayLoad = { userEmail: "mahajan@gmail.com", userPassword: "Aman@123" };
class APIUtils {

    constructor(apiContext) {
        this.apiContext = apiContext;
    }
    async getTokens() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: loginPayLoad });

        // expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        token = loginResponseJson.token;
        console.log(token);
        return token
    }

}
module.exports = { APIUtils };