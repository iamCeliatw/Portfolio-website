'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)
CustomEase.create('hmIn', '.6,.2,0,.8')
CustomEase.create('hmFade', '.25,.46,.45,.94')

export function MotionProvider() {
  const pathname = usePathname()

  useEffect(() => {
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
    return () => mm.revert()
  }, [pathname])

  return null
}
