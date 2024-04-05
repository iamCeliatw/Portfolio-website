<template lang="pug">
.contact__wrapper
  .contact__container
    .title
      h1 Contact me !
      p Leave your details and a short message below and I will get back to you as soon as possible.
    .form__wrapper
      form.form__container(@submit.prevent="submitForm")
        .text__input
          .name
            span name
            input(v-model="formData.name" type="text" placeholder="Enter your name" required)
          .email
            span email
            input(v-model="formData.email" type="email" placeholder="Enter your email" required)
        .textarea__input
          span message
          textarea(v-model="formData.message" placeholder="What would you like to ask me?" required cols="15" rows="10" )
        button.send__button(type="submit") Send Message 
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  message: '',
})

const submitForm = async () => {
  try {
    console.log('formData.value:', formData.value)
    const response = await fetch('/api/create-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    })

    const result = await response.json()

    if (result.success) {
      // 处理成功，例如清空表单，显示成功消息等
      console.log('Success:', result.message)
    } else {
      // 处理错误情况
      console.error('Error:', result.message)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>

<style lang="sass" scoped>
.contact__wrapper
  width: 100%
  margin: auto
  min-height: 100vh

  // height: 100vh
  padding: 20px
  display: flex
.contact__container
    width: 50%
    max-width: 500px
    margin: auto
.title
  text-align: center
  h1
    font-size: 30px
    margin-bottom: 10px
  p
    font-size: 16px
    color: #666
    margin-bottom: 20px
.form__wrapper
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1)
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
    --tw-bg-opacity: 1
    background-color: rgb(243 244 246 / var(--tw-bg-opacity))
    padding: 1.75rem
    border-radius: 15px
.form__container
  display: flex
  flex-direction: column
  gap: 10px
  .text__input
    display: flex
    gap: 10px
    .name,.email
      flex: 1
input, textarea
  padding: 10px
  border: 1px solid #000
  border-radius: 5px
  width: 100%
  box-sizing: border-box
  outline: none
  border: none
  height: 50px
  &:focus
    border-color: rgb(124, 124, 179)
    border-width: 2px
  &::-webkit-input-placeholder
    font-style: italic
    color: #ccc
textarea
  height: 120px
  resize: vertical
button
  padding: 10px
  border: none
  border-radius: 5px
  background: rgb(124, 124, 179)
  color: white
  cursor: pointer
  &:hover
    background: rgb(124, 124, 179,0.8)
span
  font-weight: 500
  color: #666
  margin-bottom: 5px
  display: inline-block

.send__button
  font-weight: 900
  font-size: 15px
  // word-spacing: 20px
  border-radius: 30px
  color: rgb(255, 255, 255)
  --tw-border-opacity: 1
  border-bottom-width: 4px
  border-color: rgb(91 91 174 / var(--tw-border-opacity))
  &:hover
    --tw-bg-opacity: 1
    background-color: rgb(91 91 174 / var(--tw-bg-opacity))
</style>
