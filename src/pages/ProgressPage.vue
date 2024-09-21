<script setup lang="ts">
import ProgressItem from '@/components/ProgressItem.vue'
import { trackedActivities } from '@/activities'
import EmptyState from '@/components/EmptyState.vue'
</script>

<template>
  <div class="flex flex-col grow">
    <ul v-if="trackedActivities.length" class="divide-y">
      <ProgressItem v-for="activity in trackedActivities" :key="activity.id" :activity="activity" />
    </ul>
    <EmptyState v-else>You don't have any tracked activities</EmptyState>
  </div>
</template>
