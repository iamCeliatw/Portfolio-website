<template lang="pug">
.myproject__wrapper
  .myproject__container
    .image__container
      img(src="@/assets/project_1.jpg", alt="myproject")
    .text__container
      h1.title {{ project.title }}
      h5.desc {{ project.desc }}
      p.skill__stack
        | build with: 
        span(v-for="(skill, key) in project.skillStack" :key="key") {{ skill }}
    
</template>

<script lang="ts" setup>
const props = defineProps<{
  project: {
    title: string
    desc: string
    skillStack: string[]
  }
}>()
</script>

<style lang="sass" scoped>
.myproject__wrapper
 width: 100%
  height: 100%
  min-height: 100vh
.myproject__container
  padding: 20px
  width: 100%
  height: auto
  display: flex
  flex-direction: column
  gap: 10px
.image__container
  width: 100%
  height: auto
  border-radius: 20px
  img
    width: 100%
    height: 100%
    object-fit: cover
    border-radius: 20px
    // border: 10px solid #f9f9f9
    object-position: center
.text__container
  display: flex
  flex-direction: column
  gap: 5px

.skill__stack
  // margin-right: 5px

  span
    color: #8284BA
    margin-right: 5px
</style>
