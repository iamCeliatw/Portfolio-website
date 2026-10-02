import { expect, test } from '@playwright/test'

test('首頁按 EN 到 /en，再按中回到 /', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Switch to English' }).click()
  await expect(page).toHaveURL('http://localhost:3100/en')
  await page.getByRole('link', { name: '切換成中文' }).click()
  await expect(page).toHaveURL('http://localhost:3100/')
})

test('導覽列有四個區塊連結', async ({ page }) => {
  test.skip(test.info().project.name === 'mobile', '手機版刻意只顯示標誌與語系切換')
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: '主選單' })
  for (const name of ['作品', '工具箱', '經歷', '聯絡']) {
    await expect(nav.getByRole('link', { name })).toBeVisible()
  }
})
