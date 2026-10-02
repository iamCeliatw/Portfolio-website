'use client'

import NextLink from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { getPathname, usePathname } from '@/i18n/navigation'

export function LocaleSwitch() {
  const locale = useLocale()
  const pathname = usePathname()
  const t = useTranslations('nav')
  const target = locale === 'zh' ? 'en' : 'zh'
  // next-intl 的 Link 切回預設語系時會輸出 /zh 讓中介層寫 cookie，客戶端換頁後網址就停在 /zh；本站關閉語系偵測，直接連到不帶前綴的網址
  const href = getPathname({ href: pathname, locale: target })
  return (
    <NextLink
      href={href}
      hrefLang={target}
      aria-label={t('switchLabel')}
      className="inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm font-bold text-paper"
    >
      {t('switchTo')}
    </NextLink>
  )
}
