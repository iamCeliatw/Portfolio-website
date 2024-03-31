<script lang="ts" setup></script>

<template lang="pug">
div.custom__wrapper
  Header
  LeftLink
  RightEmail
  slot
</template>

<style lang="sass" scoped>
.custom__wrapper
  position: relative
</style>
