<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const pedidos = ref([])
let interval = null

function carregarPedidos() {
  pedidos.value = JSON.parse(localStorage.getItem('pedidos') || '[]')
}

onMounted(() => {
  carregarPedidos()
  interval = setInterval(carregarPedidos, 5000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})

defineExpose({ carregarPedidos })
</script>

<template>
  <div class="admin-pedidos-lista">
    <h3>Pedidos dos Usuários</h3>
    <div v-if="!pedidos.length" class="sem-pedidos">Nenhum pedido encontrado.</div>
    <table v-else class="tabela-pedidos">
      <thead>
        <tr>
          <th>ID</th>
          <th>Data</th>
          <th>Status</th>
          <th>Itens</th>
          <th>Valor Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pedido in pedidos" :key="pedido.id">
          <td>{{ pedido.id }}</td>
          <td>{{ pedido.data }}</td>
          <td>{{ pedido.status }}</td>
          <td>
            <ul>
              <li v-for="(item, idx) in pedido.itens" :key="idx">
                {{ item.qtd }}x {{ item.nome }} <span v-if="item.detalhes">- {{ item.detalhes }}</span>
              </li>
            </ul>
          </td>
          <td>
            <span v-if="typeof pedido.valor === 'number'">R$ {{ pedido.valor.toFixed(2) }}</span>
            <span v-else-if="pedido.valor">R$ {{ Number(pedido.valor).toFixed(2) }}</span>
            <span v-else>R$ 0,00</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.admin-pedidos-lista {
  width: 100%;
  max-width: 100vw;
  overflow-x: auto;
  padding: 0;
}
.tabela-pedidos {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  overflow: hidden;
  max-width: 100vw;
}
.tabela-pedidos th, .tabela-pedidos td {
  padding: 0.7rem 1rem;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.tabela-pedidos th {
  background: #f7f7f7;
  color: #222e3a;
  font-weight: 700;
}
.tabela-pedidos tr:last-child td {
  border-bottom: none;
}
.sem-pedidos {
  text-align: center;
  color: #888;
  margin: 2rem 0;
}

@media (max-width: 700px) {
  .tabela-pedidos {
    font-size: 0.95rem;
  }
  .admin-pedidos-lista {
    padding: 0;
  }
}
@media (max-width: 500px) {
  .tabela-pedidos {
    font-size: 0.88rem;
  }
  .admin-pedidos-lista {
    padding: 0;
  }
  .tabela-pedidos th, .tabela-pedidos td {
    padding: 0.4rem 0.5rem;
  }
}
</style>
