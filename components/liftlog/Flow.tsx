import { getLocale, getTranslations } from 'next-intl/server'
import { liftlog } from '@/content/liftlog'
import type { Locale } from '@/content/types'
import { SectionHeading } from '@/components/ui/SectionHeading'

export async function Flow() {
  const t = await getTranslations('liftlog')
  const locale = (await getLocale()) as Locale
  return (
    <section className="bg-paper px-[var(--gutter)] pt-[clamp(96px,11vw,160px)]">
      <SectionHeading label="(04)" title={t('flow')} alt={t('flowAlt')} />
      <p data-fade className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-[#3a3a3f]">{liftlog.flowNote[locale]}</p>
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {liftlog.flow.map((f, i) => (
          <li key={f.step} data-fade className="rounded-3xl border border-ink p-7">
            <span className="text-sm text-mute">0{i + 1}</span>
            <code className="mt-3 block font-mono text-lg font-bold">{f.step}</code>
            <p className="mt-2 text-[15px] text-[#3a3a3f]">{f.body[locale]}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
