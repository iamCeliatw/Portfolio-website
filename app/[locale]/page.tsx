import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Hero } from '@/components/home/Hero'
import { PlasmaStage } from '@/components/home/PlasmaStage'
import type { StagePanel } from '@/components/home/StagePanels'
import { WorksSection } from '@/components/home/WorksSection'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('stage')

  const panels: StagePanel[] = [
    { id: 'liftlog', label: t('featured'), title: 'LIFTLOG', meta: 'Next.js 16 · Supabase · Prisma', href: '/works/liftlog', className: 'left-[6%] top-[12%] w-[min(360px,42%)]' },
    { id: 'tests', label: 'Playwright', title: t('tests'), meta: 'OpenSpec · 34 specs', className: 'left-[calc(6%+min(360px,42%)+12px)] top-[12%] w-[min(220px,24%)] max-md:hidden' },
    { id: 'museum', label: t('previous'), title: 'China Airlines Online Museum', meta: 'Babylon.js · Vue', className: 'right-[7%] top-[46%] w-[min(300px,40%)]' },
    { id: 'crochet', label: t('side'), title: '小小鉤針日常', meta: 'Next.js · next-intl', className: 'bottom-[8%] right-[38%] w-[min(260px,36%)] max-md:hidden' },
  ]

  return (
    <main>
      <Hero />
      <PlasmaStage panels={panels} hello={t('hello')} aria={t('aria')} />
      <WorksSection />
    </main>
  )
}
