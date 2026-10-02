import { expect, test } from '@playwright/test'

test('桌機滑過作品卡時外框會扭曲，離開後復原', async ({ page }) => {
  test.skip(test.info().project.name === 'mobile', '手機不扭曲')
  await page.goto('/')
  const frame = page.locator('#works [data-jelly]').first()
  await frame.scrollIntoViewIfNeeded()
  await page.waitForTimeout(400)
  const path = frame.locator('clipPath path')
  const rest = await path.getAttribute('d')
  const box = (await frame.boundingBox())!
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5)
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.08, { steps: 8 })
  await page.waitForTimeout(300)
  expect(await path.getAttribute('d')).not.toBe(rest)
  await page.mouse.move(5, 5)
  await expect.poll(() => path.getAttribute('d'), { timeout: 3000 }).toBe(rest)
})

test('手機沒有裁切路徑', async ({ page }) => {
  test.skip(test.info().project.name !== 'mobile', '只檢查手機')
  await page.goto('/')
  await expect(page.locator('[data-jelly] clipPath')).toHaveCount(0)
})

test.describe('減少動態', () => {
  test.use({ reducedMotion: 'reduce' })
  test('不扭曲', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('[data-jelly] clipPath')).toHaveCount(0)
  })
})
