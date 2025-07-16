<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const carouselImages = [
  '/src/assets/imagens/fundo.png',
  '/src/assets/imagens/Sabores.png',
  '/src/assets/imagens/SaboresOpc.png',
  '/src/assets/imagens/Borda.png',
];
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
</script>
<template>
  <div class="italia-bg">
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
      <button class="italia-delivery-btn">
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
        <button class="italia-reserva-btn">
          FAÇA SUA RESERVA
          <svg xmlns="http://www.w3.org/2000/svg" class="italia-clock" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
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
  padding: 24px 40px 0 40px;
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
