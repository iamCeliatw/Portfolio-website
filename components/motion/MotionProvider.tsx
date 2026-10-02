'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function MotionProvider() {
  const pathname = usePathname()

  useEffect(() => {
    let revert: (() => void) | undefined
    let cancelled = false

    // 動畫函式庫延後載入，不進第一個畫面的 JS；手機 LCP 的模擬會把同時下載的 JS 都算進去
    Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('gsap/SplitText'), import('gsap/CustomEase'), import('lenis')]).then(
      ([{ default: gsap }, { ScrollTrigger }, { SplitText }, { CustomEase }, { default: Lenis }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)
        if (!CustomEase.get('hmIn')) CustomEase.create('hmIn', '.6,.2,0,.8')
        if (!CustomEase.get('hmFade')) CustomEase.create('hmFade', '.25,.46,.45,.94')

        const mm = gsap.matchMedia()
        mm.add('(prefers-reduced-motion: no-preference)', () => {
          const lenis = new Lenis({ autoRaf: false, anchors: true })
          lenis.on('scroll', ScrollTrigger.update)
          const raf = (time: number) => lenis.raf(time * 1000)
          gsap.ticker.add(raf)
          gsap.ticker.lagSmoothing(0)

          // 「top 80%」＝元素頂端進入畫面 20% 時觸發，對應規格
          document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
            SplitText.create(el, {
              type: 'lines',
              mask: 'lines',
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.lines, {
                  yPercent: 110,
                  duration: 1.1,
                  ease: 'hmIn',
                  stagger: 0.12,
                  scrollTrigger: { trigger: el, start: 'top 80%', once: true },
                }),
            })
          })
          document.querySelectorAll<HTMLElement>('[data-fade]').forEach((el) => {
            gsap.from(el, { autoAlpha: 0, y: 24, duration: 0.9, ease: 'hmFade', scrollTrigger: { trigger: el, start: 'top 80%', once: true } })
          })

          return () => {
            gsap.ticker.remove(raf)
            lenis.destroy()
          }
        })
        revert = () => mm.revert()
      },
    )

    return () => {
      cancelled = true
      revert?.()
    }
  }, [pathname])

  return null
}
