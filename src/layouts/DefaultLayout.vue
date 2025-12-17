<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

const route = useRoute()
const isAuthLayout = computed(() => route.meta.layout === 'auth')
</script>

<template>
  <div class="flex flex-col min-h-screen bg-slate-50 font-sans">
    <AppHeader v-if="!isAuthLayout" />
    <main :class="['flex-grow', isAuthLayout ? 'bg-slate-50' : '']">
      <slot />
    </main>
    <AppFooter v-if="!isAuthLayout" />
  </div>
</template>
