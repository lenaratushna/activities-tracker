import { NAV_ITEMS, START_HOUR, HOURS_IN_DAY, BUTTON_TYPES } from '@/constants'

export function isPageValid(page) {
  return NAV_ITEMS.some((navItem) => navItem.page === page)
}

export function validateSelectOptions(options) {
  return options.every(isSelectOptionValid)
}

export function isTimelineItemValid({ hour }) {
  return isHourValid(hour)
}

export function isUndefineOrNull(value) {
  return isUndefined(value) || isNull(value)
}

export function isHourValid(hour) {
  return isNumber(hour) && isBetween(hour, START_HOUR, HOURS_IN_DAY - 1)
}

export function isActivityValid({ id, name, secondsToComplete }) {
  if (isNull(id)) {
    return true
  }
  return [isNotEmptyString(id), isNotEmptyString(name), isNumber(secondsToComplete)].every(Boolean)
}

export function isButtonTypeValid(type) {
  return BUTTON_TYPES.includes(type)
}

export function isSelectValueValid(value) {
  return isNotEmptyString(value) || isNumberOrNull(value)
}

export function isNavItemValid(navItem) {
  return NAV_ITEMS.includes(navItem)
}

export function isNull(value) {
  return value === null
}

function isUndefined(value) {
  return value === undefined
}

function isNumber(value) {
  return typeof value === 'number'
}

function isSelectOptionValid({ value, label }) {
  return (isNumber(value) || isNotEmptyString(value)) && isNotEmptyString(label)
}

function isBetween(value, start, end) {
  return value >= start && value <= end
}

function isString(value) {
  return typeof value === 'string'
}

function isNotEmptyString(value) {
  return isString(value) && value.length > 0
}

function isNumberOrNull(value) {
  return isNumber(value) || isNull(value)
}
