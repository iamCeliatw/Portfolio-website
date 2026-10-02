import type { Localized } from './types'

export type ExperienceWork = {
  title: string
  summary: Localized
  image: string
  href?: string
  video?: string
}

export type Job = {
  company: Localized
  role: Localized
  period?: Localized
  highlights?: Localized[]
  works?: ExperienceWork[]
}

export const jobs: Job[] = [
  {
    company: { zh: '遠創智慧', en: 'FETC International' },
    role: { zh: '前端工程師，2026 年起兼任 iOS', en: 'Frontend Engineer, also iOS since 2026' },
    period: { zh: '2025 ～ 至今', en: '2025 to present' },
    highlights: [
      {
        zh: '負責 uTagGo 停車與電子收費服務的 Web 平台，營運後台新增 21 個頁面，介面支援中、英、泰、馬來 4 種語言。',
        en: 'Built the web platform for uTagGo parking and e-toll services: 21 new pages in the operations console, in 4 languages.',
      },
      {
        zh: '開發消費者端 5 個網站，包含月租繳費、官網、LINE LIFF 與 LINE Mini App。',
        en: 'Developed 5 consumer sites, including monthly-pass payments, the official site, LINE LIFF and a LINE Mini App.',
      },
      {
        zh: '用 Zod 改寫 16 個頁面的表單驗證，並統一共用版型與下拉元件，涵蓋 43 個頁面、84 個檔案。',
        en: 'Rewrote form validation on 16 pages with Zod, and unified shared layouts and dropdowns across 43 pages and 84 files.',
      },
      {
        zh: '2026 年起參與 uTagGo iOS App，因應會員個資隱碼，設計「只送異動欄位」的更新機制，涵蓋 3 條業務流程。',
        en: 'Joined the uTagGo iOS app in 2026 and designed a "send only changed fields" update for masked member data, covering 3 business flows.',
      },
    ],
  },
  {
    company: { zh: '王一互動科技', en: 'King One Interactive Technology' },
    role: { zh: '前端工程師', en: 'Frontend Engineer' },
    works: [
      {
        title: "L'AiR Journal",
        summary: { zh: '科技部落格網站，用 Nuxt3 與 Vue 開發。', en: 'A tech blog built with Nuxt 3 and Vue.' },
        image: '/experience/lair-journal.jpg',
        href: 'https://seeulair.com/journal/',
      },
      {
        title: 'China Airlines Online Museum',
        summary: { zh: '中華航空線上博物館，用 Babylon.js 與 Vue 打造 3D 展場。', en: 'A 3D online museum for China Airlines, built with Babylon.js and Vue.' },
        image: '/experience/china-airlines-museum.jpg',
        href: 'https://onlinemuseum.china-airlines.com/',
      },
      {
        title: 'Hydrogen Energy Game',
        summary: { zh: '工研院的氫能教育觸控遊戲，用 Electron 包成桌面應用。', en: 'A touch game teaching kids about hydrogen energy for ITRI, packaged with Electron.' },
        image: '/experience/hydrogen-game.jpg',
        video: '/experience/hydrogen-game.mp4',
      },
      {
        title: 'Vyin AI Chat Bot',
        summary: { zh: '為 Game Orange 開發的桌面應用，可即時播放音樂、送出燈光訊號、上傳圖片。', en: 'A desktop app for Game Orange that plays music in real time, sends light signals and uploads images.' },
        image: '/experience/vyin-ai.jpg',
        video: '/experience/vyin-ai.mp4',
      },
    ],
  },
]
