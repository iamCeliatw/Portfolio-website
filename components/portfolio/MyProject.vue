<template lang="pug">
.myproject__wrapper
  .myproject__container
    .image__container(@click="openSource(project)")
      img(:src="project.image", alt="myproject")
    .text__container
      h3.title {{ project.title }}
      p.desc {{ project.desc }}
      p.skill__stack
        p.skill__stack__title build with: 
        span(v-for="(skill, key) in project.skillStack" :key="key" @click="openOutsource(skill.link)") {{ skill.name }}
  teleport(to="body") 
    transition(name="fade")     
      .video__popup(v-if="openVideo")
        p.video__title {{ 'Demo Video' }}
        video(:src="project.video" loop muted ref="videoRef")
        .close__button(@click="closeVideo" v-if="openVideo") X
</template>

<script lang="ts" setup>
const props = defineProps<{
  project: {
    title: string
    desc: string
    skillStack: {
      name: string
      link: string
    }[]
    image: string
    url: string
    video: string
  }
}>()
const openVideo = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)
const openSource = (project: typeof props.project) => {
  if (project.video) {
    openVideo.value = true
    setTimeout(() => {
      if (videoRef.value) {
        videoRef.value.play()
      }
    }, 0)
  } else if (project.url) {
    window.open(project.url, '_blank')
  }
}

const closeVideo = () => {
  openVideo.value = false
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeVideo()
  }
}
const openOutsource = (url: string) => {
  window.open(url, '_blank')
}
</script>

<style lang="sass" scoped>
@import "@/assets/styles/mixin.sass"
.myproject__wrapper
  width: 100%
  height: 100%

.myproject__container
  padding: 20px
  width: 100%
  height: auto
  display: flex
  flex-direction: column
  gap: 10px
  @include xxs-breakpoint
    padding: 0
.image__container
  width: 100%
  height: auto
  border-radius: 20px
  cursor: pointer
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
  gap: 10px

  h3
    color: #333333
  p
    color: #737373
    font-size: 14px
.skill__stack
  height: fit-content
  span
    color: #f9f9f9
    margin-right: 5px
    border-radius: 32px
    padding: 2px 10px
    background-color: #8284BA
    font-weight: 700
    cursor: pointer
    transition: all 0.3s ease
    border: 1px solid transparent
    &:hover
      border: 1px solid #8284BA
      color: #8284BA
      background-color: transparent
  .skill__stack__title
    margin-bottom: 5px
    color: #333333
    font-weight: 700
.video
  &__popup
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 100%
    height: 100vh
    background-color: rgba(0, 0, 0, 0.5)
    z-index: 1000
    transition: all 0.3s ease
    video
      width: auto
      height: 80%
      -o-object-fit: cover
      object-fit: cover
      top: 50%
      position: absolute
      left: 50%
      transform: translate(-50%, -50%)
      border-radius: 30px
    .close__button
      position: absolute
      top: 10px
      right: 10px
      cursor: pointer
      color: #ffffff
      font-size: 40px
      font-weight: 700
  &__title
    width: 100%
    margin-top: 10px
    text-align: center
    color: #ffffff
    font-size: 30px
    font-weight: 700
</style>
