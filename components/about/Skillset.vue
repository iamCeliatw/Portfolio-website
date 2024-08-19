<template lang="pug">
.skillset__wrapper 
  .skillset__container 
    h1 MY SKILLSET
    .skill__container
      .skill(v-for="skill in skillList" :key="skill.id")
        .image 
          img(:src="skill.image", alt='html')
        p {{skill.name}}
</template>

<script lang="ts" setup>
const skillList = [
  {
    id: 1,
    name: 'HTML',
    image: '/skill/html-icon.svg',
  },
  {
    id: 2,
    name: 'CSS',
    image: '/skill/css-icon.svg',
  },
  {
    id: 3,
    name: 'SASS',
    image: '/skill/sass-icon.svg',
  },
  {
    id: 4,
    name: 'JavaScript',
    image: '/skill/js-icon.png',
  },
  {
    id: 5,
    name: 'Vue3',
    image: '/skill/vue-icon.png',
  },
  {
    id: 6,
    name: 'Nuxt3',
    image: '/skill/nuxt-icon.svg',
  },
  {
    id: 7,
    name: 'Vuetify',
    image: '/skill/vuetify-icon.svg',
  },
  {
    id: 8,
    name: 'Electron',
    image: '/skill/electron-icon.png',
  },
  {
    id: 9,
    name: 'Supabase',
    image: '/skill/supabase-icon.png',
  },
  {
    id: 10,
    name: 'Firebase',
    image: '/skill/firebase-icon.svg',
  },
  {
    id: 11,
    name: 'Git',
    image: '/skill/git-icon.png',
  },
  {
    id: 12,
    name: 'Vercel',
    image: '/skill/vercel-icon.svg',
  },
]
</script>

<style lang="sass" scoped>
@import "@/assets/styles/mixin.sass"
.skillset__wrapper
  width: 550px
  margin: auto
  position: relative
  min-height: 100vh
  height: auto
  // border: 1px red solid
  display: flex
  justify-content: center
  align-items: center
  @include xxs-breakpoint
    width: 100%
    padding: 100px 0
.skillset__container
  width: 100%
  height: auto
  display: flex
  flex-direction: column
  gap: 2rem
  align-items: center
.skill__container
  width: 100%
  grid-template-columns: repeat(5, minmax(0, 1fr))
  display: grid
  gap: 2rem
  @include xxs-breakpoint
    padding: 30px
    grid-template-columns: repeat(2, minmax(0, 1fr))
    gap: 3rem

.skill
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  gap: 0.8rem
  .image
    width: auto
    height: auto

    img
      width: 100%
      height: 100%
      display: block
  p
    font-size: 16px
    color: #333
    font-weight: 600
</style>
