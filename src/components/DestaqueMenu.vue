<template>
  <div class="destaque-menu dark">
    <div class="banner-carousel">
      <img :src="banners[bannerAtual].src" :alt="banners[bannerAtual].alt" class="banner-img" />
      <div class="carousel-dots">
        <span v-for="(b, idx) in banners" :key="idx" :class="['dot', { ativo: idx === bannerAtual }]" @click="setBanner(idx)"></span>
      </div>
    </div>
    <div class="destaque-header">
      <div class="destaque-texto">
        <h2>Conheça a Tradição Santory</h2>
        <p>
          Mais de 20 anos trazendo o melhor da pizza artesanal para você e sua família!<br>
          Ingredientes selecionados, massas frescas e um ambiente acolhedor.<br>
          Venha viver essa experiência!
        </p>
        <div class="destaque-diferenciais">
          <div class="diferencial">
            <img src="/src/assets/imagens/Borda.png" alt="Borda Recheada" />
            <span>Borda recheada exclusiva</span>
          </div>
          <div class="diferencial">
            <img src="/src/assets/imagens/estrela.png" alt="Receitas premiadas" />
            <span>Receitas premiadas</span>
          </div>
          <div class="diferencial">
            <img src="/src/assets/imagens/whatsapp.png" alt="Atendimento rápido" />
            <span>Atendimento rápido</span>
          </div>
          <div class="diferencial">
            <img src="/src/assets/imagens/Verificar.png" alt="Qualidade garantida" />
            <span>Qualidade garantida</span>
          </div>
        </div>
        <ul>
          <li>🍕 Pizzas artesanais com borda recheada</li>
          <li>🍝 Massas frescas e molhos exclusivos</li>
          <li>🍹 Bebidas especiais e sobremesas deliciosas</li>
          <li>🎉 Espaço para festas e eventos</li>
          <li>🎁 Promoções toda semana</li>
          <li>⏰ Funcionamento: 18h às 23h (todos os dias)</li>
        </ul>
        <div class="destaque-info-extra">
          <span>Delivery e atendimento presencial todos os dias!</span>
        </div>
        <div class="destaque-links">
          <a href="/Cardapio" class="link-btn">Ver Cardápio</a>
          <a href="/reserva" class="link-btn">Reservar Mesa</a>
          <a href="https://wa.link/h475ec" target="_blank" class="link-btn">Whatsapp</a>
        </div>
      </div>
      <div class="destaque-imgs">
        <img src="/src/assets/imagens/carrosel1.png" alt="Ambiente Santory" />
        <img src="/src/assets/imagens/carrosel2.png" alt="Pizza Artesanal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const banners = [
  { src: '/src/assets/imagens/carrosel1.png', alt: 'Ambiente aconchegante' },
  { src: '/src/assets/imagens/carrosel2.png', alt: 'Pizza artesanal' },
  { src: '/src/assets/imagens/ComboExjpg.jpg', alt: 'Combo promocional' },
  { src: '/src/assets/imagens/Sabores.png', alt: 'Sabores variados' }
]
const bannerAtual = ref(0)
function nextBanner() {
  bannerAtual.value = (bannerAtual.value + 1) % banners.length
}
function setBanner(idx) {
  bannerAtual.value = idx
}
onMounted(() => {
  setInterval(nextBanner, 4000)
})
</script>

<style scoped>
.destaque-menu.dark {
  background: linear-gradient(120deg, #232323 70%, #b33c1a 100%);
  color: #fffbe6;
  border-radius: 18px;
  box-shadow: 0 2px 18px #b33c1a33;
  padding: 2.5rem 2rem;
  margin: 2rem auto;
  max-width: 1100px;
  text-align: center;
  border-top: 6px solid #b33c1a;
}
.banner-carousel {
  position: relative;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto 2.2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #232323;
  border-radius: 24px;
  box-shadow: 0 2px 12px #b33c1a11;
  min-height: 320px;
  min-width: 100%;
}
.banner-img {
  width: 100%;
  max-width: 1080px;
  height: 320px;
  object-fit: cover;
  border-radius: 22px;
  box-shadow: 0 2px 8px #b33c1a22;
}
.carousel-dots {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
}
.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fffbe655;
  cursor: pointer;
  transition: background 0.2s;
}
.dot.ativo { background: #b33c1a; }
.destaque-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}
.destaque-texto {
  flex: 2;
  min-width: 270px;
  text-align: left;
}
.destaque-menu.dark h2 {
  color: #ffe5b4;
  font-family: 'Playfair Display', serif;
  margin-bottom: 1rem;
  font-size: 2.1rem;
}
.destaque-menu.dark p {
  color: #fffbe6;
  font-size: 1.15rem;
  margin-bottom: 1.2rem;
}
.destaque-diferenciais {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1.2rem;
  flex-wrap: wrap;
}
.diferencial {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.98rem;
  color: #ffe5b4;
  background: #232323;
  border-radius: 10px;
  padding: 0.5rem 0.7rem;
  box-shadow: 0 1px 4px #b33c1a11;
  min-width: 90px;
  border: 1.5px solid #b33c1a;
}
.diferencial img {
  width: 32px;
  margin-bottom: 0.3rem;
}
.destaque-menu.dark ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1.2rem;
}
.destaque-menu.dark li {
  color: #fffbe6;
  font-size: 1.05rem;
  margin-bottom: 0.4rem;
}
.destaque-info-extra {
  margin-bottom: 1.2rem;
  color: #b3e59f;
  font-weight: 500;
  font-size: 1.08rem;
}
.destaque-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.2rem;
  flex-wrap: wrap;
}
.link-btn {
  background: #b33c1a;
  color: #fffbe6;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s;
  margin-bottom: 0.2rem;
}
.link-btn:hover {
  background: #ffe5b4;
  color: #b33c1a;
}
.destaque-imgs {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
  min-width: 160px;
}
.destaque-imgs img {
  width: 170px;
  border-radius: 14px;
  box-shadow: 0 2px 8px #b33c1a22;
}
@media (max-width: 900px) {
  .destaque-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }
  .destaque-imgs img {
    width: 120px;
  }
  .banner-img {
    height: 180px;
    max-width: 98vw;
  }
  .banner-carousel {
    min-height: 180px;
    border-radius: 16px;
  }
}
@media (max-width: 700px) {
  .destaque-menu.dark {
    padding: 1rem 0.3rem;
    margin: 1rem 0.2rem;
    font-size: 0.98rem;
  }
  .destaque-menu.dark h2 {
    font-size: 1.2rem;
  }
  .destaque-menu.dark p {
    font-size: 1rem;
  }
  .destaque-diferenciais {
    gap: 0.5rem;
  }
  .destaque-imgs img {
    width: 90px;
    min-width: 60px;
  }
  .destaque-menu.dark ul {
    font-size: 0.98rem;
  }
  .banner-img {
    height: 110px;
    border-radius: 10px;
  }
  .banner-carousel {
    min-height: 110px;
    border-radius: 10px;
  }
}
@media (max-width: 400px) {
  .destaque-menu.dark {
    padding: 0.5rem 0.1rem;
    font-size: 0.93rem;
  }
  .destaque-imgs img {
    width: 60px;
  }
  .banner-img {
    height: 60px;
  }
  .banner-carousel {
    min-height: 60px;
  }
}
</style>
