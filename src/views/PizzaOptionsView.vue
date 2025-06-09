<template>
  <div>
    <PizzaOptions
      v-if="!mostrarVerificacao"
      ref="pizzaOptions"
      :pizzaNome="$route.params.pizzaNome"
      @finish="onFinishPizzaOptions"
      @voltar="voltar"
    />
    <VerificacaoView
      v-if="mostrarVerificacao"
      :pedido="pedido"
      @atualizar-quantidade="atualizarQuantidade"
    />
  </div>
</template>

<script>
import PizzaOptions from '@/components/PizzaOptions.vue';
import VerificacaoView from './VerificacaoView.vue';

export default {
  name: 'PizzaOptionsView',
  components: {
    PizzaOptions,
    VerificacaoView
  },
  data() {
    return {
      pedido: null,
      mostrarVerificacao: false
    };
  },
  methods: {
    voltar() {
      this.$router.push('/menu');
    },
    finalizarSelecao(pedidoSelecionado) {
      this.pedido = pedidoSelecionado;
      this.mostrarVerificacao = true;
    },
    onFinishPizzaOptions() {
      // Coletar dados do PizzaOptions (exemplo)
      const pizzaOptions = this.$refs.pizzaOptions;
      const pedidoSelecionado = {
        pizzaNome: this.$route.params.pizzaNome,
        saboresSelecionados: pizzaOptions.saboresSelecionados || [],
        bordaSelecionada: pizzaOptions.bordaSelecionada,
        frete: 'R$10,00',
        valor: 'R$85,00',
        quantidade: 1
      };
      this.finalizarSelecao(pedidoSelecionado);
    },
    atualizarQuantidade(novaQtd) {
      this.pedido.quantidade = novaQtd;
    }
  }
};
</script>
