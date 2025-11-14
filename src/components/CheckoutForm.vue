<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user';

const router = useRouter()
const userStore = useUserStore()

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

onMounted(() => {
  // Carregar o estado do usuário logado antes de prosseguir
  userStore.loadFromLocalStorage();

  // Recuperar dados do pedido do localStorage
  const dadosPedido = localStorage.getItem('pedido-pagamento');
  if (dadosPedido) {
    pedidoData.value = JSON.parse(dadosPedido);
  } else {
    // Se não há dados do pedido, redirecionar para o menu
    router.push('/menu');
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

function verificarToken() {
  if (!userStore.accessToken) {
    console.log('Nenhum token de acesso encontrado no userStore.');
    return;
  }

  if (!userStore.user) {
    console.log('Nenhum usuário logado encontrado no userStore.');
    return;
  }

  console.log('Usuário logado no verificarToken:', userStore.user);
}

async function submitForm() {
  try {
    await verificarToken(); // Verifica e renova o token antes de prosseguir
  } catch (error) {
    alert(error.message);
    router.push('/login'); // Redireciona para a página de login se o token for inválido
    return;
  }

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

  processandoPagamento.value = true

  // Simular processamento do pagamento
  // Processa pagamento (simulado) e envia para backend
  setTimeout(async () => {
    // Criar objeto do pedido completo
    const pedidoCompleto = {
      id: Date.now(),
      data: new Date().toLocaleDateString('pt-BR'),
      hora: new Date().toLocaleTimeString('pt-BR'),
      itens: [
        {
          nome: pedidoData.value.pizzaNome,
          detalhes: (pedidoData.value.saboresSelecionados || []).map(s => `${s.fracao} ${s.nome}`).join(', '),
          qtd: pedidoData.value.quantidade || 1,
          preco: parseFloat((pedidoData.value.valor || 'R$ 0').replace('R$', '').replace(',', '.')) || 0
        },
        ...(pedidoData.value.bebida ? [{ nome: pedidoData.value.bebida.nome, detalhes: pedidoData.value.bebida.detalhes || '', qtd: pedidoData.value.bebida.quantidade || 1, preco: pedidoData.value.bebida.preco || 0 }] : [])
      ],
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
      },
      status: 'confirmado',
    }

    try {
      // Verificar e renovar o token de acesso, se necessário
      const auth = await import('@/utils/auth');
      const isTokenValid = await auth.isAuthenticated();
      if (!isTokenValid) {
        const tokenRenovado = await auth.refreshAccessToken();
        if (!tokenRenovado) {
          alert('Erro de autenticação. Faça login novamente.');
          router.push('/login');
          return;
        }
      }

      const access = localStorage.getItem('access');
      if (!access) {
        alert('Erro de autenticação. Faça login novamente.');
        router.push('/login');
        return;
      }

      const payload = {
        items: pedidoCompleto.itens,
        total: parseFloat((pedidoCompleto.valores.total || 'R$ 0').toString().replace('R$', '').replace(',', '.')) || 0,
        cep: pedidoCompleto.endereco.cep,
        rua: pedidoCompleto.endereco.rua,
        bairro: pedidoCompleto.endereco.bairro,
        cidade: pedidoCompleto.endereco.cidade,
        uf: pedidoCompleto.endereco.uf,
        status: pedidoCompleto.status,
        pagamento_status: pedidoCompleto.pagamento.status || 'aprovado',
        observacoes: ''
      };

      const res = await fetch('http://localhost:8000/api/pedidos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(access ? { 'Authorization': `Bearer ${access}` } : {})
        },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const err = await res.text()
        console.error('Erro ao enviar pedido:', res.status, err)
        // fallback: salvar localmente
        salvarPedidoConfirmado(pedidoCompleto)
        alert('Pedido salvo localmente (backend indisponível).')
      } else {
        const data = await res.json()
        console.log('Pedido criado no backend:', data)
        // Limpar dados temporários
        localStorage.removeItem('pedido-pagamento')
        alert(`🍕 Pedido #${data.id} confirmado com sucesso!\nTempo estimado de entrega: ${data.tempo_entrega_min || '30'}-${data.tempo_entrega_max || '45'} minutos`)
      }
    } catch (err) {
      console.error('Erro ao processar pedido:', err)
      alert('Erro ao processar pedido. Tente novamente.')
    } finally {
      processandoPagamento.value = false
      setTimeout(() => router.push('/menu'), 800)
    }

  }, 1000) // Simula tempo de processamento do pagamento
}

function salvarPedidoConfirmado(pedido) {
  // Monta o pedido no formato esperado pelo painel admin
  const novoPedido = {
    id: pedido.id,
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
function voltarParaVerificacao() {
  router.go(-1) // Volta para a página anterior
}
</script>
<template>
  <div class="checkout-bg"></div>
  <div class="checkout-container checkout-card-style">
    <header class="header-Pag">
      <img src="/src/assets/imagens/logo.png" alt="Logo" class="logo" />
      <div class="titulo-Pag"><h1>Pizzaria Santory</h1></div>
    </header>
    <p class="test-environment">Você está em ambiente de teste</p>
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
                <input type="radio" name="pagamento" value="credito" v-model="metodoPagamento" />
                Cartão de crédito
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="pagamento" value="boleto" v-model="metodoPagamento" />
                Boleto
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="pagamento" value="debito" v-model="metodoPagamento" />
                Débito online
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="pagamento" value="deposito" v-model="metodoPagamento" />
                Depósito em conta
              </label>
            </li>
          </ul>
        </div>
        <div class="banks">
          <label><strong>Bandeiras de cartões aceitas:</strong></label>
          <div class="banks-grid">
            <div class="bank-icon"></div>
            <div class="bank-icon"></div>
            <div class="bank-icon"></div>
            <div class="bank-icon"></div>
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
          <div class="total"><strong>Total a pagar:</strong> {{ calcularValorTotal() }}</div>
          <div class="buttons-container">
            <button
              @click="voltarParaVerificacao"
              class="back-button"
              :disabled="processandoPagamento"
            >
              ← Voltar
            </button>
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
  opacity: 0.42;
  pointer-events: none;
}
.checkout-card-style {
  position: relative;
  z-index: 1;
  background: rgba(255,255,255,0.85);
  border-radius: 18px;
  box-shadow: 0 4px 24px #b33c1a18;
  padding: 2rem 1rem 2.5rem 1rem;
  max-width: 1000px;
  margin: 32px auto;
}
.header-Pag {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
  gap: 18px;
}
.logo {
  width: 90px;
  height: 90px;
  object-fit: contain;
}
.titulo-Pag {
  text-align: center;
  font-size: 24px;
  color: #b33c1a;
  margin-bottom: 0;
  padding-left: 0;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
}
.test-environment {
  background-color: #d2f9d2;
  padding: 10px;
  font-size: 14px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 18px;
}
.checkout-main-content {
  display: flex;
  gap: 30px;
}
.checkout-form-section {
  flex: 2;
}
.checkout-summary {
  flex: 1;
  background: #f7f3e9;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 2px 8px #b33c1a22;
}
.input {
  width: 100%;
  padding: 8px;
  margin: 6px 0 12px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.erro {
  color: red;
  font-size: 13px;
  margin-bottom: 10px;
}
.payment-methods ul {
  list-style: none;
  padding-left: 0;
  font-size: 14px;
  margin-bottom: 20px;
}
.banks {
  margin-top: 10px;
}
.banks-grid {
  display: flex;
  gap: 10px;
}
.bank-icon {
  width: 50px;
  height: 50px;
  background-color: #aaa;
  border-radius: 4px;
}
.linha {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.total {
  background-color: #28c76f;
  color: white;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  margin-top: 15px;
  border-radius: 4px;
}
.submit-button {
  background-color: #28c76f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  padding: 16px 32px;
  font-size: 18px;
  min-width: 140px;
  margin-top: 32px;
  transition: background-color 0.3s ease;
}
.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.7;
}
.pedido-detalhes {
  margin: 15px 0;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 4px;
}
.pedido-detalhes h4 {
  margin: 0 0 8px 0;
  color: #333;
}
.pedido-detalhes ul {
  margin: 0 0 10px 0;
  padding-left: 20px;
}
.pedido-detalhes li {
  margin-bottom: 4px;
}
.buttons-container {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.back-button {
  background-color: #ccc;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  padding: 16px 32px;
  font-size: 18px;
  min-width: 140px;
  margin-top: 32px;
  transition: background-color 0.3s ease;
}
.back-button:hover:not(:disabled) {
  background-color: #bbb;
}
.back-button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
  opacity: 0.7;
}
.info-pizzaria {
  margin-top: 8px;
  padding: 8px;
  background-color: #f0f8ff;
  border-radius: 4px;
  border-left: 3px solid #ff9800;
}
.info-pizzaria small {
  color: #666;
  font-size: 12px;
}
@media (max-width: 900px) {
  .checkout-main-content {
    flex-direction: column;
    gap: 18px;
  }
  .checkout-summary {
    margin-top: 18px;
  }
}
@media (max-width: 600px) {
  .checkout-card-style {
    padding: 0.5rem 0.2rem 1rem 0.2rem;
    border-radius: 0;
    margin: 0;
  }
  .header-Pag {
    flex-direction: column;
    gap: 8px;
  }
  .logo {
    width: 60px;
    height: 60px;
  }
  .titulo-Pag {
    font-size: 18px;
  }
  .checkout-summary {
    padding: 10px;
    border-radius: 8px;
  }
}
</style>
