// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */

module.exports = defineConfig({
    // here i give the location where we write the test cases
    testDir: './tests',

    /* Run tests in files in parallel */
    fullyParallel: true,
    // Maximum time one test can run for
    timeout: 30 * 1000,
    // asseration timeout
    expect: {
        timeout: 5000
    },
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    // retries: process.env.CI ? 2 : 0,

    // retries basically works when our test case fails , so it retries to run the test case that most time
    retries: 10,



    /* Opt out of parallel tests on CI. */
    // workers: process.env.CI ? 1 : undefined,

    // to stop parallel running of test cases
    workers: 1,


    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    // it means reporting the result in html
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        // baseURL: 'http://127.0.0.1:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        // trace: 'on-first-retry',
        headless: false,
        // to take the screenshot 
        screenshot: 'on',
        trace: 'on' //retain-on-failure
    },

    /* Configure projects for major browsers */

    projects: [{
            name: 'chromium',
            use: {...devices['Desktop Chrome'] },
        },

        // {
        //     name: 'firefox',
        //     use: {...devices['Desktop Firefox'] },
        // },

        // {
        //     name: 'webkit',
        //     use: {...devices['Desktop Safari'] },
        // },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
// Important Notes
// webkit is the default browser install in playwright
// playwright bydefault run the testcase in the headless mode 
// We have to tell explicitly to run in the head mode
// command to run the test case:
// npx playwright test

// test present in the same file run synchronously 
// but the test present in the different file run paralelly

// command to run the test case in headed mode:  
// npx playwright test --headed