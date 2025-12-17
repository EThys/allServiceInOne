<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Button from '../components/ui/Button.vue'

const route = useRoute()
const router = useRouter()

const goHome = () => router.push('/')
</script>

<template>
  <div class="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-2 lg:py-32 section-appear">
    <div class="max-w-lg w-full bg-white border border-slate-200 rounded-3xl px-6 sm:px-10 py-10 shadow-sm card-appear">
      <p class="text-xs font-medium uppercase tracking-[0.2em] text-blue-500 mb-3">
        Page en construction
      </p>
      <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
        Cette section n’est pas encore disponible
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">
        La page
        <span class="font-semibold text-slate-900">« {{ route.name ?? route.path }} »</span>
        est en cours de préparation. Elle sera disponible prochainement sur le portail.
      </p>
      <Button size="lg" @click="goHome">
        Retour à l’accueil
      </Button>
    </div>
  </div>
</template>


