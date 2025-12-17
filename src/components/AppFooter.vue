<script setup lang="ts">
</script>

<template>
  <footer class="mt-auto bg-linear-to-r from-blue-700 via-blue-800 to-blue-900 text-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 section-appear">
      <div class="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))] gap-10">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center text-white font-bold text-xs">
              RDC
            </div>
            <div class="flex flex-col">
              <span class="font-display font-semibold text-base">Gouv.cd</span>
              <span class="text-[11px] uppercase tracking-[0.15em] text-blue-100/80">Portail Officiel</span>
            </div>
          </div>
          <p class="text-blue-100/90 text-sm leading-relaxed mb-3">
            Portail unifié des services publics numériques de la République Démocratique du Congo.
          </p>
          <p class="text-blue-100/70 text-xs">
            Accédez à vos démarches en ligne en toute sécurité, 24h/24 et 7j/7.
          </p>
        </div>

        <!-- Services rapides -->
        <div>
          <h3 class="font-semibold mb-3 text-sm">Services rapides</h3>
          <ul class="space-y-2 text-sm text-blue-100/80">
            <li><a href="#" class="hover:text-white transition-colors">Documents d'identité</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Impôts & taxes</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Casier judiciaire</a></li>
            <li><a href="#" class="hover:text-white transition-colors">État civil</a></li>
          </ul>
        </div>

        <!-- Aide -->
        <div>
          <h3 class="font-semibold mb-3 text-sm">Aide & support</h3>
          <ul class="space-y-2 text-sm text-blue-100/80">
            <li><a href="#" class="hover:text-white transition-colors">Centre d'aide</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Support technique</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Signaler un incident</a></li>
          </ul>
        </div>

        <!-- Légal -->
        <div>
          <h3 class="font-semibold mb-3 text-sm">Informations légales</h3>
          <ul class="space-y-2 text-sm text-blue-100/80">
            <li><a href="#" class="hover:text-white transition-colors">Politique de confidentialité</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Conditions d'utilisation</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Mentions légales</a></li>
          </ul>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-blue-600/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-blue-100/80 text-xs sm:text-sm">
          &copy; {{ new Date().getFullYear() }} Gouvernement de la République Démocratique du Congo. Tous droits réservés.
        </p>
        <div class="flex items-center gap-4 text-xs text-blue-100/80">
          <button class="flex items-center gap-1 hover:text-white transition-colors">
            <span class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.35)]"></span>
            <span>État des services</span>
          </button>
          <button class="flex items-center gap-1 hover:text-white transition-colors">
            <span>FR</span>
            <span class="text-blue-200">/</span>
            <span>EN</span>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>
