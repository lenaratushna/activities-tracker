<script setup>
import { PAGE_TIMELINE } from '@/constants'
import { navigate } from '@/router'
</script>

<template>
  <a
    :href="`#${PAGE_TIMELINE}`"
    @click="navigate(PAGE_TIMELINE)"
    class="text-2xl font-bold text-lime-400"
    >OnTrack</a
  >
</template>
