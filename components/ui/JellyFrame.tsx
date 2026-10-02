'use client'

import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

const QUERY = '(pointer: fine) and (prefers-reduced-motion: no-preference)'
// 滑過時外框內縮的比例（以短邊計）；內縮出來的空間讓外框可以往滑鼠鼓出去
const INSET = 0.05
// 鼓起範圍：以短邊計的高斯半徑
const SPREAD = 0.32
const STIFFNESS = 0.12
const DAMPING = 0.72

type Key = 'm' | 'amp' | 'px' | 'py'
type Spring = { v: number; vel: number; to: number }

// 沿圓角矩形外框取點，每點沿法線往外推，推的量依離滑鼠的距離遞減；整圈一起變形，角落才不會鼓出圓瘤
function framePath(w: number, h: number, radius: number, s: Record<Key, number>) {
  const short = Math.min(w, h)
  const inset = s.m * short
  const x0 = inset, y0 = inset, x1 = w - inset, y1 = h - inset
  const r = Math.max(0, Math.min(radius, (x1 - x0) / 2, (y1 - y0) / 2))
  const pts: [number, number, number, number][] = []
  const line = (ax: number, ay: number, bx: number, by: number, nx: number, ny: number, n: number) => {
    for (let i = 0; i < n; i++) pts.push([ax + ((bx - ax) * i) / n, ay + ((by - ay) * i) / n, nx, ny])
  }
  const arc = (cx: number, cy: number, a0: number, n: number) => {
    for (let i = 0; i < n; i++) {
      const a = a0 + (Math.PI / 2) * (i / n)
      pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a), Math.cos(a), Math.sin(a)])
    }
  }
  line(x0 + r, y0, x1 - r, y0, 0, -1, 28)
  arc(x1 - r, y0 + r, -Math.PI / 2, 8)
  line(x1, y0 + r, x1, y1 - r, 1, 0, 20)
  arc(x1 - r, y1 - r, 0, 8)
  line(x1 - r, y1, x0 + r, y1, 0, 1, 28)
  arc(x0 + r, y1 - r, Math.PI / 2, 8)
  line(x0, y1 - r, x0, y0 + r, -1, 0, 20)
  arc(x0 + r, y0 + r, Math.PI, 8)
  const px = s.px * w, py = s.py * h
  const sigma2 = 2 * (SPREAD * short) ** 2
  const reach = s.amp * inset * 1.15
  const f = (n: number) => n.toFixed(4)
  return (
    pts
      .map(([x, y, nx, ny], i) => {
        const d = reach * Math.exp(-((x - px) ** 2 + (y - py) ** 2) / sigma2)
        return `${i ? 'L' : 'M'}${f((x + nx * d) / w)},${f((y + ny * d) / h)}`
      })
      .join(' ') + 'Z'
  )
}

type Props = { children: ReactNode; className?: string; radius?: number }

export function JellyFrame({ children, className = '', radius = 24 }: Props) {
  const id = `jelly-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const wrapRef = useRef<HTMLSpanElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    const path = pathRef.current
    if (!enabled || !wrap || !path) return
    const rest: Record<Key, number> = { m: 0, amp: 0, px: 0.5, py: 0.5 }
    const springs = Object.fromEntries(Object.entries(rest).map(([k, v]) => [k, { v, vel: 0, to: v }])) as Record<Key, Spring>
    let raf = 0
    let w = 1
    let h = 1
    const draw = () => {
      const s = Object.fromEntries(Object.entries(springs).map(([k, sp]) => [k, sp.v])) as Record<Key, number>
      path.setAttribute('d', framePath(w, h, radius, s))
    }
    const measure = () => {
      const r = wrap.getBoundingClientRect()
      w = r.width || 1
      h = r.height || 1
    }
    const tick = () => {
      let moving = false
      for (const sp of Object.values(springs)) {
        sp.vel = (sp.vel + (sp.to - sp.v) * STIFFNESS) * DAMPING
        sp.v += sp.vel
        if (Math.abs(sp.vel) > 1e-5 || Math.abs(sp.to - sp.v) > 1e-5) moving = true
        else sp.v = sp.to
      }
      draw()
      raf = moving ? requestAnimationFrame(tick) : 0
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect()
      springs.m.to = INSET
      springs.amp.to = 1
      springs.px.to = (e.clientX - r.left) / r.width
      springs.py.to = (e.clientY - r.top) / r.height
      kick()
    }
    const onLeave = () => {
      springs.m.to = rest.m
      springs.amp.to = rest.amp
      kick()
    }
    measure()
    draw()
    const ro = new ResizeObserver(() => {
      measure()
      draw()
    })
    ro.observe(wrap)
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, radius])

  return (
    <span ref={wrapRef} data-jelly className={`relative block ${className}`} style={enabled ? { clipPath: `url(#${id})` } : undefined}>
      {children}
      {enabled && (
        <svg aria-hidden width="0" height="0" className="absolute">
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            <path ref={pathRef} />
          </clipPath>
        </svg>
      )}
    </span>
  )
}
