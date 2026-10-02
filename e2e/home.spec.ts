import { expect, test } from '@playwright/test'

test('開場標題與三件作品都在', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('I make')
  const works = page.locator('#works')
  for (const title of ['LIFTLOG', '小小鉤針日常', 'Paws on Patrol']) {
    await expect(works.getByText(title, { exact: true })).toBeVisible()
  }
})

test('LIFTLOG 卡片進案例頁，其他作品開新分頁', async ({ page }) => {
  await page.goto('/')
  const works = page.locator('#works')
  await expect(works.getByRole('link', { name: /LIFTLOG/ })).toHaveAttribute('href', '/works/liftlog')
  const crochet = works.getByRole('link', { name: /小小鉤針日常/ })
  await expect(crochet).toHaveAttribute('target', '_blank')
  await expect(crochet).toHaveAttribute('rel', /noopener/)
})

test('英文版的 LIFTLOG 卡片連到 /en/works/liftlog', async ({ page }) => {
  await page.goto('/en')
  await expect(page.locator('#works').getByRole('link', { name: /LIFTLOG/ })).toHaveAttribute('href', '/en/works/liftlog')
})
