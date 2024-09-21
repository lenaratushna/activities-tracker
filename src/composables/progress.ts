import { type ComputedRef, computed } from 'vue'
import { getProgressColorClass } from '../functions'
import {
  calculateActivityCompletionPercentage,
  trackedActivities,
  calculateCompletionPercentage
} from '../activities'
import { timelineItems, calculateTrackedActivitySeconds } from '../timeline-items'
import type { Activity, ProgressColorClass } from '../types'

export function useProgress(activity: Activity): {
  colorClass: ComputedRef<ProgressColorClass>
  percentage: ComputedRef<number>
  trackedActivitySeconds: ComputedRef<number>
} {
  const colorClass = computed((): ProgressColorClass => getProgressColorClass(percentage.value))

  const trackedActivitySeconds = computed((): number =>
    calculateTrackedActivitySeconds(timelineItems.value, activity)
  )

  const percentage = computed((): number =>
    calculateActivityCompletionPercentage(activity, trackedActivitySeconds.value)
  )

  return {
    colorClass,
    percentage,
    trackedActivitySeconds
  }
}

export function useTotalProgress(): {
  colorClass: ComputedRef<ProgressColorClass>
  percentage: ComputedRef<number>
} {
  const colorClass = computed((): ProgressColorClass => getProgressColorClass(percentage.value))

  const percentage = computed((): number =>
    calculateCompletionPercentage(totalTrackedSeconds.value)
  )

  const totalTrackedSeconds = computed((): number => {
    return trackedActivities.value
      .map((activity): number =>
        Math.min(
          calculateTrackedActivitySeconds(timelineItems.value, activity),
          activity.secondsToComplete
        )
      )
      .reduce((total, seconds): number => total + seconds, 0)
  })

  return {
    colorClass,
    percentage
  }
}
