<template>
  <div class="tempo-entrega-container">
    <div class="tempo-header">
      <img src="@/assets/imagens/fundo.png" alt="Fundo" class="header-bg" />
      <div class="header-content">
        <img src="@/assets/imagens/logo.png" alt="Logo" class="logo" />
        <h1>Tempo de Entrega</h1>
      </div>
    </div>
    <div class="tempo-box">
      <div class="tempo-info">
        <span class="tempo-estimado">Tempo estimado:</span>
        <span class="tempo">{{ tempoMin }}-{{ tempoMax }} min</span>
      </div>
      <div class="progress-bar">
        <div class="progress" :style="{ width: progresso + '%' }"></div>
      </div>
      <div class="status-list">
        <div v-for="(etapa, idx) in etapas" :key="etapa.nome" class="status-item" :class="{ ativo: idx <= etapaAtual }">
          <img :src="etapa.icone" :alt="etapa.nome" class="status-icone" />
          <span>{{ etapa.nome }}</span>
        </div>
      </div>
      <div class="opcoes">
        <button class="voltar" @click="voltarMenu">Voltar ao Menu</button>
        <button class="detalhes" @click="verDetalhes">Ver Detalhes do Pedido</button>
        <button class="ajuda" @click="abrirAjuda">Precisa de Ajuda?</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TempoEntrega',
  data() {
    return {
      tempoMin: 30,
      tempoMax: 45,
      progresso: 60, // valor fictício, pode ser dinâmico
      etapaAtual: 1, // 0: Recebido, 1: Preparando, 2: Saiu para entrega, 3: Entregue
      etapas: [
        { nome: 'Recebido', icone: new URL('@/assets/imagens/Verificar.png', import.meta.url).href },
        { nome: 'Preparando', icone: new URL('@/assets/imagens/Borda.png', import.meta.url).href },
        { nome: 'Saiu para entrega', icone: new URL('@/assets/imagens/ingressos.png', import.meta.url).href },
        { nome: 'Entregue', icone: new URL('@/assets/imagens/estrela.png', import.meta.url).href }
      ]
    }
  },
  methods: {
    voltarMenu() {
      this.$router.push({ name: 'menu' })
    },
    verDetalhes() {
      this.$router.push({ name: 'PedidosProdutos' })
    },
    abrirAjuda() {
      alert('Entre em contato pelo WhatsApp: (99) 99999-9999')
    }
  }
}
</script>

<style scoped>
.tempo-entrega-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: var(--color-background);
  color: var(--color-text);
}
.tempo-header {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}
.header-bg {
  width: 100vw;
  height: 120px;
  object-fit: cover;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  opacity: 0.15;
}
.header-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--color-background-soft);
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
}
.tempo-box {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 2.5rem 3.5rem;
  box-shadow: 0 4px 16px rgba(44, 62, 80, 0.10);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 340px;
}
.tempo-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.2rem;
}
.tempo-estimado {
  font-size: 1.1rem;
  color: var(--color-text);
  opacity: 0.7;
}
.tempo {
  font-size: 2.2rem;
  font-weight: bold;
  color: var(--color-heading);
}
.progress-bar {
  width: 240px;
  height: 18px;
  background: var(--color-background-mute);
  border-radius: 9px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 1px solid var(--color-border);
}
.progress {
  height: 100%;
  background: linear-gradient(90deg, #2c3e50 60%, #f2c94c 100%);
  transition: width 0.5s;
}
.status-list {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 1.5rem 0 1rem 0;
  gap: 0.5rem;
}
.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.95rem;
  color: var(--color-text);
  opacity: 0.5;
  transition: opacity 0.3s, color 0.3s;
}
.status-item.ativo {
  color: #2c3e50;
  opacity: 1;
  font-weight: bold;
}
.status-icone {
  width: 32px;
  height: 32px;
  margin-bottom: 0.3rem;
}
.opcoes {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}
.voltar, .detalhes, .ajuda {
  background: var(--color-heading);
  color: var(--color-background);
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}
.detalhes {
  background: #f2c94c;
  color: #2c3e50;
}
.ajuda {
  background: #e74c3c;
  color: #fff;
}
.voltar:hover, .detalhes:hover, .ajuda:hover {
  filter: brightness(0.95);
  opacity: 0.85;
}
@media (max-width: 600px) {
  .tempo-box {
    min-width: 90vw;
    padding: 1.2rem 0.5rem;
  }
  .progress-bar {
    width: 90vw;
    min-width: 120px;
  }
}
</style>
