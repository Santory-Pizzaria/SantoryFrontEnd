<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const qtdCarrinho = ref(0);
const showMiniCart = ref(false);
const carrinho = ref([]);

const rotasSemCarrinho = ['/login', '/Login', '/cadastro', '/reserva', '/CadastroPizzaria', '/admin'];
const mostrarCarrinho = computed(() => {
  return !rotasSemCarrinho.includes(router.currentRoute.value.path.toLowerCase());
});

function openGoogleMaps() {
  window.open('https://maps.app.goo.gl/vFo8n8Xm1pSBPbwY7', '_blank');
};
function oswhats() {
  window.open('https://wa.link/h475ec', '_blank');
}

function goToLogin() {
  router.push('/Login');
}


// Exemplo: recarrega quantidade do carrinho do localStorage
function atualizarQtdCarrinho() {
  const carrinhoStorage = JSON.parse(localStorage.getItem('carrinho') || '[]');
  qtdCarrinho.value = carrinhoStorage.length;
  carrinho.value = carrinhoStorage;
}

function toggleMiniCart() {
  showMiniCart.value = !showMiniCart.value;
  if (showMiniCart.value) atualizarQtdCarrinho();
}

function irParaCarrinho() {
  showMiniCart.value = false;
  router.push('/carrinho');
}

function removerItem(idx) {
  const carrinhoStorage = JSON.parse(localStorage.getItem('carrinho') || '[]');
  if (carrinhoStorage[idx]?.qtd && carrinhoStorage[idx].qtd > 1) {
    carrinhoStorage[idx].qtd--;
  } else {
    carrinhoStorage.splice(idx, 1);
  }
  localStorage.setItem('carrinho', JSON.stringify(carrinhoStorage));
  atualizarQtdCarrinho();
}

function adicionarMais(idx) {
  const carrinhoStorage = JSON.parse(localStorage.getItem('carrinho') || '[]');
  if (!carrinhoStorage[idx].qtd) carrinhoStorage[idx].qtd = 1;
  carrinhoStorage[idx].qtd++;
  localStorage.setItem('carrinho', JSON.stringify(carrinhoStorage));
  atualizarQtdCarrinho();
}

// Atualiza ao montar
atualizarQtdCarrinho()
window.addEventListener('storage', atualizarQtdCarrinho)
</script>

<template>
  <div>
    <header>


    </header>
    <router-view />
    <template v-if="$route.path !== '/' && $route.path !== '/login' && $route.path !== '/cadastro' && $route.path !== '/admin' && $route.path !== '/CadastroPizzaria' && $route.path !== '/Login'">
      <div v-if="mostrarCarrinho" class="carrinho-float" @click="toggleMiniCart">
        <img src="/src/assets/imagens/carrinho.png" alt="Carrinho" class="carrinho-icon" />
        <span v-if="qtdCarrinho > 0" class="carrinho-badge">{{ qtdCarrinho }}</span>
      </div>
      <transition name="mini-cart-fade">
        <div v-if="showMiniCart && mostrarCarrinho" class="mini-cart-modal" @click.self="toggleMiniCart">
          <div class="mini-cart-content">
            <h3>Seu Carrinho</h3>
            <ul v-if="carrinho.length">
              <li v-for="(item, idx) in carrinho" :key="idx" class="mini-cart-item">
                <div class="mini-cart-item-info">
                  <span class="mini-cart-item-nome">{{ item.nome }}</span>
                  <span v-if="item.preco" class="mini-cart-item-preco">{{ item.preco }}</span>
                </div>
                <div class="mini-cart-item-actions">
                  <button class="mini-cart-btn-action" @click.stop="removerItem(idx)">-</button>
                  <span class="mini-cart-item-qtd">{{ item.qtd || 1 }}</span>
                  <button class="mini-cart-btn-action" @click.stop="adicionarMais(idx)">+</button>
                </div>
              </li>
            </ul>
            <p v-else>Carrinho vazio.</p>
            <button class="mini-cart-btn" @click="irParaCarrinho">Ver Carrinho Completo</button>
          </div>
        </div>
      </transition>
    </template>

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

.carrinho-float {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 9999;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px #0002;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  border: 2.5px solid #222;
}
.carrinho-float:hover {
  box-shadow: 0 4px 16px #b33c1a44;
  transform: scale(1.08);
}
.carrinho-icon {
  width: 38px;
  height: 38px;
}
.carrinho-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #b33c1a;
  color: #fff;
  border-radius: 50%;
  font-size: 1rem;
  font-weight: bold;
  padding: 2px 8px;
  min-width: 24px;
  text-align: center;
  box-shadow: 0 2px 8px #b33c1a44;
}

.mini-cart-modal {
  position: fixed;
  right: 24px;
  bottom: 100px;
  z-index: 10000;
  background: rgba(0,0,0,0.18);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.mini-cart-content {
  background: #fff;
  border-radius: 18px 18px 0 0;
  box-shadow: 0 8px 32px #b33c1a33;
  width: 340px;
  max-width: 95vw;
  min-width: 220px;
  padding: 24px 18px 18px 18px;
  margin: 0 24px 24px 0;
  animation: miniCartIn 0.35s cubic-bezier(.4,0,.2,1);
}
@keyframes miniCartIn {
  from { transform: translateY(80px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.mini-cart-fade-enter-active, .mini-cart-fade-leave-active {
  transition: opacity 0.25s;
}
.mini-cart-fade-enter-from, .mini-cart-fade-leave-to {
  opacity: 0;
}
.mini-cart-btn {
  margin-top: 18px;
  width: 100%;
  background: #b33c1a;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1.08rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.mini-cart-btn:hover {
  background: #d72638;
  transform: translateY(-2px) scale(1.04);
}
.mini-cart-content h3 {
  margin-top: 0;
  margin-bottom: 12px;
  color: #b33c1a;
  font-size: 1.2rem;
  text-align: center;
}
.mini-cart-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.mini-cart-content li {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  font-size: 1rem;
}
.mini-cart-content li:last-child {
  border-bottom: none;
}
.mini-cart-content p {
  text-align: center;
  color: #888;
  margin: 18px 0 0 0;
}
.mini-cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  font-size: 1rem;
  flex-wrap: wrap;
}
.mini-cart-item-info {
  display: flex;
  flex-direction: column;
  flex: 1 1 120px;
  min-width: 0;
}
.mini-cart-item-nome {
  font-weight: 600;
  color: #b33c1a;
  word-break: break-word;
}
.mini-cart-item-preco {
  color: #222;
  font-size: 0.98rem;
}
.mini-cart-item-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}
.mini-cart-btn-action {
  background: #eee;
  border: none;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #b33c1a;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mini-cart-btn-action:hover {
  background: #ffd6c2;
}
.mini-cart-item-qtd {
  min-width: 18px;
  text-align: center;
  font-weight: 600;
  color: #333;
}
@media (max-width: 600px) {
  .mini-cart-content {
    width: 98vw;
    min-width: 0;
    padding: 16px 4vw 16px 4vw;
    margin: 0 2vw 12vw 0;
  }
  .mini-cart-item {
    font-size: 0.95rem;
    gap: 4px;
    flex-direction: column;
    align-items: flex-start;
  }
  .mini-cart-item-actions {
    gap: 4px;
  }
  .mini-cart-btn-action {
    width: 24px;
    height: 24px;
    font-size: 1rem;
  }
}
</style>
