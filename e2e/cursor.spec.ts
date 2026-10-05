import { expect, test } from '@playwright/test'
import { revealAll } from './helpers'

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

test('桌機隱藏系統游標，只留圓點；手機保留系統游標', async ({ page }) => {
  await page.goto('/')
  await page.mouse.move(400, 400)
  const cursorOn = (selector: string) => page.locator(selector).first().evaluate((el) => getComputedStyle(el).cursor)
  if (test.info().project.name === 'mobile') {
    expect(await cursorOn('a')).not.toBe('none')
    return
  }
  await expect(page.locator('.cursor-dot')).toHaveCount(1)
  expect(await cursorOn('body')).toBe('none')
  expect(await cursorOn('a')).toBe('none')
  expect(await cursorOn('button')).toBe('none')
})

test.describe('減少動態時', () => {
  test.use({ reducedMotion: 'reduce' })
  test('保留系統游標', async ({ page }) => {
    await page.goto('/')
    await page.mouse.move(400, 400)
    expect(await page.locator('a').first().evaluate((el) => getComputedStyle(el).cursor)).not.toBe('none')
  })
})

test('影片彈出視窗開啟時恢復系統游標（圓點會被最上層的對話框蓋住）', async ({ page }) => {
  test.skip(test.info().project.name === 'mobile', '手機本來就有系統游標')
  await page.goto('/')
  await page.mouse.move(400, 400)
  await revealAll(page)
  await page.locator('#experience').getByRole('button', { name: /Hydrogen Energy Game/ }).click()
  const close = page.getByRole('dialog', { name: 'Hydrogen Energy Game' }).getByRole('button')
  await expect(close).toBeVisible()
  expect(await close.evaluate((el) => getComputedStyle(el).cursor)).not.toBe('none')
})
