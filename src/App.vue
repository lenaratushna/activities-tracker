<script setup lang="ts">
import Header from './components/AppHeader.vue'
import Navigation from './components/AppNavigation.vue'
import { routes, currentPage } from './router'
</script>

<template>
  <Header />
  <main class="flex flex-grow flex-col">
    <KeepAlive>
      <component :is="routes[currentPage]" />
    </KeepAlive>
  </main>
  <Navigation />
</template>
