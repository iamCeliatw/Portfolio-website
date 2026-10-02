import { getTranslations } from 'next-intl/server'
import { skills } from '@/content/skills'
import { SectionHeading } from '@/components/ui/SectionHeading'

export async function ToolsSection() {
  const t = await getTranslations('tools')
  return (
    <section id="tools" className="scroll-mt-24 bg-paper px-[var(--gutter)] pt-[clamp(96px,11vw,160px)]">
      <div className="relative overflow-hidden rounded-[32px] p-[clamp(32px,6vw,80px)] text-white">
        <div className="field" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <div className="relative">
          <SectionHeading label={t('label')} title={t('title')} alt={t('titleAlt')} invert />
          <ul className="mt-10 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <li key={skill} data-fade className="glass rounded-full px-5 py-3.5 text-[17px] font-medium">{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
