// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/styles/mixin.sass', '~/assets/styles/main.sass'],
  modules: ['@pinia/nuxt'],
  app: {
    head: {
      title: `Celia's Portfolio`,
      link: [
        {
          rel: 'icon',
          href: '/favicon.png',
        },
      ],
      meta: [
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: `Celia's Portfolio` },
        {
          property: 'og:description',
          content: 'My portfolio and skill set record.',
        },
        {
          property: 'og:image',
          content:
            'https://celia-portfolio-website.vercel.app/project/portfolio_project.jpg',
        },
      ],
    },
  },
})
