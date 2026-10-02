import type { Page } from '@playwright/test'

// 進場動畫只在捲到時播一次；先慢慢捲到底再回頂端，之後所有元素都已顯示
export async function revealAll(page: Page) {
  await page.evaluate(async () => {
    const step = window.innerHeight / 2
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(1200)
}
