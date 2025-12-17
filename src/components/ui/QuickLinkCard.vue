<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  title: string
  description: string
  icon: string
  link: string
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'yellow'
}>()

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
  green: 'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white',
  orange: 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white',
  purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
  yellow: 'bg-yellow-50 text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white',
}
</script>

<template>
  <RouterLink
    :to="link"
    class="group block bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-blue-300"
  >
    <div class="flex items-start gap-4">
      <div
        class="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0"
        :class="colorClasses[color || 'blue']"
      >
        <span class="material-icons-round text-2xl">{{ icon }}</span>
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
          {{ title }}
        </h3>
        <p class="text-sm text-slate-600 leading-relaxed">
          {{ description }}
        </p>
      </div>
      <svg class="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </RouterLink>
</template>

