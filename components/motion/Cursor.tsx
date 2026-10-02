'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

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
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' })
    const move = (e: PointerEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      el.dataset.hot = String(Boolean((e.target as Element | null)?.closest('a, button')))
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [enabled])

  return enabled ? <div ref={ref} aria-hidden className="cursor-dot" /> : null
}
