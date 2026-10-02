import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function NotFound() {
  const t = useTranslations('notFound')
  return (
    <main className="bg-paper px-[var(--gutter)] py-32">
      <p className="text-sm text-mute">404</p>
      <h1 className="mt-4 text-[clamp(56px,10vw,160px)] font-extrabold leading-[.9] tracking-[-.045em]">
        {t('title')} <span className="font-serif font-light italic tracking-[-.02em]">{t('titleAlt')}</span>
      </h1>
      <p className="mt-6 text-lg">{t('body')}</p>
      <Link href="/" className="mt-10 inline-flex min-h-11 items-center rounded-full bg-ink px-6 font-bold text-paper">
        {t('home')}
      </Link>
    </main>
  )
}
