<script setup lang="ts" generic="T extends number | string">
import { BUTTON_TYPE_NEUTRAL } from '../constants'
import { normalizeSelect } from '../functions'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import type { SelectOption } from '@/types'

defineProps<{
  selected: T | null
  options: SelectOption<T>[]
  placeholder: string
}>()

const emit = defineEmits<{
  select: [value: T | null]
}>()

function select(value: string | null): void {
  emit('select', normalizeSelect(value) as T | null)
}
</script>

<template>
  <div class="flex gap-2">
    <BaseButton :type="BUTTON_TYPE_NEUTRAL" @click="select(null)">
      <BaseIcon name="XMarkIcon" class="h-8" />
    </BaseButton>
    <select
      class="w-full truncate rounded bg-gray-100 py-1 px-2"
      @change="select(($event.target as HTMLSelectElement).value)"
    >
      <option :selected="selected === null" disabled value="">
        {{ placeholder }}
      </option>
      <option
        v-for="{ value, label } in options"
        :key="value"
        :value="value"
        :selected="value === selected"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>
