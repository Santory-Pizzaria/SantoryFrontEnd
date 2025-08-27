<script setup>
import { ref, onMounted } from 'vue'
import FooteRor from '@/components/FooteRor.vue'

const pedidos = ref([])

function carregarPedidos() {
  pedidos.value = JSON.parse(localStorage.getItem('pedidos') || '[]')
}

onMounted(() => {
  carregarPedidos()
})

// Permite atualização automática pelo AdminDashboard
defineExpose({ carregarPedidos })
</script>

<template>
  <div class="pedidos-timeline-container">
    <!-- Seta fixa no topo esquerdo -->
    <button class="back-btn" @click="$router.push('/menu')" aria-label="Voltar ao menu">
      <img src="/src/assets/imagens/seta-preta.png" alt="Voltar ao menu" class="seta-icon" />
    </button>
    <header class="pedidos-header novo-header">
      <div class="header-center">
        <img src="/src/assets/imagens/logo.png" alt="Logo" class="logo" />
        <h1>Meus Pedidos</h1>
      </div>
    </header>
    <div v-if="pedidos.length === 0" class="sem-pedidos">
      Você ainda não fez nenhum pedido.
    </div>
    <div v-else class="timeline">
      <div v-for="pedido in pedidos" :key="pedido.id" class="timeline-item">
        <div class="timeline-dot" :class="pedido.status.toLowerCase().replace(' ', '-')"></div>
        <div class="timeline-content">
          <div class="pedido-top">
            <span class="pedido-id">#{{ pedido.id }}</span>
            <span class="pedido-data">{{ pedido.data }}</span>
            <span class="status-pill" :class="pedido.status.toLowerCase().replace(' ', '-')">{{ pedido.status }}</span>
          </div>
          <div class="pedido-itens novo-itens">
            <b>Itens:</b>
            <ul>
              <li v-for="(item, idx) in pedido.itens" :key="idx">
                {{ item.qtd }}x {{ item.nome }} <span v-if="item.detalhes">- {{ item.detalhes }}</span>
              </li>
            </ul>
          </div>
          <div class="pedido-valor novo-valor">
            <b>Total:</b>
            <span v-if="typeof pedido.valor === 'number'">R$ {{ pedido.valor.toFixed(2) }}</span>
            <span v-else-if="pedido.valor">R$ {{ Number(pedido.valor).toFixed(2) }}</span>
            <span v-else>R$ 0,00</span>
          </div>
        </div>
      </div>
    </div>
    <FooteRor />
  </div>
</template>

<style scoped>
.pedidos-timeline-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f7f6f3;
}
.novo-header {
  background: #fff;
  color: #ff9800;
  box-shadow: 0 2px 12px #0001;
  border-bottom: 2px solid #ff9800;
  display: flex;
  align-items: center;
  min-height: 64px;
  justify-content: center;
  position: relative;
}
.back-btn {
  position: fixed;
  top: 18px;
  left: 18px;
  z-index: 9999;
  background: #fff;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 8px #0002;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
}
.seta-icon {
  width: 26px;
  height: 26px;
  object-fit: contain;
}
.header-center {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}
.logo {
  width: 44px;
  height: 44px;
  object-fit: contain;
}
.novo-header h1 {
  font-size: 1.6rem;
  margin: 0;
  font-weight: bold;
  color: #ff9800;
}
.timeline {
  position: relative;
  margin: 40px auto 40px auto;
  max-width: 600px;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  gap: 36px;
}
.timeline:before {
  content: '';
  position: absolute;
  left: 16px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, #ff9800 0%, #ffb86c 100%);
  border-radius: 2px;
}
.timeline-item {
  display: flex;
  align-items: flex-start;
  position: relative;
}
.timeline-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  border: 4px solid #ff9800;
  margin-right: 18px;
  margin-top: 8px;
  box-shadow: 0 2px 8px #0002;
  z-index: 2;
  transition: background 0.2s;
}
.timeline-dot.entregue {
  background: #388e3c;
  border-color: #388e3c;
}
.timeline-dot.em-andamento {
  background: #ff9800;
  border-color: #ff9800;
}
.timeline-content {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 16px #0001;
  padding: 22px 28px 16px 22px;
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-left: 6px solid #ff9800;
}
.pedido-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 6px;
}
.pedido-id {
  font-size: 1.1rem;
  font-weight: bold;
  color: #ff9800;
}
.pedido-data {
  font-size: 1rem;
  color: #888;
  font-weight: 500;
}
.status-pill {
  padding: 4px 16px;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  box-shadow: 0 2px 8px #0001;
  letter-spacing: 0.5px;
}
.status-pill.entregue {
  background: #388e3c;
}
.status-pill.em-andamento {
  background: #ff9800;
}
.novo-itens {
  margin: 8px 0 0 0;
  font-size: 1.02rem;
}
.novo-itens ul {
  margin: 0;
  padding-left: 18px;
}
.novo-valor {
  margin-top: 8px;
  font-size: 1.13rem;
  color: #388e3c;
  font-weight: bold;
  text-align: right;
}
.sem-pedidos {
  text-align: center;
  margin: 60px 0 0 0;
  font-size: 1.2rem;
  color: #888;
}
@media (max-width: 600px) {
  .timeline {
    max-width: 99vw;
    padding-left: 12px;
    gap: 22px;
  }
  .timeline-content {
    padding: 12px 8px 10px 10px;
  }
  .pedido-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
  .novo-header {
    padding-left: 54px;
  }
  .back-btn {
    top: 8px;
    left: 8px;
    width: 36px;
    height: 36px;
  }
  .seta-icon {
    width: 20px;
    height: 20px;
  }
  .logo {
    width: 32px;
    height: 32px;
  }
  .novo-valor {
    font-size: 1rem;
  }
}
</style>
