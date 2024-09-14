<script setup>
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import { BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING, BUTTON_TYPE_DANGER } from '@/constants'
import { isTimelineItemValid } from '@/validators'
import {
  startTimelineItemTimer,
  stopTimelineItemTimer,
  resetTimelineItemTimer,
  activeTimelineItem
} from '@/timeline-items'
import { now } from '@/time'
import { formatSeconds } from '@/functions'

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})
</script>

<template>
  <div class="flex w-full gap-2 items-center">
    <BaseButton
      :type="BUTTON_TYPE_DANGER"
      :disabled="!timelineItem.activitySeconds"
      @click="resetTimelineItemTimer(timelineItem)"
    >
      <BaseIcon name="ArrowPathIcon" class="h-8" />
    </BaseButton>
    <div class="w-full font-mono">{{ formatSeconds(timelineItem.activitySeconds) }}</div>
    <BaseButton
      v-if="timelineItem === activeTimelineItem"
      :type="BUTTON_TYPE_WARNING"
      @click="stopTimelineItemTimer"
    >
      <BaseIcon name="PauseIcon" class="h-8" />
    </BaseButton>
    <BaseButton
      v-else
      :type="BUTTON_TYPE_SUCCESS"
      @click="startTimelineItemTimer(timelineItem)"
      :disabled="timelineItem.hour !== now.getHours()"
    >
      <BaseIcon name="PlayIcon" class="h-8" />
    </BaseButton>
  </div>
</template>
