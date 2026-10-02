// 本機跑 Lighthouse 時以 SITE_URL=http://localhost:3100 建置，canonical 才會指向受測的網址
export const site = process.env.SITE_URL ?? 'https://celia-portfolio-website.vercel.app'
