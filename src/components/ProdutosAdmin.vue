<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const produtos = ref([])
let interval = null

function carregarProdutos() {
  produtos.value = JSON.parse(localStorage.getItem('estoque') || '[]')
}

onMounted(() => {
  carregarProdutos()
  interval = setInterval(carregarProdutos, 3000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>


<template>
  <div class="admin-section">
    <h3>Produtos em Estoque</h3>
    <div v-if="!produtos.length" class="sem-produtos">Nenhum produto cadastrado.</div>
    <table v-else class="tabela-produtos">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Categoria</th>
          <th>Quantidade</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(produto, idx) in produtos" :key="idx">
          <td>{{ produto.nome }}</td>
          <td>{{ produto.categoria }}</td>
          <td>{{ produto.quantidade }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.admin-section {
  padding: 2rem 1rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.tabela-produtos {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  overflow: hidden;
}
.tabela-produtos th, .tabela-produtos td {
  padding: 0.7rem 1rem;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.tabela-produtos th {
  background: #f7f7f7;
  color: #222e3a;
  font-weight: 700;
}
.tabela-produtos tr:last-child td {
  border-bottom: none;
}
.sem-produtos {
  text-align: center;
  color: #888;
  margin: 2rem 0;
}

@media (max-width: 900px) {
  .tabela-produtos {
    font-size: 0.95rem;
    min-width: 400px;
  }
  .admin-section {
    padding: 1rem 0.5rem;
  }
}
@media (max-width: 600px) {
  .tabela-produtos {
    font-size: 0.88rem;
    min-width: 320px;
  }
  .admin-section {
    padding: 0.5rem 0.1rem;
  }
  .tabela-produtos th, .tabela-produtos td {
    padding: 0.4rem 0.5rem;
  }
}
</style>
