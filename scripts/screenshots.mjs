import { mkdirSync } from 'node:fs'
import { chromium } from '@playwright/test'

const base = process.env.BASE_URL ?? 'http://localhost:3100'
const round = process.argv[2] ?? 'latest'
const pages = [['home-zh', '/'], ['home-en', '/en'], ['liftlog-zh', '/works/liftlog'], ['liftlog-en', '/en/works/liftlog']]
const viewports = [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]

mkdirSync(`shots/${round}`, { recursive: true })
// 無頭瀏覽器預設是軟體算繪，畫不出 Plasma 的玻璃面板
const browser = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu'] })
for (const [device, viewport] of viewports) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, hasTouch: device === 'mobile', isMobile: device === 'mobile' })
  const page = await context.newPage()
  for (const [name, path] of pages) {
    await page.goto(base + path, { waitUntil: 'networkidle' })
    // 慢慢捲到底，讓捲動觸發的進場動畫都播完
    for (let y = 0; y < 30; y++) {
      await page.mouse.wheel(0, 600)
      await page.waitForTimeout(120)
    }
    await page.waitForTimeout(1500)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(800)
    if (device === 'mobile') {
      await page.screenshot({ path: `shots/${round}/${name}-${device}.png`, fullPage: true })
    } else {
      // 全頁截圖會把視窗撐到整頁高，WebGL 固定畫布會畫錯；桌機改成逐個視窗截
      const height = await page.evaluate(() => document.body.scrollHeight)
      for (let y = 0, i = 0; y < height; y += viewport.height, i++) {
        await page.evaluate((top) => window.scrollTo(0, top), y)
        await page.waitForTimeout(700)
        await page.screenshot({ path: `shots/${round}/${name}-${device}-${String(i).padStart(2, '0')}.png` })
      }
    }
  }
  await context.close()
}
await browser.close()
console.log(`saved to shots/${round}/`)
