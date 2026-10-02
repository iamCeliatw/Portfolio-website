'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { StaticPanels, type StagePanel } from './StagePanels'

const PlasmaLive = dynamic(() => import('./PlasmaLive'), { ssr: false })

// 規格：寬度小於 1024px 或不是滑鼠裝置，不載入 Plasma
const LIVE_QUERY = '(min-width: 1024px) and (pointer: fine)'

type Props = { panels: StagePanel[]; hello: string; aria: string }

// 沒有 GPU 時瀏覽器改用軟體算繪，全視窗 WebGL 會拖垮整頁，這種情況退回 CSS 版
function hasHardwareWebGL() {
  try {
    const gl = document.createElement('canvas').getContext('webgl2')
    if (!gl) return false
    const info = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : ''
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return !/swiftshader|llvmpipe|software/i.test(renderer)
  } catch {
    return false
  }
}

export function PlasmaStage({ panels, hello, aria }: Props) {
  const windowRef = useRef<HTMLDivElement>(null)
  const [capable, setCapable] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(LIVE_QUERY)
    const hardware = hasHardwareWebGL()
    const update = () => setCapable(hardware && mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // 畫布一次畫整個視窗，離開主視覺就卸載，省下 GPU
  useEffect(() => {
    const el = windowRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '200px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const live = capable && inView
  // 動畫中的 opacity 會讓窗口自成堆疊層，Plasma 畫布的 z-index -1 就會蓋到窗口外的區塊，所以啟動 Plasma 時不套淡入

  return (
    <section aria-label={aria} className="relative overflow-hidden px-[var(--gutter)] pt-12">
      <div
        ref={windowRef}
        data-plasma-stage={live ? 'live' : 'static'}
        className={`stage-window relative h-[clamp(460px,46vw,680px)] rounded-[32px] ${live ? '' : 'fade-in overflow-hidden [animation-delay:.4s]'}`}
      >
        {live ? <PlasmaLive panels={panels} hello={hello} bounds={windowRef} /> : <StaticPanels panels={panels} hello={hello} />}
      </div>
    </section>
  )
}
