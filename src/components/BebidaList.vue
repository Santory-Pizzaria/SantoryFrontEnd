<script setup>

const bebidas = [
  {
    nome: 'Coca-Cola',
    descricao: 'Refrigerante 2L',
    img: '/src/assets/imagens/fundo.png',
    tamanhos: [ { nome: '2L', preco: 13.00 } ]
  },
  {
    nome: 'Suco de Laranja',
    descricao: 'Natural 500ml',
    img: '/src/assets/imagens/fundo.png',
    tamanhos: [ { nome: '500ml', preco: 7.00 } ]
  }
];
</script>
<template>
  <div class="bebida-cardapio">
    <h2 class="bebida-titulo">Bebidas</h2>
    <div class="bebida-grid">
      <div v-for="bebida in bebidas" :key="bebida.nome" class="bebida-card">
        <img :src="bebida.img" alt="Bebida" class="bebida-image" />
        <div class="bebida-info">
          <h3>{{ bebida.nome }}</h3>
          <p>{{ bebida.descricao }}</p>
          <div class="bebida-tamanhos">
            <span v-for="t in bebida.tamanhos" :key="t.nome" class="bebida-preco">
              <b>{{ t.nome }}:</b> R$ {{ t.preco.toFixed(2) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bebida-cardapio {
  max-width: 900px;
  margin: 40px auto;
  padding: 2rem 1rem;
  background: #232323;
  border-radius: 24px;
  box-shadow: 0 6px 32px #a52a2a44;
}
.bebida-titulo {
  text-align: center;
  font-size: 2rem;
  color: #d72638;
  font-family: 'Playfair Display', serif;
  margin-bottom: 2rem;
}
.bebida-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}
.bebida-card {
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
.bebida-image {
  width: 70px;
  height: 70px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 0.7rem;
}
.bebida-info {
  text-align: center;
}
.bebida-info h3 {
  font-size: 1.15rem;
  font-weight: bold;
  color: #d72638;
  margin-bottom: 0.3rem;
}
.bebida-info p {
  font-size: 1rem;
  color: #fffbe6;
  margin-bottom: 0.7rem;
}
.bebida-tamanhos {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 1rem;
  color: #fffbe6;
}
.bebida-preco {
  background: #d72638;
  border-radius: 6px;
  padding: 0.2rem 0.7rem;
  margin-bottom: 0.2rem;
  font-size: 0.98rem;
  color: #fffbe6;
  box-shadow: 0 1px 4px #d7263811;
}
@media (max-width: 700px) {
  .bebida-cardapio {
    max-width: 98vw;
    padding: 1.2rem 0.5rem;
  }
  .bebida-grid {
    gap: 1rem;
  }
  .bebida-card {
    min-width: 140px;
    max-width: 180px;
    padding: 0.7rem;
  }
  .bebida-image {
    width: 44px;
    height: 44px;
  }
}
</style>
