<script setup lang="ts">
import ActivityItem from '@/components/ActivityItem.vue'
import ActivityForm from '@/components/ActivityForm.vue'
import EmptyState from '@/components/EmptyState.vue'
import { activities } from '@/activities'
</script>

<template>
  <div class="flex flex-col grow">
    <ul v-if="activities.length" class="divide-y grow" v-auto-animate>
      <ActivityItem v-for="activity in activities" :key="activity.id" :activity="activity" />
    </ul>
    <EmptyState v-else>You don't have any activities</EmptyState>
    <ActivityForm />
  </div>
</template>
