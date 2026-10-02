import { getLocale, getTranslations } from 'next-intl/server'
import { liftlog } from '@/content/liftlog'
import type { Locale } from '@/content/types'
import { CopyButton } from '@/components/ui/CopyButton'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Link } from '@/i18n/navigation'

export async function DemoAccounts() {
  const t = await getTranslations('liftlog')
  const locale = (await getLocale()) as Locale
  return (
    <section className="bg-paper px-[var(--gutter)] pb-24 pt-[clamp(96px,11vw,160px)]">
      <SectionHeading label="(05)" title={t('try')} alt={t('tryAlt')} />
      <p data-fade className="mt-6 text-[17px] text-[#3a3a3f]">{t('tryIntro')}</p>
      <ul className="mt-8 border-t border-ink">
        {liftlog.demoAccounts.map((a) => (
          <li key={a.email} data-fade className="flex flex-wrap items-center justify-between gap-4 border-b border-ink py-5">
            <span className="w-24 font-bold">{a.role[locale]}</span>
            <code className="grow font-mono text-[15px]">{a.email}</code>
            <span className="text-sm text-mute">{t('password')} {liftlog.demoPassword}</span>
            <CopyButton text={a.email} label={t('copy')} copiedLabel={t('copied')} />
          </li>
        ))}
      </ul>
      <div className="mt-16 flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="text-sm text-mute">{t('stack')}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {liftlog.stack.map((s) => (
              <li key={s} className="rounded-full border border-ink/20 px-3 py-1 text-sm">{s}</li>
            ))}
          </ul>
        </div>
        <Link href="/#works" className="inline-flex min-h-[52px] items-center rounded-full bg-ink px-7 font-bold text-paper">{t('next')} →</Link>
      </div>
    </section>
  )
}
