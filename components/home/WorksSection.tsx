import { getLocale, getTranslations } from 'next-intl/server'
import { projects } from '@/content/projects'
import type { Locale } from '@/content/types'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from './ProjectCard'

export async function WorksSection() {
  const t = await getTranslations('works')
  const locale = (await getLocale()) as Locale
  const labels = { caseStudy: t('caseStudy'), visit: t('visit'), screenshot: t('screenshot') }
  return (
    <section id="works" className="grid scroll-mt-24 gap-[clamp(24px,4vw,64px)] bg-paper px-[var(--gutter)] pt-[clamp(96px,11vw,160px)] lg:grid-cols-[1fr_2.2fr]">
      <div>
        <SectionHeading label={t('label')} title={t('title')} alt={t('titleAlt')} />
        <p data-fade className="mt-6 max-w-[30ch] text-[17px] leading-relaxed text-[#3a3a3f]">{t('intro')}</p>
      </div>
      <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} labels={labels} />
        ))}
      </div>
    </section>
  )
}
