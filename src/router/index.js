import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '../views/MenuView.vue'
import LoginCliente from '../views/LoginCliente.vue'
import PizzaOptionsView from '../views/PizzaOptionsView.vue'
import PizzaList from '../components/PizzaList.vue'
import ComboList from '../components/ComboList.vue'
import BebidaList from '../components/BebidaList.vue'
import EnderecoForm from '../components/EnderecoForm.vue'
import CheckoutForm from '@/components/CheckoutForm.vue'
import FeedBack from '@/components/FeedBack.vue'
import CadastroPizzaria from '../views/CadastroPizzaria.vue'
import PerfilUsuario from '../views/PerfilUsuario.vue'
import PedidosProdutos from '../views/PedidosProdutos.vue'
import TempoEntrega from '../views/TempoEntrega.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import CardapioTela from '@/views/CardapioTela.vue'
import PizzaCard from '../components/PizzaCard.vue'
import ReservasLocal from '@/components/ReservasLocal.vue'
import Carrinho from '../views/CarrinhoView.vue'
import CarrinhoItem from '@/components/CarrinhoItem.vue'
import CarrinhoItemDemo from '@/components/CarrinhoItem.vue';
import ControleEstoque from '../components/ControleEstoque.vue';
import ProdutosAdmin from '@/components/ProdutosAdmin.vue';
import UsuariosAdmin from '@/components/UsuariosAdmin.vue';
import RelatoriosAdmin from '@/components/RelatoriosAdmin.vue';
import ReservasUsuario from '@/components/ReservasUsuario.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/perfil',
      name: 'perfil',
      component: PerfilUsuario,
    },
    {
      path: '/reservasUsuario',
      name: 'ReservasUsuario',
      component: ReservasUsuario,
    },
    {
      path: '/ProdutosAdmin',
      name: 'ProdutosAdmin',
      component: ProdutosAdmin,
    },
    {
      path: '/UsuariosAdmin',
      name: 'UsuariosAdmin',
      component: UsuariosAdmin,
    },
    {
      path: '/RelatoriosAdmin',
      name: 'RelatoriosAdmin',
      component: RelatoriosAdmin,
    },
    {
      path: '/pedidosAdmin',
      name: 'pedidosAdmin',
      component: PedidosProdutos,
    },
    {
      path: '/ItemCarrinho',
      name: 'ItemCarrinho',
      component: CarrinhoItem,

    },
    {
      path: '/Estoque',
      name: 'ControleEstoque',
      component: ControleEstoque,
    },
    {
      path: '/ItemCarrinhoDemo',
      name: 'ItemCarrinhoDemo',
      component: CarrinhoItemDemo,
    },
    {
      path: '/carrinho',
      name: 'carrinho',
      component: Carrinho,

    },
    {
      path: '/login',
      name: 'login',
      component: LoginCliente,
    },
    {
      path: '/reserva',
      name: 'ReservasLocal',
      component: ReservasLocal,
    },
    {
      path: '/Cardapio',
      name: 'CardapioTela',
      component: CardapioTela,
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroPizzaria,
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView,
    },
    {
      path: '/pizza-options/:pizzaNome',
      name: 'pizza-options',
      component: PizzaOptionsView,
      props: true
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
    {
      path: '/pedidos',
      name: 'PedidosProdutos',
      component: PedidosProdutos,
    },
    {
      path: '/tempo',
      name: 'TempoEntrega',
      component: TempoEntrega,
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: AdminDashboard,
    },
    {
      path: '/pizza-card',
      name: 'PizzaCard',
      component: PizzaCard,
    },
  ],
})

export default router
