import { expect, test } from '@playwright/test'

test('案例頁有大標、數字列、六張截圖與三組 demo 帳號', async ({ page }) => {
  await page.goto('/works/liftlog')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('LIFTLOG')
  await expect(page.getByText('106', { exact: true })).toBeVisible()
  await expect(page.locator('figure img')).toHaveCount(6)
  for (const account of ['demo-member@example.com', 'demo-coach@example.com', 'demo-admin@example.com']) {
    await expect(page.getByText(account)).toBeVisible()
  }
  await expect(page.getByRole('link', { name: 'Live Demo' })).toHaveAttribute('href', 'https://fitness-tracker-mu-umber.vercel.app/')
})

test('案例頁切換語系保留路徑', async ({ page }) => {
  await page.goto('/works/liftlog')
  await page.getByRole('link', { name: 'Switch to English' }).click()
  await expect(page).toHaveURL('http://localhost:3100/en/works/liftlog')
  await expect(page.getByText('Three roles')).toBeVisible()
  await page.getByRole('link', { name: '切換成中文' }).click()
  await expect(page).toHaveURL('http://localhost:3100/works/liftlog')
})
