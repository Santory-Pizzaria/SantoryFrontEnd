<script setup>
const carouselImages = [
  '/src/assets/imagens/fundo.png',
  '/src/assets/imagens/Sabores.png',
  '/src/assets/imagens/SaboresOpc.png',
  '/src/assets/imagens/Borda.png',
]

import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();

// Dados do usuário logado
const usuario = ref({
  nome: '',
  avatar: ''
});

// Carregar dados do usuário logado
onMounted(() => {
  carregarDadosUsuario();
});

function carregarDadosUsuario() {
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  if (usuarioLogado) {
    try {
      const dadosUsuario = JSON.parse(usuarioLogado);
      usuario.value = {
        nome: dadosUsuario.nome || '',
        avatar: dadosUsuario.avatar || ''
      };
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  }
}


const currentImage = ref(0);

function nextImage() {
  currentImage.value = (currentImage.value + 1) % carouselImages.length;
}

setInterval(nextImage, 3500);

function goToTempoEntrega() {
  router.push({ name: 'TempoEntrega' });
}
function goToCardapioTela() {
  router.push({ name: 'CardapioTela' });
}
function goToFeedBack() {
  router.push({ name: 'FeedBack' });
}
function goToPizzaCard() {
  router.push({ name: 'PizzaCard' });
}
function goToReserva() {
  router.push('/reserva');
}
</script>
<template>
  <div class="italia-bg">
    <!-- Pizza List -->
    <section class="pizza-grid">
      <div v-for="pizza in pizzas" :key="pizza.name" class="pizza-item">
        <img :src="pizza.image" :alt="pizza.name" />
        <div class="pizza-info">
          <h3>{{ pizza.name }}</h3>
          <p>{{ pizza.description }}</p>
          <p>Price: ${{ pizza.price.toFixed(2) }}</p>
        </div>
      </div>
    </section>
    <!-- Header -->
    <header class="italia-header">
      <img src="/src/assets/imagens/logo.png" alt="Logo Itália" class="italia-logo" />
      <nav class="italia-nav">
        <a href="#" class="italia-nav-link active">HOME</a>
        <span class="italia-sep">|</span>
        <a href="#" class="italia-nav-link">RESERVAS</a>
        <span class="italia-sep">|</span>
        <a href="#" class="italia-nav-link" @click.prevent="goToCardapioTela">CARDAPIO</a>
        <span class="italia-sep">|</span>
        <a href="#" class="italia-nav-link" @click.prevent="goToTempoEntrega">TAXA E TEMPO DE ENTREGA</a>
        <span class="italia-sep">|</span>
        <a href="#" class="italia-nav-link" @click.prevent="goToFeedBack">FEEDBACKS</a>
      </nav>
      <button class="italia-delivery-btn" @click.prevent="goToPizzaCard">
        PEÇA NO DELIVERY
        <svg xmlns="http://www.w3.org/2000/svg" class="italia-bag" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14l-1.68 9.39A2 2 0 0115.35 19H8.65a2 2 0 01-1.97-1.61L5 8zm2-3a3 3 0 016 0" /></svg>
      </button>
    </header>
    <!-- Hero -->
    <section class="italia-hero">
      <div class="italia-hero-content">
        <h1 class="italia-hero-title">BEM VINDOS</h1>
        <hr class="italia-hero-line" />
        <p class="italia-hero-sub">O sabor da Itália em Joinville</p>
        <button class="italia-reserva-btn" @click="goToReserva">
          FAÇA SUA RESERVA
          <svg xmlns="http://www.w3.org/2000/svg" class="italia-clock" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>

<!--
  <div class="container-tudo">
    <header class="header-logo">
      <div class="perfil-icone" @click="navigateTo('/perfil')">
        <img :src="usuario.avatar || defaultAvatar" alt="Perfil" class="avatar-perfil" />
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
-->

      </div>
    </section>
    <!-- Ícone WhatsApp fixo -->
    <a href="https://wa.me/SEUNUMERO" target="_blank" class="whatsapp-float" aria-label="WhatsApp">
      <img src="/src/assets/imagens/whatsapp.png" alt="WhatsApp" class="whatsapp-icon" />
    </a>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Playfair+Display:wght@700&display=swap');

.italia-bg {
  min-height: 100vh;
  background: url('/src/assets/imagens/fundo.png') center center/cover no-repeat;
  position: relative;
  width: 100%;
  overflow-x: hidden;
}
body {
  overflow-x: hidden;
}
.italia-header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 40px 0 40px;
  background: transparent;
  font-family: 'Playfair Display', serif;
  box-sizing: border-box;
}
.italia-logo {
  height: 90px;
  width: auto;
  margin-right: 24px;
  background: none;
  border-radius: 0;
  box-shadow: none;
}
.italia-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 1.08rem;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 1px;
}
.italia-nav-link {
  color: #fff;
  text-decoration: none;
  padding: 0 8px;
  transition: color 0.2s;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 1.08rem;
}
.italia-nav-link.active,
.italia-nav-link:hover {
  color: #ffb347;
}

.italia-sep {
  color: #fff;
  opacity: 0.7;
  font-size: 1.1rem;
  margin: 0 6px;
  user-select: none;
}
.italia-delivery-btn {
  border: 1.5px solid #fff;
  background: transparent;
  color: #fff;
  padding: 7px 22px 7px 22px;
  border-radius: 0;
  font-size: 1rem;
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s, color 0.2s;
  box-shadow: none;
}


.nav-items .nav-icon {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}

header {
  background: linear-gradient(90deg, #B90020 0%, #B90020 100%);
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
.italia-delivery-btn:hover {
  background: #fff;
  color: #232323;
}
.italia-bag {
  margin-left: 2px;
  stroke: currentColor;
}

.italia-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
}


body {
  font-family: 'Segoe UI', sans-serif;
  margin: 0;
  background-color: #f5f6f7;
  color: #333;
}



.logo {
  height: 160px;

}

.Logo {
  display: flex;

  justify-content: center;
  position: relative;
  padding-top: 120px;
}
.italia-hero-content {
  text-align: center;
  color: #fff;
  z-index: 2;
  width: 100vw;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.italia-hero-title {
  font-family: 'Playfair Display', serif;
  font-size: 3.2rem;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
}
.italia-hero-line {
  width: 60%;
  margin: 0.5rem auto 1.2rem auto;
  border: none;
  border-top: 1.5px solid #fff;
  opacity: 0.3;
}
.italia-hero-sub {
  font-family: 'Dancing Script', cursive;
  font-size: 2.3rem;
  font-weight: 700;
  margin-bottom: 2.2rem;
  color: #fff;
}
.italia-reserva-btn {
  background: #fff;
  color: #232323;
  border: none;
  border-radius: 0;
  padding: 12px 38px;
  font-size: 1.1rem;
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: none;
  transition: background 0.2s, color 0.2s;
  margin: 0 auto;
}
.italia-reserva-btn:hover {
  background: #ffb347;
  color: #fff;
}
.italia-clock {
  margin-left: 2px;
  stroke: currentColor;
}
.whatsapp-float {
  position: fixed;
  left: 24px;
  bottom: 24px;
  z-index: 9999;
  border-radius: 50%;
  box-shadow: 0 2px 8px #0002;
  width: 76px;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.2s, transform 0.2s;
}
.whatsapp-float:hover {
  box-shadow: 0 4px 16px #25d36688;
  transform: scale(1.08);
}
.whatsapp-icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
}
@media (max-width: 900px) {
  .italia-header {
    flex-direction: column;
    gap: 10px;
    padding: 12px 8px 0 8px;
  }
  .italia-logo {
    height: 60px;
  }
  .italia-nav {
    font-size: 0.95rem;
    gap: 2px;
  }
  .italia-hero-title {
    font-size: 2rem;
  }
  .italia-hero-sub {
    font-size: 1.2rem;
  }
  .italia-reserva-btn {
    padding: 8px 18px;
    font-size: 0.95rem;
  }
}
</style>
