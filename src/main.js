import './assets/main.css'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { createPinia } from 'pinia'
import 'primeicons/primeicons.css'
import { Icon } from '@iconify/vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('Icon', Icon)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: { darkModeSelector: false },
    ripple: true,
  },
})

app.use(createPinia())

app.use(router)

// navigation guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

app.mount('#app')
