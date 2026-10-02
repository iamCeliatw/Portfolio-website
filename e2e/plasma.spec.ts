import { expect, test } from '@playwright/test'

test('桌機載入 Plasma，手機不載入', async ({ page }) => {
  await page.goto('/')
  const stage = page.locator('[data-plasma-stage]')
  if (test.info().project.name === 'mobile') {
    await page.waitForTimeout(1500)
    await expect(stage).toHaveAttribute('data-plasma-stage', 'static')
    await expect(page.locator('canvas')).toHaveCount(0)
  } else {
    await expect(stage).toHaveAttribute('data-plasma-stage', 'live')
    await expect(stage.getByRole('link', { name: /LIFTLOG/ })).toBeVisible()
  }
})

test('捲離主視覺後卸載 Plasma 畫布', async ({ page }) => {
  test.skip(test.info().project.name === 'mobile', '手機本來就不載入')
  await page.goto('/')
  await expect(page.locator('[data-plasma-stage]')).toHaveAttribute('data-plasma-stage', 'live')
  await page.locator('#contact').scrollIntoViewIfNeeded()
  await expect(page.locator('[data-plasma-stage]')).toHaveAttribute('data-plasma-stage', 'static')
})
