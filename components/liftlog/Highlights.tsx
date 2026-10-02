import { getLocale, getTranslations } from 'next-intl/server'
import { liftlog } from '@/content/liftlog'
import type { Locale } from '@/content/types'
import { SectionHeading } from '@/components/ui/SectionHeading'

function StateMachine({ label }: { label: string }) {
  return (
    <figure data-fade className="mt-12 rounded-3xl bg-ink p-[clamp(24px,4vw,48px)] text-paper">
      <figcaption className="text-sm text-white/70">{label}</figcaption>
      <div className="mt-6 flex flex-col items-start gap-6 md:flex-row md:items-center">
        <span className="rounded-full border border-white/40 px-5 py-3 font-mono text-sm">PENDING</span>
        <span aria-hidden className="text-2xl text-white/60 max-md:rotate-90">→</span>
        <ul className="grid grid-cols-2 gap-3">
          {liftlog.bookingStates.map((state) => (
            <li key={state} className="rounded-full bg-white/10 px-5 py-3 text-center font-mono text-sm">{state}</li>
          ))}
        </ul>
      </div>
    </figure>
  )
}

export async function Highlights() {
  const t = await getTranslations('liftlog')
  const locale = (await getLocale()) as Locale
  return (
    <section className="bg-paper px-[var(--gutter)] pt-[clamp(96px,11vw,160px)]">
      <SectionHeading label="(03)" title={t('highlights')} alt={t('highlightsAlt')} />
      <StateMachine label={t('stateMachine')} />
      <ol className="mt-6 grid border-t border-ink md:grid-cols-2">
        {liftlog.highlights.map((h, i) => (
          <li key={h.title.en} data-fade className="border-b border-ink py-8 md:odd:pr-10 md:even:pl-10">
            <span className="text-sm text-mute">0{i + 1}</span>
            <h3 className="mt-2 text-2xl font-bold">{h.title[locale]}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[#3a3a3f]">{h.body[locale]}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
