<script setup lang="ts">
import { formatSeconds } from '@/functions'
import { useProgress } from '@/composables/progress'
import { HUNDRED_PERCENT } from '@/constants'
import type { Activity } from '@/types'

const props = defineProps<{ activity: Activity }>()

const { colorClass, percentage, trackedActivitySeconds } = useProgress(props.activity)
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="text-lg">{{ activity.name }}</div>
    <div class="flex h-2 overflow-hidden rounded bg-gray-100">
      <div
        :class="['transition-all', colorClass]"
        :style="{ width: `${Math.min(percentage, HUNDRED_PERCENT)}%` }"
      />
    </div>
    <div class="flex justify-between text-sm font-mono">
      <span>{{ percentage }}%</span>
      <span>
        {{ formatSeconds(trackedActivitySeconds) }}
        /
        {{ formatSeconds(activity.secondsToComplete) }}
      </span>
    </div>
  </li>
</template>
