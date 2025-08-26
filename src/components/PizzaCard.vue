<script>
export default {
  name: 'PizzaCard',
  data() {
    return {
      activeTab: 'pizza',
      tamanhos: [
        {
          nome: 'Pequena',
          preco: 25.00,
          img: '/src/assets/imagens/Pizzaex.png',
          descricao: '12cm •4 fatias • Serve até 1 pessoa'
        },
        {
          nome: 'Média',
          preco: 35.00,
          img: '/src/assets/imagens/Pizzaex.png',
          descricao: '18cm •8 fatias • Serve até 2 pessoas'
        },
        {
          nome: 'Grande',
          preco: 45.00,
          img: '/src/assets/imagens/Pizzaex.png',
          descricao: '22cm •12 fatias • Serve até 4 pessoas'
        },
        {
          nome: 'Família',
          preco: 65.00,
          img: '/src/assets/imagens/Pizzaex.png',
          descricao: '22cm •18 fatias • Serve até 4 pessoas'
        }
        ],
      combos: [
        { nome: 'Combo Solteiro', descricao: '1 Pizza Média + 1 Refrigerante 350ml', preco: 'R$ 39,90', img: '/src/assets/imagens/ComboExjpg.jpg' },
        { nome: 'Combo Casal', descricao: '1 Pizza Grande + 1 Refrigerante 2L', preco: 'R$ 54,90', img: '/src/assets/imagens/ComboExjpg.jpg' },
        { nome: 'Combo Família', descricao: '2 Pizzas Grandes + 1 Refrigerante 2L + 1 Porção de Batata Frita', preco: 'R$ 99,90', img: '/src/assets/imagens/ComboExjpg.jpg' }
      ],
      bebidas: [
        { nome: 'Refrigerante Lata', descricao: 'Coca-Cola, Guaraná, Fanta, Sprite (350ml)', preco: 'R$ 6,00', img: '/src/assets/imagens/Coca.png' },
        { nome: 'Água Mineral', descricao: 'Sem gás ou com gás (500ml)', preco: 'R$ 4,00', img: '/src/assets/imagens/Agua.png' },
        { nome: 'Cerveja Long Neck', descricao: 'Heineken, Budweiser, Stella Artois (330ml)', preco: 'R$ 9,00', img: '/src/assets/imagens/Cerveja.png' }
      ]
    };
  },
  methods: {
    adicionarItem(item) {
      this.$router.push({ name: 'pizza-options', params: { pizzaNome: item.nome } });
    }
  }
};
</script>


<template>
  <div class="pizza-card-bg"></div>
  <img src="/src/assets/imagens/seta-preta.png" alt="Voltar ao menu" class="seta-voltar" @click="$router.push('/menu')" />
  <div class="pizza-card-layout">
    <header class="pizza-card-header">
      <img src="/src/assets/imagens/logo.png" alt="Logo Itália" class="pizza-card-logo" />
      <h1 class="pizza-card-title">Monte seu pedido</h1>
    </header>
    <nav class="pizza-card-tabs">
      <button :class="{ active: activeTab === 'pizza' }" @click="activeTab = 'pizza'">
        <img src="/src/assets/imagens/pizza.png" alt="Pizzas" />
        <span>Pizzas</span>
      </button>
      <button :class="{ active: activeTab === 'combos' }" @click="activeTab = 'combos'">
        <img src="/src/assets/imagens/combo.png" alt="Combos" />
        <span>Combos</span>
      </button>
      <button :class="{ active: activeTab === 'bebidas' }" @click="activeTab = 'bebidas'">
        <img src="/src/assets/imagens/bebida.png" alt="Bebidas" />
        <span>Bebidas</span>
      </button>
    </nav>
    <section class="pizza-card-content">
      <div v-if="activeTab === 'pizza'" class="pizza-card-list">
        <div v-for="t in tamanhos" :key="t.nome" class="pizza-card-item pizza-card-pizza">
          <img :src="t.img" :alt="t.nome" class="pizza-card-img" />
          <div class="pizza-card-info">
            <h2>{{ t.nome }}</h2>
            <p class="pizza-card-desc">{{ t.descricao }}</p>
            <span class="pizza-card-preco">R$ {{ t.preco.toFixed(2) }}</span>
            <button class="pizza-card-add-btn" @click="adicionarItem(t)">Adicionar</button>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'combos'" class="pizza-card-list">
        <div v-for="combo in combos" :key="combo.nome" class="pizza-card-item pizza-card-combo">
          <img :src="combo.img" :alt="combo.nome" class="pizza-card-img" />
          <div class="pizza-card-info">
            <h2>{{ combo.nome }}</h2>
            <p class="pizza-card-desc">{{ combo.descricao }}</p>
            <span class="pizza-card-preco">{{ combo.preco }}</span>
            <button class="pizza-card-add-btn" @click="adicionarItem(combo)">Adicionar</button>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'bebidas'" class="pizza-card-list">
        <div v-for="bebida in bebidas" :key="bebida.nome" class="pizza-card-item pizza-card-bebida">
          <img :src="bebida.img" :alt="bebida.nome" class="pizza-card-img" />
          <div class="pizza-card-info">
            <h2>{{ bebida.nome }}</h2>
            <p class="pizza-card-desc">{{ bebida.descricao }}</p>
            <span class="pizza-card-preco">{{ bebida.preco }}</span>
            <button class="pizza-card-add-btn" @click="adicionarItem(bebida)">Adicionar</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.pizza-card-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: url('/src/assets/imagens/fundo.png') no-repeat center center fixed;
  background-size: cover;
  opacity: 0.42;
  pointer-events: none;
}
.pizza-card-layout {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  background: rgba(243, 241, 241, 0.87);
  border-radius: 18px;
  box-shadow: 0 4px 24px #b33c1a18;
  padding: 2rem 1rem 2.5rem 1rem;
}
.pizza-card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}
.pizza-card-logo {
  width: 90px;
  height: 90px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}
.pizza-card-title {
  font-size: 2rem;
  color: #b33c1a;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  margin: 0;
}
.pizza-card-tabs {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 2rem;
}
.pizza-card-tabs button {
  background: #fff;
  border: 2px solid #b33c1a;
  color: #b33c1a;
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 12px 12px 0 0;
  padding: 10px 24px 6px 24px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.pizza-card-tabs button img {
  width: 32px;
  height: 32px;
  margin-bottom: 2px;
}
.pizza-card-tabs button.active {
  background: #b33c1a;
  color: #fff;
  border-bottom: 2px solid #fff;
  z-index: 2;
}
.pizza-card-content {
  width: 100%;
}
.pizza-card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}
.pizza-card-item {
  background: #fff7f0;
  border-radius: 16px;
  box-shadow: 0 2px 12px #b33c1a11;
  border: 2px solid #ffe5d0;
  width: 260px;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem 1.2rem 1rem;
  font-family: 'Playfair Display', serif;
  transition: box-shadow 0.2s, transform 0.2s;
}
.pizza-card-item:hover {
  box-shadow: 0 8px 32px #b33c1a33;
  transform: translateY(-8px) scale(1.04);
  border-color: #b33c1a;
}
.pizza-card-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #ffe5d0;
  margin-bottom: 1rem;
}
.pizza-card-info h2 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #b33c1a;
  margin-bottom: 0.3rem;
  text-align: center;
}
.pizza-card-desc {
  font-size: 1rem;
  color: #7a5c3e;
  text-align: center;
  margin-bottom: 0.5rem;
}
.pizza-card-preco {
  font-size: 1.1rem;
  font-weight: 700;
  color: #d72638;
  text-align: center;
}
.seta-voltar {
  position: fixed;
  top: 18px;
  left: 18px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 10000;
  border-radius: 50%;
  padding: 4px;
  background: transparent;
  transition: filter 0.2s, transform 0.2s;
}
.seta-voltar:hover {
  filter: brightness(1.2) drop-shadow(0 4px 12px #00000066);
  transform: scale(1.08);
}
.pizza-card-add-btn {
  margin-top: 10px;
  background: #b33c1a;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 0;
  width: 100%;
  font-size: 1.08rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px #b33c1a22;
}
.pizza-card-add-btn:hover {
  background: #d72638;
  transform: translateY(-2px) scale(1.04);
}
@media (max-width: 700px) {
  .pizza-card-layout {
    padding: 1rem 0.2rem 1.5rem 0.2rem;
  }
  .pizza-card-list {
    gap: 1rem;
  }
  .pizza-card-item {
    width: 98vw;
    min-width: 0;
    max-width: 99vw;
    padding: 1rem 0.5rem 1rem 0.5rem;
  }
  .pizza-card-logo {
    width: 60px;
    height: 60px;
  }
  .seta-voltar {
    width: 22px;
    height: 22px;
    top: 8px;
    left: 8px;
    padding: 2px;
  }
}
@media (max-width: 1020px) {
  .seta-voltar {
    position: fixed;
    top: 18px;
    left: 18px;
    z-index: 1002;
  }
  .pizza-card-layout {
    position: relative;
    z-index: 1;
  }
}
</style>
