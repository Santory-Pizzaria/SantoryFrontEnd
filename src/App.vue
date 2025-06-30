<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function openGoogleMaps() {
  window.open('https://maps.app.goo.gl/vFo8n8Xm1pSBPbwY7', '_blank');
};
function oswhats() {
  window.open('https://wa.link/h475ec', '_blank');
}

function goToLogin() {
  router.push('/Login');
}
</script>

<template>
  <header>


  </header>
  <router-view />


  <div v-if="$route.path === '/'" class="background">
    <div class="overlay">
      <div class="container">
        <img src="@/assets/imagens/logo.png" alt="Santory Pizzaria" class="logo" />
        <h1 class="slogan">O Melhor Pedaço Do Seu Dia!</h1>
        <div class="buttons">
          <button class="btn orange" @click="goToLogin">🍕 Ver Cardápio e Pedir!</button>
          <button class="btn dark" @click="openGoogleMaps">📍 Como Chegar</button>
          <button class="btn green" @click="oswhats">💬 Whatsapp</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (max-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }



  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.background {
  background-image: url('@/assets/imagens/fundo.png');
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  position: relative;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  text-align: center;
  color: white;
  padding: 2rem;
  border-radius: 10px;
}

.logo {
  width: 160px;
  margin-bottom: 1rem;
}

.slogan {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.btn.orange {
  background-color: #f59e0b;
  color: white;
}

.btn.orange:hover {
  background-color: #d97706;
}

.btn.dark {
  background-color: #1f2937;
  color: white;
}

.btn.dark:hover {
  background-color: #374151;
}

.btn.green {
  background-color: #10b981;
  color: white;
}

.btn.green:hover {
  background-color: #059669;
}
</style>
