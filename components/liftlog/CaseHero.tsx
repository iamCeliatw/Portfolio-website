import { getLocale, getTranslations } from 'next-intl/server'
import { liftlog } from '@/content/liftlog'
import type { Locale } from '@/content/types'
import { Link } from '@/i18n/navigation'

export async function CaseHero() {
  const t = await getTranslations('liftlog')
  const locale = (await getLocale()) as Locale
  return (
    <section className="bg-paper px-[var(--gutter)] pt-[clamp(120px,12vw,180px)]">
      <Link href="/#works" className="fade-in inline-flex min-h-11 items-center text-sm text-mute hover:text-ink">← {t('back')}</Link>
      <h1 className="mt-4 text-[clamp(72px,14vw,220px)] font-extrabold leading-[.85] tracking-[-.05em]">
        <span className="line-mask"><span className="line-rise [animation-delay:.15s]">LIFTLOG</span></span>
      </h1>
      <p className="fade-in mt-8 max-w-[24ch] font-serif text-[clamp(26px,2.8vw,40px)] font-light italic leading-[1.25] [animation-delay:.5s]">
        {liftlog.tagline[locale]}
      </p>
      <p className="fade-in mt-6 max-w-[56ch] text-[17px] leading-relaxed text-[#3a3a3f] [animation-delay:.6s]">{liftlog.intro[locale]}</p>
      <div className="fade-in mt-10 flex flex-wrap gap-3 [animation-delay:.7s]">
        <a href={liftlog.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center rounded-full bg-ink px-7 font-bold text-paper">{t('demo')}</a>
        <a href={liftlog.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center rounded-full border border-ink px-7 font-bold">{t('github')} ↗</a>
      </div>
      <dl className="mt-[clamp(64px,8vw,112px)] grid grid-cols-2 border-t border-ink sm:grid-cols-3 lg:grid-cols-5">
        {liftlog.stats.map((s) => (
          <div key={s.value + s.label.en} data-fade className="border-b border-ink py-6 pr-4">
            <dt className="sr-only">{s.label[locale]}</dt>
            <dd>
              <span className="block text-[clamp(48px,5vw,80px)] font-extrabold leading-none tracking-[-.04em]">{s.value}</span>
              <span aria-hidden className="mt-2 block text-sm text-mute">{s.label[locale]}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
