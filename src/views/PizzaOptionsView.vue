<script>
import PizzaOptions from '@/components/PizzaOptions.vue';
import VerificacaoView from './VerificacaoView.vue';
import BebidaOptions from '@/components/BebidaOptions.vue';

export default {
  name: 'PizzaOptionsView',
  components: {
    PizzaOptions,
    VerificacaoView,
    BebidaOptions
  },
  data() {
    return {
      pedido: null,
      mostrarVerificacao: false,
      mostrarPerguntaBebida: false,
      mostrarBebidaOptions: false,
      bebidaSelecionada: null,
      bebidasExtras: [], // Adiciona array para bebidas extras
    };
  },
  computed: {
    bebidaFixaComboAtiva() {
      return this.$route.params.bebidaFixaCombo === true || this.$route.params.bebidaFixaCombo === 'true';
    }
  },
  mounted() {
    // Se vier bebida fixa do combo, já salva e pula a escolha de bebida
    const params = this.$route.params;
    if (params.bebidaFixaCombo === true || params.bebidaFixaCombo === 'true') {
      this.pedido = { pizzaNome: params.pizzaNome, combo: params.combo };
      this.bebidaSelecionada = {
        tipo: params.refrigerante,
        tamanho: params.refrigeranteTamanho,
        preco: 0
      };
      this.mostrarVerificacao = true;
      this.mostrarPerguntaBebida = false;
      this.mostrarBebidaOptions = false;
    }
  },
  methods: {
    voltar() {
      this.$router.push('/menu');
    },
    finalizarSelecao(pedidoSelecionado) {
      // Se vier de um combo, preenche as pizzas e bebidas fixas do combo
      if (pedidoSelecionado.combo) {
        this.pedido = {
          combo: pedidoSelecionado.combo,
          pizzas: pedidoSelecionado.pizzas,
          bebidas: [...pedidoSelecionado.bebidas], // já inclui Guaraná fixo
        };
        this.mostrarPerguntaBebida = true;
        return;
      }
      // ...fluxo normal para pizzas avulsas...
      this.pedido = pedidoSelecionado;
      this.mostrarPerguntaBebida = true;
    },
    onFinishPizzaOptions(pedidoSelecionado) {
      this.finalizarSelecao(pedidoSelecionado);
    },
    atualizarQuantidade(novaQtd) {
      this.pedido.quantidade = novaQtd;
    },
    escolherBebida(sim) {
      if (sim) {
        this.mostrarBebidaOptions = true;
        this.mostrarPerguntaBebida = false;
      } else {
        this.mostrarVerificacao = true;
        this.mostrarPerguntaBebida = false;
      }
    },
    finalizarBebidas(bebida) {
      // Adiciona bebida extra ao array
      this.bebidasExtras.push(bebida);
      this.mostrarBebidaOptions = false;
      this.mostrarVerificacao = true;
      // Junta bebidas fixas do combo com extras
      if (this.pedido && this.pedido.bebidas) {
        this.pedido.bebidas = [...this.pedido.bebidas, ...this.bebidasExtras];
      } else if (this.pedido) {
        this.pedido.bebidas = [...this.bebidasExtras];
      }
    }
  }
};
</script>


<template>
  <div>
    <PizzaOptions
      v-if="!mostrarVerificacao && !mostrarPerguntaBebida && !mostrarBebidaOptions"
      ref="pizzaOptions"
      :pizzaNome="$route.params.pizzaNome"
      @finish="onFinishPizzaOptions"
      @voltar="voltar"
    />
    <div v-if="mostrarPerguntaBebida && !bebidaFixaComboAtiva" class="pergunta-bebida-container">
      <p class="pergunta-bebida-titulo">Deseja adicionar bebidas ao pedido?</p>
      <div class="pergunta-bebida-botoes">
        <button class="pergunta-bebida-btn sim" @click="escolherBebida(true)">Sim</button>
        <button class="pergunta-bebida-btn nao" @click="escolherBebida(false)">Não</button>
      </div>
    </div>
    <div v-if="mostrarBebidaOptions && !bebidaFixaComboAtiva">
      <BebidaOptions @finish="finalizarBebidas" />
    </div>
    <VerificacaoView
      v-if="mostrarVerificacao"
      :pedido="pedido"
      :bebidaSelecionada="bebidaSelecionada"
      @atualizar-quantidade="atualizarQuantidade"
    />
  </div>
</template>

<style scoped>
.pergunta-bebida-container {
  background: #fffbe6;
  border: 2px solid #ff9800;
  border-radius: 18px;
  box-shadow: 0 4px 18px #b33c1a22;
  max-width: 400px;
  margin: 40px auto;
  padding: 32px 24px;
  text-align: center;
}
.pergunta-bebida-titulo {
  font-size: 1.3rem;
  font-weight: bold;
  color: #b33c1a;
  margin-bottom: 24px;
  font-family: 'Playfair Display', serif;
}
.pergunta-bebida-botoes {
  display: flex;
  justify-content: center;
  gap: 32px;
}
.pergunta-bebida-btn {
  background: linear-gradient(90deg, #ff9800 0%, #b33c1a 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 32px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px #b33c1a22;
  transition: background 0.2s, transform 0.2s;
}
.pergunta-bebida-btn.sim:hover {
  background: #b33c1a;
}
.pergunta-bebida-btn.nao:hover {
  background: #ff9800;
}
</style>

