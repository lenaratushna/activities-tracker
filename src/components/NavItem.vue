<script setup lang="ts">
import { computed } from 'vue'
import { navigate, currentPage } from '@/router'
import BaseIcon from './BaseIcon.vue'
import { PAGE_TIMELINE } from '../constants'
import { scrollToCurrentHour } from '../timeline-items'
import type { NavItem } from '@/types'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{ navItem: NavItem }>()

const classes = computed((): string[] => [
  'flex flex-col items-center p-3 capitalize',
  props.navItem.page === currentPage.value ? 'bg-gray-100' : ''
])

function handleClick(): void {
  currentPage.value === PAGE_TIMELINE && props.navItem.page === PAGE_TIMELINE
    ? scrollToCurrentHour(true)
    : navigate(props.navItem.page)
}
</script>

<template>
  <li class="flex-1">
    <a :href="`#${navItem.page}`" @click="handleClick" :class="classes">
      <BaseIcon :name="navItem.icon" class="h-6 w-6 text-lime-400" /> {{ navItem.page }}
    </a>
  </li>
</template>
