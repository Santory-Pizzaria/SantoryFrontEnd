<template>
  <div class="pizza-options-container">
    <header class="header">
      <button class="back-btn" @click="$emit('voltar')">
        <img src="/src/assets/imagens/seta.png" alt="Voltar" />
      </button>
      <span class="pizza-title">{{ pizzaNome }}</span>
    </header>
    <!-- Step 1: Quantos Sabores -->
    <section v-if="step === 1" class="section">
      <h2 class="section-title">Quantos Sabores?</h2>
      <div class="options-list">
        <label v-for="q in [1,2,3,4]" :key="q" class="option-card">
          <input type="radio" name="qtdSabores" :value="q" v-model="qtdSabores" />
          <span>{{ q }} Sabor{{ q > 1 ? 'es' : '' }}</span>
        </label>
      </div>
      <button class="nav-btn" @click="step = 2">Continuar</button>
    </section>
    <!-- Step 2: Bordas -->
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
    <!-- Step 3: Sabores -->
    <section v-if="step === 3" class="section">
      <h2 class="section-title">Sabores:</h2>
      <div class="tabs">
        <button v-for="tab in tabs" :key="tab" :class="['tab', {active: tab === abaSelecionada}]" @click="abaSelecionada = tab">{{ tab }}</button>
      </div>
      <div class="options-list">
        <div v-for="(sabor, i) in sabores[abaSelecionada]" :key="i" class="option-card sabor-card">
          <button class="plus-btn" @click="adicionarSabor(sabor)">+</button>
          <div class="sabor-info">
            <span class="sabor-nome">{{ sabor.nome }}</span>
            <span class="sabor-desc">{{ sabor.desc }}</span>
          </div>
          <button class="minus-btn" @click="removerSabor(sabor)">-</button>
        </div>
      </div>
      <div class="step-buttons">
        <button class="nav-btn secondary" @click="step = 2">Voltar</button>
        <button class="nav-btn" @click="$emit('finish')">Finalizar</button>
      </div>
    </section>
  </div>
</template>

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
      qtdSabores: 1,
      abaSelecionada: 'SALGADAS',
      bordaSelecionada: 'Sem Borda',
      step: 1,
      tabs: ['SALGADAS', 'ESPECIAIS', 'DOCES'],
      sabores: {
        SALGADAS: [
          { nome: 'Frango C/ Catupiry', desc: 'Mussarela, Frango, Catupiry e Orégano' },
          { nome: 'Frango C/ Catupiry', desc: 'Mussarela, Frango, Catupiry e Orégano' },
          { nome: 'Frango C/ Catupiry', desc: 'Mussarela, Frango, Catupiry e Orégano' },
          { nome: 'Frango C/ Catupiry', desc: 'Mussarela, Frango, Catupiry e Orégano' },
        ],
        ESPECIAIS: [
          { nome: 'Especial 1', desc: 'Descrição especial 1' },
          { nome: 'Especial 2', desc: 'Descrição especial 2' },
        ],
        DOCES: [
          { nome: 'Chocolate', desc: 'Chocolate ao leite' },
          { nome: 'Chocolate Branco', desc: 'Chocolate branco' },
        ]
      },
      bordas: [
        'Sem Borda',
        'D/ Cheedar',
        'D/ Catupiry',
        'D/ Chocolate',
        'D/ Chocolate Branco'
      ]
    }
  },
  methods: {
    adicionarSabor(sabor) {
      // lógica para adicionar sabor
    },
    removerSabor(sabor) {
      // lógica para remover sabor
    }
  }
}
</script>

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
