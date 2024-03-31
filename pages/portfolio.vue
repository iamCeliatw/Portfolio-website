<template lang="pug">

</template>

<script lang="ts" setup>
import { useStore } from "../stores/index";
const store = useStore();
const route = useRoute();
console.log(route.name);
</script>

<style lang="sass" scoped></style>
