import { expect, test } from '@playwright/test'

test('點導覽的「經歷」會捲到經歷區塊', async ({ page }) => {
  test.skip(test.info().project.name === 'mobile', '手機版導覽沒有區塊連結')
  await page.goto('/')
  await page.getByRole('navigation', { name: '主選單' }).getByRole('link', { name: '經歷' }).click()
  await expect(page.locator('#experience')).toBeInViewport({ ratio: 0.2 })
})

test('捲到作品區後標題完整出現', async ({ page }) => {
  await page.goto('/')
  await page.locator('#works').scrollIntoViewIfNeeded()
  const heading = page.locator('#works h2')
  await expect(heading).toBeVisible()
  await expect(heading).toContainText('Works')
  await page.waitForTimeout(1600)
  const box = await heading.boundingBox()
  expect(box?.height).toBeGreaterThan(40)
})

test('一般模式啟用 Lenis 平滑捲動', async ({ page }) => {
  await page.goto('/')
  await expect.poll(() => page.evaluate(() => document.documentElement.classList.contains('lenis'))).toBe(true)
})

test.describe('減少動態', () => {
  test.use({ reducedMotion: 'reduce' })

  test('不捲動也看得到所有區塊標題，開場不卡在遮罩下', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.line-rise').first()).toHaveCSS('animation-name', 'none')
    for (const id of ['works', 'tools', 'experience', 'contact']) {
      await expect(page.locator(`#${id} h2`)).toHaveCSS('opacity', '1')
    }
    expect(await page.evaluate(() => document.documentElement.classList.contains('lenis'))).toBe(false)
  })
})
