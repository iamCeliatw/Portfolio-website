'use client'

import { useEffect, useRef, useState } from 'react'

const QUERY = '(pointer: fine) and (prefers-reduced-motion: no-preference)'

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return
    // 系統游標隱藏後圓點是唯一的指標，只留很短的拖尾，點擊才準
    document.documentElement.classList.add('has-cursor')
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0
    const loop = () => {
      x += (tx - x) * 0.45
      y += (ty - y) * 0.45
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(loop) : 0
    }
    const move = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!raf) raf = requestAnimationFrame(loop)
      el.dataset.hot = String(Boolean((e.target as Element | null)?.closest('a, button')))
    }
    window.addEventListener('pointermove', move)
    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
    }
  }, [enabled])

  return enabled ? <div ref={ref} aria-hidden className="cursor-dot" /> : null
}
