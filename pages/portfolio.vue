<template lang="pug">
.portfolio__wrapper 
  .portfolio__container 
    .portfolio(v-for="(project, key) in projectList" :key="key")
      PortfolioMyProject(:project="project")
    
</template>

<script lang="ts" setup>
import { useStore } from '../stores/index'
const store = useStore()
const route = useRoute()
console.log(route.name)
const projectList = ref({
  project1: {
    title: 'Journal',
    desc: 'a blog website for tech lovers',
    skillStack: ['Vue.js', 'Nuxt3'],
  },
  project2: {
    title: 'Portfolio',
    desc: 'a personal portfolio website',
    skillStack: ['Vue.js', 'Nuxt3', 'Vercel'],
  },
  project3: {
    title: 'blog website',
    desc: 'a tech blog for engineers',
    skillStack: ['Nuxt3', 'Vuetify', 'Supabase'],
  },
})
</script>

<style lang="sass" scoped>
@import "@/assets/styles/mixin.sass"

.portfolio__wrapper
  width: 100%
  height: 100%
  padding: 100px 100px
  @include xs-breakpoint
    padding: 100px 70px
  @include xxs-breakpoint
    padding: 100px 40px
.portfolio__container
  height: 100%
  width: 100%
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 15px
  @include md-breakpoint
    grid-template-columns: repeat(2, 1fr)
  @include xs-breakpoint
    grid-template-columns: repeat(1, 1fr)


  .portfolio
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1)
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
    --tw-bg-opacity: 1
    border-radius: 20px
    background: #fff
    // background-color: rgb(243 244 246 / var(--tw-bg-opacity))
</style>
