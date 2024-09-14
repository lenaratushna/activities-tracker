<script setup>
import { computed } from 'vue'
import { navigate, currentPage } from '@/router'
import { isNavItemValid } from '@/validators'
import BaseIcon from './BaseIcon.vue'
import { PAGE_TIMELINE } from '../constants'
import { scrollToCurrentHour } from '../timeline-items'

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  navItem: {
    required: true,
    type: Object,
    validator: isNavItemValid
  }
})

const classes = computed(() => [
  'flex flex-col items-center p-3 capitalize',
  { 'bg-gray-100': props.navItem.page === currentPage.value }
])

function handleClick() {
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
