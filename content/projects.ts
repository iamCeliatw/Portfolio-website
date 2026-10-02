import type { Localized } from './types'

export type Project = {
  slug: string
  title: string
  summary: Localized
  stack: string[]
  image: string
  href: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'liftlog',
    title: 'LIFTLOG',
    featured: true,
    summary: {
      zh: '健身追蹤平台，學員、教練、管理員三種角色，從記錄每一組訓練到預約教練課程。',
      en: 'A fitness platform for members, coaches and gym owners, from logging every set to booking sessions.',
    },
    stack: ['Next.js 16', 'Supabase', 'Prisma', 'Playwright'],
    image: '/works/liftlog/landing.png',
    href: '/works/liftlog',
  },
  {
    slug: 'crochet',
    title: '小小鉤針日常',
    summary: {
      zh: '我的鉤針作品網站，中英日三種語言，自己做了 SEO、瀏覽分析後台與 LINE 訂購詢問。',
      en: 'My crochet portfolio in three languages, with SEO, a home-made analytics dashboard and LINE order inquiries.',
    },
    stack: ['Next.js 16', 'next-intl', 'Vercel KV'],
    image: '/works/crochet.jpg',
    href: 'https://crochet-celia.vercel.app/',
  },
  {
    slug: 'paws-on-patrol',
    title: 'Paws on Patrol',
    summary: {
      zh: '寵物保母媒合平台，找附近的保母，用 Stripe 付款。',
      en: 'A pet-sitter marketplace: find sitters nearby and pay through Stripe.',
    },
    stack: ['React', 'Firebase', 'Stripe'],
    image: '/works/paws-on-patrol.jpg',
    href: 'https://paws-on-patrol.firebaseapp.com/',
  },
]
