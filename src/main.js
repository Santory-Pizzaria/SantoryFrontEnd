import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
import PizzaList from './components/PizzaList.vue';


const pizzalist = createApp(PizzaList);
pizzalist.use(router);
pizzalist.mount('#pizzalist');

