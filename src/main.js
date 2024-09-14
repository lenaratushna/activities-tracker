import './assets/main.css'
import { syncState } from './storage'
import { createApp } from 'vue'
import { startCurrentDateTimer } from './time'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

syncState()
startCurrentDateTimer()

document.addEventListener('visibilitychange', () => {
  syncState(document.visibilityState === 'visible')
})

createApp(App).use(autoAnimatePlugin).mount('#app')
