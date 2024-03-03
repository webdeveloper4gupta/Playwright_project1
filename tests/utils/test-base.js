// here add fixture concept we implemented
const base = require('@playwright/test');
//page and browser are the features
exports.customtest = base.test.extend({
    testDataForOrder: {
        email: "mahajan@gmail.com",
        password: "Aman@123",
        productName: "zara coat 3"
    }
})