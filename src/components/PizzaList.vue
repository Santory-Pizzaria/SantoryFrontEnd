<script setup>
import PizzaCard from './PizzaCard.vue';
import { useRouter } from 'vue-router';
import FooteRor from './FooteRor.vue';
import { ref, computed } from 'vue';

const router = useRouter();

function navigateTo(route) {
  router.push(route);
}

const pizzas = [
  { name: 'Pizza Família', description: '50cm, 20 fatias, 4 sabores', price: 14.00, image: '/src/assets/imagens/fundo.png' },
  { name: 'Pizza Grande', description: '45cm, 16 fatias, 4 sabores', price: 19.00, image: '/src/assets/imagens/fundo.png' },
  { name: 'Pizza Média', description: '30cm, 8 fatias, 2 sabores', price: 10.00, image: '/src/assets/imagens/fundo.png' },
  { name: 'Pizza Pequena', description: '25cm, 6 fatias, 1 sabor', price: 19.00, image: '/src/assets/imagens/fundo.png' }
];

const searchText = ref('');

const filteredPizzas = computed(() => {
  if (!searchText.value.trim()) return pizzas;
  const search = searchText.value.toLowerCase();
  return pizzas.filter(pizza =>
    pizza.name.toLowerCase().includes(search) ||
    pizza.description.toLowerCase().includes(search)
  );
});
</script>
<template>

  <div class="container-tudo">
    <header class="header-logo">
      <div class="perfil-icone" @click="navigateTo('/perfil')">
        <img src="/src/assets/imagens/perfil.png" alt="Perfil" />
      </div>
    </header>
    <div class="Logo">
      <img src="/src/assets/imagens/logo.png" alt="Santory Logo" class="logo" />
    </div>
    <div class="header-Button">
      <div class="search-bar">
        <input type="text" placeholder="Pesquisar Produtos por Nome ou descrição" v-model="searchText" />
      </div>
      <div class="nav-items">
        <a href="#" class="nav-item" @click.prevent="navigateTo('/pedidos')">
          <img src="/src/assets/imagens/ingressos.png" alt="Meus Pedidos" class="nav-icon">
          <span>Meus Pedidos</span>
        </a>
        <a href="#" class="nav-item" @click.prevent="navigateTo('/tempo')">
          <img src="/src/assets/imagens/alerta.png" alt="Taxa e Tempo de Entrega" class="nav-icon">
          <span>Taxa e Tempo de Entrega</span>
        </a>
        <a href="#" @click.prevent="navigateTo('/FeedBack')" class="nav-item">
          <img src="/src/assets/imagens/estrela.png" alt="Avaliações" class="nav-icon">
          <span>Avaliações</span>
        </a>
      </div>
    </div>
    <div class=header>
      <nav>
        <ul>
          <li><a href="#" @click.prevent="navigateTo('/pizza')">Pizza</a></li>
          <li><a href="#" @click.prevent="navigateTo('/combo')">Combo</a></li>
          <li><a href="#" @click.prevent="navigateTo('/bebida')">Bebida</a></li>
        </ul>
      </nav>

    </div>

    <section class="pizza-list">
      <router-link
        v-for="pizza in filteredPizzas"
        :key="pizza.name"
        :to="{ name: 'pizza-options', params: { pizzaNome: pizza.name } }"
        class="pizza-link"
      >
        <PizzaCard :pizza="pizza" />
      </router-link>
    </section>


  </div>
  <FooteRor></FooteRor>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.header-Button {
  display: flex;
  align-items: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
}

.header-Button .nav-items {
  display: flex;
  align-items: center;
}

.header-Button .nav-items a {
  display: flex;
  align-items: center;
  color: red;
  text-decoration: none;

}

.header-Button .nav-items span {
  margin-left: 5px;
}

span {
  margin-right: 40px;
}

.nav-items .nav-icon {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}

header {
  background: linear-gradient(90deg, #ff9800 0%, #ffb86c 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  height: 80px;
}

header .logo img {
  height: 40px;
}

header .logo {
  background-color: aqua;
}

nav ul {
  list-style-type: none;
  display: flex;
  gap: 20px;
}


nav a:hover {
  color: #f30;
}

.search-bar input {
  padding: 10px;
  width: 500px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: left;
  margin-right: 20px;
}


.category-tabs {
  text-align: center;
  margin: 20px 0;
}

.category-tabs button {
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
}

.category-tabs button:hover {
  background-color: #f0f0f0;
}


.pizza-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 20px;
}

.pizza-item {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

}

.pizza-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.pizza-info {
  padding: 15px;
  text-decoration: none;
}

.pizza-info h3 {
  font-size: 18px;
  font-weight: bold;
  color: #333;

}

.pizza-info p {
  font-size: 14px;
  color: #777;
  margin: 5px 0;
}

.pizza-info span {
  font-size: 16px;
  font-weight: bold;
  color: #f30;
}

.header {
  box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 16px 24px;

}

body {
  font-family: 'Segoe UI', sans-serif;
  margin: 0;
  background-color: #f5f6f7;
  color: #333;
}


header {
  background: linear-gradient(90deg, #ff9800 0%, #ffb86c 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  height: 80px;
}

.logo {
  height: 160px;

}

.Logo {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 30px;
  margin-bottom: 50px;
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
  color: #000000;
  font-weight: bold;
  font-size: 16px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 5px;
}

.pizza-list {
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

}

.pizza-card {
  background-color: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 16px;
  transition: box-shadow 0.3s;
  height: 130px;
  width: 90%;
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

.status-button {
  background-color: #FFE4E9;
  color: rgb(211, 53, 53);
  border-color: rgb(211, 53, 53);
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  align-items: left;
}

.status-button:hover {
  background-color: rgb(231, 83, 83);
  color: #fff;
}

.header-status {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
}

.pizza-link {
  text-decoration: none;
}

.perfil-icone {
  position: absolute;
  top: 18px;
  right: 24px;
  cursor: pointer;
  z-index: 20;
}

.perfil-icone img {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e74c3c;
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

  .pizza-list {
    padding: 16px;
    grid-template-columns: 1fr;
    text-decoration: none;

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

  .header-status {
    justify-content: center;
    margin-left: 0;
  }

  .status-button {
    width: 100%;
    text-align: center;
  }

  .nav-items {
    flex-direction: column;
    align-items: center;
  }

  .nav-items a {
    margin-bottom: 10px;
  }

  nav {
    flex-direction: column;
    align-items: center;
  }

  nav a {
    margin: 5px 0;
  }

  .search-bar input {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
