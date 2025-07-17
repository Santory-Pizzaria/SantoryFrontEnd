<script>
import PedidosProdutos from './PedidosProdutos.vue';
const ProdutosAdmin = { template: '<div>Gerenciamento de Produtos (implementar)</div>' };
const UsuariosAdmin = { template: '<div>Gerenciamento de Usuários (implementar)</div>' };
const RelatoriosAdmin = { template: '<div>Relatórios (implementar)</div>' };

export default {
  name: 'AdminDashboard',
  components: { PedidosProdutos, ProdutosAdmin, UsuariosAdmin, RelatoriosAdmin },
  data() {
    return {
      section: 'pedidos',
    };
  },
  methods: {
    goTo(sec) {
      this.section = sec;
    },
  },
};
</script>

<template>
  <div class="admin-dashboard">
    <aside class="sidebar">
      <h2>Administração</h2>
      <ul>
        <li :class="{active: section === 'pedidos'}" @click="goTo('pedidos')">Pedidos</li>
        <li :class="{active: section === 'produtos'}" @click="goTo('produtos')">Produtos</li>
        <li :class="{active: section === 'usuarios'}" @click="goTo('usuarios')">Usuários</li>
        <li :class="{active: section === 'relatorios'}" @click="goTo('relatorios')">Relatórios</li>
      </ul>
    </aside>
    <main class="main-content">
      <header class="admin-header">
        <h1>Painel do Administrador</h1>
        <p>Gerencie o sistema da pizzaria de forma centralizada.</p>
      </header>
      <section class="content-area">
        <PedidosProdutos v-if="section === 'pedidos'" />
        <ProdutosAdmin v-if="section === 'produtos'" />
        <UsuariosAdmin v-if="section === 'usuarios'" />
        <RelatoriosAdmin v-if="section === 'relatorios'" />
      </section>
    </main>
  </div>
</template>


<style scoped>
.admin-dashboard {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}
.sidebar {
  width: 220px;
  background: #222e3a;
  color: #fff;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.sidebar h2 {
  font-size: 1.4rem;
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: 1px;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  font-weight: 500;
}
.sidebar li.active,
.sidebar li:hover {
  background: #ff9800;
  color: #222e3a;
}
.main-content {
  flex: 1;
  padding: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
}
.admin-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}
.admin-header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
}
.content-area {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  padding: 2rem;
  min-height: 400px;
}
</style>
