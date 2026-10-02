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

test('載入時卡片圖片不會因空的裁切路徑而消失', async ({ page }) => {
  test.skip(test.info().project.name === 'mobile', '手機不裁切')
  // 在任何一幀，只要元素已套上 clip-path、但路徑還沒有 d，畫面上就會整塊消失
  await page.addInitScript(() => {
    const w = window as unknown as { __emptyClipFrames: number }
    w.__emptyClipFrames = 0
    const check = () => {
      document.querySelectorAll<HTMLElement>('[data-jelly]').forEach((el) => {
        if (el.style.clipPath && !el.querySelector('clipPath path')?.getAttribute('d')) w.__emptyClipFrames++
      })
      requestAnimationFrame(check)
    }
    requestAnimationFrame(check)
  })
  await page.goto('/')
  await page.waitForTimeout(1500)
  expect(await page.evaluate(() => (window as unknown as { __emptyClipFrames: number }).__emptyClipFrames)).toBe(0)
})
