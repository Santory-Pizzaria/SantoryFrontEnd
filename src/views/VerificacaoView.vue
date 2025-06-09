<template>
  <div class="verificacao-container">
    <header class="verificacao-header">
      <span class="verificacao-title">Verificação</span>
    </header>
    <div class="verificacao-content">
      <h2 class="verificacao-subtitle">Conferência:</h2>
      <div class="verificacao-card">
        <h3 class="pizza-tipo">{{ pedido.pizzaNome }}</h3>
        <div class="verificacao-info">
          <b>Sabores:</b>
          <ul>
            <li v-for="(sabor, idx) in pedido.saboresSelecionados" :key="idx">
              -{{ sabor.fracao }} {{ sabor.nome }}
            </li>
          </ul>
          <div><b>Borda:</b> {{ pedido.bordaSelecionada }}</div>
          <div><b>Frete:</b> {{ pedido.frete }}</div>
          <div><b>Valor:</b> {{ pedido.valor }}</div>
        </div>
        <div class="verificacao-qtd">
          <span>{{ pedido.quantidade }}</span>
          <button class="verificacao-btn" @click="adicionarQuantidade">+</button>
        </div>
        <div class="verificacao-actions">
          <button class="verificacao-pedir" @click="pedirMais">+ Pedir Mais</button>
          <button class="verificacao-finalizar" @click="finalizarPedido">✔ Finalizar Pedido</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerificacaoView',
  props: {
    pedido: {
      type: Object,
      required: true
    }
  },
  methods: {
    adicionarQuantidade() {
      this.$emit('atualizar-quantidade', this.pedido.quantidade + 1)
    },
    pedirMais() {
      this.$router.push('/menu')
    },
    finalizarPedido() {
      // lógica para finalizar
      alert('Pedido finalizado!')
    }
  }
}
</script>

<style scoped>
.verificacao-container {
  width: 100vw;
  min-height: 100vh;
  background: #fff;
}
.verificacao-header {
  background: #ff9800;
  color: #fff;
  text-align: center;
  padding: 18px 0 8px 0;
  font-size: 2rem;
  font-weight: bold;
}
.verificacao-title {
  font-size: 2rem;
  font-weight: bold;
}
.verificacao-content {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.verificacao-subtitle {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 18px;
}
.verificacao-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0001;
  padding: 32px 32px 24px 32px;
  min-width: 350px;
  max-width: 95vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}
.pizza-tipo {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  width: 100%;
  margin-bottom: 12px;
}
.verificacao-info {
  font-size: 1.1rem;
  margin-bottom: 12px;
}
.verificacao-info ul {
  margin: 0 0 8px 0;
  padding-left: 18px;
}
.verificacao-qtd {
  position: absolute;
  right: 32px;
  top: 32px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 1.2rem;
  color: #388e3c;
}
.verificacao-btn {
  background: none;
  border: 1.5px solid #388e3c;
  color: #388e3c;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.verificacao-actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 18px;
  gap: 18px;
}
.verificacao-pedir {
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 24px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
}
.verificacao-finalizar {
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 24px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
}
@media (max-width: 600px) {
  .verificacao-card {
    min-width: 90vw;
    padding: 16px 8px 16px 8px;
  }
}
</style>
