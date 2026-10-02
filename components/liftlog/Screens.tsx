import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'
import { liftlog } from '@/content/liftlog'
import type { Locale } from '@/content/types'
import { SectionHeading } from '@/components/ui/SectionHeading'

export async function Screens() {
  const t = await getTranslations('liftlog')
  const locale = (await getLocale()) as Locale
  return (
    <section className="bg-paper px-[var(--gutter)] pt-[clamp(96px,11vw,160px)]">
      <SectionHeading label="(02)" title={t('screens')} alt={t('screensAlt')} />
      <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2">
        {liftlog.screens.map((screen, i) => (
          <figure key={screen.image} data-fade className={i % 2 === 1 ? 'md:mt-16' : ''}>
            <span className="relative block aspect-[1440/900] overflow-hidden rounded-3xl bg-[#03060f] shadow-[0_20px_50px_rgb(0_0_0/.12)]">
              <Image src={screen.image} alt={screen.caption[locale]} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
            </span>
            <figcaption className="mt-4 text-[15px] text-mute">{screen.caption[locale]}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
