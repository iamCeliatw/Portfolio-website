import Image from 'next/image'
import type { Project } from '@/content/projects'
import type { Locale } from '@/content/types'
import { Link } from '@/i18n/navigation'

type Props = { project: Project; locale: Locale; labels: { caseStudy: string; visit: string; screenshot: string } }

export function ProjectCard({ project, locale, labels }: Props) {
  const external = project.href.startsWith('http')
  const inner = (
    <>
      <span className={`relative block overflow-hidden rounded-3xl ${project.featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        <Image
          src={project.image}
          alt={`${project.title} ${labels.screenshot}`}
          fill
          sizes={project.featured ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
          className="zoom-img object-cover object-top"
        />
      </span>
      <span className="mt-4 flex items-baseline justify-between gap-4">
        <span className={`font-bold ${project.featured ? 'text-[clamp(28px,3vw,40px)]' : 'text-2xl'}`}>{project.title}</span>
        <span className="shrink-0 text-sm text-mute">{external ? `${labels.visit} ↗` : `${labels.caseStudy} →`}</span>
      </span>
      <span className="mt-1.5 block max-w-[52ch] text-[15px] leading-relaxed text-mute">{project.summary[locale]}</span>
      <span className="mt-3 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span key={s} className="rounded-full border border-ink/15 px-3 py-1 text-xs">{s}</span>
        ))}
      </span>
    </>
  )
  const className = `spring-card block ${project.featured ? 'sm:col-span-2' : ''}`
  return external ? (
    <a href={project.href} target="_blank" rel="noopener noreferrer" className={className}>{inner}</a>
  ) : (
    <Link href={project.href} className={className}>{inner}</Link>
  )
}
