<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const canvasDinheiro = ref(null)
const canvasPedidos = ref(null)
const canvasEstoque = ref(null)
let chartDinheiro = null
let chartPedidos = null
let chartEstoque = null
let interval = null

const mesesDisponiveis = ref([])
const mesSelecionado = ref('')

function getTodasDatasPedidos() {
  const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]')
  return pedidos.map(p => p.data)
}

function getTodosMesesPedidos() {
  // Retorna meses únicos no formato MM/YYYY
  const datas = getTodasDatasPedidos()
  const meses = datas.map(data => {
    const [, mes, ano] = data.split('/')
    return `${mes}/${ano}`
  })
  return [...new Set(meses)].sort((a, b) => {
    const [ma, aa] = a.split('/')
    const [mb, ab] = b.split('/')
    return new Date(`${ab}-${mb}-01`) < new Date(`${aa}-${ma}-01`) ? 1 : -1
  })
}

function getDiasDoMes(mesAno) {
  // Retorna todos os dias (DD/MM/YYYY) do mês selecionado
  const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]')
  return [...new Set(pedidos.filter(p => p.data.endsWith(`/${mesAno}`)).map(p => p.data))].sort((a, b) => {
    const [da, ma, aa] = a.split('/')
    const [db, mb, ab] = b.split('/')
    return new Date(`${aa}-${ma}-${da}`) - new Date(`${ab}-${mb}-${db}`)
  })
}

function getPedidosPorDia(dia) {
  const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]')
  return pedidos.filter(p => p.data === dia)
}

function getDinheiroPorDia(dia) {
  return getPedidosPorDia(dia).reduce((soma, p) => {
    let valor = 0;
    if (typeof p.valor === 'number') {
      valor = p.valor;
    } else if (typeof p.valor === 'string') {
      valor = Number(p.valor.replace('R$', '').replace(',', '.').trim()) || 0;
    }
    return soma + valor;
  }, 0);
}

function getItensEstoqueSaidaPorDia(dia) {
  const pedidos = getPedidosPorDia(dia)
  const saida = {}
  pedidos.forEach(p => {
    (p.itens || []).forEach(item => {
      if (!saida[item.nome]) saida[item.nome] = 0
      saida[item.nome] += item.qtd || 1
    })
  })
  return saida
}

function renderGraficos() {
  if (!mesSelecionado.value) return
  const dias = getDiasDoMes(mesSelecionado.value)

  // Dinheiro ganho por dia
  if (chartDinheiro) chartDinheiro.destroy()
  chartDinheiro = new Chart(canvasDinheiro.value, {
    type: 'bar',
    data: {
      labels: dias,
      datasets: [{
        label: `Dinheiro ganho por dia (${mesSelecionado.value})`,
        data: dias.map(dia => getDinheiroPorDia(dia)),
        backgroundColor: '#4caf50',
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: `Dinheiro ganho por dia em ${mesSelecionado.value}`
        }
      },
      responsive: true
    }
  })

  // Pedidos por dia
  if (chartPedidos) chartPedidos.destroy()
  chartPedidos = new Chart(canvasPedidos.value, {
    type: 'bar',
    data: {
      labels: dias,
      datasets: [{
        label: `Pedidos por dia (${mesSelecionado.value})`,
        data: dias.map(dia => getPedidosPorDia(dia).length),
        backgroundColor: '#2196f3',
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: `Pedidos realizados por dia em ${mesSelecionado.value}`
        }
      },
      responsive: true
    }
  })

  // Saída de itens do estoque por dia (empilhado)
  if (chartEstoque) chartEstoque.destroy()
  // Coletar todos os itens vendidos no mês
  const todosItens = [...new Set(dias.flatMap(dia => Object.keys(getItensEstoqueSaidaPorDia(dia))))]
  const datasets = todosItens.map(item => ({
    label: item,
    data: dias.map(dia => getItensEstoqueSaidaPorDia(dia)[item] || 0),
    backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
  }))
  chartEstoque = new Chart(canvasEstoque.value, {
    type: 'bar',
    data: {
      labels: dias,
      datasets
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: `Saída de itens do estoque por dia em ${mesSelecionado.value}`
        }
      },
      responsive: true,
      scales: {
        x: { stacked: true },
        y: { stacked: true }
      }
    }
  })
}

function atualizarMeses() {
  mesesDisponiveis.value = getTodosMesesPedidos()
  if (!mesesDisponiveis.value.includes(mesSelecionado.value)) {
    mesSelecionado.value = mesesDisponiveis.value[0] || ''
  }
}

onMounted(() => {
  atualizarMeses()
  renderGraficos()
  interval = setInterval(() => {
    atualizarMeses()
    renderGraficos()
  }, 5000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
  if (chartDinheiro) chartDinheiro.destroy()
  if (chartPedidos) chartPedidos.destroy()
  if (chartEstoque) chartEstoque.destroy()
})

watch(mesSelecionado, () => {
  renderGraficos()
})
</script>


<template>
  <div class="admin-section">
    <h3>Relatórios por Mês</h3>
    <div class="filtro-data">
      <label for="mes-relatorio">Selecione o mês:</label>
      <select id="mes-relatorio" v-model="mesSelecionado">
        <option v-for="mes in mesesDisponiveis" :key="mes" :value="mes">{{ mes }}</option>
      </select>
    </div>
    <div v-if="mesSelecionado" class="data-selecionada-info">
      <strong>Mês selecionado:</strong> {{ mesSelecionado }}
    </div>
    <div class="graficos-relatorio">
      <div class="grafico-box">
        <h4>Dinheiro ganho por dia</h4>
        <canvas ref="canvasDinheiro"></canvas>
      </div>
      <div class="grafico-box">
        <h4>Pedidos realizados por dia</h4>
        <canvas ref="canvasPedidos"></canvas>
      </div>
      <div class="grafico-box">
        <h4>Saída de itens do estoque por dia</h4>
        <canvas ref="canvasEstoque"></canvas>
      </div>
    </div>
  </div>
</template>


<style scoped>
.admin-section {
  padding: 2rem 1rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.filtro-data {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.data-selecionada-info {
  margin-bottom: 1.5rem;
  font-size: 1rem;
  color: #333;
}
.graficos-relatorio {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
}
.grafico-box {
  flex: 1 1 260px;
  min-width: 220px;
  background: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 2px 8px #0001;
  padding: 1.2rem 1rem 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.grafico-box h4 {
  margin-bottom: 1rem;
  color: #222e3a;
  font-size: 1.1rem;
}
canvas {
  max-width: 100%;
  max-height: 260px;
}

@media (max-width: 900px) {
  .graficos-relatorio {
    flex-direction: column;
    gap: 1.2rem;
  }
  .grafico-box {
    min-width: 0;
    width: 100%;
    max-width: 100vw;
    padding: 1rem 0.5rem 1.2rem 0.5rem;
  }
}
@media (max-width: 600px) {
  .admin-section {
    padding: 1rem 0.2rem;
  }
  .graficos-relatorio {
    gap: 0.7rem;
  }
  .grafico-box {
    padding: 0.7rem 0.1rem 1rem 0.1rem;
    font-size: 0.98rem;
  }
  .filtro-data {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .data-selecionada-info {
    font-size: 0.95rem;
  }
  canvas {
    max-height: 180px;
  }
}
</style>
