<script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  import { RouterLink, useRoute } from 'vue-router'
  
  const route = useRoute()
  const isScrolled = ref(false)
  const isMobileMenuOpen = ref(false)
  const activeDropdown = ref<string | null>(null)
  const searchQuery = ref('')
  const isSearchOpen = ref(false)
  const isTouchDevice = ref(false)
  
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 10
  }
  
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    activeDropdown.value = null
  }
  
  const toggleDropdown = (menu: string) => {
    activeDropdown.value = activeDropdown.value === menu ? null : menu
  }
  
  const closeDropdowns = () => {
    activeDropdown.value = null
    isSearchOpen.value = false
  }
  
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('nav') && !target.closest('.dropdown-container')) {
      closeDropdowns()
    }
  }
  
  const toggleSearch = () => {
    isSearchOpen.value = !isSearchOpen.value
    if (isSearchOpen.value) {
      setTimeout(() => {
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement
        searchInput?.focus()
      }, 10)
    }
  }
  
  const handleSearch = () => {
    if (searchQuery.value.trim()) {
      // Search logic here
      console.log('Searching for:', searchQuery.value)
    }
  }
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDropdowns()
      if (e.key === '/' && e.ctrlKey) {
        e.preventDefault()
        toggleSearch()
      }
    })
    
    // Detect touch device
    isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    document.removeEventListener('click', handleClickOutside)
  })
  
  const servicesMenu = [
    { label: 'Documents d\'Identité', path: '/services/documents', icon: 'ID', color: 'bg-blue-500' },
    { label: 'Transport', path: '/services/transport', icon: 'TR', color: 'bg-green-500' },
    { label: 'Impôts & Taxes', path: '/services/taxes', icon: 'TX', color: 'bg-purple-500' },
    { label: 'Justice', path: '/services/justice', icon: 'JU', color: 'bg-amber-500' },
    { label: 'Santé', path: '/services/sante', icon: 'SA', color: 'bg-red-500' },
    { label: 'Immigration', path: '/services/immigration', icon: 'IM', color: 'bg-indigo-500' },
    { label: 'Éducation', path: '/services/education', icon: 'ED', color: 'bg-teal-500' },
    { label: 'Entreprise', path: '/services/entreprise', icon: 'EN', color: 'bg-cyan-500' },
  ]
  
  const quickLinks = [
    { label: 'Actualités', path: '/actualites', icon: 'ACT' },
    { label: 'Déclarations', path: '/declarations', icon: 'DEC' },
    { label: 'Appels d\'Offres', path: '/appels-offres', icon: 'AO' },
    { label: 'Transparence', path: '/transparence', icon: 'TRP' },
    { label: 'Statistiques', path: '/statistiques', icon: 'STAT' },
    { label: 'Publications', path: '/publications', icon: 'PUB' },
  ]
  
  const governmentLinks = [
    { label: 'Présidence', path: '/presidence', icon: 'PR' },
    { label: 'Ministères', path: '/ministeres', icon: 'MIN' },
    { label: 'Institutions', path: '/institutions', icon: 'INS' },
    { label: 'Ambassades', path: '/ambassades', icon: 'AMB' },
  ]
  
  // Watch route changes to close mobile menu
  watch(() => route.path, () => {
    isMobileMenuOpen.value = false
    activeDropdown.value = null
  })
  </script>
  
  <template>
    <nav 
      class="fixed left-0 right-0 z-50 transition-all duration-200"
      :class="[
        isScrolled 
          ? 'bg-white border-b border-gray-200 shadow-sm py-0' 
          : 'bg-white/95 backdrop-blur-sm py-0'
      ]"
    >
      <!-- Top info bar -->
      <div class="hidden md:block bg-blue-900 text-white text-sm py-1.5 px-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
              Lun - Ven: 8h - 17h
            </span>
            <span class="text-gray-300">|</span>
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              Kinshasa, RDC
            </span>
          </div>
          <div class="flex items-center gap-4">
            <button class="flex items-center gap-1.5 hover:text-blue-200 transition-colors">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              FR
            </button>
            <a href="#" class="hover:text-blue-200 transition-colors text-xs">
              Version Anglaise
            </a>
          </div>
        </div>
      </div>
  
      <!-- Main navigation -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-14">
          <!-- Logo -->
          <RouterLink 
            to="/" 
            class="flex items-center gap-2.5 group"
            aria-label="Gouv.cd - Portail Officiel"
          >
            <div class="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span class="text-white font-bold text-sm">RDC</span>
            </div>
            <div class="flex flex-col">
              <span class="font-bold text-gray-900 text-lg tracking-tight leading-none">Gouv.cd</span>
              <span class="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
                Portail Officiel
              </span>
            </div>
          </RouterLink>
  
          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center flex-1 justify-center ml-8">
            <div class="flex items-center gap-0.5">
              <RouterLink
                to="/"
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                :class="{ 'text-blue-600 bg-blue-50': route.path === '/' }"
              >
                Accueil
              </RouterLink>
  
              <!-- Services dropdown -->
              <div class="relative">
                <button
                  @click="toggleDropdown('services')"
                  class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1"
                  :class="{ 'text-blue-600 bg-blue-50': activeDropdown === 'services' || route.path.startsWith('/services') }"
                >
                  Services
                  <svg 
                    class="w-4 h-4 transition-transform duration-200" 
                    :class="{ 'rotate-180': activeDropdown === 'services' }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div
                  v-if="activeDropdown === 'services'"
                  class="dropdown-container absolute left-0 top-full mt-1 w-[700px] bg-white rounded-xl shadow-lg border border-gray-200 p-4 animate-fadeIn"
                >
                  <div class="grid grid-cols-2 gap-2">
                    <RouterLink
                      v-for="item in servicesMenu"
                      :key="item.path"
                      :to="item.path"
                      @click="closeDropdowns"
                      class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div 
                        class="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg"
                        :class="item.color"
                      >
                        {{ item.icon }}
                      </div>
                      <div>
                        <div class="font-medium text-gray-900 group-hover:text-blue-600">{{ item.label }}</div>
                        <div class="text-xs text-gray-500 mt-0.5">Service en ligne</div>
                      </div>
                    </RouterLink>
                  </div>
                  <div class="mt-4 pt-4 border-t border-gray-100">
                    <RouterLink
                      to="/services"
                      class="flex items-center justify-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Explorer tous les services
                    </RouterLink>
                  </div>
                </div>
              </div>
  
              <!-- Government dropdown -->
              <div class="relative">
                <button
                  @click="toggleDropdown('government')"
                  class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1"
                  :class="{ 'text-blue-600 bg-blue-50': activeDropdown === 'government' }"
                >
                  Gouvernement
                  <svg 
                    class="w-4 h-4 transition-transform duration-200" 
                    :class="{ 'rotate-180': activeDropdown === 'government' }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div
                  v-if="activeDropdown === 'government'"
                  class="dropdown-container absolute left-0 top-full mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-200 p-2 animate-fadeIn"
                >
                  <RouterLink
                    v-for="item in governmentLinks"
                    :key="item.path"
                    :to="item.path"
                    @click="closeDropdowns"
                    class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span class="text-lg">{{ item.icon }}</span>
                    <span class="font-medium text-gray-900 group-hover:text-blue-600">{{ item.label }}</span>
                  </RouterLink>
                </div>
              </div>
  
              <RouterLink
                to="/actualites"
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors relative"
                :class="{ 'text-blue-600 bg-blue-50': route.path.startsWith('/actualites') }"
              >
                Actualités
                <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </RouterLink>
  
              <!-- Resources dropdown -->
              <div class="relative">
                <button
                  @click="toggleDropdown('resources')"
                  class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1"
                  :class="{ 'text-blue-600 bg-blue-50': activeDropdown === 'resources' }"
                >
                  Ressources
                  <svg 
                    class="w-4 h-4 transition-transform duration-200" 
                    :class="{ 'rotate-180': activeDropdown === 'resources' }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div
                  v-if="activeDropdown === 'resources'"
                  class="dropdown-container absolute left-0 top-full mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-200 p-2 animate-fadeIn"
                >
                  <RouterLink
                    v-for="item in quickLinks"
                    :key="item.path"
                    :to="item.path"
                    @click="closeDropdowns"
                    class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span class="text-lg">{{ item.icon }}</span>
                    <span class="font-medium text-gray-900 group-hover:text-blue-600">{{ item.label }}</span>
                  </RouterLink>
                </div>
              </div>
  
              <RouterLink
                to="/contact"
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                :class="{ 'text-blue-600 bg-blue-50': route.path.startsWith('/contact') }"
              >
                Contact
              </RouterLink>
            </div>
          </div>
  
          <!-- Desktop Actions -->
          <div class="hidden lg:flex items-center gap-3">
            <!-- Search -->
            <div class="relative">
              <div class="flex items-center">
                <div 
                  v-if="isSearchOpen" 
                  class="absolute right-0 top-full mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 animate-fadeIn"
                >
                  <div class="relative">
                    <input
                      v-model="searchQuery"
                      @keyup.enter="handleSearch"
                      type="search"
                      placeholder="Rechercher un service..."
                      class="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <button
                  @click="toggleSearch"
                  class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Recherche"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
  
            <div class="h-5 w-px bg-gray-300"></div>
  
            <!-- Auth buttons -->
            <RouterLink
              to="/login"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Connexion
            </RouterLink>
            <RouterLink
              to="/register"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm hover:shadow"
            >
              S'inscrire
            </RouterLink>
          </div>
  
          <!-- Mobile menu button -->
          <div class="lg:hidden flex items-center gap-2">
            <button
              @click="toggleSearch"
              class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Recherche"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              @click="toggleMobileMenu"
              class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              <svg v-if="!isMobileMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
  
        <!-- Mobile Search -->
        <div 
          v-if="isSearchOpen" 
          class="lg:hidden mt-2 mb-4 animate-slideDown"
        >
          <div class="relative">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="search"
              placeholder="Rechercher un service..."
              class="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
  
        <!-- Mobile menu -->
        <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 -translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4"
        >
          <div
            v-if="isMobileMenuOpen"
            class="lg:hidden py-4 border-t border-gray-200 mt-2"
          >
            <div class="space-y-1">
              <RouterLink
                to="/"
                @click="toggleMobileMenu"
                class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                :class="{ 'text-blue-600 bg-blue-50': route.path === '/' }"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Accueil
              </RouterLink>
  
              <!-- Services mobile dropdown -->
              <div class="space-y-1">
                <button
                  @click="toggleDropdown('mobile-services')"
                  class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                  :class="{ 'text-blue-600 bg-blue-50': activeDropdown === 'mobile-services' }"
                >
                  <div class="flex items-center gap-3">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Services
                  </div>
                  <svg 
                    class="w-4 h-4 transition-transform duration-200" 
                    :class="{ 'rotate-180': activeDropdown === 'mobile-services' }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div v-if="activeDropdown === 'mobile-services'" class="pl-12 pr-4 space-y-1">
                  <RouterLink
                    v-for="item in servicesMenu"
                    :key="item.path"
                    :to="item.path"
                    @click="toggleMobileMenu"
                    class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div class="w-6 h-6 rounded flex items-center justify-center text-white text-xs" :class="item.color">
                      {{ item.icon }}
                    </div>
                    {{ item.label }}
                  </RouterLink>
                </div>
              </div>
  
              <RouterLink
                to="/actualites"
                @click="toggleMobileMenu"
                class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors relative"
                :class="{ 'text-blue-600 bg-blue-50': route.path.startsWith('/actualites') }"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Actualités
                <span class="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  3
                </span>
              </RouterLink>
  
              <!-- Resources mobile dropdown -->
              <div class="space-y-1">
                <button
                  @click="toggleDropdown('mobile-resources')"
                  class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                  :class="{ 'text-blue-600 bg-blue-50': activeDropdown === 'mobile-resources' }"
                >
                  <div class="flex items-center gap-3">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Ressources
                  </div>
                  <svg 
                    class="w-4 h-4 transition-transform duration-200" 
                    :class="{ 'rotate-180': activeDropdown === 'mobile-resources' }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div v-if="activeDropdown === 'mobile-resources'" class="pl-12 pr-4 space-y-1">
                  <RouterLink
                    v-for="item in quickLinks"
                    :key="item.path"
                    :to="item.path"
                    @click="toggleMobileMenu"
                    class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span class="text-lg">{{ item.icon }}</span>
                    {{ item.label }}
                  </RouterLink>
                </div>
              </div>
  
              <RouterLink
                to="/contact"
                @click="toggleMobileMenu"
                class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                :class="{ 'text-blue-600 bg-blue-50': route.path.startsWith('/contact') }"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact
              </RouterLink>
  
              <!-- Mobile auth -->
              <div class="pt-4 mt-4 border-t border-gray-200 space-y-2">
                <RouterLink
                  to="/login"
                  @click="toggleMobileMenu"
                  class="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors text-center"
                >
                  Connexion
                </RouterLink>
                <RouterLink
                  to="/register"
                  @click="toggleMobileMenu"
                  class="block px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-center shadow-sm"
                >
                  S'inscrire
                </RouterLink>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </nav>
  </template>
  
  <style scoped>
  .animate-fadeIn {
    animation: fadeIn 0.15s ease-out;
  }
  
  .animate-slideDown {
    animation: slideDown 0.2s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Focus styles for accessibility */
  :focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  
  /* Better touch targets on mobile */
  @media (max-width: 1024px) {
    a, button {
      min-height: 44px;
      min-width: 44px;
    }
  }
  
  /* Prevent body scroll when mobile menu is open */
  body.menu-open {
    overflow: hidden;
  }
  </style>