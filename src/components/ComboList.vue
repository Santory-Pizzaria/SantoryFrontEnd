<script setup>

const combos = [
  {
    nome: 'Combo Família',
    descricao: '2 Pizzas Grandes + 1 Refrigerante 2L',
    img: '/src/assets/imagens/Borda.png',
    tamanhos: [ { nome: 'Família', preco: 89.90 } ]
  },
  {
    nome: 'Combo Casal',
    descricao: '1 Pizza Média + 1 Refrigerante 1L',
    img: '/src/assets/imagens/SaboresOpc.png',
    tamanhos: [ { nome: 'Casal', preco: 49.90 } ]
  }
];
</script>
<template>
  <div class="combo-cardapio">
    <h2 class="combo-titulo">Combos</h2>
    <div class="combo-grid">
      <div v-for="combo in combos" :key="combo.nome" class="combo-card">
        <img :src="combo.img" alt="Combo" class="combo-image" />
        <div class="combo-info">
          <h3>{{ combo.nome }}</h3>
          <p>{{ combo.descricao }}</p>
          <div class="combo-tamanhos">
            <span v-for="t in combo.tamanhos" :key="t.nome" class="combo-preco">
              <b>{{ t.nome }}:</b> R$ {{ t.preco.toFixed(2) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.combo-cardapio {
  max-width: 900px;
  margin: 40px auto;
  padding: 2rem 1rem;
  background: #232323;
  border-radius: 24px;
  box-shadow: 0 6px 32px #a52a2a44;
}
.combo-titulo {
  text-align: center;
  font-size: 2rem;
  color: #d72638;
  font-family: 'Playfair Display', serif;
  margin-bottom: 2rem;
}
.combo-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}
.combo-card {
  background: #3e2723;
  border-radius: 18px;
  box-shadow: 0 2px 12px #d7263822;
  min-width: 220px;
  max-width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem;
  border: 2px solid #d7263811;
}
.combo-image {
  width: 70px;
  height: 70px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 0.7rem;
}
.combo-info {
  text-align: center;
}
.combo-info h3 {
  font-size: 1.15rem;
  font-weight: bold;
  color: #d72638;
  margin-bottom: 0.3rem;
}
.combo-info p {
  font-size: 1rem;
  color: #fffbe6;
  margin-bottom: 0.7rem;
}
.combo-tamanhos {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 1rem;
  color: #fffbe6;
}
.combo-preco {
  background: #d72638;
  border-radius: 6px;
  padding: 0.2rem 0.7rem;
  margin-bottom: 0.2rem;
  font-size: 0.98rem;
  color: #fffbe6;
  box-shadow: 0 1px 4px #d7263811;
}
@media (max-width: 700px) {
  .combo-cardapio {
    max-width: 98vw;
    padding: 1.2rem 0.5rem;
  }
  .combo-grid {
    gap: 1rem;
  }
  .combo-card {
    min-width: 140px;
    max-width: 180px;
    padding: 0.7rem;
  }
  .combo-image {
    width: 44px;
    height: 44px;
  }
}
</style>
