<template>
  <div>
    <ul class="lista-carrinho">
      <CarrinhoItem
        v-for="item in exemploItens"
        :key="item.id"
        :item="item"
      />
    </ul>
  </div>
</template>

<script>
import CarrinhoItem from './CarrinhoItem.vue';

export default {
  name: 'CarrinhoItemDemo',
  components: { CarrinhoItem },
  data() {
    return {
      exemploItens: [
        {
          id: 1,
          nome: 'Pizza Calabresa',
          preco: 49.9,
          quantidade: 2,
          imagem: 'src/assets/imagens/PizzaEx.png'
        },
        {
          id: 2,
          nome: 'Coca-Cola 2L',
          preco: 12.5,
          quantidade: 1,
          imagem: 'src/assets/imagens/Coca.png'
        },
        {
          id: 3,
          nome: 'Combo Família',
          preco: 89.9,
          quantidade: 1,
          imagem: 'src/assets/imagens/ComboExjpg.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>
.lista-carrinho {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
