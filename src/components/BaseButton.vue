<script>
import {
  BUTTON_TYPE_PRIMARY,
  BUTTON_TYPE_NEUTRAL,
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING
} from '../constants'

const typeClasses = {
  [BUTTON_TYPE_NEUTRAL]: 'bg-gray-100 enabled:hover:bg-gray-200',
  [BUTTON_TYPE_DANGER]: 'bg-red-500 enabled:hover:bg-red-600 text-white',
  [BUTTON_TYPE_PRIMARY]: 'bg-lime-400 enabled:hover:bg-lime-500 text-white',
  [BUTTON_TYPE_SUCCESS]: 'bg-green-400 enabled:hover:bg-green-500 text-white',
  [BUTTON_TYPE_WARNING]: 'bg-orange-400 enabled:hover:bg-orange-500 text-white'
}
</script>

<script setup>
import { isButtonTypeValid } from '../validators'

const props = defineProps({
  type: {
    default: BUTTON_TYPE_NEUTRAL,
    type: String,
    validator: isButtonTypeValid
  }
})

const classes = [
  'rounded p-2 disabled:cursor-not-allowed disabled:opacity-50',
  typeClasses[props.type]
]
</script>
<template>
  <button :class="classes">
    <slot />
  </button>
</template>
