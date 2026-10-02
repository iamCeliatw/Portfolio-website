import { expect, test } from '@playwright/test'

const site = 'https://celia-portfolio-website.vercel.app'

test('sitemap 列出四個網址', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text()
  for (const path of ['', '/en', '/works/liftlog', '/en/works/liftlog']) {
    expect(xml).toContain(`<loc>${site}${path}</loc>`)
  }
})

test('robots.txt 指向 sitemap', async ({ request }) => {
  expect(await (await request.get('/robots.txt')).text()).toContain(`Sitemap: ${site}/sitemap.xml`)
})

test('首頁有標題、描述與中英 hreflang', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Celia｜前端工程師')
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', `${site}/en`)
  await expect(page.locator('link[rel="alternate"][hreflang="zh-Hant-TW"]')).toHaveAttribute('href', site)
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1)
})
