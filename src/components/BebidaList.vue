<script setup>
import BebidaCard from './BebidaCard.vue';
import { useRouter } from 'vue-router';
import FooteRor from './FooteRor.vue';
import { ref, computed } from 'vue';

const router = useRouter();

function navigateTo(route) {
  router.push(route);
}

const bebidas = [
  { name: 'Coca-Cola', description: 'Refrigerante 2L', price: 9.90, image: '/src/assets/imagens/fundo.png' },
  { name: 'Guaraná', description: 'Refrigerante 1L', price: 5.90, image: '/src/assets/imagens/fundo.png' },
  { name: 'Suco de Laranja', description: 'Natural 500ml', price: 7.90, image: '/src/assets/imagens/fundo.png' },
  { name: 'Água Mineral', description: 'Sem gás 350ml', price: 2.90, image: '/src/assets/imagens/fundo.png' }
];

const searchText = ref('');

const filteredBebidas = computed(() => {
  if (!searchText.value.trim()) return bebidas;
  const search = searchText.value.toLowerCase();
  return bebidas.filter(bebida =>
    bebida.name.toLowerCase().includes(search) ||
    bebida.description.toLowerCase().includes(search)
  );
});
</script>
<template>

  <div class="container-tudo">
    <header class="header-pizza">
      <div class="header-content">
        <div class="logo-pizza">
          <img src="/src/assets/imagens/logo.png" alt="Santory Logo" class="logo-img" />
          <span class="pizza-title">Santory Pizzaria</span>
        </div>
        <div class="perfil-icone" @click="navigateTo('/perfil')">
          <img src="/src/assets/imagens/perfil.png" alt="Perfil" />
        </div>
      </div>
    </header>
    <div class="Logo">
      <div class="carousel carousel-full">
        <img src="/src/assets/imagens/fundo.png" class="carousel-img carousel-img-full" alt="Bebida Carrossel" />
      </div>
    </div>
    <div class="header-Button">
      <div class="search-bar">
        <input type="text" placeholder="Pesquisar Bebidas por Nome ou descrição" v-model="searchText" />
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

    <section class="bebida-list">
      <BebidaCard v-for="bebida in filteredBebidas" :key="bebida.name" :bebida="bebida" />
    </section>
    <FooteRor></FooteRor>

  </div>
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

.header-pizza {
  background: linear-gradient(90deg, #ffb347 0%, #ffcc80 100%);
  box-shadow: 0 4px 16px rgba(255, 152, 0, 0.12);
  border-bottom: 4px solid #e74c3c;
  padding-bottom: 0;
  position: relative;
}
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 32px 0 32px;
}
.logo-pizza {
  display: flex;
  align-items: center;
  gap: 18px;
}
.logo-img {
  height: 70px;
  border-radius: 50%;
  border: 3px solid #e74c3c;
  background: #fffbe6;
  box-shadow: 0 2px 8px rgba(255, 152, 0, 0.15);
}
.pizza-title {
  font-family: 'Pacifico', cursive, Arial, sans-serif;
  font-size: 2.2rem;
  color: #e74c3c;
  letter-spacing: 2px;
  text-shadow: 1px 2px 0 #fffbe6, 0 2px 8px #ffb34744;
}
.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 10px;
  max-width: 480px;
  position: relative;
}
.carousel-img {
  width: 420px;
  height: 120px;
  object-fit: cover;
  border-radius: 18px;
  border: 2px solid #e74c3c;
  box-shadow: 0 2px 12px #ffb34733;
  background: #fffbe6;
}
.carousel-large {
  max-width: 100%;
  width: 100%;
  justify-content: center;
  margin-top: 0;
}
.carousel-img-large {
  width: 100%;
  max-width: 900px;
  height: 260px;
  object-fit: cover;
  border-radius: 24px;
  border: 3px solid #e74c3c;
  box-shadow: 0 4px 24px #ffb34733;
  background: #fffbe6;
  display: block;
  margin: 0 auto;
}
.carousel-btn {
  background: #e74c3c;
  color: #fffbe6;
  border: none;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  font-size: 1.5rem;
  cursor: pointer;
  margin: 0 10px;
  box-shadow: 0 2px 8px #e74c3c33;
  transition: background 0.2s;
}
.carousel-btn:hover {
  background: #ff9800;
  color: #fff;
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


.bebida-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 20px;
}

.bebida-item {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bebida-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.bebida-info {
  padding: 15px;
}

.bebida-info h3 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.bebida-info p {
  font-size: 14px;
  color: #777;
  margin: 5px 0;
}

.bebida-info span {
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
  align-items: center;
  width: 100vw;
  max-width: 100%;
  margin-bottom: 20px;
  margin-top: 30px;
  margin-bottom: 50px;
  padding: 0;
  position: relative;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
}
.carousel-full {
  width: 100vw;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.carousel-img-full {
  width: 70%;
  height: 300px;
  object-fit: cover;
  border-radius: 32px;
  border: 4px solid #e74c3c;
  box-shadow: 0 8px 32px #ffb34733;
  background: #fffbe6;
  display: block;
}
@media (max-width: 900px) {
  .carousel-img-full {
    height: 200px;
    border-radius: 18px;
  }
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

.bebida-list {
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

}

.bebida-card {
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

.bebida-card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.bebida-image {
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

.bebida-link {
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
  .header-content {
    flex-direction: column;
    gap: 10px;
    padding: 10px 8px 0 8px;
  }
  .logo-img {
    height: 48px;
  }
  .pizza-title {
    font-size: 1.3rem;
  }
  .carousel-img {
    width: 95vw;
    height: 80px;
  }

  header {
    flex-direction: column;
    text-align: center;
  }

  .logo {
    height: 48px;
    margin-bottom: 16px;
  }

  .bebida-list {
    padding: 16px;
    grid-template-columns: 1fr;
    text-decoration: none;

  }

  .bebida-card {
    flex-direction: column;
    text-align: center;
  }

  .bebida-image {
    margin-bottom: 16px;
  }

  .bebida-info {
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
