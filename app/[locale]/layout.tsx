import { site } from '@/lib/site'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { fontVariables } from '@/app/fonts'
import { Nav } from '@/components/layout/Nav'
import { Cursor } from '@/components/motion/Cursor'
import { MotionProvider } from '@/components/motion/MotionProvider'
import 'lenis/dist/lenis.css'
import '../globals.css'

const htmlLang = { zh: 'zh-Hant-TW', en: 'en' } as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    metadataBase: new URL(site),
    title: t('title'),
    description: t('description'),
    alternates: { canonical: locale === 'zh' ? '/' : '/en', languages: { 'zh-Hant-TW': '/', en: '/en' } },
    openGraph: { type: 'website', siteName: "Celia's Portfolio", locale: locale === 'zh' ? 'zh_TW' : 'en_US' },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  return (
    <html lang={htmlLang[locale]} className={fontVariables}>
      <body className="font-sans text-ink antialiased">
        {/* 瀏覽器端元件不讀翻譯，文字由伺服器元件以 props 傳入；不送 messages 可省下格式化程式與 HTML 內的翻譯資料 */}
        <NextIntlClientProvider messages={null}>
          <Nav />
          {children}
          <MotionProvider />
          <Cursor />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
