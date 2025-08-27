<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const usuarios = ref([])
let interval = null

function carregarUsuarios() {
  usuarios.value = JSON.parse(localStorage.getItem('usuarios') || '[]')
}

onMounted(() => {
  carregarUsuarios()
  interval = setInterval(carregarUsuarios, 3000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>


<template>
  <div class="admin-section">
    <h3>Usuários Registrados</h3>
    <div v-if="!usuarios.length" class="sem-usuarios">Nenhum usuário cadastrado.</div>
    <table v-else class="tabela-usuarios">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Endereço</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.id }}</td>
          <td>{{ usuario.nome }}</td>
          <td>{{ usuario.email }}</td>
          <td>{{ usuario.telefone }}</td>
          <td>{{ usuario.endereco }}</td>
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
.tabela-usuarios {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  overflow: hidden;
}
.tabela-usuarios th, .tabela-usuarios td {
  padding: 0.7rem 1rem;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.tabela-usuarios th {
  background: #f7f7f7;
  color: #222e3a;
  font-weight: 700;
}
.tabela-usuarios tr:last-child td {
  border-bottom: none;
}
.sem-usuarios {
  text-align: center;
  color: #888;
  margin: 2rem 0;
}
</style>
