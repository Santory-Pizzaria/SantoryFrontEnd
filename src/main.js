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

// Restaurar o estado do usuário logado ao inicializar o aplicativo
const userStore = useUserStore();
userStore.restoreUser();

app.use(router)
app.directive('mask', mask)

app.mount('#app')

