import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import PizzaList from '../components/PizzaList.vue'
import ComboList from '../components/ComboList.vue'
import BebidaList from '../components/BebidaList.vue'
import EnderecoForm from '../components/EnderecoForm.vue'
import CheckoutForm from '@/components/CheckoutForm.vue'
import FeedBack from '@/components/FeedBack.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/pizza',
      name: 'PizzaList',
      component: PizzaList,
    },
    {
      path: '/combo',
      name: 'ComboList',
      component: ComboList,
    },
    {
      path: '/bebida',
      name: 'BebidaList',
      component: BebidaList,
    },
    {
      path: '/endereco',
      name: 'EnderecoForm',
      component: EnderecoForm,
    },
    {
      path: '/form',
      name: 'CheckoutForm',
      component: CheckoutForm,
    },
    {
      path: '/feedback',
      name: 'FeedBack',
      component: FeedBack,
    },
  ],
})

export default router
