import { getTranslations } from 'next-intl/server'
import { email, socials } from '@/content/contact'
import { CopyButton } from '@/components/ui/CopyButton'

export async function ContactSection() {
  const t = await getTranslations('contact')
  return (
    <footer id="contact" className="scroll-mt-24 bg-paper px-[var(--gutter)] pb-10 pt-[clamp(96px,11vw,160px)]">
      <p className="text-sm text-mute">{t('label')}</p>
      <h2 data-reveal className="mt-4 text-[clamp(64px,11vw,176px)] font-extrabold leading-[.9] tracking-[-.05em]">
        {t('title')} <span className="font-serif font-light italic tracking-[-.02em]">{t('titleAlt')}</span>
      </h2>
      <div data-fade className="mt-12 flex flex-wrap items-center gap-4">
        <a href={`mailto:${email}`} className="break-all text-[clamp(22px,3vw,40px)] font-bold underline decoration-1 underline-offset-8">
          {email}
        </a>
        <CopyButton text={email} label={t('copy')} copiedLabel={t('copied')} />
      </div>
      <ul className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-ink pt-5 text-sm">
        {socials.map((s) => (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
              {s.label} ↗
            </a>
          </li>
        ))}
        <li className="text-mute">{t('rights')}</li>
      </ul>
    </footer>
  )
}
