<script setup>
import { ref, onMounted, nextTick } from 'vue'

const banners = [
  { src: '/src/assets/imagens/carrosel-1.png', alt: 'Ambiente aconchegante' },
  { src: '/src/assets/imagens/carrosel-2.png', alt: 'Pizza artesanal' },
  { src: '/src/assets/imagens/carrosel-3.png', alt: 'Combo promocional' }
]
const bannerAtual = ref(0)

function nextBanner() {
  bannerAtual.value = (bannerAtual.value + 1) % banners.length
}

function setBanner(idx) {
  bannerAtual.value = idx
}

function animarAoEntrar(selector) {
  nextTick(() => {
    const elementos = document.querySelectorAll(selector)
    const observer = new window.IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('animar-entrada')
          observer.unobserve(entrada.target)
        }
      })
    }, { threshold: 0.15 })
    elementos.forEach(el => observer.observe(el))
  })
}

onMounted(() => {
  setInterval(nextBanner, 4000)
  animarAoEntrar('.animar')
})
</script>

<template>
  <div class="destaque-menu dark">
    <div class="banner-carousel">
      <img :src="banners[bannerAtual].src" :alt="banners[bannerAtual].alt" class="banner-img" />
      <div class="carousel-dots">
        <span v-for="(b, idx) in banners" :key="idx" :class="['dot', { ativo: idx === bannerAtual }]" @click="setBanner(idx)"></span>
      </div>
    </div>
    <div class="destaque-header animar">
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
      <div class="destaque-imgs animar">
        <img src="/src/assets/imagens/carrosel1.png" alt="Ambiente Santory" />
        <img src="/src/assets/imagens/carrosel2.png" alt="Pizza Artesanal" />
      </div>
    </div>
  </div>
</template>


<style scoped>
.destaque-menu.dark {
  background: #fff;
  color: #111;
  border-radius: 24px;
  box-shadow: 0 4px 32px #2222;
  padding: 2.5rem 2rem;
  margin: 2rem auto;
  max-width: 1100px;
  text-align: center;
  border-top: 6px solid #ffe066;
}
.banner-carousel {
  position: relative;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto 2.2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 2px 16px #ffe06644;
  min-height: 320px;
  min-width: 100%;
}
.banner-img {
  width: 100%;
  max-width: 1080px;
  height: 320px;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 0 2px 8px #ffe06644;
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
  background: #ffe06655;
  cursor: pointer;
  transition: background 0.2s;
}
.dot.ativo { background: #ffe066; }
.destaque-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px #ffe06644;
  padding: 2rem 1rem;
  margin-top: 2rem;
  border: 2px solid #ffe066;
}
.destaque-texto {
  flex: 2;
  min-width: 270px;
  text-align: left;
}
.destaque-menu.dark h2 {
  color: #111;
  font-family: 'Playfair Display', serif;
  margin-bottom: 1rem;
  font-size: 2.2rem;
}
.destaque-menu.dark p {
  color: #222;
  font-size: 1.18rem;
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
  color: #111;
  background: #fff;
  border-radius: 10px;
  padding: 0.5rem 0.7rem;
  box-shadow: 0 1px 4px #b33c1a11;
  min-width: 90px;
  border: 2px solid #ffe066;
}
.diferencial img {
  width: 32px;
  margin-bottom: 0.3rem;
  filter: drop-shadow(0 2px 6px #ffe06644);
}
.destaque-menu.dark ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1.2rem;
}
.destaque-menu.dark li {
  color: #222;
  font-size: 1.05rem;
  margin-bottom: 0.4rem;
}
.destaque-info-extra {
  margin-bottom: 1.2rem;
  color: #c7af4f;
  font-weight: 700;
  font-size: 1.08rem;
}
.destaque-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.2rem;
  flex-wrap: wrap;
}
.link-btn {
  background: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  margin-bottom: 0.2rem;
  font-weight: 700;
  border: 2px solid #ffe066;
}
.link-btn:hover {
  background: #ffe066;
  color: #111;
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
  border: 2px solid #ffe066;
  background: #fff;
}
.animar {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
}
.animar-entrada {
  opacity: 1 !important;
  transform: none !important;
}
@media (max-width: 900px) {
  .destaque-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
    padding: 1.2rem 0.5rem;
  }
  .destaque-imgs img {
    width: 120px;
  }
  .banner-img {
    height: 180px;
    max-width: 98vw;
    border-radius: 14px;
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
  .destaque-header {
    padding: 0.7rem 0.2rem;
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
