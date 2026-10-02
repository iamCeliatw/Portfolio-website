import { expect, test } from '@playwright/test'
import { revealAll } from './helpers'

test('經歷列出兩家公司與王一互動科技的四件作品', async ({ page }) => {
  await page.goto('/')
  await revealAll(page)
  const exp = page.locator('#experience')
  await expect(exp.getByRole('heading', { name: '遠創智慧' })).toBeVisible()
  await expect(exp.getByRole('heading', { name: '王一互動科技' })).toBeVisible()
  for (const title of ["L'AiR Journal", 'China Airlines Online Museum', 'Hydrogen Energy Game', 'Vyin AI Chat Bot']) {
    await expect(exp.getByText(title, { exact: true })).toBeVisible()
  }
})

test('桌面應用的影片彈出視窗可以打開，按 Esc 關閉', async ({ page }) => {
  await page.goto('/')
  await revealAll(page)
  await page.locator('#experience').getByRole('button', { name: /Hydrogen Energy Game/ }).click()
  const dialog = page.getByRole('dialog', { name: 'Hydrogen Energy Game' })
  await expect(dialog).toBeVisible()
  await expect(dialog.locator('video')).toHaveAttribute('src', '/experience/hydrogen-game.mp4')
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
})

test('聯絡區有 mailto 連結，複製按鈕會顯示已複製', async ({ page, context }) => {
  test.skip(test.info().project.name === 'mobile', '剪貼簿權限只在桌機 project 授權')
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/')
  await revealAll(page)
  const contact = page.locator('#contact')
  await expect(contact.getByRole('link', { name: 'tina8899530@gmail.com' })).toHaveAttribute('href', 'mailto:tina8899530@gmail.com')
  await contact.getByRole('button', { name: '複製 email' }).click()
  await expect(contact.getByRole('button', { name: '已複製' })).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('tina8899530@gmail.com')
})
