import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { mask } from 'vue-the-mask'
import { useUserStore } from '@/stores/user';

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// Carregar estado do usuário do localStorage
const userStore = useUserStore();
userStore.loadFromLocalStorage();

app.use(router)
app.directive('mask', mask)

app.mount('#app')

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => {
        // Atualização automática quando um novo SW é instalado
        if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' })
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing
          if (!newWorker) return
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Novo conteúdo disponível; recarrega para aplicar
              // Comentado para evitar reload automático: descomente se preferir
              // window.location.reload()
            }
          })
        })
      })
      .catch(err => console.debug('SW registration failed', err))
  })
}

