<script>
export default {
  name: 'TempoEntrega',
  data() {
    return {
      tempoMin: 30,
      tempoMax: 45,
      progresso: 60,
      etapaAtual: 1,
      bairroSelecionado: '',
      bairros: [
        { nome: 'Centro' },
        { nome: 'Jardim das Flores' },
        { nome: 'Vila Nova' },
        { nome: 'Bairro Industrial' },
        { nome: 'Porto Grande' },
        { nome: 'Santa Luzia' },
        { nome: 'São João' },
        { nome: 'Itinga' },
        { nome: 'Estrada Nova' },
        { nome: 'Vila Lenzi' }
      ],
      etapas: [
        { nome: 'Recebido', icone: new URL('@/assets/imagens/Verificar.png', import.meta.url).href },
        { nome: 'Preparando', icone: new URL('@/assets/imagens/Borda.png', import.meta.url).href },
        { nome: 'Saiu para entrega', icone: new URL('@/assets/imagens/ingressos.png', import.meta.url).href },
        { nome: 'Entregue', icone: new URL('@/assets/imagens/estrela.png', import.meta.url).href }
      ],
      taxaEntrega: null,
      loadingTaxa: false
    }
  },
  watch: {
    bairroSelecionado(novoBairro) {
      if (novoBairro) {
        this.calcularTaxaEntrega(novoBairro)
      } else {
        this.taxaEntrega = null
      }
    }
  },
  methods: {
    async calcularTaxaEntrega(bairro) {
      this.loadingTaxa = true
      try {
        const origem = [-48.8493, -26.3045] // [longitude, latitude]
        const destinos = {
          'Centro': [-48.8494, -26.3046],
          'Jardim das Flores': [-48.8700, -26.3200],
          'Vila Nova': [-48.9000, -26.3200],
          'Bairro Industrial': [-48.8600, -26.3100],
          'Porto Grande': [-48.8800, -26.3300],
          'Santa Luzia': [-48.8700, -26.3400],
          'São João': [-48.8600, -26.3500],
          'Itinga': [-48.9100, -26.3400],
          'Estrada Nova': [-48.8900, -26.3100],
          'Vila Lenzi': [-48.8800, -26.3200]
        }
        const destino = destinos[bairro]
        if (!destino) throw new Error('Bairro não encontrado')
        const apiKey = '5b3ce3597851110001cf624832b9ce60b0a846f0a395734793e8b9c4'
        const url = `https://api.openrouteservice.org/v2/directions/driving-car/geojson`
        const body = {
          coordinates: [origem, destino]
        }
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(body)
        })
        const data = await response.json()
        if (
          data &&
          data.features &&
          data.features[0] &&
          data.features[0].properties &&
          data.features[0].properties.summary &&
          typeof data.features[0].properties.summary.distance === 'number'
        ) {
          const distanciaMetros = data.features[0].properties.summary.distance
          const distanciaKm = distanciaMetros / 1000
          this.taxaEntrega = Number((5 + (distanciaKm * 2)).toFixed(2))
        } else {
          this.taxaEntrega = null
          alert('Não foi possível calcular a taxa de entrega. Dados insuficientes.')
        }
      } catch (e) {
        this.taxaEntrega = null
        alert('Não foi possível calcular a taxa de entrega.')
      }
      this.loadingTaxa = false
    },
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
      <div class="taxa-entrega">
        <label for="local">Selecione seu bairro:</label>
        <select id="local" v-model="bairroSelecionado">
          <option disabled value="">Selecione</option>
          <option v-for="bairro in bairros" :key="bairro.nome" :value="bairro.nome">
            {{ bairro.nome }}
          </option>
        </select>
        <span v-if="taxaEntrega !== null" class="taxa">
          Taxa de entrega: R$ {{ taxaEntrega.toFixed(2) }}
        </span>
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
.taxa-entrega {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.2rem;
  gap: 0.3rem;
}
.taxa-entrega label {
  font-size: 1rem;
  color: var(--color-text);
  opacity: 0.8;
}
.taxa-entrega select {
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-background-mute);
  color: var(--color-text);
  font-size: 1rem;
}
.taxa {
  margin-top: 0.3rem;
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: bold;
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
