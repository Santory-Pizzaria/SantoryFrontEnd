<script>
export default {
  name: 'CardapioPizzaria',
  data() {
    return {
      pizzas: [
        { nome: 'Margherita', descricao: 'Molho de tomate, mussarela, tomate, manjericão e azeite.' },
        { nome: 'Calabresa', descricao: 'Mussarela, calabresa, cebola e orégano.' },
        { nome: 'Portuguesa', descricao: 'Mussarela, presunto, ovo, cebola, pimentão, azeitona.' },
        { nome: 'Quatro Queijos', descricao: 'Mussarela, provolone, parmesão, catupiry.' },
        { nome: 'Frango com Catupiry', descricao: 'Frango desfiado, catupiry, mussarela.' },
        { nome: 'Pepperoni', descricao: 'Mussarela, pepperoni, orégano.' },
        { nome: 'Vegetariana', descricao: 'Mussarela, tomate, cebola, pimentão, champignon, milho.' }
      ],
      bebidas: [
        { nome: 'Refrigerante Lata', descricao: 'Coca-Cola, Guaraná, Fanta, Sprite (350ml)', preco: 'R$ 6,00' },
        { nome: 'Refrigerante 2L', descricao: 'Coca-Cola, Guaraná, Fanta, Sprite (2L)', preco: 'R$ 13,00' },
        { nome: 'Água Mineral', descricao: 'Sem gás ou com gás (500ml)', preco: 'R$ 4,00' },
        { nome: 'Suco Natural', descricao: 'Laranja, uva, abacaxi ou maracujá (300ml)', preco: 'R$ 7,00' },
        { nome: 'Cerveja Long Neck', descricao: 'Heineken, Budweiser, Stella Artois (330ml)', preco: 'R$ 9,00' }
      ]
    }
  }
}
</script>


<template>
  <div class="cardapio-bg"></div>
  <img
    src="/src/assets/imagens/seta.png"
    alt="Voltar ao menu"
    class="seta-voltar"
    @click="$router.push('/menu')"
  />
  <section class="cardapio-pizzaria">
    <header class="cardapio-header">
      <img src="/src/assets/imagens/logo.png" alt="Sabores de Pizza" class="cardapio-img" />
      <h1>Nosso Cardápio</h1>
      <p>Escolha entre nossas deliciosas pizzas e bebidas geladas!</p>
    </header>
    <div class="cardapio-section">
      <h2>Pizzas</h2>
      <ul class="cardapio-list">
        <li v-for="pizza in pizzas" :key="pizza.nome" class="cardapio-item pizza-item">
          <span class="item-nome">{{ pizza.nome }}</span>
          <span class="item-desc">{{ pizza.descricao }}</span>
        </li>
      </ul>
    </div>
    <div class="cardapio-section">
      <h2>Bebidas</h2>
      <ul class="cardapio-list">
        <li v-for="bebida in bebidas" :key="bebida.nome" class="cardapio-item bebida-item">
          <span class="item-nome">{{ bebida.nome }}</span>
          <span class="item-desc">{{ bebida.descricao }}</span>
          <span class="item-preco">{{ bebida.preco }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.seta-voltar {
  position: absolute;
  top: 24px;
  left: 24px;
  width: 38px;
  height: 38px;
  cursor: pointer;
  z-index: 10;
  transition: transform 0.15s;
}
.seta-voltar:hover {
  transform: scale(1.12);
}
.cardapio-pizzaria {
  position: relative;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem 1.5rem;
}
.cardapio-header {
  text-align: center;
  margin-bottom: 2rem;
}
.cardapio-img {
  width: 80px;
  margin-bottom: 0.5rem;
}
.cardapio-header h1 {
  font-size: 2.2rem;
  color: #d72638;
  margin: 0.2rem 0 0.5rem 0;
}
.cardapio-header p {
  color: #444;
  font-size: 1.1rem;
}
.cardapio-section {
  margin-bottom: 2rem;
}
.cardapio-section h2 {
  color: #2d3748;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  border-left: 4px solid #d72638;
  padding-left: 0.7rem;
}
.cardapio-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.cardapio-item {
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
  border-radius: 10px;
  margin-bottom: 1.1rem;
  padding: 1rem 1.2rem;
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
  transition: box-shadow 0.2s, transform 0.2s;
}
.cardapio-item:hover {
  box-shadow: 0 4px 18px rgba(215,38,56,0.10);
  transform: translateY(-3px) scale(1.01);
}
.item-nome {
  font-weight: 700;
  color: #d72638;
  font-size: 1.1rem;
}
.item-desc {
  color: #444;
  font-size: 1rem;
  margin-top: 0.2rem;
}
.item-preco {
  color: #d72638;
  font-size: 1.1rem;
  margin-top: 0.5rem;
}
.cardapio-bg {
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
.cardapio-container {
  position: relative;
  z-index: 1;
}
@media (max-width: 700px) {
  .cardapio-pizzaria {
    padding: 1rem 0.2rem;
  }
  .cardapio-header h1 {
    font-size: 1.4rem;
  }
  .cardapio-section h2 {
    font-size: 1.1rem;
  }
  .cardapio-item {
    padding: 0.7rem 0.5rem;
  }
}
</style>
