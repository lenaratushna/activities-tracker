<script setup lang="ts">
import { computed } from 'vue'
import { now } from '@/time'
import { scrollToHour } from '@/timeline-items'
import type { Hour } from '@/types'

const props = defineProps<{ hour: Hour }>()

const classes = computed((): string[] => [
  'rounded px-2 font-mono text-lg absolute -top-4 left-1/2 -translate-x-1/2',
  props.hour === now.value.getHours()
    ? 'bg-lime-400 font-black text-white'
    : 'bg-gray-100 text-gray-500'
])

const formattedHour = `${props.hour.toString().padStart(2, '0')}:00`
</script>

<template>
  <a href="#" :class="classes" @click.prevent="scrollToHour(hour)">{{ formattedHour }}</a>
</template>
