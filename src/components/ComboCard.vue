<script setup>
defineProps(['combo']);
</script>

<template>
  <div class="combo-card">
    <img :src="combo.img" alt="Combo" class="combo-image" />
    <div class="combo-info">
      <h3>{{ combo.nome }}</h3>
      <p class="descricao">{{ combo.descricao }}</p>
      <p class="price">R$ {{ combo.preco.toFixed(2) }}</p>
    </div>
  </div>
</template>


<style scoped>
.combo-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin: 10px 0;
  font-size: 14pt;
}

.combo-info .descricao {
  color: #666;
  margin: 5px 0;
  font-size: 12pt;
}

.combo-image {
  display: flex;
  width: 95px;
  height: 95px;
  border-radius: 8px;
  object-fit: cover;
  flex-direction: row-reverse;
  margin-left: auto;
  order: 2;
}

.combo-info {
  margin-left: 12px;
  order: 1;
}

.price {
  color: green;
  font-weight: bold;
}
</style>
