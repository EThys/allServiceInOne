<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Button from '../components/ui/Button.vue'
import { RouterLink, useRouter } from 'vue-router'
import okapiImage from '../assets/okapi.jpg'
import heroBg from '../assets/hero-bg.jpg'
import NewsCard from '../components/ui/NewsCard.vue'
import QuickLinkCard from '../components/ui/QuickLinkCard.vue'
import { useServiceStore } from '../stores/useServices'

const router = useRouter()
const serviceStore = useServiceStore()
const searchQuery = ref('')
const isLoaded = ref(false)
const statsRef = ref<HTMLElement | null>(null)
const statsVisible = ref(false)

const counters = ref({
  services: 0,
  citizens: 0,
  provinces: 0
})

const animateCounters = () => {
  const duration = 2000
  const targets = { services: 156, citizens: 125000, provinces: 26 }
  const startTime = performance.now()

  const update = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeProgress = 1 - Math.pow(1 - progress, 3) // ease-out-cubic

    counters.value.services = Math.round(targets.services * easeProgress)
    counters.value.citizens = Math.round(targets.citizens * easeProgress)
    counters.value.provinces = Math.round(targets.provinces * easeProgress)

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/services', query: { search: searchQuery.value } })
  }
}

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsVisible.value) {
          statsVisible.value = true
          animateCounters()
        }
      })
    },
    { threshold: 0.5 }
  )

  if (statsRef.value) {
    observer.observe(statsRef.value)
  }
})

// Actualités gouvernementales
const news = [
  {
    title: 'Lancement du nouveau système de visa électronique',
    excerpt: 'Le gouvernement annonce la mise en place d\'un système de visa électronique pour faciliter l\'entrée des visiteurs en RDC.',
    date: new Date(2024, 0, 15),
    category: 'Immigration',
    link: '/actualites/visa-electronique',
  },
  {
    title: 'Modernisation des services d\'état civil',
    excerpt: 'Nouvelle plateforme numérique pour l\'enregistrement des naissances, mariages et décès dans toutes les provinces.',
    date: new Date(2024, 0, 10),
    category: 'État Civil',
    link: '/actualites/modernisation-etat-civil',
  },
  {
    title: 'Transparence budgétaire : Publication des budgets 2024',
    excerpt: 'Le gouvernement publie les budgets détaillés de tous les ministères pour l\'année 2024.',
    date: new Date(2024, 0, 5),
    category: 'Transparence',
    link: '/actualites/budgets-2024',
  },
]

// Liens rapides
const quickLinks = [
  {
    title: 'Déclaration d\'Impôts',
    description: 'Déclarez et payez vos impôts en ligne',
    icon: 'account_balance',
    link: '/services?category=Taxes',
    color: 'blue' as const,
  },
  {
    title: 'Appels d\'Offres',
    description: 'Consultez les opportunités d\'affaires publiques',
    icon: 'description',
    link: '/appels-offres',
    color: 'green' as const,
  },
  {
    title: 'Transparence',
    description: 'Suivez les projets et budgets gouvernementaux',
    icon: 'visibility',
    link: '/transparence',
    color: 'orange' as const,
  },
  {
    title: 'Portail Citoyen',
    description: 'Accédez à votre espace personnel sécurisé',
    icon: 'person',
    link: '/login',
    color: 'purple' as const,
  },
]

// Services par catégorie
const servicesByCategory = computed(() => {
  const categories = ['Identité', 'Transport', 'Taxes', 'Santé']
  return categories.map(cat => ({
    category: cat,
    services: serviceStore.services.filter(s => s.category === cat).slice(0, 3),
  }))
})

// FAQ
const faqItems = [
  {
    id: 'faq-1',
    question: 'Comment créer un compte sur le portail Gouv.cd ?',
    answer:
      'Cliquez sur « Portail Citoyen » puis sur « Créer mon compte citoyen ». Munissez-vous de votre adresse email personnelle et, si possible, de votre numéro national.'
  },
  {
    id: 'faq-2',
    question: 'Les démarches en ligne ont-elles la même valeur que les démarches en guichet ?',
    answer:
      'Oui. Les démarches effectuées via le portail sont traitées par les mêmes administrations et produisent les mêmes effets juridiques, sous réserve de fournir les justificatifs demandés.'
  },
  {
    id: 'faq-3',
    question: 'Comment suivre l’avancement d’une demande ?',
    answer:
      'Après connexion à votre espace, la rubrique « Mes démarches » affiche le statut de chaque demande (en cours, complétée, en attente de document, etc.).'
  },
  {
    id: 'faq-4',
    question: 'Mes données personnelles sont-elles protégées ?',
    answer:
      'Les données sont stockées sur des infrastructures sécurisées. Elles sont utilisées uniquement dans le cadre de vos démarches et conformément à la réglementation en vigueur.'
  }
]

const openFaqId = ref<string | null>(faqItems[0]?.id ?? null)

const toggleFaq = (id: string) => {
  openFaqId.value = openFaqId.value === id ? null : id
}

const getIcon = (name: string) => {
  const map: Record<string, string> = {
    'BookUser': 'badge',
    'Car': 'directions_car',
    'IdCard': 'credit_card',
    'Banknote': 'account_balance',
    'Scale': 'gavel',
    'Baby': 'child_friendly',
    'Plane': 'flight',
    'Syringe': 'vaccines',
  }
  return map[name] || 'article'
}
</script>

<template>
  <div class="bg-white min-h-screen font-roboto">
    <!-- Hero Section avec image de fond -->
    <section class="relative min-h-[90vh] bg-slate-900 overflow-hidden flex items-start lg:items-center pt-28 md:pt-32 lg:pt-30">
      <div class="absolute inset-0">
        <img 
          :src="okapiImage" 
          alt="République Démocratique du Congo"
          class="w-full h-full object-cover scale-110 transform"
          :class="isLoaded ? 'scale-100' : 'scale-110'"
          style="transition: transform 10s ease-out;"
        />
        <div class="absolute inset-0 bg-linear-to-r from-blue-900/70 via-blue-800/60 to-blue-900/70"></div>
        <div class="absolute inset-0 bg-linear-to-t from-slate-900/50 via-transparent to-transparent"></div>
      </div>

      <!-- Particules flottantes -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          v-for="i in 20" 
          :key="i"
          class="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-float"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }"
        ></div>
      </div>

      <div class="relative z-10 w-full py-12 lg:py-0">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto text-center">
            <h1 
              class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-tight transition-all duration-1000 delay-200"
              :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            >
              <span class="block overflow-hidden">
                <span class="inline-block transition-transform duration-700 delay-300" :class="isLoaded ? 'translate-y-0' : 'translate-y-full'">
                  Portail des Services
                </span>
              </span>
              <span class="block overflow-hidden">
                <span 
                  class="inline-block bg-linear-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient transition-transform duration-700 delay-500"
                  :class="isLoaded ? 'translate-y-0' : 'translate-y-full'"
                >
                  Gouvernementaux
                </span>
              </span>
            </h1>

            <p 
              class="text-xl sm:text-2xl text-blue-100/90 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500"
              :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            >
              Accédez à tous les services publics en ligne. 
              Simplifiez vos démarches administratives depuis chez vous.
            </p>

            <!-- Barre de recherche stylisée -->
            <div 
              class="mb-16 transition-all duration-1000 delay-700"
              :class="isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'"
            >
              <div class="relative max-w-2xl mx-auto group">
                <div class="absolute -inset-1 bg-linear-to-r from-blue-600 via-yellow-400 to-blue-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                <div class="relative bg-white rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2">
                  <div class="flex items-center flex-1">
                    <svg class="w-6 h-6 text-slate-400 mx-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      v-model="searchQuery"
                      @keypress.enter="performSearch"
                      type="text"
                      placeholder="Rechercher un service, un document, une information..."
                      class="w-full py-4 text-lg border-0 focus:ring-0 focus:outline-none bg-transparent placeholder-slate-400 text-slate-800"
                    />
                  </div>
                  <button 
                    @click="performSearch"
                    class="group/btn relative bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/30"
                  >
                    <span class="relative z-10 flex items-center justify-center gap-2">
                      Rechercher
                      <svg class="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                    <div class="absolute inset-0 bg-blue-700 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                  </button>
                </div>
              </div>
            </div>

            <!-- Suggestions de recherche -->
            <div 
              class="flex flex-wrap gap-2 justify-center mb-12 transition-all duration-1000 delay-800"
              :class="isLoaded ? 'opacity-100' : 'opacity-0'"
            >
              <span class="text-blue-200 text-sm">Populaire :</span>
              <RouterLink to="/services/passeport" class="text-yellow-300 hover:text-yellow-200 underline text-sm transition-colors">Passeport</RouterLink>
              <RouterLink to="/services/permis-conduire" class="text-yellow-300 hover:text-yellow-200 underline text-sm transition-colors">Permis</RouterLink>
              <RouterLink to="/services/visa" class="text-yellow-300 hover:text-yellow-200 underline text-sm transition-colors">Visa</RouterLink>
            </div>

            <!-- Statistiques animées -->
            <div 
              ref="statsRef"
              class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto transition-all duration-1000 delay-900"
              :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            >
              <div class="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 overflow-hidden">
                <div class="absolute inset-0 bg-linear-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="relative flex items-center gap-4">
                  <div class="w-14 h-14 bg-blue-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <svg class="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div class="text-left">
                    <div class="text-3xl lg:text-4xl font-bold text-white tabular-nums">
                      {{ counters.services }}
                    </div>
                    <div class="text-blue-200 text-sm font-medium">Services Disponibles</div>
                  </div>
                </div>
              </div>
              
              <div class="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 overflow-hidden">
                <div class="absolute inset-0 bg-linear-to-br from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="relative flex items-center gap-4">
                  <div class="w-14 h-14 bg-yellow-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <svg class="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div class="text-left">
                    <div class="text-3xl lg:text-4xl font-bold text-yellow-400 tabular-nums">
                      {{ counters.citizens.toLocaleString() }}+
                    </div>
                    <div class="text-blue-200 text-sm font-medium">Citoyens Actifs</div>
                  </div>
                </div>
              </div>
              
              <div class="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 overflow-hidden">
                <div class="absolute inset-0 bg-linear-to-br from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="relative flex items-center gap-4">
                  <div class="w-14 h-14 bg-blue-400/30 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <svg class="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div class="text-left">
                    <div class="text-3xl lg:text-4xl font-bold text-white tabular-nums">
                      {{ counters.provinces }}
                    </div>
                    <div class="text-blue-200 text-sm font-medium">Provinces</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- M3 CARDS GRID (Spacious, Rounded, Elevated) -->
    <section class="bg-blue-50/50 py-20 rounded-t-[3rem]">
      <div class="container mx-auto px-6">
        <div class="flex items-center justify-between mb-10">
            <h3 class="text-2xl text-slate-800">Services Fréquents</h3>
            <RouterLink to="/services">
              <Button variant="text" class="text-blue-600 hover:text-blue-700">
                Tous les services
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </RouterLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <!-- Card 1 -->
           <RouterLink to="/services/passeport" class="m3-card group cursor-pointer block">
              <div class="h-12 w-12 rounded-full bg-blue-100 text-rdc-blue flex items-center justify-center mb-4 group-hover:bg-rdc-blue group-hover:text-white transition-colors">
                 <span class="material-icons-round">badge</span>
              </div>
              <h4 class="text-lg font-medium text-slate-900 mb-2">Passeport</h4>
              <p class="text-slate-600 text-sm leading-relaxed">Demande et renouvellement de passeport biométrique.</p>
           </RouterLink>

           <!-- Card 2 -->
           <RouterLink to="/services/permis-conduire" class="m3-card group cursor-pointer block">
              <div class="h-12 w-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                 <span class="material-icons-round">directions_car</span>
              </div>
              <h4 class="text-lg font-medium text-slate-900 mb-2">Permis de Conduire</h4>
              <p class="text-slate-600 text-sm leading-relaxed">Obtention du permis, duplicata et international.</p>
           </RouterLink>

           <!-- Card 3 -->
           <RouterLink to="/services/impot-revenu" class="m3-card group cursor-pointer block">
              <div class="h-12 w-12 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                 <span class="material-icons-round">account_balance</span>
              </div>
              <h4 class="text-lg font-medium text-slate-900 mb-2">Impôts</h4>
              <p class="text-slate-600 text-sm leading-relaxed">Déclaration de revenus et paiement de la TVA.</p>
           </RouterLink>

           <!-- Card 4 -->
           <RouterLink to="/services/casier-judiciaire" class="m3-card group cursor-pointer block">
              <div class="h-12 w-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                 <span class="material-icons-round">gavel</span>
              </div>
              <h4 class="text-lg font-medium text-slate-900 mb-2">Casier Judiciaire</h4>
              <p class="text-slate-600 text-sm leading-relaxed">Extrait de casier judiciaire en ligne.</p>
           </RouterLink>
        </div>

        <!-- Secondary Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div class="bg-rdc-blue rounded-3xl p-8 text-white relative overflow-hidden group hover:shadow-xl transition-shadow cursor-pointer">
                <div class="relative z-10">
                    <h3 class="text-2xl mb-2">E-Visa Voyageurs</h3>
                    <p class="text-blue-100 mb-6 max-w-sm">Simplifiez vos démarches d'entrée en RDC avec le nouveau système de visa électronique unifié.</p>
                    <Button variant="tonal" class="bg-white text-rdc-blue hover:bg-blue-50">Demander un E-Visa</Button>
                </div>
                <span class="material-icons-round absolute -right-4 -bottom-4 text-9xl text-white/10 group-hover:scale-110 transition-transform">flight_takeoff</span>
            </div>

            <div class="bg-white border border-gray-200 rounded-3xl p-8 relative overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer">
                <div class="relative z-10">
                    <h3 class="text-2xl text-slate-900 mb-2">État Civil</h3>
                    <p class="text-slate-500 mb-6 max-w-sm">Déclarez une naissance, un mariage ou demandez des copies d'actes officiels.</p>
                    <Button variant="outlined">Accéder au portail</Button>
                </div>
                 <span class="material-icons-round absolute -right-4 -bottom-4 text-9xl text-slate-50 group-hover:text-slate-100 transition-colors">family_restroom</span>
            </div>
        </div>

      </div>
    </section>

    <!-- Section Actualités -->
    <section class="bg-white py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-3xl font-bold text-slate-900 mb-2">Actualités & Annonces</h2>
            <p class="text-slate-600">Restez informé des dernières nouvelles gouvernementales</p>
          </div>
          <RouterLink to="/actualites">
            <Button variant="text" class="text-blue-600 hover:text-blue-700">
              Voir tout
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </RouterLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NewsCard
            v-for="item in news"
            :key="item.link"
            :title="item.title"
            :excerpt="item.excerpt"
            :date="item.date"
            :category="item.category"
            :link="item.link"
          />
        </div>
      </div>
    </section>

    <!-- Section Liens Rapides -->
    <section class="relative overflow-hidden py-20 bg-linear-to-r from-blue-700 via-blue-800 to-blue-900 text-white">
      <div class="pointer-events-none absolute inset-0 opacity-30">
        <img
          :src="heroBg"
          alt="Illustration Accès Rapide"
          class="absolute right-[-60px] bottom-[-40px] w-72 sm:w-96 object-contain mix-blend-soft-light"
        />
      </div>
      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 section-appear">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 class="text-3xl font-bold mb-2">Accès Rapide</h2>
            <p class="text-blue-100 max-w-2xl">
              Accédez rapidement aux services les plus consultés par les citoyens et les entreprises.
            </p>
          </div>
          <div class="text-xs text-blue-100/80">
            Quelques démarches parmi les plus utilisées. L’ensemble est disponible dans le catalogue des services.
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickLinkCard
            v-for="link in quickLinks"
            :key="link.link"
            :title="link.title"
            :description="link.description"
            :icon="link.icon"
            :link="link.link"
            :color="link.color"
          />
        </div>
      </div>
    </section>

    <!-- Section Services par Catégorie -->
    <section class="bg-white py-20 section-appear">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 class="text-3xl font-bold text-slate-900 mb-2">Services par Catégorie</h2>
            <p class="text-slate-600 max-w-2xl">
              Explorez les services organisés par grands domaines de la vie administrative.
            </p>
          </div>
          <RouterLink to="/services">
            <Button variant="text" size="sm" class="text-blue-600">
              Voir le catalogue complet
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </RouterLink>
        </div>
        
        <div class="space-y-10">
          <div v-for="categoryGroup in servicesByCategory" :key="categoryGroup.category" class="bg-slate-50 rounded-3xl p-5 sm:p-6 lg:p-7 border border-slate-100 card-appear">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">
                  {{ categoryGroup.category.charAt(0) }}
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-slate-900">
                    {{ categoryGroup.category }}
                  </h3>
                  <p class="text-xs text-slate-500">
                    Quelques services représentatifs de cette catégorie.
                  </p>
                </div>
              </div>
              <RouterLink :to="`/services?category=${categoryGroup.category}`">
                <Button variant="text" size="sm" class="text-blue-600">
                  Voir tous les services
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </RouterLink>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <RouterLink
                v-for="service in categoryGroup.services"
                :key="service.id"
                :to="`/services/${service.id}`"
                class="m3-card group cursor-pointer block"
              >
                <div class="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <span class="material-icons-round">{{ getIcon(service.iconName) }}</span>
                </div>
                <h4 class="text-base font-semibold text-slate-900 mb-1.5 group-hover:text-blue-700 transition-colors">
                  {{ service.title }}
                </h4>
                <p class="text-slate-600 text-sm leading-relaxed mb-3 line-clamp-2">
                  {{ service.shortDesc }}
                </p>
                <div class="flex items-center text-blue-600 text-xs font-medium group-hover:gap-1.5 transition-all">
                  En savoir plus
                  <svg class="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section FAQ -->
    <section class="bg-slate-50 py-20 section-appear">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center mb-10">
          <h2 class="text-3xl font-bold text-slate-900 mb-2">Questions fréquentes</h2>
          <p class="text-slate-600 text-sm sm:text-base">
            Quelques réponses rapides aux questions les plus posées sur l’utilisation du portail.
          </p>
        </div>
        <div class="max-w-3xl mx-auto space-y-3">
          <div
            v-for="item in faqItems"
            :key="item.id"
            class="bg-white border border-slate-200 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-sm card-appear"
          >
            <button
              type="button"
              class="w-full flex items-center justify-between gap-3 text-left"
              @click="toggleFaq(item.id)"
            >
              <span class="text-sm sm:text-base font-semibold text-slate-900">
                {{ item.question }}
              </span>
              <span
                class="material-icons-round text-slate-500 text-base transition-transform"
                :class="openFaqId === item.id ? 'rotate-180' : ''"
              >
                expand_more
              </span>
            </button>
            <div
              v-if="openFaqId === item.id"
              class="mt-2 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-600"
            >
              {{ item.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section CTA Final -->
    <section class="bg-slate-50 py-16 section-appear">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl px-6 sm:px-10 py-10 shadow-sm card-appear">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 class="text-3xl font-bold text-slate-900 mb-2">Vous accompagner dans vos démarches</h2>
              <p class="text-slate-600 text-sm sm:text-base max-w-xl">
                Une question sur une procédure, un document ou un service&nbsp;? Nos équipes sont disponibles pour vous orienter vers le bon interlocuteur.
              </p>
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
              <RouterLink to="/aide">
                <Button variant="filled" size="lg" class="bg-blue-600 hover:bg-blue-700 text-white">
                  Centre d'aide en ligne
                </Button>
              </RouterLink>
              <RouterLink to="/contact">
                <Button variant="outlined" size="lg" class="border-slate-300 text-slate-800 hover:bg-slate-50">
                  Contacter l'administration
                </Button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-20px) translateX(10px);
  }
  50% {
    transform: translateY(-10px) translateX(-5px);
  }
  75% {
    transform: translateY(-30px) translateX(5px);
  }
}

.animate-float {
  animation: float linear infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  animation: gradient 3s ease infinite;
}

.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>
