import { site } from '@/lib/site'
import type { MetadataRoute } from 'next'

const paths = ['', '/works/liftlog']

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) => {
    const languages = { 'zh-Hant-TW': `${site}${path}`, en: `${site}/en${path}` }
    return [
      { url: `${site}${path}`, alternates: { languages } },
      { url: `${site}/en${path}`, alternates: { languages } },
    ]
  })
}
