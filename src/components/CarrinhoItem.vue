<template>
  <li class="item-carrinho">
    <img :src="item.imagem" alt="Imagem do produto" class="imagem-produto" />
    <div class="info-produto">
      <div class="linha-produto">
        <h2>{{ item.nome }}</h2>
        <button @click="$emit('remover')" class="remover" title="Remover item">✕</button>
      </div>
      <div class="detalhes-produto">
        <span class="preco-unitario">R$ {{ item.preco.toFixed(2) }} un.</span>
        <div class="quantidade-box">
          <button @click="$emit('alterar-quantidade', -1)" :disabled="item.quantidade === 1">-</button>
          <span>{{ item.quantidade }}</span>
          <button @click="$emit('alterar-quantidade', 1)">+</button>
        </div>
        <span class="subtotal">Subtotal: <strong>R$ {{ (item.preco * item.quantidade).toFixed(2) }}</strong></span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'CarrinhoItem',
  props: {
    item: { type: Object, required: true }
  }
}
</script>

<style scoped>
.item-carrinho {
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #eee;
  padding: 20px 0 16px 0;
  gap: 18px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
}
.imagem-produto {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.info-produto {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.linha-produto {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detalhes-produto {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}
.preco-unitario {
  color: #888;
  font-size: 0.98em;
}
.quantidade-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f5f5;
  border-radius: 6px;
  padding: 2px 10px;
}
.quantidade-box button {
  background: #eee;
  border: none;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background 0.2s;
}
.quantidade-box button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.subtotal {
  font-weight: 500;
  color: #222;
}
.remover {
  background: transparent;
  color: #ff4d4f;
  border: none;
  font-size: 1.3em;
  cursor: pointer;
  padding: 0 8px;
  transition: color 0.2s;
}
.remover:hover {
  color: #b71c1c;
}
</style>
