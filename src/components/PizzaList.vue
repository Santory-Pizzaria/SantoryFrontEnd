<template>
  <div class="container">
    <header class="header">
    </header>
    <div class="Logo">
    <img src="/src/assets/imagens/logo.png" alt="Santory Logo" class="logo" />
  </div>
  <div class =header>
  <nav>
        <a href="#">Pizza</a>
        <a href="#">Combos</a>
        <a href="#">Bebidas</a>
      </nav>
    </div>
    <section class="pizza-list">
      <PizzaCard v-for="pizza in pizzas" :key="pizza.name" :pizza="pizza" />
    </section>
  </div>
</template>

<script setup>
import PizzaCard from './PizzaCard.vue';

const pizzas = [
  { name: 'Pizza Família', description: '50cm, 20 fatias, 4 sabores', price: 14.00, image: '/src/assets/imagens/fundo.png' },
  { name: 'Pizza Grande', description: '45cm, 16 fatias, 4 sabores', price: 19.00, image: '/src/assets/imagens/fundo.png' },
  { name: 'Pizza Média', description: '30cm, 8 fatias, 2 sabores', price: 10.00, image: '/src/assets/imagens/fundo.png' },
  { name: 'Pizza Pequena', description: '25cm, 6 fatias, 1 sabor', price: 19.00, image: '/src/assets/imagens/fundo.png' }
];
</script>
<style scoped>

.header {
  background-color: #ff9800;
  padding: 16px 24px;


}

body {
  font-family: 'Segoe UI', sans-serif;
  margin: 0;
  background-color: #f5f6f7;
  color: #333;
}


header {
  background-color: #ff9800;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  height:  35px;
}

.logo {
  height: 160px;

}

.Logo {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  align-items: center;
  display: flex;
  justify-content: center;
}

.pizza-list {
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.pizza-card {
  background-color: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 16px;
  transition: box-shadow 0.3s;
}

.pizza-card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.pizza-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  background-color: #eee;
}

.pizza-info {
  margin-left: 16px;
  flex: 1;
}

.pizza-info h3 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.pizza-info p {
  margin: 4px 0;
  font-size: 14px;
  color: #555;
}

.price {
  color: #43a047;
  font-weight: bold;
}


@media (max-width: 768px) {
  header {
    flex-direction: column;
    text-align: center;
  }

  .logo {
    height: 48px;
    margin-bottom: 16px;
  }

  nav a {
    font-size: 14px;
    margin: 0 5px;
  }

  .pizza-list {
    padding: 16px;
    grid-template-columns: 1fr;
  }

  .pizza-card {
    flex-direction: column;
    text-align: center;
  }

  .pizza-image {
    margin-bottom: 16px;
  }

  .pizza-info {
    margin-left: 0;
  }
}
</style>
