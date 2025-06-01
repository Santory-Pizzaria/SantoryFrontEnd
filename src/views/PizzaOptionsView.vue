<template>
  <PizzaOptions :pizzaNome="$route.params.pizzaNome" @voltar="voltar" />
</template>

<script>
import PizzaOptions from '@/components/PizzaOptions.vue';

export default {
  name: 'PizzaOptionsView',
  components: {
    PizzaOptions
  },
  methods: {
    voltar() {
      this.$router.push('/menu');
    }
  }
};
</script>
