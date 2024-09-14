<script setup>
import {
  ExclamationCircleIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
  ArrowPathIcon,
  PauseIcon,
  PlayIcon
} from '@heroicons/vue/24/outline'

import {
  ClockIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ChartBarIcon
} from '@heroicons/vue/24/solid'

defineProps({
  name: {
    required: true,
    type: String
  }
})

const icons = {
  ExclamationCircleIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
  ArrowPathIcon,
  PauseIcon,
  PlayIcon,
  ClockIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ChartBarIcon
}
</script>

<template>
  <component :is="icons[name]" />
</template>
