import { expect, test } from '@playwright/test'

// 不帶 GPU 參數啟動，瀏覽器會用 SwiftShader 軟體算繪
test.use({ launchOptions: { args: [] } })

test('軟體算繪的桌機不載入 Plasma', async ({ page }) => {
  test.skip(test.info().project.name === 'mobile', '手機本來就不載入')
  await page.goto('/')
  await page.waitForTimeout(1500)
  await expect(page.locator('[data-plasma-stage]')).toHaveAttribute('data-plasma-stage', 'static')
})
