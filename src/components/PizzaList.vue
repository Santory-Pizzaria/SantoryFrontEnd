
 
<script setup>
  

import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { onUnmounted } from 'vue';


const router = useRouter();
const userStore = useUserStore();

// Dados do usuário logado
const usuario = ref({
  nome: '',
  avatar: ''
});

// Carregar dados do usuário logado
onMounted(() => {
  usuario.value = {
    nome: userStore.user?.name || '',
    avatar: userStore.user?.avatar || ''
  };
});


function carregarDadosUsuario() {
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  
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



const currentImage = ref(0);

function nextImage() {
  currentImage.value = (currentImage.value + 1) % carouselImages.length;
}

setInterval(nextImage, 3500);

function goToTempoEntrega() {
  router.push({ name: 'TempoEntrega' });
}
// Lista de pizzas
const pizzas = ref([]);
// Corrigindo o uso do onMounted para garantir que está dentro do setup
onMounted(() => {
  carregarPizzas();
});

function goToCardapioTela() {
  router.push({ name: 'CardapioTela' });
}
// Buscar pizzas do backend Django
async function carregarPizzas() {
  try {
    const response = await fetch('http://localhost:8000/api/pizzas/');
    if (!response.ok) throw new Error('Erro ao buscar pizzas');
    const data = await response.json();

    // Verificar se a resposta contém uma propriedade específica
    const pizzasData = Array.isArray(data) ? data : data.results || [];
    pizzas.value = pizzasData.map(pizza => ({
      ...pizza,
      preco: pizza.preco || 0, // Garante que o preço tenha um valor padrão
    }));
  } catch (e) {
    console.error('Erro ao carregar pizzas:', e);
    pizzas.value = []; // Define um array vazio em caso de erro
  }
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
function goToReservaUsuario() {
  router.push('/reservasUsuario');
}

const showMenu = ref(false);
function toggleMenu() {
  showMenu.value = !showMenu.value;
}

const isScrolled = ref(false);

function handleScroll() {
  isScrolled.value = window.scrollY > 30;
}

const isMobile = ref(false);

function handleResize() {
  isMobile.value = window.innerWidth <= 620;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);
  handleResize();
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
});
</script>
<template>
  <div class="italia-bg">
    <!-- Pizza List -->
    <!-- <section class="pizza-grid">
      <div v-for="pizza in pizzas" :key="pizza.id" class="pizza-item">
        <img :src="pizza.image" :alt="pizza.name" />
        <div class="pizza-info">
          <h3>{{ pizza.name }}</h3>
          <p>{{ pizza.description }}</p>
          <p>Price: ${{ pizza.preco ? pizza.preco : '0.00' }}</p>
        </div>
      </div>
    </section> -->
    <!-- Header -->
    <header :class="['italia-header', { 'italia-header-transparente': isScrolled }]">
      <img src="/src/assets/imagens/logo.png" alt="Logo Itália" class="italia-logo-header" />
      <div class="header-user-area-right">
        <button class="usuario-img-bola-btn" @click="router.push('/perfil')" aria-label="Perfil">
          <div class="usuario-img-bola">
            <img :src="usuario.avatar || '/src/assets/imagens/perfil.png'" alt="Foto do usuário" />
          </div>
        </button>
      </div>
      <!-- Ícone hambúrguer e nav -->
      <button class="hamburger" :class="{ active: showMenu }" @click="toggleMenu" aria-label="Abrir menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      <nav class="italia-nav" :class="{ 'show-mobile': showMenu }">
        <a href="#" class="italia-nav-link active">HOME</a>

        <a href="#" class="italia-nav-link" @click.prevent="goToReservaUsuario">RESERVAS</a>
        <a href="#" class="italia-nav-link" @click.prevent="goToCardapioTela">CARDAPIO</a>
        <a href="#" class="italia-nav-link" @click.prevent="goToTempoEntrega">TAXA E TEMPO DE ENTREGA</a>
        <a href="#" class="italia-nav-link" @click.prevent="goToFeedBack">FEEDBACKS</a>
        <button class="italia-perfil-btn" @click="router.push('/perfil')" aria-label="Perfil">
          </button>
      </nav>

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
        <button class="italia-delivery-btn" @click.prevent="goToPizzaCard">
        PEÇA NO DELIVERY
        <svg xmlns="http://www.w3.org/2000/svg" class="italia-bag" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14l-1.68 9.39A2 2 0 0115.35 19H8.65a2 2 0 01-1.97-1.61L5 8zm2-3a3 3 0 016 0" /></svg>
      </button>

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
  transition: background 0.3s, backdrop-filter 0.3s;
  font-family: 'Playfair Display', serif;
  box-sizing: border-box;
  border-bottom: 1.5px solid #fff2;
}
.italia-header.italia-header-transparente {
  background: rgba(34, 34, 34, 0.72); /* fundo fosco meio transparente */
  backdrop-filter: blur(8px);
}
.italia-logo-header {
  height: 60px;
  width: auto;
  margin: 0 18px 0 0;
  background: none;
  border-radius: 0;
  box-shadow: none;
}
@media (max-width: 900px) {
  .italia-logo-header {
    margin: 0 8px 0 0;
  }
}
@media (max-width: 600px) {
  .italia-logo-header {
    margin: 0 4px 0 0 !important;
  }
}
@media (max-width: 900px) {
  .italia-logo {
    margin-top: 40px;
    height: 60px;
  }
}
@media (max-width: 600px) {
  .italia-logo {
    margin-top: 28px !important;
    height: 48px !important;
  }
}
.italia-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  position: relative;
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
@media (max-width: 900px) {
  .italia-nav-link {
    font-size: 0.98rem;
  }
}
@media (max-width: 700px) {
  .italia-nav-link {
    font-size: 0.89rem;
  }
}
@media (max-width: 500px) {
  .italia-nav-link {
    font-size: 0.78rem;
    padding: 0 4px;
  }
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
  background: linear-gradient(90deg, #ffb347 0%, #ffcc80 100%);
  color: #232323;
  border: none;
  border-radius: 16px;
  padding: 16px 44px;
  font-weight: 800;
  font-size: 1.15rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  box-shadow: 0 6px 24px #23232322;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  margin-bottom: 22px;
  letter-spacing: 1px;
}
.italia-delivery-btn:hover {
  background: linear-gradient(90deg, #ff9800 0%, #ffc107 100%);
  color: #fff;
  transform: translateY(-3px) scale(1.06);
  box-shadow: 0 8px 32px #ff980044;
}

.nav-items .nav-icon {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}

header {
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
.italia-reserva-btn, .italia-delivery-btn {
  background: linear-gradient(90deg, #ffb347 0%, #ffcc80 100%);
  color: #232323;
  border: none;
  border-radius: 16px;
  padding: 16px 44px;
  font-weight: 800;
  font-size: 1.15rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  box-shadow: 0 6px 24px #23232322;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  margin-bottom: 22px;
  letter-spacing: 1px;
}
.italia-reserva-btn:hover, .italia-delivery-btn:hover {
  background: linear-gradient(90deg, #ff9800 0%, #ffc107 100%);
  color: #fff;
  transform: translateY(-3px) scale(1.06);
  box-shadow: 0 8px 32px #ff980044;
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
  justify-content: flex-start;
  padding-top: 0;
  position: relative;
  top: -40px;
}
@media (max-width: 900px) {
  .italia-hero-content {
    top: -24px;
    padding-top: 0 !important;
  }
}
@media (max-width: 600px) {
  .italia-hero-content {
    top: -88px;
    padding-top: 0 !important;
  }
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
  background: linear-gradient(90deg, #ffb347 0%, #ffcc80 100%);
  color: #232323;
  border: none;
  border-radius: 16px;
  padding: 16px 44px;
  font-weight: 800;
  font-size: 1.15rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  box-shadow: 0 6px 24px #23232322;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  margin-bottom: 22px;
  letter-spacing: 1px;
}
.italia-reserva-btn:hover {
  background: linear-gradient(90deg, #ff9800 0%, #ffc107 100%);
  color: #fff;
  transform: translateY(-3px) scale(1.06);
  box-shadow: 0 8px 32px #ff980044;
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

/* HAMBURGUER MENU */
.hamburger {
  display: none;
  background: none;
  border: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  cursor: pointer;
  z-index: 1200;
  transition: transform 0.3s cubic-bezier(.4,0,.2,1);
}
.hamburger.active {
  transform: rotate(90deg) scale(1.15);
}
.hamburger .bar {
  width: 26px;
  height: 4px;
  background: #fff;
  margin: 3px 0;
  border-radius: 2px;
  transition: 0.3s;
}
@media (max-width: 620px) {
  .hamburger {
    display: flex;
  }
  .italia-nav {
    display: none;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100vw;
    background: transparent; /* fundo transparente */
    flex-direction: column;
    align-items: flex-start;
    padding: 18px 0 18px 24px;
    z-index: 1100;
    box-shadow: 0 4px 16px #0002;
    opacity: 0;
    transform: translateY(-20px);
    pointer-events: none;
    transition: opacity 0.35s cubic-bezier(.4,0,.2,1), transform 0.35s cubic-bezier(.4,0,.2,1);
  }
  .italia-nav.show-mobile {
    display: flex;
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
    background: rgba(18, 18, 18, 0.72);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .italia-delivery-btn {
    margin-top: 8px;
  }
}
@media (max-width: 900px) {
  .italia-header {
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1200;
  }
  .italia-logo {
    height: 60px;
    margin-top: 12px;
  }
  .italia-nav {
    font-size: 0.95rem;
    gap: 2px;
  }

  .italia-hero-sub {
    font-size: 1.2rem;
  }
  .italia-reserva-btn {
    padding: 8px 18px;
    font-size: 0.95rem;
  }
  .pizza-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin: 12px;
  }
  .pizza-item img {
    height: 120px;
  }
  .adicionar-footer {
    padding: 10px 0 8px 0;
  }
}
@media (max-width: 600px) {
  .italia-header {
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1200;
  }
  .italia-header {
    flex-direction: column;
    gap: 6px;
    padding: 8px 2px 0 2px;
    position: relative;
  }
  .italia-logo {
    height: 90px !important;
    margin-top: 6px;
  }
  .hamburger {
    position: fixed;
    top: 12px;
    right: 12px;
    z-index: 1300;
    display: flex !important;
  }
  .italia-nav {
    font-size: 0.9rem;
    padding: 12px 0 12px 12px;
    gap: 0;
  }
  .italia-hero-content {
    margin-top: 0 !important;
    padding-top: 40px !important;
  }
  .italia-hero-sub {
    font-size: 1rem;
  }
  .pizza-grid {
    grid-template-columns: 1fr;
    gap: 10px;
    margin: 8px;
  }
  .pizza-item img {
    height: 90px;
  }
}
@media (max-width: 601px) {
  .hamburger {
    position: fixed;
    top: 12px;
    left: 12px;
    right: auto;
    z-index: 1300;
    display: flex !important;
  }
  .header-user-area-right {
    position: fixed;
    top: 12px;
    right: 12px;
    left: auto;
    z-index: 1300;
    display: flex;
    align-items: center;
  }
  .usuario-img-bola {
    width: 40px;
    height: 40px;
  }
}
@media (max-width: 600px) {
  .hamburger {
    position: fixed;
    top: 12px;
    left: 12px;
    right: auto;
    z-index: 1300;
    display: flex !important;
  }
  .header-user-area-right {
    position: fixed;
    top: 12px;
    right: 12px;
    left: auto;
    z-index: 1300;
    display: flex;
    align-items: center;
  }
  .usuario-img-bola {
    width: 40px;
    height: 40px;
  }
}
@media (max-width: 601px), (max-width: 600px) {
  .hamburger {
    position: fixed;
    top: 12px;
    left: 12px;
    right: auto;
    z-index: 1300;
    display: flex !important;
  }
  .header-user-area-right {
    position: fixed;
    top: 12px;
    right: 12px;
    left: auto;
    z-index: 1300;
    display: flex;
    align-items: center;
  }
  .usuario-img-bola {
    width: 40px;
    height: 40px;
  }
}
@media (max-width: 620px) {
  .hamburger {
    position: fixed;
    top: 12px;
    left: 12px;
    right: auto;
    z-index: 1300;
    display: flex !important;
  }
  .header-user-area-right {
    position: fixed;
    top: 12px;
    right: 12px;
    left: auto;
    z-index: 1300;
    display: flex;
    align-items: center;
  }
}
@media (max-width: 1000px) {
  .hamburger {
    display: flex;
    position: absolute;
    top: 50%;
    right: 104px; /* 32px margem direita do avatar + 60px avatar + 12px gap */
    transform: translateY(-50%);
    z-index: 1200;
  }
  .italia-nav {
    display: none;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100vw;
    background: transparent;
    flex-direction: column;
    align-items: flex-start;
    padding: 18px 0 18px 24px;
    z-index: 1100;
    box-shadow: 0 4px 16px #0002;
    opacity: 0;
    transform: translateY(-20px);
    pointer-events: none;
    transition: opacity 0.35s cubic-bezier(.4,0,.2,1), transform 0.35s cubic-bezier(.4,0,.2,1);
  }
  .italia-nav.show-mobile {
    display: flex;
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
    background: rgba(18, 18, 18, 0.72);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    min-height: calc(100vh - 60px);
  }
}
@media (max-width: 900px) {
  .hamburger {
    right: 86px; /* 10px margem + 64px avatar + 12px gap */
  }
}
@media (max-width: 1000px) and (min-width: 621px) {
  .italia-nav.show-mobile .italia-nav-link,
  .italia-nav.show-mobile .italia-sep {
    display: block;
    margin: 10px 0;
  }
  .italia-nav.show-mobile .italia-sep { opacity: 0.25; }
}
.italia-reserva-btn, .italia-delivery-btn {
  background: linear-gradient(90deg, #ffb347 0%, #ffcc80 100%);
  color: #232323;
  border: none;
  border-radius: 16px;
  padding: 16px 44px;
  font-weight: 800;
  font-size: 1.15rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  box-shadow: 0 6px 24px #23232322;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  margin-bottom: 22px;
  letter-spacing: 1px;
}
.italia-reserva-btn:hover, .italia-delivery-btn:hover {
  background: linear-gradient(90deg, #ff9800 0%, #ffc107 100%);
  color: #fff;
  transform: translateY(-3px) scale(1.06);
  box-shadow: 0 8px 32px #ff980044;
}
.italia-clock, .italia-bag {
  margin-left: 8px;
}
.italia-perfil-icon {
  width: 52px;
  height: 52px;
}
@media (max-width: 600px) {
  .italia-perfil-icon {
    width: 38px;
    height: 38px;
  }
}
.italia-perfil-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 0;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
}
@media (max-width: 600px) {
  .italia-perfil-icon {
    width: 20px;
    height: 20px;
  }
  .italia-perfil-btn {
    margin-left: 32px;
  }
}
@media (max-width: 600px) {
  .italia-reserva-btn, .italia-delivery-btn {
    width: 100%;
    justify-content: center;
    font-size: 1rem;
    padding: 12px 0;
    margin-bottom: 14px;
  }
  .italia-clock, .italia-bag {
    margin-left: 4px;
  }
}
.header-user-area {
  display: flex;
  align-items: center;
  margin-right: 18px;
}
.usuario-img-bola {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 8px #2222;
  border: 2.5px solid #ff9800;
  background: #fffbe6;
  display: flex;
  align-items: center;
  justify-content: center;
}
.usuario-img-bola img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}
@media (max-width: 900px) {
  .usuario-img-bola {
    width: 64px;
    height: 64px;
  }
}
@media (max-width: 600px) {
  .usuario-img-bola {
    width: 48px;
    height: 48px;
  }
}
@media (max-width: 900px) {
  .italia-header {
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px 8px 0 8px;
  }
  .header-user-area {
    margin-right: 0;
    margin-bottom: 8px;
    justify-content: center;
    width: 100%;
  }
  .usuario-img-bola {
    width: 48px;
    height: 48px;
    margin: 0 auto 4px auto;
  }
}
@media (max-width: 600px) {
  .usuario-img-bola {
    width: 36px;
    height: 36px;
    margin-bottom: 2px;
  }
}
.header-user-area-right {
  position: absolute;
  top: 50%;
  right: 32px;
  transform: translateY(-50%);
  z-index: 200;
  display: flex;
  align-items: center;
}
.usuario-img-bola-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.usuario-img-bola {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 8px #2222;
  border: 2.5px solid #ff9800;
  background: #fffbe6;
  display: flex;
  align-items: center;
  justify-content: center;
}
.usuario-img-bola img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}
@media (max-width: 900px) {
  .header-user-area-right {
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
  .usuario-img-bola {
    width: 64px;
    height: 64px;
  }
}
@media (max-width: 600px) {
  .header-user-area-right {
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
  }
  .usuario-img-bola {
    width: 48px;
    height: 48px;
  }
}
/* Overrides para o menu hambúrguer: apenas a área dos links fica fosca */
@media (max-width: 1000px) {
  .italia-nav {
    /* não ocupar a tela toda */
    left: auto !important;
    right: 12px !important;
    width: auto !important;
    min-width: 240px;
    max-width: 86vw;
    padding: 12px 0 12px 0; /* padding vertical, lateral no show-mobile */
  }
  .italia-nav.show-mobile {
    background: rgba(18, 18, 18, 0.72);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 12px;
    padding: 12px 16px;
    min-height: auto; /* remove full height */
    max-height: 70vh;
    overflow-y: auto;
    box-shadow: 0 8px 24px #0004;
  }
}
@media (max-width: 620px) {
  .italia-nav {
    left: 12px !important;
    right: auto !important;
    transform-origin: top left !important;
    width: auto !important;
    min-width: 220px;
    max-width: 92vw;
    padding: 10px 0 10px 0;
  }
  .italia-nav.show-mobile {
    left: 12px !important;
    right: auto !important;
    transform-origin: top left !important;
    width: auto !important;
    background: rgba(18, 18, 18, 0.72);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 12px;
    padding: 12px 14px;
    min-height: auto;
    max-height: 70vh;
    overflow-y: auto;
    box-shadow: 0 8px 24px #0004;
  }
  /* Espaçamento vertical entre links para melhor leitura no painel */
  .italia-nav.show-mobile .italia-nav-link,
  .italia-nav.show-mobile .italia-sep {
    display: block;
    margin: 8px 0;
  }
  .italia-nav.show-mobile .italia-sep { opacity: 0.25; }
}
/* Ícone hambúrguer vira X ao abrir */
.hamburger.active { transform: none !important; }
.hamburger .bar { transition: transform 280ms cubic-bezier(.2,.8,.2,1), opacity 200ms ease; }
.hamburger.active .bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.active .bar:nth-child(2) { opacity: 0; }
.hamburger.active .bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Animação do painel do menu (apenas quando abre) */
@keyframes italia-pop-slide {
  from { opacity: 0; transform: translateY(-8px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

@media (max-width: 1000px) {
  .italia-nav {
    /* estado fechado (inicial) */
    transform-origin: top right;
    transform: translateY(-8px) scale(0.96);
    opacity: 0;
  }
  .italia-nav.show-mobile {
    animation: italia-pop-slide 280ms cubic-bezier(.2,.8,.2,1);
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
@media (max-width: 620px) {
  .italia-nav {
    transform-origin: top left;
    transform: translateY(-8px) scale(0.96);
    opacity: 0;
  }
  .italia-nav.show-mobile {
    animation: italia-pop-slide 280ms cubic-bezier(.2,.8,.2,1);
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
</style>
