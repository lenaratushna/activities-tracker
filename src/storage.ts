import { APP_NAME } from './constants'
import { today } from './time'
import { activities, initializeActivities } from './activities'
import {
  timelineItems,
  activeTimelineItem,
  startTimelineItemTimer,
  stopTimelineItemTimer,
  initializeTimelineItems
} from './timeline-items'
import type { State } from './types'

export function loadState(): void {
  const state = loadFromLocalStorage()

  initializeActivities(state)
  initializeTimelineItems(state)
}

export function syncState(shouldLoad = true): void {
  shouldLoad ? loadState() : saveState()

  if (activeTimelineItem.value) {
    shouldLoad ? startTimelineItemTimer() : stopTimelineItemTimer()
  }
}

function loadFromLocalStorage(): State {
  return JSON.parse(localStorage.getItem(APP_NAME) ?? '{}')
}

function saveState(): void {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      timelineItems: timelineItems.value,
      activities: activities.value,
      lastActiveAt: today()
    })
  )
}
