<script setup lang="ts">
import { ref } from 'vue'
import Button from '../components/ui/Button.vue'
import heroBg from '../assets/hero-bg.jpg'

const email = ref('')
const password = ref('')

const handleLogin = () => {
  // Mock login
  alert('Connexion simulée pour ' + email.value)
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center py-28 px-4">
    <div class="relative max-w-5xl w-full bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden section-appear">
      <!-- Bandeau gauche avec image -->
      <div class="hidden md:block absolute inset-y-0 left-0 w-1/2 bg-linear-to-br from-blue-600 via-blue-700 to-blue-800">
        <img
          :src="heroBg"
          alt="Portail numérique"
          class="w-full h-full object-cover opacity-40 mix-blend-soft-light"
        />
        <div class="absolute inset-0 bg-slate-900/30"></div>
        <div class="relative z-10 h-full flex flex-col justify-center px-10 text-white gap-4">
          <h1 class="text-3xl font-bold tracking-tight">
            Portail citoyen sécurisé
          </h1>
          <p class="text-sm text-blue-100 max-w-md">
            Un seul compte pour accéder à l’ensemble de vos démarches administratives en ligne en République Démocratique du Congo.
          </p>
          <ul class="text-xs text-blue-100/90 space-y-1">
            <li>• Suivi de vos demandes en temps réel</li>
            <li>• Historique centralisé de vos démarches</li>
            <li>• Notifications et rappels importants</li>
          </ul>
        </div>
      </div>

      <!-- Colonne droite : choix Connexion / Inscription -->
      <div class="relative md:ml-1/2 flex-1 flex items-center justify-center">
        <div class="w-full md:w-1/2 ml-auto px-6 sm:px-10 py-10 card-appear">
          <p class="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">
            Espace sécurisé
          </p>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Accéder au portail
          </h2>
          <p class="text-sm text-slate-600 mb-8">
            Choisissez l’option qui correspond à votre situation pour continuer.
          </p>

          <div class="space-y-4 mb-8">
            <RouterLink to="/register">
              <Button block size="lg" variant="outlined" class="border-slate-300 text-slate-800 hover:bg-slate-50">
                Je crée mon compte citoyen
              </Button>
            </RouterLink>
          </div>

          <!-- Formulaire de connexion -->
          <form @submit.prevent="handleLogin" class="space-y-4 mb-4">
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1.5">Adresse email</label>
              <input
                v-model="email"
                type="email"
                required
                class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                placeholder="citoyen@exemple.cd"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1.5">Mot de passe</label>
              <input
                v-model="password"
                type="password"
                required
                class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                placeholder="••••••••"
              />
              <div class="flex justify-end mt-1">
                <a href="#" class="text-[11px] text-blue-600 hover:underline">Mot de passe oublié ?</a>
              </div>
            </div>
            <Button block size="lg" class="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20">
              Se connecter
            </Button>
          </form>

          <p class="text-[11px] text-slate-500 leading-relaxed">
            En vous connectant, vous acceptez les conditions d’utilisation du portail et la politique de confidentialité.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
