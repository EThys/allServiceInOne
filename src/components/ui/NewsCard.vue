<script setup lang="ts">
import { format } from 'date-fns'
import { RouterLink } from 'vue-router'

defineProps<{
  title: string
  excerpt: string
  date: Date
  image?: string
  category: string
  link: string
}>()
</script>

<template>
  <RouterLink
    :to="link"
    class="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-blue-300"
  >
    <div class="relative h-48 bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden">
      <img
        v-if="image"
        :src="image"
        :alt="title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div class="absolute top-4 left-4">
        <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-700">
          {{ category }}
        </span>
      </div>
    </div>
    <div class="p-6">
      <div class="flex items-center gap-2 text-xs text-slate-500 mb-3">
        <span class="material-icons-round text-sm">schedule</span>
        <span>{{ format(date, 'd MMMM yyyy') }}</span>
      </div>
      <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
        {{ title }}
      </h3>
      <p class="text-sm text-slate-600 line-clamp-2 leading-relaxed">
        {{ excerpt }}
      </p>
      <div class="mt-4 flex items-center text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
        Lire la suite
        <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </RouterLink>
</template>

