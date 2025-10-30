<script>
import AdminPedidos from '@/components/AdminPedidos.vue';
import ProdutosAdmin from '@/components/ProdutosAdmin.vue';
import UsuariosAdmin from '@/components/UsuariosAdmin.vue';
import RelatoriosAdmin from '@/components/RelatoriosAdmin.vue';

export default {
  name: 'AdminDashboard',
  components: { AdminPedidos, ProdutosAdmin, UsuariosAdmin, RelatoriosAdmin },
  data() {
    return {
      section: 'pedidos',
    };
  },
  methods: {
    goTo(sec) {
      this.section = sec;
    },
    atualizarPedidos() {
      // Força atualização do componente PedidosProdutos
      if (this.section === 'pedidos' && this.$refs.pedidosComp && this.$refs.pedidosComp.carregarPedidos) {
        this.$refs.pedidosComp.carregarPedidos();
      }
    }
  },
  mounted() {
    // Atualização automática a cada 5 segundos
    this._intervalPedidos = setInterval(this.atualizarPedidos, 5000);
  },
  beforeUnmount() {
    clearInterval(this._intervalPedidos);
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
        <AdminPedidos v-if="section === 'pedidos'" />
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

@media (max-width: 900px) {
  .admin-dashboard {
    flex-direction: column;
    padding: 12px 2vw;
    gap: 18px;
  }
  .sidebar {
    width: 100%;
    min-width: 0;
    max-width: 100vw;
    border-radius: 12px;
    margin-bottom: 12px;
    flex-direction: row;
    gap: 0;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2vw;
  }
  .sidebar ul {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    width: 100%;
    justify-content: space-around;
    margin: 0;
  }
  .sidebar li {
    margin-bottom: 0;
    padding: 0.7rem 1rem;
    font-size: 1rem;
  }
  .main-content {
    width: 100%;
    min-width: 0;
    max-width: 100vw;
    border-radius: 12px;
    padding: 18px 2vw;
  }
}
@media (max-width: 600px) {
  .admin-dashboard {
    flex-direction: column;
    padding: 6px 1vw;
    gap: 10px;
  }
  .sidebar {
    width: 100%;
    min-width: 0;
    max-width: 100vw;
    border-radius: 8px;
    margin-bottom: 8px;
    font-size: 0.98rem;
    padding: 10px 2vw;
    flex-direction: column;
    align-items: flex-start;
  }
  .sidebar ul {
    flex-direction: column;
    gap: 0.2rem;
    width: 100%;
    align-items: flex-start;
  }
  .sidebar li {
    width: 100%;
    font-size: 0.98rem;
    padding: 0.6rem 0.7rem;
  }
  .main-content {
    width: 100%;
    min-width: 0;
    max-width: 100vw;
    border-radius: 8px;
    padding: 10px 2vw;
    font-size: 0.98rem;
  }
  .admin-header {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
    padding: 10px 2vw 8px 2vw;
  }
  .admin-header h1 {
    font-size: 1.1rem;
    text-align: center;
    width: 100%;
  }
}
</style>
