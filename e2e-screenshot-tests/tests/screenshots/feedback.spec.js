const { test, expect } = require('@playwright/test');

test('Перевірка змін сторінки feedback за скриншотом', async ({ page }) => {
  await page.goto('http://localhost:3000/feedback.html');
  expect(await page.screenshot()).toMatchSnapshot('screenshots/feedback-page/feedback-index.png');
});

test('Порівняння скриншота кнопки відправки форми feedback', async ({ page }) => {
  await page.goto('http://localhost:3000/feedback.html');
  const element = await page.locator('#submitFeedback');
  expect(await element.screenshot()).toMatchSnapshot('screenshots/feedback-page/feedback-submit-btn.png');
});
