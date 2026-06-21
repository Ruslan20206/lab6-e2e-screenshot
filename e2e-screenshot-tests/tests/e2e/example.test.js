const { test, expect } = require('@playwright/test');

test('Перевірка заголовка додаткового сайту Example Domain', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});

test('Перевірка переходу за посиланням More information', async ({ page }) => {
  await page.goto('https://example.com');
  // На сторінці example.com є лише одне посилання <a>
  const link = page.locator('a');
  await expect(link).toBeVisible();
  await link.click();
  await expect(page).toHaveURL(/iana\.org/);
});
