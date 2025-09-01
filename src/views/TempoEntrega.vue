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
      tempoEntregaMin: null,
      loadingTaxa: false,
      showAjuda: false,
    }
  },
  watch: {
    bairroSelecionado(novoBairro) {
      if (novoBairro) {
        this.calcularTaxaEntrega(novoBairro)
      } else {
        this.taxaEntrega = null
        this.tempoEntregaMin = null
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
          typeof data.features[0].properties.summary.distance === 'number' &&
          typeof data.features[0].properties.summary.duration === 'number'
        ) {
          const distanciaMetros = data.features[0].properties.summary.distance
          const distanciaKm = distanciaMetros / 1000
          this.taxaEntrega = Number((5 + (distanciaKm * 2)).toFixed(2))
          // Tempo de entrega em minutos
          const duracaoSegundos = data.features[0].properties.summary.duration
          this.tempoEntregaMin = Math.ceil(duracaoSegundos / 60)
        } else {
          this.taxaEntrega = null
          this.tempoEntregaMin = null
          alert('Não foi possível calcular a taxa de entrega. Dados insuficientes.')
        }
      } catch {
        this.taxaEntrega = null
        this.tempoEntregaMin = null
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
      this.showAjuda = true;
      setTimeout(() => {
        this.showAjuda = false;
      }, 4000);
    }
  }
}
</script>

<template>
  <div class="tempo-entrega-novo">
    <header class="tempo-header-novo">
      <img
        src="@/assets/imagens/seta-preta.png"
        alt="Voltar ao Menu"
        class="seta-voltar-tempo-novo"
        @click="voltarMenu"
      />
      <div class="header-center-novo">
        <img src="@/assets/imagens/logo.png" alt="Logo" class="logo-novo" />
        <h1 class="titulo-novo">Tempo de Entrega</h1>
      </div>
    </header>
    <main class="tempo-main-novo">
      <section class="tempo-box-novo">
        <div class="tempo-info-novo">
          <span class="tempo-estimado-novo">Tempo estimado:</span>
          <span class="tempo-novo">
            <template v-if="tempoEntregaMin !== null">
              {{ tempoEntregaMin + 45 }} min
            </template>
            <template v-else>
              {{ tempoMin }}-{{ tempoMax }} min
            </template>
          </span>
        </div>
        <div class="taxa-entrega-novo">
          <label for="local">Selecione seu bairro:</label>
          <select id="local" v-model="bairroSelecionado">
            <option disabled value="">Selecione</option>
            <option v-for="bairro in bairros" :key="bairro.nome" :value="bairro.nome">
              {{ bairro.nome }}
            </option>
          </select>
          <span v-if="taxaEntrega !== null" class="taxa-novo">
            Taxa de entrega: R$ {{ taxaEntrega.toFixed(2) }}
          </span>
          <span v-if="loadingTaxa" class="loading-taxa-novo">Calculando...</span>
        </div>
        <div class="progress-bar-novo">
          <div class="progress-novo" :style="{ width: progresso + '%' }"></div>
        </div>
        <div class="status-list-novo">
          <div v-for="(etapa, idx) in etapas" :key="etapa.nome" class="status-item-novo" :class="{ ativo: idx <= etapaAtual }">
            <img :src="etapa.icone" :alt="etapa.nome" class="status-icone-novo" />
            <span>{{ etapa.nome }}</span>
          </div>
        </div>
        <div class="opcoes-novo">
          <button class="voltar-novo" @click="voltarMenu">Voltar ao Menu</button>
          <button class="detalhes-novo" @click="verDetalhes">Ver Detalhes do Pedido</button>
          <button class="ajuda-novo" @click="abrirAjuda">Precisa de Ajuda?</button>
        </div>
        <transition name="ajuda-fade">
          <div v-if="showAjuda" class="mensagem-ajuda-novo mensagem-ajuda-topo">
            <img src="@/assets/imagens/whatsapp.png" alt="WhatsApp" class="ajuda-icone-novo" />
            <span>Entre em contato pelo <b>WhatsApp</b>: <a href="https://wa.me/55479988042804" target="_blank">(47) 99880-42804</a></span>
          </div>
        </transition>
      </section>
    </main>
  </div>
</template>

<style scoped>
.tempo-entrega-novo {
  min-height: 100vh;
  background: linear-gradient(120deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  flex-direction: column;
}
.tempo-header-novo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 32px 12px 32px;
  background: #fff;
  border-bottom: 2px solid #64748b;
  box-shadow: 0 2px 12px #64748b22;
  gap: 1.5rem;
}
.seta-voltar-tempo-novo {
  width: 32px;
  height: 32px;
  cursor: pointer;
  filter: drop-shadow(0 2px 6px #64748b44);
  transition: filter 0.2s, transform 0.2s;
}
.seta-voltar-tempo-novo:hover {
  filter: brightness(1.2) drop-shadow(0 4px 12px #64748b66);
  transform: scale(1.08);
}
.header-center-novo {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 0.2rem;
}
.logo-novo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0 2px 8px #64748b22;
  margin: 0 auto 8px auto;
  display: block;
  background: #fff;
}
.titulo-novo {
  font-size: 2rem;
  font-weight: 800;
  color: #334155;
  margin-bottom: 2px;
  letter-spacing: 1px;
  text-align: center;
}
.tempo-main-novo {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  padding: 2rem 0;
}
.tempo-box-novo {
  background: #fff;
  border: 1.5px solid #64748b;
  border-radius: 20px;
  padding: 2.5rem 3.5rem;
  box-shadow: 0 4px 16px #64748b22;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 340px;
  max-width: 420px;
}
.tempo-info-novo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.2rem;
}
.tempo-estimado-novo {
  font-size: 1.1rem;
  color: #64748b;
  opacity: 0.8;
}
.tempo-novo {
  font-size: 2.2rem;
  font-weight: bold;
  color: #334155;
}
.taxa-entrega-novo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.2rem;
  gap: 0.3rem;
}
.taxa-entrega-novo label {
  font-size: 1rem;
  color: #64748b;
  opacity: 0.9;
}
.taxa-entrega-novo select {
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  border: 1px solid #64748b;
  background: #f1f5f9;
  color: #334155;
  font-size: 1rem;
}
.taxa-novo {
  margin-top: 0.3rem;
  font-size: 1.1rem;
  color: #334155;
  font-weight: bold;
}
.loading-taxa-novo {
  margin-top: 0.3rem;
  font-size: 1rem;
  color: #f59e42;
}
.progress-bar-novo {
  width: 240px;
  height: 18px;
  background: #e2e8f0;
  border-radius: 9px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 1px solid #64748b;
}
.progress-novo {
  height: 100%;
  background: linear-gradient(90deg, #334155 60%, #fbbf24 100%);
  transition: width 0.5s;
}
.status-list-novo {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 1.5rem 0 1rem 0;
  gap: 0.5rem;
}
.status-item-novo {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.95rem;
  color: #64748b;
  opacity: 0.5;
  transition: opacity 0.3s, color 0.3s;
}
.status-item-novo.ativo {
  color: #334155;
  opacity: 1;
  font-weight: bold;
}
.status-icone-novo {
  width: 32px;
  height: 32px;
  margin-bottom: 0.3rem;
}
.opcoes-novo {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}
.voltar-novo, .detalhes-novo, .ajuda-novo {
  background: #334155;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}
.detalhes-novo {
  background: #fbbf24;
  color: #334155;
}
.ajuda-novo {
  background: #f87171;
  color: #fff;
}
.voltar-novo:hover, .detalhes-novo:hover, .ajuda-novo:hover {
  filter: brightness(0.95);
  opacity: 0.85;
}
.mensagem-ajuda-novo {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fbbf24;
  color: #334155;
  border: 2px solid #f59e42;
  border-radius: 12px;
  padding: 16px 22px;
  margin-top: 1.5rem;
  font-size: 1.08rem;
  font-weight: 600;
  box-shadow: 0 2px 12px #fbbf2433;
  animation: ajudaPopIn 0.4s;
}
.mensagem-ajuda-topo {
  position: fixed;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  min-width: 320px;
  max-width: 90vw;
  justify-content: center;
  box-shadow: 0 6px 24px #fbbf2433, 0 1.5px 8px #64748b22;
}
@media (max-width: 600px) {
  .mensagem-ajuda-topo {
    top: 12px;
    left: 50%;
    min-width: 0;
    max-width: 98vw;
    padding: 10px 4vw;
    font-size: 0.98rem;
    transform: translateX(-50%);
  }
}
@media (max-width: 600px) {
  .tempo-box-novo {
    min-width: 90vw;
    padding: 1.2rem 0.5rem;
  }
  .progress-bar-novo {
    width: 90vw;
    min-width: 120px;
  }
  .tempo-header-novo {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
    padding: 18px 8px 8px 8px;
  }
  .header-center-novo {
    align-items: flex-start;
  }
}
.ajuda-icone-novo {
  width: 32px;
  height: 32px;
  object-fit: contain;
}
.ajuda-fade-enter-active, .ajuda-fade-leave-active {
  transition: opacity 0.4s;
}
.ajuda-fade-enter-from, .ajuda-fade-leave-to {
  opacity: 0;
}
@keyframes ajudaPopIn {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
