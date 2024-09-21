<script setup lang="ts">
import { nextTick, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import { BUTTON_TYPE_PRIMARY } from '../constants'
import { id } from '@/functions'
import { createActivity } from '@/activities'

const activityName = ref('')

async function submit(): Promise<void> {
  createActivity({
    id: id(),
    name: activityName.value,
    secondsToComplete: 0
  })
  activityName.value = ''
  await nextTick()
  window.scrollTo(0, document.body.scrollHeight)
}
</script>

<template>
  <form @submit.prevent="submit" class="sticky bottom-[72px] flex gap-2 border-t bg-white p-2">
    <input
      v-model="activityName"
      type="text"
      class="w-full rounded border px-3 text-lg"
      placeholder="Add new activity"
    />
    <BaseButton :disabled="activityName.trim() === ''" :type="BUTTON_TYPE_PRIMARY">
      <BaseIcon name="PlusIcon" class="h-8" />
    </BaseButton>
  </form>
</template>
