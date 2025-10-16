// Campo para inserir a PUBLIC_KEY do Mercado Pago depois
// Exemplo: const MERCADO_PAGO_PUBLIC_KEY = 'SUA_PUBLIC_KEY_AQUI';
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Mercado Pago - Exemplo de uso da PUBLIC_KEY
const MERCADO_PAGO_PUBLIC_KEY = 'TEST-a08af5e5-b543-4202-850d-c8ea7f5462cf';

const cep = ref('')
const erroCep = ref('')
const endereco = ref({
  rua: '',
  bairro: '',
  cidade: '',
  uf: '',
})

// Dados do pedido vindos da verificação
const pedidoData = ref(null)
const metodoPagamento = ref('')
const processandoPagamento = ref(false)
const frete = ref(0)
const calculandoFrete = ref(false)
const precisaTroco = ref(false)
const valorTroco = ref('')
const tipoCartao = ref('')

onMounted(() => {
  // Recuperar dados do pedido do localStorage
  const dadosPedido = localStorage.getItem('pedido-pagamento')
  if (dadosPedido) {
    pedidoData.value = JSON.parse(dadosPedido)
  } else {
    // Se não há dados do pedido, redirecionar para o menu
    router.push('/menu')
  }

  // Mercado Pago - Carregar SDK e inicializar
  if (!window.MercadoPago) {
    const script = document.createElement('script')
    script.src = "https://sdk.mercadopago.com/js/v2"
    script.async = true
    script.onload = () => {
      window.mercadoPagoInstance = new window.MercadoPago(MERCADO_PAGO_PUBLIC_KEY)
      // Aqui você pode criar campos de cartão ou iniciar o checkout
      // Exemplo: window.mercadoPagoInstance.checkout({...})
    }
    document.head.appendChild(script)
  }
})

async function validarCep() {
  const cepLimpo = cep.value.replace(/\D/g, '')

  if (!cepLimpo || cepLimpo.length !== 8) {
    erroCep.value = 'CEP inválido. Deve conter 8 dígitos numéricos.'
    endereco.value = { rua: '', bairro: '', cidade: '', uf: '' }
    return
  }

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
    const data = await res.json()

    if (data.erro) {
      erroCep.value = 'CEP não encontrado.'
      endereco.value = { rua: '', bairro: '', cidade: '', uf: '' }
    } else {
      erroCep.value = ''
      endereco.value = {
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf,
      }
      // Calcular frete após obter o endereço
      calculandoFrete.value = true
      setTimeout(() => {
        calcularFrete()
        calculandoFrete.value = false
      }, 1000) // Simula tempo de cálculo
    }
  } catch {
    erroCep.value = 'Erro ao consultar o CEP.'
    endereco.value = { rua: '', bairro: '', cidade: '', uf: '' }
  }
}

function calcularFrete() {
  // Por enquanto, um valor fixo baseado na cidade
  // Futuramente aqui será implementado o cálculo de distância
  const cidade = endereco.value.cidade?.toLowerCase() || ''

  if (cidade.includes('joinville')) {
    frete.value = 5.0 // Taxa mínima para Joinville
  } else if (endereco.value.uf === 'SC') {
    frete.value = 15.0 // Taxa para outras cidades de SC
  } else {
    frete.value = 25.0 // Taxa para outros estados
  }

  console.log(
    `Frete calculado: R$ ${frete.value.toFixed(2)} para ${endereco.value.cidade}, ${endereco.value.uf}`,
  )
}

function obterValorFrete() {
  return frete.value > 0 ? `R$ ${frete.value.toFixed(2).replace('.', ',')}` : 'A calcular'
}

function calcularValorTotal() {
  if (!pedidoData.value) return 'R$ 0,00'

  const valorPizza = parseFloat(pedidoData.value.valor.replace('R$ ', '').replace(',', '.'))
  const valorTotalPizzas = valorPizza * pedidoData.value.quantidade
  const valorTotal = valorTotalPizzas + frete.value

  return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`
}

function limparTrocoAoMudarPagamento() {
  if (metodoPagamento.value !== 'dinheiro') {
    precisaTroco.value = false
    valorTroco.value = ''
  }
}

function limparTipoCartaoAoMudarPagamento() {
  if (metodoPagamento.value !== 'cartao') {
    tipoCartao.value = ''
  }
}

watch(metodoPagamento, limparTrocoAoMudarPagamento)
watch(metodoPagamento, limparTipoCartaoAoMudarPagamento)

function submitForm() {
  // Validações antes do pagamento
  if (!cep.value || erroCep.value) {
    alert('Por favor, informe um CEP válido.')
    return
  }

  if (!metodoPagamento.value) {
    alert('Por favor, selecione um método de pagamento.')
    return
  }

  if (frete.value === 0) {
    alert('Por favor, aguarde o cálculo do frete ou verifique se o CEP foi informado corretamente.')
    return
  }

  if (calculandoFrete.value) {
    alert('Aguarde o cálculo do frete finalizar.')
    return
  }

  if (metodoPagamento.value === 'dinheiro' && precisaTroco.value && (!valorTroco.value || isNaN(Number(valorTroco.value)) || Number(valorTroco.value) <= 0)) {
    alert('Por favor, informe o valor para o troco.')
    return
  }

  processandoPagamento.value = true

  // Simular processamento do pagamento
  setTimeout(() => {
    // Criar objeto do pedido completo
    const pedidoCompleto = {
      id: Date.now(),
      data: new Date().toLocaleDateString('pt-BR'),
      hora: new Date().toLocaleTimeString('pt-BR'),
      pizza: {
        nome: pedidoData.value.pizzaNome,
        sabores: pedidoData.value.saboresSelecionados,
        borda: pedidoData.value.bordaSelecionada,
        quantidade: pedidoData.value.quantidade,
      },
      valores: {
        unitario: pedidoData.value.valor,
        frete: obterValorFrete(),
        total: calcularValorTotal(),
      },
      endereco: {
        cep: cep.value,
        rua: endereco.value.rua,
        bairro: endereco.value.bairro,
        cidade: endereco.value.cidade,
        uf: endereco.value.uf,
      },
      pagamento: {
        metodo: metodoPagamento.value,
        status: 'Aprovado',
        troco: metodoPagamento.value === 'dinheiro' && precisaTroco.value ? valorTroco.value : null,
      },
      status: 'Confirmado',
    }

    // Salvar pedido confirmado
    salvarPedidoConfirmado(pedidoCompleto)

    // Limpar dados temporários
    localStorage.removeItem('pedido-pagamento')

    processandoPagamento.value = false

    // Mostrar confirmação e redirecionar
    alert(
      `🍕 Pagamento aprovado!\n\nPedido #${pedidoCompleto.id} confirmado com sucesso!\nTempo estimado de entrega: 30-45 minutos\n\nVocê será redirecionado para a página inicial.`,
    )

    setTimeout(() => {
      router.push('/menu')
    }, 1000)
  }, 1000) // Simula tempo de processamento do pagamento
}

function salvarPedidoConfirmado(pedido) {
  // Adiciona o usuarioId do usuário logado
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  const novoPedido = {
    id: pedido.id,
    usuarioId: usuarioLogado?.id || null,
    data: pedido.data,
    status: pedido.status || 'Confirmado',
    valor: typeof pedido.valores === 'object' && pedido.valores.total ? parseFloat(pedido.valores.total.replace('R$','').replace(',','.')) : 0,
    itens: [
      {
        nome: pedido.pizza?.nome || pedido.pizzaNome || 'Pizza',
        detalhes: `${pedido.pizza?.sabores?.map(s=>s.fracao+ ' ' + s.nome).join(', ') || ''}${pedido.pizza?.borda ? ' | Borda: ' + pedido.pizza.borda : ''}${pedido.bordaSelecionada ? ' | Borda: ' + pedido.bordaSelecionada : ''}`,
        qtd: pedido.pizza?.quantidade || pedido.quantidade || 1
      },
      // Adiciona bebida se existir
      ...(pedido.bebida ? [{ nome: pedido.bebida.nome, detalhes: pedido.bebida.detalhes || '', qtd: pedido.bebida.quantidade || 1 }] : [])
    ]
  };
  // Recuperar pedidos existentes
  const pedidosExistentes = JSON.parse(localStorage.getItem('pedidos') || '[]')
  pedidosExistentes.push(novoPedido)
  localStorage.setItem('pedidos', JSON.stringify(pedidosExistentes))
  console.log('Pedido confirmado e salvo:', novoPedido)
}

// Função para voltar à verificação (caso o usuário queira ajustar algo)
// Removido porque não está sendo utilizado
</script>
<template>
  <div class="checkout-bg"></div>
  <div class="checkout-container checkout-card-style">
    <header class="header-Pag">
      <img src="/src/assets/imagens/logo.png" alt="Logo" class="logo" />
      <div class="titulo-Pag"><h1>Pizzaria Santory</h1></div>
    </header>
    <div class="checkout-main-content">
      <section class="checkout-form-section">
        <div>
          <div class="Cep" for="cep"><strong>Informe o CEP:</strong></div>
          <input
            id="cep"
            type="text"
            v-model="cep"
            @blur="validarCep"
            placeholder="CEP (ex: 01001000)"
            class="input"
          />
          <p v-if="erroCep" class="erro">{{ erroCep }}</p>
          <div class="info-pizzaria">
            <small>📍 Nossa pizzaria fica em Joinville/SC - R. Francisco Cristofolini, 326</small>
          </div>
        </div>
        <div v-if="endereco.rua">
          <label><strong>Rua:</strong></label>
          <input type="text" :value="endereco.rua" disabled class="input" />
          <label><strong>Bairro:</strong></label>
          <input type="text" :value="endereco.bairro" disabled class="input" />
          <label><strong>Cidade:</strong></label>
          <input type="text" :value="endereco.cidade" disabled class="input" />
          <label><strong>Estado:</strong></label>
          <input type="text" :value="endereco.uf" disabled class="input" />
        </div>
        <div class="payment-methods">
          <div class="title-Pagamento"><h2>Pagamento</h2></div>
          <ul>
            <li>
              <label>
                <input type="radio" name="pagamento" value="pix" v-model="metodoPagamento" />
                Pix
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="pagamento" value="dinheiro" v-model="metodoPagamento" />
                Dinheiro
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="pagamento" value="cartao" v-model="metodoPagamento" />
                Cartão
              </label>
            </li>
          </ul>
          <div v-if="metodoPagamento === 'dinheiro'">
            <label>
              <input type="checkbox" v-model="precisaTroco" />
              Precisa de troco?
            </label>
            <div v-if="precisaTroco" class="troco-section">
              <label for="valorTroco">Valor para o troco:</label>
              <input
                id="valorTroco"
                type="text"
                v-model="valorTroco"
                placeholder="Valor do troco"
                class="input"
              />
            </div>
          </div>
          <div v-if="metodoPagamento === 'cartao'" class="troco-section">
            <label>Tipo de cartão:</label>
            <div style="display: flex; gap: 12px;">
              <label>
                <input type="radio" name="tipoCartao" value="debito" v-model="tipoCartao" />
                Débito
              </label>
              <label>
                <input type="radio" name="tipoCartao" value="credito" v-model="tipoCartao" />
                Crédito
              </label>
            </div>
          </div>
        </div>
      </section>
      <aside class="checkout-summary">
        <h2>Resumo do pedido</h2>
        <div v-if="pedidoData">
          <div class="linha">
            <span><strong>Descrição</strong></span>
            <span><strong>Valor</strong></span>
          </div>
          <div class="linha">
            <span>{{ pedidoData.pizzaNome }}</span>
            <span>{{ pedidoData.valor }}</span>
          </div>
          <div class="pedido-detalhes">
            <h4>Sabores:</h4>
            <ul>
              <li v-for="(sabor, idx) in pedidoData.saboresSelecionados" :key="idx">
                {{ sabor.fracao }} {{ sabor.nome }}
              </li>
            </ul>
            <p><strong>Borda:</strong> {{ pedidoData.bordaSelecionada }}</p>
            <p><strong>Quantidade:</strong> {{ pedidoData.quantidade }}</p>
            <p><strong>Valor do item:</strong> {{ pedidoData.valor }}</p>
            <p v-if="calculandoFrete"><strong>Frete:</strong> 🔄 Calculando...</p>
            <p v-else-if="frete > 0"><strong>Frete:</strong> {{ obterValorFrete() }}</p>
            <p v-else><strong>Frete:</strong> Informe o CEP para calcular</p>
          </div>
          <div class="buttons-container">
            <button @click="submitForm" class="submit-button" :disabled="processandoPagamento">
              {{ processandoPagamento ? '💳 Processando...' : 'Finalizar Pedido' }}
            </button>
          </div>
        </div>
        <div v-else>
          <p>Carregando dados do pedido...</p>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.checkout-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: url('/src/assets/imagens/fundo.png') no-repeat center center fixed;
  background-size: cover;
  opacity: 0.35;
  pointer-events: none;
}
.checkout-card-style {
  position: relative;
  z-index: 1;
  background: linear-gradient(120deg, #fffbe6 60%, #ffe5b4 100%);
  border-radius: 28px;
  box-shadow: 0 8px 32px #b33c1a22;
  padding: 2rem 1rem 2rem 1rem;
  max-width: 900px;
  margin: 32px auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: box-shadow 0.3s, border 0.3s;
}
.header-Pag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 10px;
}
.logo {
  width: 70px;
  height: 70px;
  object-fit: contain;
  border-radius: 14px;
  box-shadow: 0 2px 8px #b33c1a22;
}
.titulo-Pag {
  text-align: center;
  font-size: 1.7rem;
  color: #b33c1a;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
}
.test-environment {
  background: linear-gradient(90deg, #d2f9d2 60%, #ffe5b4 100%);
  padding: 8px;
  font-size: 14px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 10px;
  color: #222e3a;
  font-weight: 600;
}
.checkout-main-content {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
  justify-content: space-between;
}
.checkout-form-section {
  flex: 2;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px #b33c1a11;
  padding: 24px 16px;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.checkout-summary {
  flex: 1;
  background: #fffbe6;
  padding: 24px 16px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 2px 8px #b33c1a11;
  min-width: 220px;
  max-width: 340px;
  gap: 14px;
}
.input {
  width: 100%;
  padding: 10px;
  margin: 6px 0 12px 0;
  border: 1.2px solid #ff9800;
  border-radius: 7px;
  background: #fffbe6;
  font-size: 1rem;
  color: #b33c1a;
  box-shadow: 0 1px 4px #b33c1a11;
  transition: border 0.2s;
}
.input:focus {
  border: 1.5px solid #b33c1a;
  outline: none;
}
.erro {
  color: #b33c1a;
  font-size: 12px;
  margin-bottom: 8px;
  font-weight: 600;
}
.payment-methods ul {
  list-style: none;
  padding-left: 0;
  font-size: 15px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.payment-methods li {
  background: #ffe5b4;
  border-radius: 8px;
  padding: 8px 16px;
  box-shadow: 0 1px 4px #b33c1a11;
  font-weight: 500;
}
.linha {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 1rem;
  color: #222e3a;
}
.total {
  background: linear-gradient(90deg, #28c76f 60%, #ff9800 100%);
  color: white;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
  border-radius: 8px;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px #b33c1a22;
}
.submit-button {
  background: linear-gradient(90deg, #28c76f 60%, #ff9800 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  padding: 14px 24px;
  font-size: 1.08rem;
  min-width: 120px;
  margin-top: 18px;
  transition: background 0.3s, box-shadow 0.2s;
  box-shadow: 0 2px 8px #b33c1a22;
}
.submit-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  opacity: 0.7;
}
.submit-button:hover:not(:disabled) {
  background: linear-gradient(90deg, #ff9800 60%, #28c76f 100%);
  box-shadow: 0 4px 16px #b33c1a44;
}
.pedido-detalhes {
  margin: 10px 0;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 1px 4px #b33c1a11;
}
.pedido-detalhes h4 {
  margin: 0 0 6px 0;
  color: #b33c1a;
}
.pedido-detalhes ul {
  margin: 0 0 8px 0;
  padding-left: 18px;
}
.pedido-detalhes li {
  margin-bottom: 3px;
}
.buttons-container {
  display: flex;
  gap: 12px;
  margin-top: 12px;
  flex-wrap: wrap;
}
.back-button {
  background: linear-gradient(90deg, #ffe5b4 60%, #ff9800 100%);
  color: #b33c1a;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  padding: 14px 24px;
  font-size: 1.08rem;
  min-width: 120px;
  margin-top: 18px;
  transition: background 0.3s, box-shadow 0.2s;
  box-shadow: 0 2px 8px #b33c1a22;
}
.back-button:hover:not(:disabled) {
  background: linear-gradient(90deg, #ff9800 60%, #ffe5b4 100%);
  color: #fff;
  box-shadow: 0 4px 16px #b33c1a44;
}
.back-button:disabled {
  background: #e0e0e0;
  cursor: not-allowed;
  opacity: 0.7;
}
.info-pizzaria {
  margin-top: 6px;
  padding: 6px;
  background-color: #f0f8ff;
  border-radius: 5px;
  border-left: 3px solid #ff9800;
}
.info-pizzaria small {
  color: #666;
  font-size: 12px;
}
.troco-section {
  margin-top: 10px;
  padding: 10px;
  background: #fffbe6;
  border-radius: 8px;
  box-shadow: 0 1px 4px #b33c1a22;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.troco-section label {
  font-weight: 600;
  color: #b33c1a;
}
.troco-section input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1.2px solid #ff9800;
  border-radius: 7px;
  background: #fff;
  font-size: 1rem;
  color: #b33c1a;
  box-shadow: 0 1px 4px #b33c1a11;
  margin-top: 4px;
}
@media (max-width: 900px) {
  .checkout-main-content {
    flex-direction: column;
    gap: 16px;
  }
  .checkout-summary {
    margin-top: 10px;
    min-width: 0;
    max-width: 99vw;
    padding: 12px 4px;
    border-radius: 12px;
  }
  .checkout-form-section {
    min-width: 0;
    padding: 12px 4px;
    border-radius: 12px;
  }
  .checkout-card-style {
    padding: 0.7rem 0.1rem 1rem 0.1rem;
    border-radius: 12px;
    margin: 0;
    max-width: 99vw;
  }
}
@media (max-width: 600px) {
  .checkout-card-style {
    padding: 0.3rem 0.1rem 0.7rem 0.1rem;
    border-radius: 0;
    margin: 0;
    max-width: 100vw;
  }
  .header-Pag {
    flex-direction: column;
    gap: 6px;
  }
  .logo {
    width: 44px;
    height: 44px;
  }
  .titulo-Pag {
    font-size: 1rem;
  }
  .checkout-summary {
    padding: 6px;
    border-radius: 6px;
    min-width: 0;
    max-width: 100vw;
  }
  .checkout-form-section {
    padding: 6px;
    border-radius: 6px;
    min-width: 0;
  }
  .submit-button, .back-button {
    padding: 8px 6px;
    font-size: 0.92rem;
    min-width: 80px;
  }
}
</style>
