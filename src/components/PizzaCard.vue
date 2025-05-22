<template>
  <div class="pizza-card">
    <img :src="pizza.image" alt="Pizza" class="pizza-image" />
    <div class="pizza-info">
      <h3>{{ pizza.name }}</h3>
      <p>{{ pizza.description }}</p>
      <p class="price">R$ {{ pizza.price }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps(['pizza']);
</script>

<style scoped>
.pizza-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.1);
  padding: 10px;
  margin: 10px 0;
}
.pizza-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}
.pizza-info {
  margin-left: 12px;
}
.price {
  color: green;
  font-weight: bold;
}
</style>
