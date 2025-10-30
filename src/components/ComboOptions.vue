<template>
  <div class="combo-options-container">
    <header class="header">
      <button class="back-btn" @click="$router.push('/combo-list')">
        <img src="/src/assets/imagens/seta-preta.png" alt="Voltar" />
      </button>
      <span class="combo-title">Escolha seu Combo</span>
    </header>
    <section class="section">
      <h2 class="section-title">Combos Disponíveis</h2>
      <div class="options-list">
        <div v-for="(combo, i) in combos" :key="i" :class="['option-card', { 'adicionado': comboSelecionado && comboSelecionado.nome === combo.nome }]">
          <button class="plus-btn" @click="selecionarCombo(combo)">+</button>
          <div class="combo-info">
            <span class="combo-nome">{{ combo.nome }}</span>
            <span class="combo-desc">{{ combo.desc }}</span>
            <span class="combo-valor">{{ combo.valor }}</span>
          </div>
        </div>
      </div>
      <div v-if="erroSelecao" class="erro-msg">{{ erroSelecao }}</div>
      <button class="nav-btn" @click="finalizarSelecao">Adicionar ao Carrinho</button>
    </section>
  </div>
</template>

<script>
const combos = [
  {
    nome: 'Combo Família',
    descricao: '2 Pizzas Grandes + 1 Guaraná 2L',
    valor: 89.90,
    itensFixos: [
      { tipo: 'pizza', quantidade: 2, tamanho: 'Grande' },
      { tipo: 'bebida', nome: 'Guaraná', tamanho: '2L', preco: 0 }
    ]
  },
  {
    nome: 'Combo Casal',
    descricao: '1 Pizza Média + 1 Guaraná 2L',
    valor: 49.90,
    itensFixos: [
      { tipo: 'pizza', quantidade: 1, tamanho: 'Média' },
      { tipo: 'bebida', nome: 'Guaraná', tamanho: '2L', preco: 0 }
    ]
  },
  {
    nome: 'Combo Kids',
    descricao: '1 Pizza Pequena + 2 Sucos',
    valor: 34.90,
    itensFixos: [
      { tipo: 'pizza', quantidade: 1, tamanho: 'Pequena' },
      { tipo: 'bebida', nome: 'Suco', tamanho: '300ml', preco: 0 }
    ]
  },
  {
    nome: 'Combo Festa',
    descricao: '3 Pizzas Grandes + 3 Refrigerantes',
    valor: 129.90,
    itensFixos: [
      { tipo: 'pizza', quantidade: 3, tamanho: 'Grande' },
      { tipo: 'bebida', nome: 'Refrigerante', tamanho: '2L', preco: 0 }
    ]
  }
];

export default {
  name: 'ComboOptions',
  data() {
    return {
      combos,
      comboSelecionado: null,
      erroSelecao: '',
      bebidasExtras: [] // Para bebidas extras
    }
  },
  methods: {
    selecionarCombo(combo) {
      this.comboSelecionado = combo;
      this.erroSelecao = '';
    },
    adicionarBebidaExtra(bebida) {
      this.bebidasExtras.push(bebida);
    },
    finalizarSelecao() {
      if (!this.comboSelecionado) {
        this.erroSelecao = 'Selecione um combo para continuar.';
        return;
      }
      // Adiciona Guaraná como bebida fixa ao combo
      const bebidas = [
        { nome: 'Guaraná', tipo: 'Refrigerante', tamanho: '2L', preco: 0 }
      ];
      const pedido = {
        combo: this.comboSelecionado,
        pizzas: [], // será preenchido na próxima etapa
        bebidas
      };
      this.$emit('finish', pedido);
    }
  }
}
</script>

<style scoped>
.combo-options-container {
  background: linear-gradient(120deg, #fffbe6 60%, #ffe5b4 100%);
  border-radius: 32px;
  box-shadow: 0 12px 48px #b33c1a33;
  padding-bottom: 32px;
  max-width: 480px;
  margin: 32px auto;
  position: relative;
  border: 2px solid #ff9800;
  animation: fadein 0.7s;
}
.header {
  width: 100%;
  background: linear-gradient(90deg, #ff9800 0%, #b33c1a 100%);
  color: #fff;
  padding: 24px 0 12px 0;
  text-align: center;
  position: relative;
  border-radius: 32px 32px 0 0;
  box-shadow: 0 4px 18px #b33c1a22;
}
.combo-title {
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 2px;
  font-family: 'Playfair Display', serif;
  text-shadow: 0 2px 8px #b33c1a44;
}
.back-btn {
  position: absolute;
  left: 18px;
  top: 18px;
  background: #fffbe6;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 2px 8px #b33c1a22;
  padding: 4px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.back-btn img {
  width: 32px;
  height: 32px;
  display: block;
}
.section {
  margin: 24px 0 0 0;
  padding: 0 18px;
}
.section-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 14px;
  text-align: center;
  color: #b33c1a;
  font-family: 'Playfair Display', serif;
  text-shadow: 0 2px 8px #ff980044;
}
.options-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
}
.option-card {
  display: flex;
  align-items: center;
  background: #fffbe6;
  border-radius: 12px;
  box-shadow: 0 2px 8px #ff980033;
  padding: 12px 18px;
  min-width: 220px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  border-left: #ff9800 5px solid;
  transition: box-shadow 0.2s, border 0.2s, background 0.2s;
}
.option-card.adicionado {
  background: #ffe5b4;
  border-left: #b33c1a 7px solid;
  box-shadow: 0 4px 16px #b33c1a22;
}
.plus-btn {
  background: linear-gradient(90deg, #ff9800 0%, #b33c1a 100%);
  border: none;
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;
  width: 28px;
  height: 28px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 2px 8px #b33c1a22;
  transition: background 0.2s;
  margin-right: 12px;
}
.combo-info {
  flex: 1;
  text-align: left;
}
.combo-nome {
  font-weight: bold;
  display: block;
  color: #b33c1a;
  font-size: 1rem;
}
.combo-desc {
  font-size: 0.95rem;
  color: #444;
}
.combo-valor {
  font-size: 1.05rem;
  color: #388e3c;
  font-weight: 700;
  margin-top: 2px;
}
.nav-btn {
  display: block;
  margin: 18px auto 0 auto;
  padding: 10px 18px;
  background: linear-gradient(90deg, #ff9800 0%, #b33c1a 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  box-shadow: 0 2px 8px #b33c1a22;
  transition: background 0.2s;
}
.erro-msg {
  color: #d32f2f;
  background: #fff3f3;
  border: 1px solid #d32f2f;
  border-radius: 4px;
  padding: 8px 12px;
  margin: 12px 0 0 0;
  font-size: 0.95rem;
  text-align: center;
}
@media (max-width: 600px) {
  .combo-options-container {
    max-width: 99vw;
    margin: 0;
    border-radius: 0;
    padding-bottom: 8px;
  }
  .option-card {
    min-width: 90vw;
    padding: 10px 4px;
  }
  .header {
    padding: 10px 0 4px 0;
    border-radius: 0;
  }
  .combo-title {
    font-size: 1rem;
  }
  .section {
    padding: 0 4px;
  }
}
</style>
