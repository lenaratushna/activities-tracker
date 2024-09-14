import { ref } from 'vue'
import { isPageValid } from './validators'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants'
import ActivitiesPage from './pages/ActivitiesPage.vue'
import ProgressPage from './pages/ProgressPage.vue'
import TimelinePage from './pages/TimelinePage.vue'

export const routes = {
  [PAGE_TIMELINE]: TimelinePage,
  [PAGE_ACTIVITIES]: ActivitiesPage,
  [PAGE_PROGRESS]: ProgressPage
}
export const currentPage = ref(normalizePageHash())

export function navigate(page) {
  if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView()
  }
  currentPage.value = page
}

function normalizePageHash() {
  const page = window.location.hash.slice(1)

  if (isPageValid(page)) {
    return page
  }

  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}
