import { ref, computed, watch, type ComponentPublicInstance } from 'vue'
import { HOURS_IN_DAY, START_HOUR, MILLISECONDS_IN_SECOND } from './constants'
import { endOfHour, isToday, toSeconds, today, now } from './time'
import type { Activity, Hour, State, TimelineItem } from './types'

export const timelineItemRefs = ref<ComponentPublicInstance[] | null>(null)
export const timelineItems = ref<TimelineItem[]>([])
const timelineItemTimer = ref<number | undefined>()
export const activeTimelineItem = computed((): TimelineItem | undefined =>
  timelineItems.value.find(({ isActive }): boolean => isActive)
)

watch<Date>(now, (after, before): void => {
  if (activeTimelineItem.value && activeTimelineItem.value.hour !== after.getHours()) {
    stopTimelineItemTimer()
  }

  if (before.getHours() !== after.getHours() && after.getHours() === START_HOUR) {
    resetTimelineItems()
  }
})

export function initializeTimelineItems(state: State): void {
  const lastActiveAt = new Date(state.lastActiveAt)

  timelineItems.value = state.timelineItems ?? generateTimelineItems()

  if (activeTimelineItem.value && isToday(lastActiveAt)) {
    syncIdleSeconds(lastActiveAt)
  } else if (state.timelineItems && !isToday(lastActiveAt)) {
    resetTimelineItems()
  }
}

export function updateTimelineItem(
  timelineItem: TimelineItem,
  fields: Partial<TimelineItem>
): TimelineItem {
  return Object.assign(timelineItem, fields)
}

export function resetTimelineItemActivities(
  timelineItems: TimelineItem[],
  activity: Activity
): void {
  filterTimelineItemsByActivity(timelineItems, activity).forEach(
    (timelineItem: TimelineItem): void => {
      updateTimelineItem(timelineItem, {
        activityId: null,
        activitySeconds: timelineItem.hour === today().getHours() ? timelineItem.activitySeconds : 0
      })
    }
  )
}

export function calculateTrackedActivitySeconds(
  timelineItems: TimelineItem[],
  activity: Activity
): number {
  return filterTimelineItemsByActivity(timelineItems, activity)
    .map(({ activitySeconds }: TimelineItem): number => activitySeconds)
    .reduce((total: number, seconds: number): number => Math.round(total + seconds), 0)
}

export function scrollToCurrentHour(isSmooth = false): void {
  scrollToHour(today().getHours() as Hour, isSmooth)
}

export function scrollToHour(hour: Hour, isSmooth = true): void {
  const el: HTMLBodyElement | HTMLLIElement =
    hour === START_HOUR || !timelineItemRefs.value
      ? document.body
      : timelineItemRefs.value[hour - 1].$el
  el.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'auto' })
}

export function startTimelineItemTimer(timelineItem?: TimelineItem): void {
  timelineItem = timelineItem ?? activeTimelineItem.value

  if (timelineItem) {
    updateTimelineItem(timelineItem, { isActive: true })
    timelineItemTimer.value = window.setInterval((): void => {
      updateTimelineItem(timelineItem, {
        activitySeconds: timelineItem.activitySeconds + 1
      })
    }, MILLISECONDS_IN_SECOND)
  }
}

export function stopTimelineItemTimer(): void {
  if (activeTimelineItem.value) {
    updateTimelineItem(activeTimelineItem.value, { isActive: false })
    clearInterval(timelineItemTimer.value)
    timelineItemTimer.value = undefined
  }
}

export function resetTimelineItemTimer(timelineItem: TimelineItem): void {
  updateTimelineItem(timelineItem, { activitySeconds: 0 })
  if (activeTimelineItem.value) {
    stopTimelineItemTimer()
  }
}

function resetTimelineItems(): void {
  timelineItems.value.forEach((timelineItem): void => {
    updateTimelineItem(timelineItem, {
      activitySeconds: 0,
      isActive: false
    })
  })
}

function syncIdleSeconds(lastActiveAt: Date): void {
  if (activeTimelineItem.value) {
    updateTimelineItem(activeTimelineItem.value, {
      activitySeconds: activeTimelineItem.value.activitySeconds + calculateIdleSeconds(lastActiveAt)
    })
  }
}

function calculateIdleSeconds(lastActiveAt: Date): number {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds(today().getTime() - lastActiveAt.getTime())
    : toSeconds(endOfHour(lastActiveAt).getTime() - lastActiveAt.getTime())
}

function filterTimelineItemsByActivity(
  timelineItems: TimelineItem[],
  { id }: Activity
): TimelineItem[] {
  return timelineItems.filter(({ activityId }): boolean => activityId === id)
}

function generateTimelineItems(): TimelineItem[] {
  return ([...Array(HOURS_IN_DAY).keys()] as Hour[]).map(
    (hour): TimelineItem => ({
      hour,
      activityId: null,
      activitySeconds: 0,
      isActive: false
    })
  )
}
