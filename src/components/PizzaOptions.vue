<script>
export default {
  name: 'PizzaOptions',
  props: {
    pizzaNome: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      qtdSabores: null,
      opcoesSabores: this.getOpcoesSabores(this.pizzaNome),
      abaSelecionada: 'SALGADAS',
      bordaSelecionada: 'Sem Borda',
      step: 1,
      tabs: ['SALGADAS', 'ESPECIAIS', 'DOCES'],
      sabores: {
        SALGADAS: [
          { nome: 'Frango C/ Catupiry', desc: 'Mussarela, Frango, Catupiry e Orégano' },
          { nome: 'Bacon', desc: 'Mussarela, Bacon, Cebola, Orégano' },
          { nome: 'Calabresa', desc: 'Mussarela, Calabresa, Cebola, Orégano' },
          { nome: 'Frango C/ Bacon', desc: 'Mussarela, Frango, Bacon, Orégano' },
          { nome: 'Frango Crocante', desc: 'Mussarela, Frango Empanado, Catupiry, Orégano' },
          { nome: 'Moda da Casa', desc: 'Mussarela, Frango, Calabresa, Bacon, Catupiry, Orégano' },
          { nome: 'Portuguesa', desc: 'Mussarela, Presunto, Ovo, Cebola, Pimentão, Ervilha, Orégano' },
          { nome: 'Marguerita', desc: 'Mussarela, Tomate, Manjericão, Orégano' },
          { nome: 'Quatro Queijos', desc: 'Mussarela, Provolone, Parmesão, Catupiry, Orégano' },
          { nome: 'Pepperoni', desc: 'Mussarela, Pepperoni, Orégano' },
        ],
        ESPECIAIS: [
          { nome: 'Especial 1', desc: 'Mussarela, Presunto, Bacon, Catupiry, Orégano' },
          { nome: 'Especial 2', desc: 'Mussarela, Calabresa, Frango, Cheddar, Orégano' },
          { nome: 'Especial da Casa', desc: 'Mussarela, Frango, Bacon, Calabresa, Catupiry, Orégano' },
          { nome: 'Suprema', desc: 'Mussarela, Presunto, Calabresa, Bacon, Ovo, Orégano' },
        ],
        DOCES: [
          { nome: 'Chocolate', desc: 'Chocolate ao leite, Granulado' },
          { nome: 'Chocolate Branco', desc: 'Chocolate branco, Granulado branco' },
          { nome: 'Prestígio', desc: 'Chocolate ao leite, Coco ralado' },
          { nome: 'Sensação', desc: 'Chocolate ao leite, Morango' },
          { nome: 'Romeu e Julieta', desc: 'Mussarela, Goiabada' },
          { nome: 'Banana Nevada', desc: 'Banana, Leite condensado, Canela, Açúcar' },
          { nome: 'Brigadeiro', desc: 'Chocolate ao leite, Leite condensado, Granulado' },
          { nome: 'Beijinho', desc: 'Coco, Leite condensado, Açúcar' },
        ]
      },
      bordas: [
        'Sem Borda',
        'D/ Cheedar',
        'D/ Catupiry',
        'D/ Chocolate',
        'D/ Chocolate Branco'
      ],
      saboresSelecionados: [],
      erroSabores: '',
      erroSelecaoSabores: ''
    }
  },
  watch: {
    pizzaNome(newVal) {
      this.qtdSabores = null; // Limpa seleção ao trocar pizza
      this.opcoesSabores = this.getOpcoesSabores(newVal);
      this.saboresSelecionados = [];
    }
  },
  methods: {
    getOpcoesSabores(nome) {
      const nomeLower = nome.toLowerCase();
      if (nomeLower.includes('média')) return [1, 2];
      if (nomeLower.includes('pequena')) return [1];
      if (nomeLower.includes('família') || nomeLower.includes('grande')) return [1, 2, 3, 4];
      return [1];
    },
    getQtdSaboresPorTamanho(nome) {
      const nomeLower = nome.toLowerCase();
      if (nomeLower.includes('família') || nomeLower.includes('grande')) return 4;
      if (nomeLower.includes('média')) return 2;
      if (nomeLower.includes('pequena')) return 1;
      return 1;
    },
    adicionarSabor(sabor) {
      if (this.saboresSelecionados.length < this.qtdSabores) {
        if (!this.saboresSelecionados.find(s => s.nome === sabor.nome)) {
          this.saboresSelecionados.push({
            nome: sabor.nome,
          });
          this.atualizarFracoes();
        }
      }
    },
    removerSabor(sabor) {
      const idx = this.saboresSelecionados.findIndex(s => s.nome === sabor.nome);
      if (idx !== -1) {
        this.saboresSelecionados.splice(idx, 1);
        this.atualizarFracoes();
      }
    },
    atualizarFracoes() {
      let fracao = this.getFracao();
      this.saboresSelecionados = this.saboresSelecionados.map(s => ({ ...s, fracao }));
    },
    getFracao() {
      if (this.qtdSabores === 1) return 'Inteira';
      if (this.qtdSabores === 2) return '1/2';
      if (this.qtdSabores === 3) return '1/3';
      if (this.qtdSabores === 4) return '1/4';
      return '';
    },
    isSaborAdicionado(sabor) {
      return this.saboresSelecionados.some(s => s.nome === sabor.nome);
    },
    finalizarSelecao() {
      // Criar objeto do pedido com todos os dados selecionados
      const pedidoSelecionado = {
        pizzaNome: this.pizzaNome,
        saboresSelecionados: this.saboresSelecionados,
        bordaSelecionada: this.bordaSelecionada,
        qtdSabores: this.qtdSabores,
        valor: this.calcularValor(),
        quantidade: 1
      };

      this.$emit('finish', pedidoSelecionado);
    },
    continuarSabores() {
      if (!this.qtdSabores) {
        this.erroSabores = 'Escolha a quantidade de sabores.';
        return;
      }
      this.erroSabores = '';
      this.step = 2;
    },
    continuarFinalizar() {
      if (this.saboresSelecionados.length !== this.qtdSabores) {
        this.erroSelecaoSabores = `Escolha exatamente ${this.qtdSabores} sabor${this.qtdSabores > 1 ? 'es' : ''}.`;
        return;
      }
      this.erroSelecaoSabores = '';
      this.finalizarSelecao();
    },
    calcularValor() {
      // Lógica para calcular o valor baseado no tamanho da pizza
      const nomeLower = this.pizzaNome.toLowerCase();
      let valorBase = 0;

      if (nomeLower.includes('família')) {
        valorBase = 45.00;
      } else if (nomeLower.includes('grande')) {
        valorBase = 35.00;
      } else if (nomeLower.includes('média')) {
        valorBase = 25.00;
      } else if (nomeLower.includes('pequena')) {
        valorBase = 18.00;
      } else {
        valorBase = 25.00; // valor padrão
      }

      // Adicionar custo da borda se não for "Sem Borda"
      if (this.bordaSelecionada !== 'Sem Borda') {
        valorBase += 5.00;
      }

      return `R$ ${valorBase.toFixed(2).replace('.', ',')}`;
    }
  }
}
</script>


<template>
  <div class="pizza-options-container">
    <header class="header">
      <button class="back-btn" @click="$router.push('/pizza-card')">
        <img src="/src/assets/imagens/seta.png" alt="Voltar" />
      </button>
      <span class="pizza-title">{{ pizzaNome }}</span>
    </header>
    <section v-if="step === 1" class="section">
      <h2 class="section-title">Quantos Sabores?</h2>
      <div class="options-list">
        <label v-for="q in opcoesSabores" :key="q" class="option-card">
          <input type="radio" name="qtdSabores" :value="q" v-model="qtdSabores" />
          <span>{{ q }} Sabor{{ q > 1 ? 'es' : '' }}</span>
        </label>
      </div>
      <div v-if="erroSabores" class="erro-msg">{{ erroSabores }}</div>
      <button class="nav-btn" @click="continuarSabores">Continuar</button>
    </section>
    <section v-if="step === 2" class="section">
      <h2 class="section-title">Bordas:</h2>
      <div class="options-list">
        <label v-for="borda in bordas" :key="borda" class="option-card">
          <input type="radio" name="borda" :value="borda" v-model="bordaSelecionada" />
          <span>{{ borda }}</span>
        </label>
      </div>
      <div class="step-buttons">
        <button class="nav-btn secondary" @click="step = 1">Voltar</button>
        <button class="nav-btn" @click="step = 3">Continuar</button>
      </div>
    </section>
    <section v-if="step === 3" class="section">
      <h2 class="section-title">Sabores:</h2>
      <div class="tabs">
        <button v-for="tab in tabs" :key="tab" :class="['tab', {active: tab === abaSelecionada}]" @click="abaSelecionada = tab">{{ tab }}</button>
      </div>
      <div class="options-list">
        <div v-for="(sabor, i) in sabores[abaSelecionada]" :key="i" :class="['option-card', 'sabor-card', { 'adicionado': isSaborAdicionado(sabor), 'desabilitado': !isSaborAdicionado(sabor) && saboresSelecionados.length >= qtdSabores }]">
          <button class="plus-btn" @click="adicionarSabor(sabor)" :disabled="!isSaborAdicionado(sabor) && saboresSelecionados.length >= qtdSabores">+</button>
          <div class="sabor-info">
            <span class="sabor-nome">{{ sabor.nome }}</span>
            <span class="sabor-desc">{{ sabor.desc }}</span>
          </div>
          <button class="minus-btn" @click="removerSabor(sabor)" :disabled="!isSaborAdicionado(sabor)">-</button>
        </div>
      </div>
      <div v-if="erroSelecaoSabores" class="erro-msg">{{ erroSelecaoSabores }}</div>
      <div class="step-buttons">
        <button class="nav-btn secondary" @click="step = 2">Voltar</button>
        <button class="nav-btn" @click="continuarFinalizar">Finalizar</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.pizza-options-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0001;
  padding-bottom: 32px;
}
.header {
  width: 100%;
  background: #ff9800;
  color: #fff;
  padding: 16px 0 8px 0;
  text-align: center;
  position: relative;
}
.pizza-title {
  font-size: 1.5rem;
  font-weight: bold;
}
.back-btn {
  position: absolute;
  left: 16px;
  top: 5px;
  background: none;
  border: none;
  cursor: pointer;

}
.back-btn img {
  width: 45px;
  height: 45px;
}
.section {
  margin: 24px 0 0 0;
  padding: 0 24px;
}
.section-title {
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 12px;
  text-align: center;
}
.options-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}
.option-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px #0002;
  padding: 18px 32px;
  min-width: 320px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: box-shadow 0.2s;
  border-left: #ff9800 4px solid;
}
.option-card.adicionado {
  background: #fffbe6;
  border-left: #ff9800 6px solid;
  box-shadow: 0 2px 8px #ff980033;
}
.option-card.desabilitado {
  opacity: 0.5;
  pointer-events: none;
}
.option-card input[type="radio"] {
  margin-right: 18px;
  width: 22px;
  height: 22px;
}
.sabor-card {
  justify-content: space-between;
  gap: 12px;
}
.sabor-info {
  flex: 1;
  text-align: left;
}
.sabor-nome {
  font-weight: bold;
  display: block;
}
.sabor-desc {
  font-size: 0.95rem;
  color: #444;
}
.plus-btn, .minus-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #222;
  cursor: pointer;
  width: 36px;
  height: 36px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.plus-btn:disabled,
.minus-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  gap: 32px;
}
.tab {
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  color: #aaa;
  padding: 8px 16px;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: color 0.2s, border-bottom 0.2s;
}
.tab.active {
  color: #ff9800;
  border-bottom: 2px solid #ff9800;
}
.nav-btn {
  display: block;
  margin: 24px auto;
  padding: 12px 24px;
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
.step-buttons {
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
}
.nav-btn.secondary {
  background: #ccc;
  color: #333;
}
.erro-msg {
  color: #d32f2f;
  background: #fff3f3;
  border: 1px solid #d32f2f;
  border-radius: 4px;
  padding: 8px 12px;
  margin: 12px 0 0 0;
  font-size: 1rem;
  text-align: center;
}
@media (max-width: 600px) {
  .pizza-options-container {
    max-width: 98vw;
    margin: 0;
    border-radius: 0;
  }
  .option-card {
    min-width: 90vw;
    padding: 16px 8px;
  }
}
</style>
