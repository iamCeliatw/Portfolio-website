import { getTranslations, setRequestLocale } from 'next-intl/server'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('hero')
  return (
    <main className="bg-paper px-[var(--gutter)] py-32">
      <h1 className="text-6xl font-extrabold">Celia</h1>
      <p className="mt-6 text-xl">{t('intro')}</p>
    </main>
  )
}
