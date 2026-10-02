'use client'

import type { RefObject } from 'react'
import { Plasma, PlasmaProvider } from '@cruxgarden/plasma-ui'
import { HelloPill, PanelBody, type StagePanel } from './StagePanels'

type Props = { panels: StagePanel[]; hello: string; bounds: RefObject<HTMLDivElement | null> }

export default function PlasmaLive({ panels, hello, bounds }: Props) {
  return (
    <PlasmaProvider mood={{ colors: ["#0d0c0b", "#2b2723", "#8a7f73"], blend: 40, spring: { stiffness: 170, damping: 16 } }} theme="dark" viscosity={0.5} grid={24}>
      {panels.map((panel) => (
        <Plasma key={panel.id} draggable bounds={bounds} padding={24} className={`absolute text-white ${panel.className}`}>
          <PanelBody panel={panel} />
        </Plasma>
      ))}
      <Plasma draggable bounds={bounds} radius={999} padding={12} className="absolute bottom-[8%] left-[6%] text-white">
        <HelloPill hello={hello} />
      </Plasma>
    </PlasmaProvider>
  )
}
