<script setup lang="ts">
import BaseIcon from './BaseIcon.vue'
</script>

<template>
  <div class="flex flex-col grow items-center justify-center text-gray-300 text-2xl">
    <BaseIcon name="ExclamationCircleIcon" class="h-8" />
    <slot />
  </div>
</template>
