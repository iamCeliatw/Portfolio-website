import { expect, test } from '@playwright/test'

test('中文是預設語系，網址不帶前綴', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL('http://localhost:3100/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hant-TW')
})

test('英文在 /en', async ({ page }) => {
  await page.goto('/en')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
})

test('不存在的網址回 404，並用該語系的文字', async ({ page }) => {
  const zh = await page.goto('/no-such-page')
  expect(zh?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('迷路')

  const en = await page.goto('/en/no-such-page')
  expect(en?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/lost/i)
})
