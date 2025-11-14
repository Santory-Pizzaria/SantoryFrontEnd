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

