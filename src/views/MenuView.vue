<script setup>
import PizzaCard from '@/components/PizzaCard.vue';
import { ref } from 'vue';

const pizzas = ref([
  // Exemplo de dados, substitua com seus dados reais
  // { name: 'Pepperoni', description: 'Clássica pizza de pepperoni', price: 'R$ 35,00', image: 'url_to_image_pepperoni.jpg' },
  // { name: 'Margherita', description: 'Molho de tomate, mussarela e manjericão', price: 'R$ 30,00', image: 'url_to_image_margherita.jpg' }
]);
</script>
<template>
  <div class="menu">
    <header>
      <img src="@/assets/imagens/logo.png" alt="Santory Logo" class="logo" />
      <nav>
        <a href="#">Pizza</a>
        <a href="#">Combos</a>
        <a href="#">Bebidas</a>
      </nav>
    </header>

    <section class="pizza-list">
      <PizzaCard v-for="pizza in pizzas" :key="pizza.name" :pizza="pizza" />
    </section>
  </div>
</template>

