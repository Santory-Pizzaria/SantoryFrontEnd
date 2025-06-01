<template>
  <div class="pizza-card">
    <img :src="pizza.image" alt="Pizza" class="pizza-image" />
    <div class="pizza-info">
      <h3>{{ pizza.name }}</h3>
      <p class="descricao">{{ pizza.description }}</p>
      <p class="price">R$ {{ pizza.price.toFixed(2) }}</p>
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
  justify-content: space-between; /* Garantir que os elementos fiquem separados */
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.1);
  padding: 10px;
  margin: 10px 0;
  font-size: 14pt;
}
.pizza-info .descricao {
  color: #666;
  margin: 5px 0;
  font-size: 12pt;
}
.pizza-image {
  display: flex;
  width: 95px;
  height: 95px;;
  border-radius: 8px;
  object-fit: cover;
  flex-direction: row-reverse;
  margin-left: auto;
  order: 2;
}
.pizza-info {
  margin-left: 12px;
  order: 1;

}
.pizza-info h3 {
  color: black;
}
.price {
  color: green;
  font-weight: bold;
}
</style>
