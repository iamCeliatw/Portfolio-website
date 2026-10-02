import { expect, test } from '@playwright/test'

test('桌機有圓點游標，滑到連結會放大；手機沒有', async ({ page }) => {
  await page.goto('/')
  if (test.info().project.name === 'mobile') {
    await expect(page.locator('.cursor-dot')).toHaveCount(0)
    return
  }
  await page.mouse.move(400, 400)
  const dot = page.locator('.cursor-dot')
  await expect(dot).toHaveCount(1)
  await page.getByRole('link', { name: 'Switch to English' }).hover()
  await expect(dot).toHaveAttribute('data-hot', 'true')
})

test.describe('減少動態', () => {
  test.use({ reducedMotion: 'reduce' })
  test('不顯示圓點游標', async ({ page }) => {
    await page.goto('/')
    await page.mouse.move(400, 400)
    await expect(page.locator('.cursor-dot')).toHaveCount(0)
  })
})
