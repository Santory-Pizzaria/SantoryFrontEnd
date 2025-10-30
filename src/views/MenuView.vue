<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PizzaList from '@/components/PizzaList.vue';
import DestaqueMenu from '@/components/DestaqueMenu.vue';
import Footer from '@/components/FooteRor.vue';

const router = useRouter()

onMounted(() => {
  // Verificar se usuário está logado
  const usuarioLogado = localStorage.getItem('usuarioLogado')
  const token = localStorage.getItem('token')

  if (!usuarioLogado || !token) {
    // Se não estiver logado, redirecionar para login
    router.push('/login')
  }
})

</script>
<template>
  <div class="menu">
    <PizzaList />
    <DestaqueMenu />
    <Footer />
  </div>

</template>
