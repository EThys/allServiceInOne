<script setup lang="ts">
import { ref } from 'vue'
import Button from '../components/ui/Button.vue'
import heroBg from '../assets/hero-bg.jpg'

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  nationalId: '',
  password: '',
  confirmPassword: ''
})

const handleRegister = () => {
  alert("Inscription simulée. Un email de confirmation a été envoyé à " + formData.value.email)
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
            Créez votre compte citoyen
          </h1>
          <p class="text-sm text-blue-100 max-w-md">
            Un identifiant unique pour accéder à tous les services publics en ligne, en toute confiance.
          </p>
          <ul class="text-xs text-blue-100/90 space-y-1">
            <li>• Données protégées et hébergées en RDC</li>
            <li>• Connexion simplifiée à vos démarches</li>
            <li>• Une seule identité numérique pour l’ensemble des services</li>
          </ul>
        </div>
      </div>

      <!-- Colonne droite : mêmes boutons que login -->
      <div class="relative md:ml-1/2 flex-1 flex items-center justify-center">
        <div class="w-full md:w-1/2 ml-auto px-6 sm:px-10 py-10 card-appear">
          <p class="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">
            Espace sécurisé
          </p>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Choisir votre mode d'accès
          </h2>
          <p class="text-sm text-slate-600 mb-8">
            Créez un compte si vous êtes nouveau sur le portail ou connectez-vous si vous disposez déjà d'un identifiant.
          </p>

          <div class="space-y-4 mb-8">
            <RouterLink to="/login">
              <Button block size="lg" variant="outlined" class="border-slate-300 text-slate-800 hover:bg-slate-50">
                Je possède déjà un compte
              </Button>
            </RouterLink>
          </div>

          <!-- Formulaire d'inscription -->
          <form @submit.prevent="handleRegister" class="space-y-3 mb-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-slate-700 mb-1.5">Prénom</label>
                <input
                  v-model="formData.firstName"
                  type="text"
                  required
                  class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-700 mb-1.5">Nom</label>
                <input
                  v-model="formData.lastName"
                  type="text"
                  required
                  class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1.5">Numéro national (optionnel)</label>
              <input
                v-model="formData.nationalId"
                type="text"
                class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                placeholder="Ex : 123-456-789"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1.5">Adresse email</label>
              <input
                v-model="formData.email"
                type="email"
                required
                class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                placeholder="citoyen@exemple.cd"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1.5">Mot de passe</label>
              <input
                v-model="formData.password"
                type="password"
                required
                class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                placeholder="••••••••"
              />
            </div>
            <Button block size="lg" class="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20">
              Créer mon compte
            </Button>
          </form>

          <p class="text-[11px] text-slate-500 leading-relaxed">
            La création d’un compte nécessite la validation de votre adresse email. Veillez à utiliser une adresse active et personnelle.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
