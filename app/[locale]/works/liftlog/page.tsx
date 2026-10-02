import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { CaseHero } from '@/components/liftlog/CaseHero'
import { DemoAccounts } from '@/components/liftlog/DemoAccounts'
import { Flow } from '@/components/liftlog/Flow'
import { Highlights } from '@/components/liftlog/Highlights'
import { Roles } from '@/components/liftlog/Roles'
import { Screens } from '@/components/liftlog/Screens'

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    title: t('liftlogTitle'),
    description: t('liftlogDescription'),
    alternates: {
      canonical: locale === 'zh' ? '/works/liftlog' : '/en/works/liftlog',
      languages: { 'zh-Hant-TW': '/works/liftlog', en: '/en/works/liftlog' },
    },
  }
}

export default async function LiftlogPage({ params }: Params) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <main>
      <CaseHero />
      <Roles />
      <Screens />
      <Highlights />
      <Flow />
      <DemoAccounts />
    </main>
  )
}
