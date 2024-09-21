<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import BaseSelect from './BaseSelect.vue'
import BaseIcon from './BaseIcon.vue'
import RemainingActivitySeconds from './RemainingActivitySeconds.vue'
import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from '@/constants'
import { timelineItems, resetTimelineItemActivities } from '@/timeline-items'
import { updateActivity, deleteActivity } from '@/activities'
import type { Activity } from '../types'

defineProps<{ activity: Activity }>()

function deleteAndResetActivity(activity: Activity): void {
  resetTimelineItemActivities(timelineItems.value, activity)
  deleteActivity(activity)
}
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteAndResetActivity(activity)">
        <BaseIcon name="TrashIcon" class="h-8" />
      </BaseButton>
      <span class="truncate text-lg">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="font-mono grow"
        placeholder="hh:mm"
        :selected="activity.secondsToComplete || null"
        :options="PERIOD_SELECT_OPTIONS"
        @select="updateActivity(activity, { secondsToComplete: $event || 0 })"
      />
      <RemainingActivitySeconds v-if="activity.secondsToComplete" :activity="activity" />
    </div>
  </li>
</template>
