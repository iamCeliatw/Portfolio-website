<template lang="pug">
.portfolio__wrapper 
  .portfolio__container 
    h1 WEBSITE PROJECTS
    .portfolio__container--website
      //- h1 WEBSITE PROJECTS
      .portfolio(v-for="(project, key) in projectList" :key="key")
        PortfolioMyProject(:project="project")
    h1 DESKTOP APP PROJECTS 
      span.video__tip {{'(Click image to watch video)'}}
    .portfolio__container--desktop
      //- h1 Desktop APP Projects
      .portfolio(v-for="(project, key) in desktopAppList" :key="key")
        PortfolioMyProject(:project="project" :desktop="true")
</template>

<script lang="ts" setup>
import { useStore } from '../stores/index'
import { projectList, desktopAppList } from '~/data/project'
const store = useStore()
const route = useRoute()
console.log(route.name)
// const desktopAppList = ref([
//   {
//     //氫能遊戲for工研院能源所
//     title: 'Hydrogen Energy Game',
//     desc: 'A simple touch game for children to learn about hydrogen energy, made for Industrial Technology Research Institute.',
//     skillStack: [
//       {
//         name: 'Vue.js',
//         link: 'https://vuejs.org/',
//       },
//       {
//         name: 'Electron',
//         link: 'https://www.electronjs.org/',
//       },
//     ],
//     image: '/project/desktop_project_1.jpg',
//     video: '/project/desktop_project_1.mp4',
//   },
//   {
//     //vyin ai
//     title: 'Vyin AI Chat Bot App',
//     desc: 'A desktop app for Vyin AI Chat Bot, made for Game Orange. It can play random or specific music in real-time, send light signals, upload images, and more.',
//     skillStack: [
//       {
//         name: 'Vue.js',
//         link: 'https://vuejs.org/',
//       },
//       {
//         name: 'Electron',
//         link: 'https://www.electronjs.org/',
//       },
//       {
//         name: 'Node.js',
//         link: 'https://nodejs.org/',
//       },
//     ],
//     image: '/project/vyinai.jpg',
//     video: '/project/vyinai.mov',
//   },
// ])
// const projectList = ref([
//   {
//     title: "L'AiR Journal",
//     desc: 'A blog website for tech lovers',
//     skillStack: [
//       {
//         name: 'Nuxt3',
//         link: 'https://nuxt.com/',
//       },
//       {
//         name: 'Vue.js',
//         link: 'https://vuejs.org/',
//       },
//     ],
//     image: '/project/project_1.jpg',
//     url: 'https://seeulair.com/journal/',
//   },
//   {
//     title: 'China Airlines Online Museum',
//     desc: 'An online museum for China Airlines',
//     skillStack: [
//       {
//         name: 'Babylon.js',
//         link: 'https://www.babylonjs.com/',
//       },
//       {
//         name: 'Vue.js',
//         link: 'https://vuejs.org/',
//       },
//     ],
//     image: '/project/project_2.jpg',
//     url: 'https://onlinemuseum.china-airlines.com/',
//   },
//   {
//     title: 'blog website',
//     desc: 'A tech blog for engineers who need some help',
//     skillStack: [
//       {
//         name: 'Nuxt3',
//         link: 'https://nuxt.com/',
//       },
//       {
//         name: 'TypeScript',
//         link: 'https://www.typescriptlang.org/',
//       },
//       {
//         name: 'Vuetify',
//         link: 'https://vuetifyjs.com/',
//       },
//       {
//         name: 'Supabase',
//         link: 'https://supabase.com/',
//       },
//     ],
//     image: '/project/project_3.jpg',
//     url: 'https://celia-blog.vercel.app/',
//   },
// ])
</script>

<style lang="sass" scoped>
@import "@/assets/styles/mixin.sass"

.portfolio
  &__wrapper
    width: 100%
    height: 100%
    padding: 100px 100px
    @include xs-breakpoint
      padding: 100px 70px
    @include xxs-breakpoint
      padding: 100px 10px

  &__container
    display: flex
    flex-direction: column
    gap: 10px
    height: 100%
    width: 100%
    h1
      font-size: 24px
      font-weight: 700
      color: #333
      margin-left: 20px
      @include xxs-breakpoint
      margin-left: 0
      font-size: 27px
  &__container--website,
  &__container--desktop
    height: 100%
    width: 100%
    display: grid
    grid-template-columns: repeat(3, 1fr)
    gap: 15px
    margin-bottom: 20px
    @include md-breakpoint
      grid-template-columns: repeat(2, 1fr)
    @include xs-breakpoint
      grid-template-columns: repeat(1, 1fr)
      gap: 40px
      margin-bottom: 60px


  .portfolio
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1)
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
    --tw-bg-opacity: 1
    border-radius: 20px
    background: #fff
    // background-color: rgb(243 244 246 / var(--tw-bg-opacity))
.video__tip
  font-size: 16px
  //color
  color: #FF9999
  margin-left: 15px
</style>
