// here I explain you the concept of pageObject Manager
const { DashBoardPage } = require('./DashBoardPage');
const { LoginPage } = require('./LoginPage');
class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashBoardPage(this.page);
    }
    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
}
module.exports = { POManager }