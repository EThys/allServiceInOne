<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useServiceStore } from '../stores/useServices'
import { ArrowLeft, Clock, DollarSign, FileCheck, CheckCircle } from 'lucide-vue-next'
import Button from '../components/ui/Button.vue'
import heroBg from '../assets/hero-bg.jpg'

const route = useRoute()
const router = useRouter()
const store = useServiceStore()

const serviceId = route.params.id as string
const service = computed(() => store.services.find(s => s.id === serviceId))

const goBack = () => router.back()
</script>

<template>
  <div v-if="service" class="pt-24 pb-20 min-h-screen bg-slate-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header avec image -->
      <div class="mt-6 mb-10 section-appear">
        <div class="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-6 sm:px-10 py-7 sm:py-9">
          <div class="relative z-10 flex flex-col gap-4">
            <button
              @click="goBack"
              class="inline-flex items-center gap-2 text-xs sm:text-sm text-blue-100 hover:text-white transition-colors"
            >
              <ArrowLeft class="w-4 h-4" />
              Retour au catalogue des services
            </button>
            <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <span class="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-semibold uppercase tracking-[0.16em] mb-3">
                  {{ service.category }}
                </span>
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2">
                  {{ service.title }}
                </h1>
                <p class="text-sm sm:text-base text-blue-100/90 max-w-2xl">
                  Démarche en ligne sécurisée proposée par les services de l'État.
                </p>
              </div>
              <div class="flex flex-wrap gap-2 text-[11px] sm:text-xs text-blue-100/90">
                <div class="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur flex items-center gap-2">
                  <Clock class="w-3.5 h-3.5" />
                  <span class="font-semibold">{{ service.processingTime }}</span>
                </div>
                <div class="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur flex items-center gap-2">
                  <DollarSign class="w-3.5 h-3.5" />
                  <span class="font-semibold">{{ service.cost }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="pointer-events-none absolute inset-0 opacity-40 md:opacity-60">
            <img
              :src="heroBg"
              alt="Illustration service"
              class="absolute right-[-60px] bottom-[-40px] w-64 sm:w-80 object-contain mix-blend-soft-light"
            />
          </div>
        </div>
      </div>

      <!-- Contenu principal -->
      <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] gap-10">
        <!-- Main Content -->
        <div>
          <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 mb-6">
            <h2 class="text-lg sm:text-xl font-semibold text-slate-900 mb-3">
              Présentation du service
            </h2>
            <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
              {{ service.fullDesc }}
            </p>
          </div>

          <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
            <h3 class="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FileCheck class="w-5 h-5 text-blue-600" />
              Documents requis
            </h3>
            <p class="text-slate-500 text-sm mb-4">
              Préparez les documents suivants avant de commencer la démarche en ligne.
            </p>
            <ul class="space-y-3">
              <li
                v-for="req in service.requirements"
                :key="req"
                class="flex items-start gap-3 bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100"
              >
                <CheckCircle class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span class="text-sm text-slate-700">
                  {{ req }}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Sidebar Actions -->
        <aside class="lg:pl-2">
          <div class="sticky top-28 space-y-4">
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h3 class="font-semibold text-slate-900 mb-4 text-sm">
                Informations pratiques
              </h3>

              <div class="space-y-3 text-sm text-slate-600 mb-5">
                <div class="flex items-center justify-between">
                  <span>Délai de traitement</span>
                  <span class="font-medium text-slate-900">{{ service.processingTime }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span>Coût estimé</span>
                  <span class="font-medium text-slate-900">{{ service.cost }}</span>
                </div>
              </div>

              <Button block size="lg" class="shadow-md shadow-blue-500/20 mb-3">
                Commencer la démarche en ligne
              </Button>
              <Button block variant="outlined">
                Télécharger le guide PDF
              </Button>
            </div>

            <div class="bg-slate-900 text-white rounded-3xl p-5 text-sm">
              <h4 class="font-semibold mb-2">Besoin d'assistance&nbsp;?</h4>
              <p class="text-slate-200 text-xs mb-3">
                En cas de difficulté pour effectuer cette démarche, un agent peut vous accompagner.
              </p>
              <Button block variant="tonal" class="bg-white text-slate-900 hover:bg-slate-100 text-sm">
                Contacter le support
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
  
  <div v-else class="min-h-[60vh] flex items-center justify-center bg-slate-50 px-4 py-20 section-appear">
    <div class="max-w-lg w-full bg-white border border-slate-200 rounded-3xl px-6 sm:px-10 py-10 shadow-sm card-appear text-center">
      <p class="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 mb-3">
        Service introuvable
      </p>
      <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
        Le service demandé n’est pas disponible
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mb-6">
        Le service que vous tentez de consulter n’existe pas ou n’est plus accessible. Vous pouvez revenir au catalogue des services pour retrouver la démarche souhaitée.
      </p>
      <Button variant="outlined" @click="goBack">
        Retour au catalogue
      </Button>
    </div>
  </div>
</template>
