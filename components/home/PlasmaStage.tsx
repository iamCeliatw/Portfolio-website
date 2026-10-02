'use client'

import { useRef } from 'react'
import { StaticPanels, type StagePanel } from './StagePanels'

type Props = { panels: StagePanel[]; hello: string; aria: string }

export function PlasmaStage({ panels, hello, aria }: Props) {
  const windowRef = useRef<HTMLDivElement>(null)
  return (
    <section aria-label={aria} className="relative overflow-hidden px-[var(--gutter)] pt-12">
      <div
        ref={windowRef}
        data-plasma-stage="static"
        className="stage-window fade-in relative h-[clamp(460px,46vw,680px)] overflow-hidden rounded-[32px] [animation-delay:.4s]"
      >
        <StaticPanels panels={panels} hello={hello} />
      </div>
    </section>
  )
}
