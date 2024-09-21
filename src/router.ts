import { ref, type Component } from 'vue'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS, NAV_ITEMS } from './constants'
import ActivitiesPage from './pages/ActivitiesPage.vue'
import ProgressPage from './pages/ProgressPage.vue'
import TimelinePage from './pages/TimelinePage.vue'
import type { PageName } from './types'

export const routes: Record<PageName, Component> = {
  [PAGE_TIMELINE]: TimelinePage,
  [PAGE_ACTIVITIES]: ActivitiesPage,
  [PAGE_PROGRESS]: ProgressPage
}
export const currentPage = ref<PageName>(normalizePageHash())

export function navigate(page: PageName): void {
  if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView()
  }
  currentPage.value = page
}

function normalizePageHash(): PageName {
  const page = window.location.hash.slice(1)

  if (NAV_ITEMS.some((navItem) => navItem.page === page)) {
    return page as PageName
  }

  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}
