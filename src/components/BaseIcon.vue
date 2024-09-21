<script setup lang="ts">
import { ICONS } from '@/constants'
import type { IconName } from '@/types'

defineProps<{ name: IconName }>()
</script>

<template>
  <component :is="ICONS[name]" />
</template>
