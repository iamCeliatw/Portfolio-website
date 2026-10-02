'use client'

import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

const QUERY = '(pointer: fine) and (prefers-reduced-motion: no-preference)'
// 滑過時外框內縮的比例；內縮出來的空間讓邊可以往滑鼠鼓出去
const INSET = 0.045
const STIFFNESS = 0.12
const DAMPING = 0.72

type Springs = Record<'m' | 'top' | 'right' | 'bottom' | 'left' | 'cx' | 'cy', { v: number; vel: number; to: number }>

const rest = () => ({ m: 0, top: 0, right: 0, bottom: 0, left: 0, cx: 0.5, cy: 0.5 })

function framePath(s: ReturnType<typeof rest>, rx: number, ry: number) {
  const x0 = s.m, x1 = 1 - s.m, y0 = s.m, y1 = 1 - s.m
  const cx = Math.min(Math.max(s.cx, x0 + rx), x1 - rx)
  const cy = Math.min(Math.max(s.cy, y0 + ry), y1 - ry)
  const f = (n: number) => n.toFixed(4)
  return [
    `M${f(x0 + rx)},${f(y0)}`,
    `Q${f(cx)},${f(y0 - s.top)} ${f(x1 - rx)},${f(y0)}`,
    `Q${f(x1)},${f(y0)} ${f(x1)},${f(y0 + ry)}`,
    `Q${f(x1 + s.right)},${f(cy)} ${f(x1)},${f(y1 - ry)}`,
    `Q${f(x1)},${f(y1)} ${f(x1 - rx)},${f(y1)}`,
    `Q${f(cx)},${f(y1 + s.bottom)} ${f(x0 + rx)},${f(y1)}`,
    `Q${f(x0)},${f(y1)} ${f(x0)},${f(y1 - ry)}`,
    `Q${f(x0 - s.left)},${f(cy)} ${f(x0)},${f(y0 + ry)}`,
    `Q${f(x0)},${f(y0)} ${f(x0 + rx)},${f(y0)}Z`,
  ].join(' ')
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
    const init = rest()
    const springs = Object.fromEntries(Object.entries(init).map(([k, v]) => [k, { v, vel: 0, to: v }])) as Springs
    let raf = 0
    let rx = 0
    let ry = 0
    const measure = () => {
      const { width, height } = wrap.getBoundingClientRect()
      rx = width ? Math.min(radius / width, 0.5) : 0
      ry = height ? Math.min(radius / height, 0.5) : 0
    }
    const draw = () => {
      const s = Object.fromEntries(Object.entries(springs).map(([k, sp]) => [k, sp.v])) as ReturnType<typeof rest>
      path.setAttribute('d', framePath(s, rx, ry))
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
    // 越靠近某條邊，那條邊越往滑鼠鼓；鼓的量上限是內縮的兩倍，曲線頂點剛好碰到原本的外框
    const bulge = (distance: number) => 2 * INSET * Math.max(0, 1 - distance / 0.6)
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      springs.m.to = INSET
      springs.top.to = bulge(py)
      springs.bottom.to = bulge(1 - py)
      springs.left.to = bulge(px)
      springs.right.to = bulge(1 - px)
      springs.cx.to = px
      springs.cy.to = py
      kick()
    }
    const onLeave = () => {
      for (const [k, v] of Object.entries(init)) springs[k as keyof Springs].to = v
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
