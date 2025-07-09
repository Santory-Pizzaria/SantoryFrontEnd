<script setup>
import { ref, onMounted } from 'vue'
import FooteRor from '@/components/FooteRor.vue'

const pedidos = ref([])

onMounted(() => {
  pedidos.value = [
    {
      id: 1,
      data: '20/06/2025',
      status: 'Entregue',
      valor: 85.00,
      itens: [
        { nome: 'Pizza Família', detalhes: '4 Sabores, Borda Cheddar', qtd: 1 },
        { nome: 'Coca-Cola 2L', detalhes: '', qtd: 1 }
      ]
    },
    {
      id: 2,
      data: '25/06/2025',
      status: 'Em andamento',
      valor: 49.90,
      itens: [
        { nome: 'Combo Família', detalhes: '2 Pizzas Grandes + 1 Refri 2L', qtd: 1 }
      ]
    }
  ]
})
</script>

<template>
  <div class="pedidos-container">
    <header class="pedidos-header">
      <button class="back-btn" @click="$router.push('/menu')">
        <img src="/src/assets/imagens/seta.png" alt="Voltar ao menu" class="seta-icon" />
      </button>
      <div class="header-center">
        <img src="/src/assets/imagens/logo.png" alt="Logo" class="logo" />
        <h1>Meus Pedidos</h1>
      </div>
    </header>
    <div v-if="pedidos.length === 0" class="sem-pedidos">
      Você ainda não fez nenhum pedido.
    </div>
    <div v-else class="lista-pedidos">
      <div v-for="pedido in pedidos" :key="pedido.id" class="pedido-card">
        <div class="pedido-info">
          <div><strong>Pedido #{{ pedido.id }}</strong></div>
          <div><b>Data:</b> {{ pedido.data }}</div>
          <div><b>Status:</b> <span :class="['status', pedido.status.toLowerCase().replace(' ', '-') ]">{{ pedido.status }}</span></div>
        </div>
        <div class="pedido-itens">
          <b>Itens:</b>
          <ul>
            <li v-for="(item, idx) in pedido.itens" :key="idx">
              {{ item.qtd }}x {{ item.nome }} <span v-if="item.detalhes">- {{ item.detalhes }}</span>
            </li>
          </ul>
        </div>
        <div class="pedido-valor">
          <b>Total:</b> R$ {{ pedido.valor.toFixed(2) }}
        </div>
      </div>
    </div>
    <FooteRor />
  </div>
</template>

<style scoped>
.pedidos-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.pedidos-header {
  background: linear-gradient(90deg, #ff9800 0%, #ffb86c 100%);
  color: #fff;
  text-align: center;
  padding: 16px 0 8px 0;
  font-size: 1.3rem;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}
.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 8px;
  display: flex;
  align-items: center;
  height: 100%;
}
.seta-icon {
  width: 36px;
  height: 36px;
  filter: drop-shadow(0 1px 4px #0002);
}
.header-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.logo {
  width: 64px;
  margin-bottom: 0;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  background: #fff;
  padding: 3px;
}
.pedidos-header h1 {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin: 0;
  text-shadow: 0 2px 8px #0002;
  align-self: center;
}
.lista-pedidos {
  max-width: 520px;
  margin: 32px auto 32px auto; /* Espaço acima e abaixo dos cards */
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.pedido-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px #0001;
  padding: 24px 20px 16px 20px;
  border-left: 6px solid #ff9800;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pedido-info {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 1.1rem;
}
.pedido-itens {
  margin: 10px 0 0 0;
  font-size: 1rem;
}
.pedido-itens ul {
  margin: 0;
  padding-left: 18px;
}
.pedido-valor {
  margin-top: 8px;
  font-size: 1.1rem;
  color: #388e3c;
  font-weight: bold;
}
.status {
  padding: 2px 10px;
  border-radius: 8px;
  font-size: 0.98rem;
  font-weight: bold;
  color: #fff;
}
.status.entregue {
  background: #388e3c;
}
.status.em-andamento {
  background: #ff9800;
}
.sem-pedidos {
  text-align: center;
  margin: 60px 0 0 0;
  font-size: 1.2rem;
  color: #888;
}
@media (max-width: 600px) {
  .pedidos-header {
    font-size: 1rem;
    padding: 8px 0 4px 0;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    gap: 8px;
  }
  .seta-icon {
    width: 26px;
    height: 26px;
  }
  .logo {
    width: 40px;
    padding: 1px;
  }
  .pedidos-header h1 {
    font-size: 1rem;
  }
  .lista-pedidos {
    max-width: 98vw;
    padding: 0 2vw;
    margin: 18px auto 18px auto; /* Espaço menor em telas pequenas */
  }
  .pedido-card {
    padding: 14px 6px 10px 10px;
  }
}
</style>
