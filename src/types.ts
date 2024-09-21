import {
  PAGE_TIMELINE,
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
  BUTTON_TYPE_PRIMARY,
  BUTTON_TYPE_NEUTRAL,
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  ICONS
} from './constants'

export type PageName = typeof PAGE_TIMELINE | typeof PAGE_ACTIVITIES | typeof PAGE_PROGRESS

export type ButtonType =
  | typeof BUTTON_TYPE_PRIMARY
  | typeof BUTTON_TYPE_NEUTRAL
  | typeof BUTTON_TYPE_DANGER
  | typeof BUTTON_TYPE_SUCCESS
  | typeof BUTTON_TYPE_WARNING

export type Hour =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23

export type IconName = keyof typeof ICONS

export interface Activity {
  id: string
  name: string
  secondsToComplete: number
}

export interface SelectOption<T> {
  value: T
  label: string
}

export interface State {
  timelineItems: TimelineItem[]
  activities: Activity[]
  lastActiveAt: Date
}

export interface TimelineItem {
  hour: Hour
  activityId: Activity['id'] | null
  activitySeconds: number
  isActive: boolean
}

export interface NavItem {
  page: PageName
  icon: IconName
}

export enum ProgressColorClass {
  RED = 'bg-red-500',
  ORANGE = 'bg-orange-400',
  YELLOW = 'bg-yellow-400',
  GREEN = 'bg-green-500'
}
