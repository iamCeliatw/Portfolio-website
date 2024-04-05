<template lang="pug">
section.centersection__wrapper 
 .centersection__container 
    .intro__textfield 
      .textfield__container
        h3.title Hi👋🏻, My name is 
        h1.name Celia 
        .marquee__container 
          .effect-wrapper I'm a 
            span#typed
            span.cursor &nbsp;
        p.desc Constantly focused on learning and expanding my expertise, crafting ever-improving, high-performing solutions.
        .button__container 
          button 
            a(href="#") ABOUT ME
    .intro__image
      img(src='@/assets/avatar.png', alt='avatar')


</template>

<script lang="ts" setup>
const totype = ['Frontend Engineer']

const delayTyping_char = 200
const delayErasing_text = 150
const delayTyping_text = 3000
let typedSpan: HTMLElement | null
let totypeIndex = 0
let charIndex = 0

const typeText = () => {
  if (charIndex < totype[totypeIndex].length) {
    if (typedSpan) {
      typedSpan.textContent += totype[totypeIndex].charAt(charIndex)
    }
    charIndex++
    setTimeout(typeText, delayTyping_char)
  } else {
    setTimeout(eraseText, delayTyping_text)
  }
}
const eraseText = () => {
  if (charIndex > 0) {
    if (typedSpan) {
      typedSpan.textContent = totype[totypeIndex].substring(0, charIndex - 1)
    }
    charIndex--
    setTimeout(eraseText, delayErasing_text)
  } else {
    totypeIndex++
    if (totypeIndex >= totype.length) {
      totypeIndex = 0
    }
    setTimeout(typeText, delayTyping_char)
  }
}
const startTyping = () => {
  setTimeout(typeText, delayTyping_char)
}
onMounted(() => {
  typedSpan = document.getElementById('typed')
  startTyping()
})
</script>

<style lang="sass" scoped>
.centersection__wrapper
  width: 750px
  height: 100vh
  margin: auto
  position: relative
  overflow: hidden
.centersection__container
  position: absolute
  width: 100%
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  display: flex
  gap: 30px

.intro__image
  // border-radius: 50%
  // width: 100%
  width: 320px
  height: 320px
  img
    width: 100%
    height: 100%
    // border-radius: 50%
    display: block
.intro__textfield
  flex: 1
  display: flex
  // justify-items: flex
  // justify-content: flex-end
  align-items: center
.textfield__container
  display: flex
  justify-content: flex-end
  flex-direction: column

  h1,h2,h3,p
    text-align: right
  .button__container
    align-self: flex-end
.title
  color:#262626
  font-weight: 400
  word-spacing: 1.2px
.name
  font-size: 3rem
  font-weight: 700
  word-spacing: 1.2px
  color: rgb(124, 124, 179)

.marquee__container
  width: auto
  display: flex
  justify-content: flex-end
  align-items: center
  font-size: 1.2rem


.effect-wrapper
  text-align: center
  font-weight: 500
  color: #525252

#typed
  font-weight: bold
  color: #262626
  font-weight: 700

.cursor
  display: inline-block
  background-color: #525252
  animation: blinker 800ms infinite

.cursor.typing-true
  animation: none
.desc
  color: #737373
.button__container
  margin-top: 10px
  a
    text-decoration: none
    color: #ffffff
    word-spacing: 5px
  button
    --tw-bg-opacity: 1
    font-weight: 900
    background-color: rgb(124 124 179 / var(--tw-bg-opacity))
    border-radius: 20px
    padding: 4px 8px
    &:hover
      background-color: rgb(91 91 174 / var(--tw-bg-opacity))

@keyframes blinker
  0%
    background-color: #525252
  50%
    background-color: transparent
  100%
    background-color: #525252
</style>
