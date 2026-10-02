import Image from 'next/image'
import { Link } from '@/i18n/navigation'

export type StagePanel = { id: string; label: string; title: string; meta: string; href?: string; className: string }

export function PanelBody({ panel }: { panel: StagePanel }) {
  const body = (
    <>
      <span className="block text-[13px] opacity-85">{panel.label}</span>
      <span className="mt-2.5 block text-[clamp(20px,2vw,30px)] font-extrabold leading-[1.1]">{panel.title}</span>
      <span className="mt-2 block text-sm opacity-85">{panel.meta}</span>
    </>
  )
  return panel.href ? (
    <Link href={panel.href} className="block min-h-11">
      {body}
    </Link>
  ) : (
    body
  )
}

export function HelloPill({ hello }: { hello: string }) {
  return (
    <span className="flex items-center gap-3.5">
      <Image src="/avatar.webp" alt="" width={52} height={52} className="size-[52px] rounded-full object-cover" />
      <span className="text-[15px] font-medium">{hello}</span>
    </span>
  )
}

export function StaticPanels({ panels, hello }: { panels: StagePanel[]; hello: string }) {
  return (
    <>
      <div className="field" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      {panels.map((panel) => (
        <div key={panel.id} className={`glass absolute rounded-[26px] p-6 text-white ${panel.className}`}>
          <PanelBody panel={panel} />
        </div>
      ))}
      <div className="glass absolute bottom-[8%] left-[6%] rounded-full py-3 pl-3 pr-5 text-white max-md:hidden">
        <HelloPill hello={hello} />
      </div>
    </>
  )
}
