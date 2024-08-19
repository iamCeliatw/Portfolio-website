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
    },
  },
})
