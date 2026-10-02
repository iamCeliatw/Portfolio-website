import { getTranslations } from 'next-intl/server'
import { Ticker } from './Ticker'

export async function Hero() {
  const t = await getTranslations('hero')
  return (
    <section id="top" className="bg-paper px-[var(--gutter)] pt-[clamp(120px,12vw,180px)]">
      <p className="fade-in text-sm text-mute [animation-delay:.1s]">{t('eyebrow')}</p>
      <h1 className="mt-5 text-[clamp(56px,10.5vw,168px)] font-extrabold leading-[.92] tracking-[-.045em]">
        <span className="line-mask">
          <span className="line-rise [animation-delay:.15s]">
            I make <span className="font-serif font-light italic tracking-[-.02em]">(digital)</span>
          </span>
        </span>
        <span className="line-mask">
          <span className="line-rise [animation-delay:.27s]">
            <Ticker words={t.raw('words') as string[]} />
          </span>
        </span>
      </h1>
      <div className="mt-10 grid items-end gap-8 md:grid-cols-2">
        <p className="fade-in max-w-[22ch] font-serif text-[clamp(24px,2.4vw,34px)] font-light leading-[1.3] [animation-delay:.6s]">
          {t('intro')}
        </p>
        <p className="fade-in text-sm text-mute md:justify-self-end [animation-delay:.7s]">{t('scroll')} ↓</p>
      </div>
    </section>
  )
}
