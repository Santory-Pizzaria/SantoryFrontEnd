<template>
  <div class="container">
    <header class="header">
      <img src="/src/assets/imagens/logo.png" alt="Santory Logo" class="logo" />
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

<script setup>
import PizzaCard from './PizzaCard.vue';

const pizzas = [
  { name: 'Pizza Família', description: '50cm, 20 fatias, 4 sabores', price: 14.00, image: '/pizza-familia.jpg' },
  { name: 'Pizza Grande', description: '45cm, 16 fatias, 4 sabores', price: 19.00, image: '/pizza-grande.jpg' },
  { name: 'Pizza Média', description: '30cm, 8 fatias, 2 sabores', price: 10.00, image: '/pizza-media.jpg' },
  { name: 'Pizza Pequena', description: '25cm, 6 fatias, 1 sabor', price: 19.00, image: '/pizza-pequena.jpg' }
];
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  background: #f5f5f5;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  height: 60px;
}
nav a {
  margin-left: 15px;
  color: #c62828;
  text-decoration: none;
  font-weight: bold;
}
</style>
