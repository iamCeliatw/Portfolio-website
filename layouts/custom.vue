<script lang="ts" setup></script>

<template lang="pug">
div.custom__wrapper
  CommonHeader
  CommonLeftLink
  CommonRightEmail
  slot
</template>

<style lang="sass" scoped>
.custom__wrapper
  position: relative
  width: 100%
  height: 100%
  background: #f9f9f9
  min-height: 100vh
  // height: calc(100% - 90px)
  // border: 1px solid green
</style>
