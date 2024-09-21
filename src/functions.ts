import {
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
  MINUTES_IN_HOUR,
  HUNDRED_PERCENT,
  MEDIUM_PERCENT,
  LOW_PERCENT
} from './constants'
import { type SelectOption, ProgressColorClass } from './types'

export function id(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export function normalizeSelect(value: string | null): number | string | null {
  return value === null || isNaN(+value) ? value : +value
}

export function generatePeriodSelectOptions(): SelectOption<number>[] {
  const periodsInMinutes = [
    15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480
  ]
  return periodsInMinutes.map(
    (periodInMinutes): SelectOption<number> => ({
      value: periodInMinutes * SECONDS_IN_MINUTE,
      label: generatePeriodSelectOptionsLabel(periodInMinutes)
    })
  )
}

export function formatSeconds(seconds: number): string {
  const date = new Date()
  date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECOND)
  const utc = date.toUTCString()
  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6)
}

export function formatSecondsWithSign(seconds: number): string {
  return `${seconds >= 0 ? '+' : '-'}${formatSeconds(seconds)}`
}

export function getProgressColorClass(percentage: number): ProgressColorClass {
  if (percentage < LOW_PERCENT) return ProgressColorClass.RED
  if (percentage < MEDIUM_PERCENT) return ProgressColorClass.ORANGE
  if (percentage < HUNDRED_PERCENT) return ProgressColorClass.YELLOW

  return ProgressColorClass.GREEN
}

function generatePeriodSelectOptionsLabel(periodInMinutes: number): string {
  const hours = Math.floor(periodInMinutes / MINUTES_IN_HOUR)
    .toString()
    .padStart(2, '0')
  const minutes = (periodInMinutes % MINUTES_IN_HOUR).toString().padStart(2, '0')

  return `${hours}:${minutes}`
}
