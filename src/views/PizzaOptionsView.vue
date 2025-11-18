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
      bebidasExtras: [],
    };
  },
  computed: {
    routeExtras() {
      const p = this.$route?.params || {};
      const q = this.$route?.query || {};
      const get = (k) => (p[k] !== undefined ? p[k] : q[k]);
      const toBool = (v) => v === true || v === 'true' || v === 1 || v === '1';
      return {
        pizzaNome: get('pizzaNome'),
        combo: get('combo'),
        refrigerante: get('refrigerante'),
        refrigeranteTamanho: get('refrigeranteTamanho'),
        bebidaFixaCombo: toBool(get('bebidaFixaCombo')),
      };
    },
    bebidaFixaComboAtiva() {
      return this.routeExtras.bebidaFixaCombo;
    }
  },
  methods: {
    voltar() {
      this.$router.push('/menu');
    },
    finalizarSelecao(pedidoSelecionado) {
      if (pedidoSelecionado.combo || this.routeExtras.combo) {
        let bebidasCombo = Array.isArray(pedidoSelecionado.bebidas) ? [...pedidoSelecionado.bebidas] : [];
        if (this.routeExtras.bebidaFixaCombo) {
          const bebidaBrinde = {
            nome: this.routeExtras.refrigerante,
            tipo: this.routeExtras.refrigerante,
            tamanho: this.routeExtras.refrigeranteTamanho,
            preco: 0
          };
          if (!bebidasCombo.some(b => b.nome === bebidaBrinde.nome && b.tamanho === bebidaBrinde.tamanho)) {
            bebidasCombo.unshift(bebidaBrinde);
          }
          this.bebidaSelecionada = bebidaBrinde;
        }
        this.pedido = {
          pizzaNome: this.routeExtras.pizzaNome || pedidoSelecionado.pizzaNome || '',
          quantidade: pedidoSelecionado.quantidade || 1,
          combo: pedidoSelecionado.combo || this.routeExtras.combo,
          pizzas: pedidoSelecionado.pizzas,
          bebidas: bebidasCombo,
          // garantir dados para VerificacaoView
          saboresSelecionados: pedidoSelecionado.saboresSelecionados || [],
          bordaSelecionada: pedidoSelecionado.bordaSelecionada || 'Sem Borda',
          qtdSabores: pedidoSelecionado.qtdSabores || 1,
          valor: pedidoSelecionado.valor || 'R$ 0,00',
        };
        this.mostrarPerguntaBebida = true;
        return;
      }
      // fluxo para pizza avulsa
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
        if (this.bebidaFixaComboAtiva && this.pedido && (!this.pedido.bebidas || this.pedido.bebidas.length === 0)) {
          const bebidaBrinde = {
            nome: this.routeExtras.refrigerante,
            tipo: this.routeExtras.refrigerante,
            tamanho: this.routeExtras.refrigeranteTamanho,
            preco: 0
          };
          this.pedido.bebidas = [bebidaBrinde];
          this.bebidaSelecionada = bebidaBrinde;
        }
        this.mostrarVerificacao = true;
        this.mostrarPerguntaBebida = false;
      }
    },
    finalizarBebidas(bebida) {
      this.bebidasExtras.push(bebida);
      this.mostrarBebidaOptions = false;
      this.mostrarVerificacao = true;
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
    <div v-if="mostrarPerguntaBebida" class="pergunta-bebida-container">
      <p class="pergunta-bebida-titulo">Deseja adicionar bebidas extras ao pedido?</p>
      <div class="pergunta-bebida-botoes">
        <button class="pergunta-bebida-btn sim" @click="escolherBebida(true)">Sim</button>
        <button class="pergunta-bebida-btn nao" @click="escolherBebida(false)">Não</button>
      </div>
    </div>
    <div v-if="mostrarBebidaOptions">
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

