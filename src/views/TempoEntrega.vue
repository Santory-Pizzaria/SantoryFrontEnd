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
  <div class="tempo-entrega-bg-novo">
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
      <section class="tempo-box-novo tempo-box-card">
        <div class="tempo-info-novo tempo-info-card">
          <span class="tempo-estimado-novo">Tempo estimado:</span>
          <span class="tempo-novo tempo-novo-card">
            <template v-if="tempoEntregaMin !== null">
              {{ tempoEntregaMin + 45 }} min
            </template>
            <template v-else>
              {{ tempoMin }}-{{ tempoMax }} min
            </template>
          </span>
        </div>
        <div class="taxa-entrega-novo taxa-entrega-card">
          <label for="local">Selecione seu bairro:</label>
          <select id="local" v-model="bairroSelecionado">
            <option disabled value="">Selecione</option>
            <option v-for="bairro in bairros" :key="bairro.nome" :value="bairro.nome">
              {{ bairro.nome }}
            </option>
          </select>
          <span v-if="taxaEntrega !== null" class="taxa-novo taxa-novo-card">
            Taxa de entrega: <b>R$ {{ taxaEntrega.toFixed(2) }}</b>
          </span>
          <span v-if="loadingTaxa" class="loading-taxa-novo">Calculando...</span>
        </div>
        <div class="status-list-novo status-list-card">
          <div v-for="(etapa, idx) in etapas" :key="etapa.nome" class="status-item-novo status-item-card" :class="{ ativo: idx <= etapaAtual }">
            <img :src="etapa.icone" :alt="etapa.nome" class="status-icone-novo status-icone-card" />
            <span>{{ etapa.nome }}</span>
          </div>
        </div>
        <div class="opcoes-novo opcoes-card">
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
.tempo-entrega-bg-novo {
  min-height: 100vh;
  background: url('@/assets/imagens/fundo.png') center center/cover no-repeat;
  display: flex;
  flex-direction: column;
}
.tempo-header-novo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
  position: relative;
}
.seta-voltar-tempo-novo {
  position: absolute;
  left: 32px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: filter 0.2s;
}

.logo-novo {
  position: absolute;
  top: 18px;
  right: 32px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: none;
  background: transparent;
  margin: 0;
  display: block;
}
.header-center-novo {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: none;
  gap: 0.2rem;
  width: 100%;
}
.titulo-novo {
  font-size: 2rem;
  font-weight: 800;
  color: #2b2323;
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
  border: 2.5px solid #ffe066;
  border-radius: 20px;
  padding: 2.5rem 3.5rem;
  box-shadow: 0 4px 16px #ffe06633;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 340px;
  max-width: 420px;
}
.tempo-box-card {
  background: #fffbe6;
  border-radius: 24px;
  box-shadow: 0 8px 40px #ffe06633;
  border: 2.5px solid #ffe066;
  padding: 2.5rem 3.5rem;
  margin-top: 2rem;
  min-width: 340px;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tempo-info-novo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.2rem;
}
.tempo-info-card {
  margin-bottom: 1.2rem;
  text-align: center;
}
.tempo-estimado-novo {
  font-size: 1.1rem;
  color: #ffe066;
  opacity: 0.9;
}
.tempo-novo {
  font-size: 2.2rem;
  font-weight: bold;
  color: #111;
}
.tempo-novo-card {
  font-size: 2.2rem;
  font-weight: bold;
  color: #b33c1a;
}
.taxa-entrega-novo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.2rem;
  gap: 0.3rem;
}
.taxa-entrega-card {
  margin-bottom: 1.2rem;
  gap: 0.3rem;
  text-align: center;
}
.taxa-entrega-novo label {
  font-size: 1rem;
  color: #111;
  opacity: 0.9;
}
.taxa-entrega-novo select {
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  border: 1.5px solid #ffe066;
  background: #fff;
  color: #111;
  font-size: 1rem;
}
.taxa-novo {
  margin-top: 0.3rem;
  font-size: 1.1rem;
  color: #111;
  font-weight: bold;
}
.taxa-novo-card {
  color: #e63946;
  font-weight: bold;
}
.loading-taxa-novo {
  margin-top: 0.3rem;
  font-size: 1rem;
  color: #ffe066;
}
.progress-bar-novo {
  width: 240px;
  height: 18px;
  background: #222;
  border-radius: 9px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 1.5px solid #ffe066;
}
.progress-bar-card {
  width: 240px;
  height: 18px;
  background: #ffe066;
  border-radius: 9px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 1.5px solid #b33c1a;
}
.progress-novo {
  height: 100%;
  background: linear-gradient(90deg, #ffe066 60%, #111 100%);
  transition: width 0.5s;
}
.status-list-novo {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 1.5rem 0 1rem 0;
  gap: 0.5rem;
}
.status-list-card {
  margin: 1.5rem 0 1rem 0;
  gap: 0.5rem;
}
.status-item-novo {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.95rem;
  color: #ffe066;
  opacity: 0.5;
  transition: opacity 0.3s, color 0.3s;
}
.status-item-card {
  color: #b33c1a;
}
.status-item-novo.ativo {
  color: #111;
  opacity: 1;
  font-weight: bold;
}
.status-item-card.ativo {
  color: #111;
  opacity: 1;
  font-weight: bold;
}
.status-icone-novo {
  width: 32px;
  height: 32px;
  margin-bottom: 0.3rem;
  filter: drop-shadow(0 2px 6px #ffe06644);
}
.status-icone-card {
  width: 32px;
  height: 32px;
  margin-bottom: 0.3rem;
  filter: drop-shadow(0 2px 6px #b33c1a44);
}
.opcoes-novo {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}
.opcoes-card {
  margin-top: 1.5rem;
  gap: 1rem;
}
.voltar-novo, .detalhes-novo, .ajuda-novo {
  background: #111;
  color: #fff;
  border: 2px solid #ffe066;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s, color 0.3s, border 0.3s;
}
.detalhes-novo {
  background: #ff9800;
  color: #fff;
  border: 2px solid #ff9800;
}
.detalhes-novo:hover {
  background: #fff3e0;
  color: #ff9800;
  border-color: #ff9800;
}
.ajuda-novo {
  background: #fff;
  color: #111;
}
.voltar-novo:hover, .detalhes-novo:hover, .ajuda-novo:hover {
  filter: brightness(0.95);
  opacity: 0.85;
  border-color: #111;
}
.mensagem-ajuda-novo {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffe066;
  color: #111;
  border: 2px solid #111;
  border-radius: 12px;
  padding: 16px 22px;
  margin-top: 1.5rem;
  font-size: 1.08rem;
  font-weight: 600;
  box-shadow: 0 2px 12px #ffe06633;
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
  box-shadow: 0 6px 24px #ffe06633, 0 1.5px 8px #1112;
}
@media (max-width: 900px) {
  .tempo-box-novo {
    min-width: 0;
    max-width: 98vw;
    padding: 1.5rem 2vw;
  }
  .tempo-box-card {
    min-width: 0;
    max-width: 98vw;
    padding: 1.5rem 2vw;
  }
  .tempo-header-novo {
    padding: 18px 2vw 8px 2vw;
  }
}
@media (max-width: 600px) {
  .tempo-header-novo {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    padding: 12px 4vw 8px 4vw;
  }
  .seta-voltar-tempo-novo {
    position: static;
    transform: none;
    margin-bottom: 6px;
    left: unset;
    top: unset;
  }
  .header-center-novo {
    align-items: center;
    justify-content: center;
    width: 100%;
    text-align: center;
  }
  .logo-novo {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
  }
  .titulo-novo {
    text-align: center;
    width: 100%;
  }
  .tempo-main-novo {
    padding: 1rem 0;
  }
  .tempo-box-novo {
    min-width: 0;
    max-width: 99vw;
    padding: 1rem 2vw;
  }
  .tempo-box-card {
    min-width: 90vw;
    padding: 1.2rem 0.5rem;
  }
  .progress-bar-novo {
    width: 90vw;
    min-width: 120px;
  }
  .progress-bar-card {
    width: 90vw;
    min-width: 120px;
  }
  .status-icone-novo {
    width: 24px;
    height: 24px;
  }
  .status-icone-card {
    width: 24px;
    height: 24px;
  }
  .opcoes-novo {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
  .opcoes-card {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
  .voltar-novo, .detalhes-novo, .ajuda-novo {
    width: 100%;
    font-size: 0.98rem;
    padding: 0.5rem 0;
  }
  .mensagem-ajuda-topo {
    min-width: 0;
    max-width: 98vw;
    padding: 10px 4vw;
    font-size: 0.98rem;
    top: 12px;
  }
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
  .tempo-box-card {
    min-width: 90vw;
    padding: 1.2rem 0.5rem;
  }
  .progress-bar-novo {
    width: 90vw;
    min-width: 120px;
  }
  .progress-bar-card {
    width: 90vw;
    min-width: 120px;
  }
  .tempo-header-novo {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
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
