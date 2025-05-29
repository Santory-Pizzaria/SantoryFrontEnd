<template>

  <div class="container">
    <header class="header-logo">
      <div class="header-status">
        <button class="status-button">Fechado</button>
      </div>
    </header>
    <div class="Logo">
      <img src="/src/assets/imagens/logo.png" alt="Santory Logo" class="logo" />
    </div>
    <div class="header-Button">
      <div class="search-bar">
        <input type="text" placeholder="Pesquisar Combos por Nome ou descrição" />
      </div>
      <div class="nav-items">
        <a href="#" class="nav-item">
          <img src="/src/assets/imagens/ingressos.png" alt="Meus Pedidos" class="nav-icon">
          <span>Meus Pedidos</span>
        </a>
        <a href="#" class="nav-item">
          <img src="/src/assets/imagens/alerta.png" alt="Taxa e Tempo de Entrega" class="nav-icon">
          <span>Taxa e Tempo de Entrega</span>
        </a>
        <a href="#" class="nav-item">
          <img src="/src/assets/imagens/estrela.png" alt="Avaliações" class="nav-icon">
          <span>Avaliações</span>
        </a>
      </div>
    </div>
    <div class=header>
      <nav>
        <a href="#">Pizza</a>
        <a href="#">Combos</a>
        <a href="#">Bebidas</a>
      </nav>

    </div>

    <section class="combo-list">
      <ComboCard v-for="combo in combos" :key="combo.name" :combo="combo" />
    </section>

  </div>
</template>

<script setup>
import ComboCard from './ComboCard.vue';

const combos = [
  { name: 'Combo Família', description: '2 Pizzas Grandes + 1 Refrigerante 2L', price: 49.90, image: '/src/assets/imagens/fundo.png' },
  { name: 'Combo Casal', description: '1 Pizza Média + 1 Refrigerante 1L', price: 29.90, image: '/src/assets/imagens/fundo.png' },
  { name: 'Combo Individual', description: '1 Pizza Pequena + 1 Refrigerante 350ml', price: 19.90, image: '/src/assets/imagens/fundo.png' },
  { name: 'Combo Bebida', description: '1 Pizza Média + 2 Refrigerantes 1L', price: 39.90, image: '/src/assets/imagens/fundo.png' }
];
</script>
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
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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


.combo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 20px;
}

.combo-item {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.combo-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.combo-info {
  padding: 15px;
}

.combo-info h3 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.combo-info p {
  font-size: 14px;
  color: #777;
  margin: 5px 0;
}

.combo-info span {
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
  background-color: #e28f11;
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

.combo-list {
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

}

.combo-card {
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

.combo-card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.combo-image {
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


@media (max-width: 768px) {
  header {
    flex-direction: column;
    text-align: center;
  }

  .logo {
    height: 48px;
    margin-bottom: 16px;
  }

  .combo-list {
    padding: 16px;
    grid-template-columns: 1fr;
  }

  .combo-card {
    flex-direction: column;
    text-align: center;
  }

  .combo-image {
    margin-bottom: 16px;
  }

  .combo-info {
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
