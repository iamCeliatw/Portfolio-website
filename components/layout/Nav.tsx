import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { LocaleSwitch } from './LocaleSwitch'

const sections = ['works', 'tools', 'experience', 'contact'] as const

export async function Nav() {
  const t = await getTranslations('nav')
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-[var(--gutter)]">
      <nav aria-label={t('aria')} className="glass glass-light fade-in pointer-events-auto flex flex-wrap items-center gap-1 rounded-full p-2">
        <Link href="/" className="inline-flex min-h-11 items-center gap-2.5 px-4 text-[17px] font-extrabold">
          celia <span aria-hidden className="pulse-dot" />
        </Link>
        {sections.map((id) => (
          <Link key={id} href={`/#${id}`} className="hidden min-h-11 items-center rounded-full px-4 text-[15px] hover:bg-black/5 sm:inline-flex">
            {t(id)}
          </Link>
        ))}
        <LocaleSwitch label={t('switchLabel')} text={t('switchTo')} />
      </nav>
    </header>
  )
}
