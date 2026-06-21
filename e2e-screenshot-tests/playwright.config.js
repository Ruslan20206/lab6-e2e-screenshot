import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    // Look for test files in the "tests" directory, relative to this configuration file.
    testDir: 'tests',

    // Reporter to use
    reporter: 'html',

    use: {
        // Base URL to use in actions like `await page.goto('/')`.
        baseURL: 'http://localhost:3000',

        // Collect trace when retrying the failed test.
        trace: 'on-first-retry',

        // Run browser in headless mode.
        headless: true,

    },
    // Configure projects for major browsers.
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
        {
            name: 'mobile-safari',
            use: { ...devices['iPhone 12'] },
        }
    ],
    // Run your local dev server before starting the tests.
    webServer: {
        command: 'npm run start',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
    },
});
