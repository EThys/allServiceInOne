<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useServiceStore } from '../stores/useServices'
import Button from '../components/ui/Button.vue'
import heroBg from '../assets/hero-bg.jpg'

const router = useRouter()
const store = useServiceStore()
const categories = ['Tous', 'Identité', 'Transport', 'Taxes', 'Justice', 'Santé', 'Immigration', 'Etat Civil']
const selectedCategory = ref('Tous')
const searchQuery = ref('')

const filteredServices = computed(() => {
  return store.services.filter(service => {
    const matchesCategory =
      selectedCategory.value === 'Tous' || service.category === selectedCategory.value
    const query = searchQuery.value.toLowerCase()
    const matchesSearch =
      !query ||
      service.title.toLowerCase().includes(query) ||
      service.shortDesc.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })
})

const totalServices = computed(() => store.services.length)
const totalFiltered = computed(() => filteredServices.value.length)

const getIcon = (name: string) => {
    // Map Lucide names to Material Icons equivalent roughly for now since we switched systems
    const map: Record<string, string> = {
        'BookUser': 'badge',
        'Car': 'directions_car',
        'IdCard': 'credit_card',
        'Banknote': 'account_balance',
        'Scale': 'gavel',
        'Baby': 'child_friendly',
        'Plane': 'flight',
        'Syringe': 'vaccines',
        'FileQuestion': 'help_outline'
    }
    return map[name] || 'article'
}

const goToService = (id: string) => {
    router.push(`/services/${id}`)
}
</script>

<template>
  <div class="pt-24 pb-16 bg-slate-50 min-h-screen font-roboto">
    <div class="container mx-auto px-4 max-w-6xl">
      
      <!-- Header enrichi avec image -->
      <div class="mb-10">
        <div class="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-6 sm:px-10 py-8 sm:py-10">
          <div class="grid grid-cols-1 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8 items-center">
            <div>
              <p class="uppercase tracking-[0.2em] text-xs font-semibold text-blue-100 mb-3">
                Services en ligne
              </p>
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
                Catalogue des services publics
              </h1>
              <p class="text-blue-100/90 max-w-xl text-sm sm:text-base mb-6">
                Retrouvez en un seul endroit l’ensemble des démarches administratives de la République Démocratique du Congo : identité, fiscalité, justice, santé, transport et plus encore.
              </p>
              <div class="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.25)]"></span>
                  <span class="font-semibold">{{ totalFiltered }}</span>
                  <span class="text-blue-100/90">service(s) affiché(s)</span>
                </div>
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/15">
                  <span class="material-icons-round text-base text-blue-100">apps</span>
                  <span class="font-semibold">{{ totalServices }}</span>
                  <span class="text-blue-100/90">au total</span>
                </div>
              </div>
            </div>
            <div class="relative hidden md:block">
              <div class="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-500/30 blur-3xl"></div>
              <div class="relative bg-white/5 border border-white/20 rounded-2xl p-4 backdrop-blur-xl shadow-xl flex flex-col gap-3">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs text-blue-100/80">Temps moyen de démarche</p>
                    <p class="text-lg font-semibold">10 - 20 min</p>
                  </div>
                  <div class="w-10 h-10 rounded-xl bg-linear-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-slate-900 font-bold text-xs">
                    RDC
                  </div>
                </div>
                <div class="flex items-center justify-between text-xs text-blue-100/80">
                  <span>Disponibles 24h/24</span>
                  <span>Accès sécurisé</span>
                </div>
                <div class="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div class="h-full w-2/3 bg-linear-to-r from-emerald-300 to-emerald-500 rounded-full"></div>
                </div>
                <p class="text-[11px] text-blue-100/80 mt-1">
                  Ce portail centralise progressivement l’ensemble des services des ministères et institutions publiques.
                </p>
              </div>
            </div>
          </div>
          <div class="pointer-events-none absolute inset-0">
            <img
              :src="heroBg"
              alt="Illustration services en ligne"
              class="absolute right-[-80px] bottom-[-60px] w-72 opacity-20 md:opacity-40 md:w-80"
            />
          </div>
        </div>
      </div>
      
      <!-- Bandeau filtre + recherche -->
      <div class="mb-10 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 flex flex-col gap-4">
        <!-- Ligne recherche + résumé -->
        <div class="flex flex-col md:flex-row md:items-center gap-4">
          <div class="flex-1">
            <div class="m3-search-bar bg-white w-full">
              <span class="material-icons-round text-slate-500 mr-3">search</span>
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Rechercher un service (ex : passeport, impôts, permis...)" 
                class="grow bg-transparent border-none outline-none text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>
          <div class="text-xs sm:text-sm text-slate-500 md:text-right">
            <span v-if="selectedCategory === 'Tous'">
              Affichage de <span class="font-semibold text-slate-700">{{ totalFiltered }}</span> service(s) sur {{ totalServices }}.
            </span>
            <span v-else>
              Catégorie <span class="font-semibold text-slate-700">{{ selectedCategory }}</span> – 
              <span class="font-semibold text-slate-700">{{ totalFiltered }}</span> service(s) trouvé(s).
            </span>
          </div>
        </div>
        
        <!-- Chips Row -->
        <div class="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="selectedCategory = category"
            class="px-4 py-1.5 rounded-full border text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2"
            :class="selectedCategory === category 
                ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'"
          >
            <span v-if="selectedCategory === category" class="material-icons-round text-base">check</span>
            {{ category }}
          </button>
        </div>
      </div>
      
      <!-- Liste des services -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div 
          v-for="service in filteredServices" 
          :key="service.id" 
          class="m3-card cursor-pointer group hover:bg-white relative overflow-hidden flex flex-col"
          @click="goToService(service.id)"
        >
          <!-- Accent latéral -->
          <div class="absolute inset-y-4 left-0 w-1 rounded-full bg-linear-to-b from-blue-500 to-blue-300 opacity-60 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="flex items-start justify-between mb-4 pl-2">
            <div class="flex items-center gap-3">
              <div class="h-11 w-11 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <span class="material-icons-round">{{ getIcon(service.iconName) }}</span>
              </div>
              <div>
                <h3 class="text-base font-semibold text-slate-900 mb-0.5 group-hover:text-blue-700 transition-colors">
                  {{ service.title }}
                </h3>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200">
                  {{ service.category }}
                </span>
              </div>
            </div>
          </div>
          
          <p class="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2 pl-2">
            {{ service.shortDesc }}
          </p>
          
          <div class="mt-auto flex items-center justify-between pt-2 border-t border-slate-100 pl-2">
            <button
              type="button"
              class="flex items-center text-blue-600 text-sm font-medium group-hover:gap-1.5 transition-all"
            >
              Démarrer la démarche
              <span class="material-icons-round text-sm ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- État vide -->
      <div v-if="filteredServices.length === 0" class="text-center py-20">
        <span class="material-icons-round text-6xl text-slate-200 mb-4 block">search_off</span>
        <p class="text-slate-700 font-medium mb-1">Aucun service ne correspond à votre recherche.</p>
        <p class="text-slate-500 text-sm mb-4">
          Modifiez vos filtres ou essayez un autre mot-clé.
        </p>
        <Button variant="text" @click="selectedCategory = 'Tous'; searchQuery = ''" class="mt-2">
          Réinitialiser les filtres
        </Button>
      </div>
    </div>
  </div>
</template>
