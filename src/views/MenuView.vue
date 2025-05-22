<script setup>
import PizzaList from '@/components/PizzaList.vue';
import FooteRor from '@/components/FooteRor.vue';



</script>
<template>
  <div class="menu">
 <PizzaList></PizzaList>
  </div>
  <FooteRor></FooteRor>
</template>

<style scoped>
.menu {
  font-family: Arial, sans-serif;
  color: #333;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
}

.logo {
  height: 50px;
}

nav {
  display: flex;
  gap: 15px;
}

nav a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  transition: color 0.3s;
}

nav a:hover {
  color: #ff6347;
}

.pizza-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style>

