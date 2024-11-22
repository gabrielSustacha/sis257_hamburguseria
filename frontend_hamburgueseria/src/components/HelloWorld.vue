<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h5 class="us">{{ msg }}</h5>
  </div>
</template>

<style scoped>
.us {
  color:black;
}
</style>