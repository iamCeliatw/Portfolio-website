<template lang="pug">
.skillset__wrapper 
  .skillset__container 
    h1 MY SKILLSET
    .skill__container
      .skill
        .image 
          img(src='@/assets/html.webp', alt='html')
      .skill
        .image 
          img(src='@/assets/html.webp', alt='html')
      .skill
        .image 
          img(src='@/assets/html.webp', alt='html')
      .skill
        .image 
          img(src='@/assets/html.webp', alt='html')
      .skill
        .image 
          img(src='@/assets/html.webp', alt='html')
      .skill
        .image 
          img(src='@/assets/html.webp', alt='html')
</template>

<script lang="ts" setup></script>

<style lang="sass" scoped>
.skillset__wrapper
  width: 550px
  margin: auto
  position: relative
  min-height: 100vh
  height: auto
  border: 1px red solid
  display: flex
  justify-content: center
  align-items: center
.skillset__container
  width: 100%
  height: auto
  display: flex
  flex-direction: column
  gap: 1rem
  align-items: center
.skill__container
  width: 100%
  grid-template-columns: repeat(5, minmax(0, 1fr))
  display: grid
  gap: 1rem
.skill
  width: 76px
  height: 76px
  border: 1px green solid
  display: flex
  justify-content: center
  align-items: center
  .image
    width: 60%
    height: auto
    padding: 10px 0
    img
      width: 100%
      height: 100%
      display: block
</style>
