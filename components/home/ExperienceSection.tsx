import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'
import { jobs } from '@/content/experience'
import type { Locale } from '@/content/types'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { VideoThumb } from './VideoThumb'

export async function ExperienceSection() {
  const t = await getTranslations('experience')
  const locale = (await getLocale()) as Locale
  return (
    <section id="experience" className="grid scroll-mt-24 gap-[clamp(24px,4vw,64px)] bg-paper px-[var(--gutter)] pt-[clamp(96px,11vw,160px)] lg:grid-cols-[1fr_2.2fr]">
      <SectionHeading label={t('label')} title={t('title')} alt={t('titleAlt')} />
      <ol className="border-t border-ink">
        {jobs.map((job) => (
          <li key={job.company.zh} className="grid gap-6 border-b border-ink py-10 md:grid-cols-[1fr_1.6fr]">
            <div data-fade>
              <h3 className="text-[clamp(26px,2.6vw,36px)] font-bold leading-tight">{job.company[locale]}</h3>
              <p className="mt-2 text-mute">{job.role[locale]}</p>
              {job.period && <p className="mt-1 text-sm text-mute">{job.period[locale]}</p>}
            </div>
            <div>
              {job.highlights && (
                <ul className="space-y-4">
                  {job.highlights.map((h) => (
                    <li key={h.zh} data-fade className="flex gap-3 text-[17px] leading-relaxed">
                      <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-ink" />
                      {h[locale]}
                    </li>
                  ))}
                </ul>
              )}
              {job.works && (
                <ul className="grid gap-x-5 gap-y-8 sm:grid-cols-2">
                  {job.works.map((w) => (
                    <li key={w.title} data-fade>
                      {w.video ? (
                        <VideoThumb title={w.title} summary={w.summary[locale]} image={w.image} video={w.video} watchLabel={t('watch')} closeLabel={t('close')} />
                      ) : (
                        <a href={w.href} target="_blank" rel="noopener noreferrer" className="spring-card block">
                          <span className="relative block aspect-[4/3] overflow-hidden rounded-2xl">
                            <Image src={w.image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="zoom-img object-cover object-top" />
                          </span>
                          <span className="mt-3 block font-bold">{w.title}</span>
                          <span className="mt-1 block text-sm leading-relaxed text-mute">{w.summary[locale]}</span>
                          <span className="sr-only">{t('visit')}</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
