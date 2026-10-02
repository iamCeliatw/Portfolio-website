import { getLocale, getTranslations } from 'next-intl/server'
import { liftlog } from '@/content/liftlog'
import type { Locale } from '@/content/types'
import { SectionHeading } from '@/components/ui/SectionHeading'

export async function Roles() {
  const t = await getTranslations('liftlog')
  const locale = (await getLocale()) as Locale
  return (
    <section className="bg-paper px-[var(--gutter)] pt-[clamp(96px,11vw,160px)]">
      <SectionHeading label="(01)" title={t('roles')} alt={t('rolesAlt')} />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {liftlog.roles.map((role) => (
          <article key={role.name.en} data-fade className="rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgb(0_0_0/.06)]">
            <h3 className="text-2xl font-bold">{role.name[locale]}</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#3a3a3f]">
              {role.items.map((item) => (
                <li key={item.en} className="flex gap-3">
                  <span aria-hidden className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-ink" />
                  {item[locale]}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
