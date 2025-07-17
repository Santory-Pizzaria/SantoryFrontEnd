<template>
  <div class="pizza-minimal-bg">
    <header class="pizza-minimal-header">
      <img src="/src/assets/imagens/logo.png" alt="Logo" class="pizza-minimal-logo" />
      <h2 class="pizza-minimal-title">Escolha o tamanho da sua pizza</h2>
    </header>
    <div class="pizza-minimal-grid">
      <div v-for="pizza in pizzas" :key="pizza.nome" class="pizza-minimal-card">
        <img :src="pizza.img" alt="Pizza" class="pizza-minimal-img" />
        <div class="pizza-minimal-info">
          <h3 class="pizza-minimal-nome">{{ pizza.nome }}</h3>
          <p class="pizza-minimal-desc">{{ pizza.descricao }}</p>
          <div class="pizza-minimal-tamanhos">
            <div v-for="t in pizza.tamanhos" :key="t.nome" class="pizza-minimal-tamanho">
              <span class="pizza-minimal-tam">{{ t.nome }}</span>
              <span class="pizza-minimal-preco">R$ {{ t.preco.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PizzaCard',
  data() {
    return {
      pizzas: [
        {
          nome: 'Calabresa',
          descricao: 'Mussarela, calabresa, cebola e orégano.',
          img: '/src/assets/imagens/carrosel1.png',
          tamanhos: [
            { nome: 'Pequena', preco: 25.00 },
            { nome: 'Média', preco: 35.00 },
            { nome: 'Grande', preco: 45.00 }
          ]
        },
        {
          nome: 'Quatro Queijos',
          descricao: 'Mussarela, provolone, parmesão, catupiry.',
          img: '/src/assets/imagens/carrosel2.png',
          tamanhos: [
            { nome: 'Pequena', preco: 28.00 },
            { nome: 'Média', preco: 38.00 },
            { nome: 'Grande', preco: 48.00 }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.pizza-minimal-bg {
  background: #faf8f5;
  min-height: 100vh;
  padding: 0;
}
.pizza-minimal-header {
  text-align: center;
  padding: 2.5rem 0 1.2rem 0;
}
.pizza-minimal-logo {
  width: 70px;
  margin-bottom: 0.7rem;
}
.pizza-minimal-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: #b33c1a;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}
.pizza-minimal-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 2rem 0;
}
.pizza-minimal-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px #b33c1a11;
  border: 1.5px solid #e7e7e7;
  min-width: 260px;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1.2rem 1.2rem 1.2rem;
  transition: box-shadow 0.2s, transform 0.2s;
}
.pizza-minimal-card:hover {
  box-shadow: 0 8px 32px #b33c1a22;
  transform: scale(1.03);
}
.pizza-minimal-img {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 1rem;
}
.pizza-minimal-info {
  text-align: center;
}
.pizza-minimal-nome {
  font-size: 1.15rem;
  font-weight: bold;
  color: #b33c1a;
  margin-bottom: 0.3rem;
  font-family: 'Playfair Display', serif;
}
.pizza-minimal-desc {
  font-size: 1rem;
  color: #444;
  margin-bottom: 0.7rem;
  font-family: 'Dancing Script', cursive;
}
.pizza-minimal-tamanhos {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.pizza-minimal-tamanho {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f8f8;
  border-radius: 8px;
  padding: 0.4rem 1.2rem;
  font-size: 1.08rem;
  color: #b33c1a;
  font-family: 'Playfair Display', serif;
  margin-bottom: 0.2rem;
}
.pizza-minimal-tam {
  font-weight: 600;
}
.pizza-minimal-preco {
  font-weight: 700;
  color: #d72638;
}
@media (max-width: 700px) {
  .pizza-minimal-grid {
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
  }
  .pizza-minimal-card {
    min-width: 90vw;
    max-width: 98vw;
    padding: 1rem 0.5rem 1rem 0.5rem;
  }
  .pizza-minimal-img {
    width: 60px;
    height: 60px;
  }
}
</style>
