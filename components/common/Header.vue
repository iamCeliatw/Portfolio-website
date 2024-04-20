<template lang="pug">
.header__wrapper 
  .header__container
    .header__logo
      img(src="@/assets/logo.svg" alt="Logo")
    .header__nav
      ul
        li.nav__item(v-for="item in headerList" :key="item.name")
          nuxt-link(:to="item.link", :class="route.path === item.link ? 'active' : ''",) {{ item.name }}
</template>

<script lang="ts" setup>
import { useStore } from '../stores/index'
const store = useStore()
const route = useRoute()
const headerList = ref([
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Portfolio', link: '/portfolio' },
  { name: 'Contact', link: '/contact' },
])

onMounted(() => {})
</script>

<style lang="sass" scoped>
@import "@/assets/styles/mixin.sass"
.header__wrapper
  width: 100%
  position: fixed
  background: #ffffff
  z-index: 999
.header__container
  width: 100%
  padding:  20px
  display: flex
  justify-content: space-between
.header__logo
  width: 200px
  img
    width: 100%
    display: block

.header__nav
  display: flex
  align-items: center
  ul
    display: flex
    list-style: none

.nav__item
  margin-left: 20px
  a
    text-decoration: none
    color: black
    display: inline-block
    @include active-link-style(false)
    &:hover, &:active, &:focus, &.active
      @include active-link-style(true)
</style>
