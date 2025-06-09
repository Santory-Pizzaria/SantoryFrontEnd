<template>
  <div class="bebida-card">
    <img :src="bebida.image" alt="Bebida" class="bebida-image" />
    <div class="bebida-info">
      <h3>{{ bebida.name }}</h3>
      <p class="descricao">{{ bebida.description }}</p>
      <p class="price">R$ {{ bebida.price.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps(['bebida']);
</script>

<style scoped>
.bebida-card {
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

.bebida-info .descricao {
  color: #666;
  margin: 5px 0;
  font-size: 12pt;
}

.bebida-image {
  display: flex;
  width: 95px;
  height: 95px;
  border-radius: 8px;
  object-fit: cover;
  flex-direction: row-reverse;
  margin-left: auto;
  order: 2;
}

.bebida-info {
  margin-left: 12px;
  order: 1;
}

.price {
  color: green;
  font-weight: bold;
}
</style>
