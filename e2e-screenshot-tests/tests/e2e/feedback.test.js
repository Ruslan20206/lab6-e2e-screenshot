const { test, expect } = require('@playwright/test');

test('Успішне відправлення форми зворотного зв’язку', async ({ page }) => {
  await page.goto('http://localhost:3000/feedback.html');
  await page.fill('#feedbackName', 'Іван Петренко');
  await page.fill('#feedbackEmail', 'ivan.petrenko@example.com');
  await page.fill('#feedbackComment', 'Дуже зручний сайт, дякую за роботу!');
  await page.click('#submitFeedback');
  await expect(page.locator('#feedbackSuccessMessage')).toBeVisible();
});

test('Валідація некоректного email у формі зворотного зв’язку', async ({ page }) => {
  await page.goto('http://localhost:3000/feedback.html');
  await page.fill('#feedbackName', 'Іван Петренко');
  await page.fill('#feedbackEmail', 'некоректний_email');
  await page.fill('#feedbackComment', 'Спроба надіслати некоректну пошту.');
  await page.click('#submitFeedback');

  // Перевірка, що повідомлення про успіх НЕ відображається
  await expect(page.locator('#feedbackSuccessMessage')).not.toBeVisible();

  // Перевіримо, чи позначено поле email як невалідне
  const isEmailInvalid = await page.$eval('#feedbackEmail', el => el.validity.typeMismatch);
  expect(isEmailInvalid).toBe(true);
});
