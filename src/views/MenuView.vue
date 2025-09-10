<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PizzaList from '@/components/PizzaList.vue';


const router = useRouter()

onMounted(() => {
  // Verificar se usuário está logado
  const usuarioLogado = localStorage.getItem('usuarioLogado')
  const token = localStorage.getItem('access')

  if (!usuarioLogado || !token) {
    // Se não estiver logado, redirecionar para login
    router.push('/login')
  }
})





</script>
<template>
  <div class="menu">
    <PizzaList></PizzaList>
  </div>

</template>
