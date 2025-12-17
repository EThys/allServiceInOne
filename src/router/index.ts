import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { layout: 'auth' }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { layout: 'auth' }
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesView.vue')
    },
    {
      path: '/services/:id',
      name: 'service-detail',
      component: () => import('../views/ServiceDetailView.vue')
    },
    // Pages en construction
    {
      path: '/actualites',
      name: 'actualites',
      component: () => import('../views/UnderConstructionView.vue')
    },
    {
      path: '/aide',
      name: 'aide',
      component: () => import('../views/UnderConstructionView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/UnderConstructionView.vue')
    },
    {
      path: '/declarations',
      name: 'declarations',
      component: () => import('../views/UnderConstructionView.vue')
    },
    {
      path: '/appels-offres',
      name: 'appels-offres',
      component: () => import('../views/UnderConstructionView.vue')
    },
    {
      path: '/transparence',
      name: 'transparence',
      component: () => import('../views/UnderConstructionView.vue')
    },
    {
      path: '/statistiques',
      name: 'statistiques',
      component: () => import('../views/UnderConstructionView.vue')
    },
    {
      path: '/publications',
      name: 'publications',
      component: () => import('../views/UnderConstructionView.vue')
    },
    {
      path: '/presidence',
      name: 'presidence',
      component: () => import('../views/UnderConstructionView.vue')
    },
    {
      path: '/ministeres',
      name: 'ministeres',
      component: () => import('../views/UnderConstructionView.vue')
    },
    {
      path: '/institutions',
      name: 'institutions',
      component: () => import('../views/UnderConstructionView.vue')
    },
    {
      path: '/ambassades',
      name: 'ambassades',
      component: () => import('../views/UnderConstructionView.vue')
    },
    // Catch-all pour toute autre route non gérée
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/UnderConstructionView.vue')
    }
  ]
})

export default router
