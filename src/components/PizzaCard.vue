<script>
export default {
  name: 'PizzaCard',
  data() {
    return {
      tamanhos: [
        {
          nome: 'Pequena',
          preco: 25.00,
          img: '/src/assets/imagens/fundo.png',
          descricao: '12cm •4 fatias • Serve até 1 pessoa'
        },
        {
          nome: 'Média',
          preco: 35.00,
          img: '/src/assets/imagens/pizza-media.png',
          descricao: '18cm •8 fatias • Serve até 2 pessoas'
        },
        {
          nome: 'Grande',
          preco: 45.00,
          img: '/src/assets/imagens/pizza-grande.png',
          descricao: '22cm •12 fatias • Serve até 4 pessoas'
        }
      ]
    };
  }
};
</script>


<template>
  <div class="pizza-tamanhos-bg">
    <header class="pizza-tamanhos-header">
      <img src="/src/assets/imagens/logo.png" alt="Logo" class="pizza-tamanhos-logo" />
      <h2 class="pizza-tamanhos-title">Escolha o tamanho da sua pizza</h2>
    </header>
    <div class="pizza-tamanhos-lista">
      <div
        v-for="t in tamanhos"
        :key="t.nome"
        class="pizza-tamanhos-card"
      >
        <img :src="t.img" :alt="t.nome" class="pizza-tamanhos-card-img" />
        <span class="pizza-tamanhos-card-nome">{{ t.nome }}</span>
        <span class="pizza-tamanhos-card-preco">R$ {{ t.preco.toFixed(2) }}</span>
        <span class="pizza-tamanhos-card-desc">{{ t.descricao }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pizza-tamanhos-bg {
  background: #faf8f5;
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pizza-tamanhos-header {
  text-align: center;
  padding: 2.5rem 0 1.2rem 0;
}
.pizza-tamanhos-logo {
  width: 70px;
  margin-bottom: 0.7rem;
}
.pizza-tamanhos-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: #b33c1a;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}
.pizza-tamanhos-lista {
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  align-items: flex-start;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
}
.pizza-tamanhos-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px #b33c1a18;
  border: 2px solid #ffe5d0;
  width: 220px;
  min-height: 310px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1.2rem 1.5rem 1.2rem;
  font-family: 'Playfair Display', serif;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
}
.pizza-tamanhos-card:hover {
  box-shadow: 0 8px 32px #b33c1a33;
  transform: translateY(-8px) scale(1.04);
  border-color: #b33c1a;
}
.pizza-tamanhos-card-img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  border-radius: 50%;
  background: #fff7f0;
  border: 2px solid #ffe5d0;
  margin-bottom: 1.2rem;
}
.pizza-tamanhos-card-nome {
  font-size: 1.25rem;
  font-weight: 700;
  color: #b33c1a;
  margin-bottom: 0.5rem;
  text-align: center;
}
.pizza-tamanhos-card-preco {
  font-size: 1.1rem;
  font-weight: 700;
  color: #d72638;
  text-align: center;
  margin-bottom: 0.5rem;
}
.pizza-tamanhos-card-desc {
  font-size: 1rem;
  color: #7a5c3e;
  text-align: center;
  margin-top: 0.2rem;
  font-weight: 500;
}
@media (max-width: 900px) {
  .pizza-tamanhos-lista {
    gap: 1.2rem;
  }
  .pizza-tamanhos-card {
    width: 44vw;
    min-width: 170px;
    max-width: 240px;
    padding: 1.2rem 0.7rem 1rem 0.7rem;
  }
  .pizza-tamanhos-card-img {
    width: 64px;
    height: 64px;
    margin-bottom: 0.7rem;
  }
}
@media (max-width: 600px) {
  .pizza-tamanhos-lista {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .pizza-tamanhos-card {
    width: 90vw;
    min-width: 0;
    max-width: 98vw;
  }
}
</style>
