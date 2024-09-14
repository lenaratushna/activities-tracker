<script setup>
import { onActivated} from 'vue'
import { timelineItems, timelineItemRefs, scrollToCurrentHour } from '@/timeline-items'
import TimelineItem from '../components/TimelineItem.vue'
import TimelineIndicator from '../components/TimelineIndicator.vue'

onActivated(scrollToCurrentHour)
</script>

<template>
  <div class="relative mt-7">
    <TimelineIndicator />
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        ref="timelineItemRefs"
      />
    </ul>
  </div>
</template>
