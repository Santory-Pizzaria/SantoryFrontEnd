<script>
import ToastNotification from '@/components/Toast.vue';

export default {
  name: 'VerificacaoView',
  components: {
    ToastNotification
  },
  props: {
    pedido: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      processandoPedido: false,
      toast: {
        show: false,
        type: 'success',
        title: '',
        message: ''
      }
    };
  },
  methods: {
    adicionarQuantidade() {
      this.$emit('atualizar-quantidade', this.pedido.quantidade + 1)
    },
    diminuirQuantidade() {
      if (this.pedido.quantidade > 1) {
        this.$emit('atualizar-quantidade', this.pedido.quantidade - 1)
      }
    },
    calcularValorTotal() {
      // Extrair valor numérico da pizza
      const valorPizza = parseFloat(this.pedido.valor.replace('R$ ', '').replace(',', '.'));

      // Sem frete na verificação - só o valor das pizzas
      const total = valorPizza * this.pedido.quantidade;
      return `R$ ${total.toFixed(2).replace('.', ',')}`;
    },
    pedirMais() {
      this.$router.push('/menu')
    },
    finalizarPedido() {
      // Salvar dados do pedido no localStorage temporariamente para passar para o pagamento
      const pedidoPagamento = {
        pizzaNome: this.pedido.pizzaNome,
        saboresSelecionados: this.pedido.saboresSelecionados,
        bordaSelecionada: this.pedido.bordaSelecionada,
        qtdSabores: this.pedido.qtdSabores,
        valor: this.pedido.valor,
        quantidade: this.pedido.quantidade,
        valorTotal: this.calcularValorTotal()
      };

      // Salvar temporariamente para a tela de pagamento
      localStorage.setItem('pedido-pagamento', JSON.stringify(pedidoPagamento));

      // Redirecionar para a tela de pagamento
      this.$router.push('/form');
    },
    salvarPedido(pedido) {
      // Monta o pedido no formato esperado pelos relatórios
      const novoPedido = {
        id: pedido.id || Date.now(),
        data: pedido.data || new Date().toLocaleDateString('pt-BR'),
        status: pedido.status || 'Confirmado',
        valor: typeof pedido.valores === 'object' && pedido.valores.total ? parseFloat(pedido.valores.total.replace('R$','').replace(',','.')) : (typeof pedido.valor === 'string' ? parseFloat(pedido.valor.replace('R$','').replace(',','.')) : pedido.valor || 0),
        itens: [
          {
            nome: pedido.pizza?.nome || pedido.pizzaNome || 'Pizza',
            detalhes: `${pedido.pizza?.sabores?.map(s=>s.fracao+ ' ' + s.nome).join(', ') || ''}${pedido.pizza?.borda ? ' | Borda: ' + pedido.pizza.borda : ''}${pedido.bordaSelecionada ? ' | Borda: ' + pedido.bordaSelecionada : ''}`,
            qtd: pedido.pizza?.quantidade || pedido.quantidade || 1
          }
        ]
      };
      // Recuperar pedidos existentes
      const pedidosExistentes = JSON.parse(localStorage.getItem('pedidos') || '[]')
      pedidosExistentes.push(novoPedido)
      localStorage.setItem('pedidos', JSON.stringify(pedidosExistentes))
      console.log('Pedido salvo:', novoPedido)
    },
    // Método para recuperar pedidos (útil para futuras funcionalidades)
    obterPedidos() {
      return JSON.parse(localStorage.getItem('pedidos') || '[]');
    },
    // Método para limpar histórico de pedidos (para desenvolvimento/teste)
    limparHistorico() {
      localStorage.removeItem('pedidos');
      console.log('Histórico de pedidos limpo');
    },
    // Método para mostrar notificações Toast
    mostrarToast(type, title, message) {
      this.toast = {
        show: true,
        type,
        title,
        message
      };
    },
    // Método para confirmar pedido após pagamento (para ser usado externamente)
    confirmarPedidoAposPagamento(dadosPedido, dadosPagamento = {}) {
      // Criar objeto do pedido completo para salvar
      const pedidoCompleto = {
        id: Date.now(), // ID único baseado no timestamp
        data: new Date().toLocaleDateString('pt-BR'),
        hora: new Date().toLocaleTimeString('pt-BR'),
        pizza: {
          nome: dadosPedido.pizzaNome,
          sabores: dadosPedido.saboresSelecionados,
          borda: dadosPedido.bordaSelecionada,
          quantidade: dadosPedido.quantidade
        },
        valores: {
          unitario: dadosPedido.valor,
          total: dadosPedido.valorTotal
        },
        pagamento: dadosPagamento,
        status: 'Confirmado'
      };

      // Salvar no localStorage (simulando um backend)
      this.salvarPedido(pedidoCompleto);

      return pedidoCompleto;
    }
  }
}
</script>


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
          <div><b>Valor unitário:</b> {{ pedido.valor }}</div>
          <div><b>Valor total:</b> {{ calcularValorTotal() }}</div>
        </div>
        <div class="verificacao-qtd">
          <button class="verificacao-btn diminuir" @click="diminuirQuantidade">-</button>
          <span>{{ pedido.quantidade }}</span>
          <button class="verificacao-btn" @click="adicionarQuantidade">+</button>
        </div>
        <div class="verificacao-actions">
          <button class="verificacao-pedir" @click="pedirMais">+ Pedir Mais</button>
          <button
            class="verificacao-finalizar"
            @click="finalizarPedido"
            :disabled="processandoPedido"
          >
            {{ processandoPedido ? '⏳ Processando...' : '💳 Ir para Pagamento' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Toast de Notificação -->
    <ToastNotification
      :show="toast.show"
      :type="toast.type"
      :title="toast.title"
      :message="toast.message"
      @close="toast.show = false"
    />
  </div>
</template>

<style scoped>
/* Layout responsivo, elegante e moderno para VerificacaoView */
.verificacao-container {
  max-width: 420px;
  margin: 40px auto;
  padding: 32px 18px 24px 18px;
  background: linear-gradient(120deg, #fffbe6 60%, #ffe5b4 100%);
  border-radius: 28px;
  box-shadow: 0 8px 32px #b33c1a22;
  font-family: 'Roboto', Arial, sans-serif;
  position: relative;
  border: 2px solid #ff9800;
  animation: fadein 0.7s;
}
@keyframes fadein {
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
}
.verificacao-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}
.verificacao-title {
  font-size: 2rem;
  color: #b33c1a;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  margin: 0;
  text-align: center;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px #b33c1a44;
}
.verificacao-content {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px #b33c1a11;
  padding: 18px 12px;
  margin-bottom: 12px;
}
.verificacao-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.pizza-tipo {
  font-size: 1.2rem;
  color: #e63946;
  font-weight: bold;
  margin-bottom: 6px;
  text-align: center;
}
.verificacao-info {
  font-size: 1rem;
  color: #222;
  margin-bottom: 8px;
}
.verificacao-info ul {
  margin: 0 0 0 12px;
  padding: 0;
}
.verificacao-info li {
  font-size: 0.98rem;
  color: #b33c1a;
  margin-bottom: 2px;
}
.verificacao-qtd {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin: 10px 0;
}
.verificacao-btn {
  background: linear-gradient(90deg, #ff9800 0%, #b33c1a 100%);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px #b33c1a22;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.verificacao-btn.diminuir {
  background: #ccc;
  color: #b33c1a;
}
.verificacao-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}
.verificacao-pedir {
  background: #fffbe6;
  color: #b33c1a;
  border: 2px solid #ff9800;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.verificacao-pedir:hover {
  background: #ffe5b4;
  color: #e63946;
}
.verificacao-finalizar {
  background: linear-gradient(90deg, #e63946 60%, #ffb347 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 14px 0;
  font-size: 1.08rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px #e6394622;
  transition: background 0.2s, box-shadow 0.2s;
}
.verificacao-finalizar:hover {
  background: linear-gradient(90deg, #b33c1a 60%, #ffb347 100%);
  box-shadow: 0 4px 16px #e6394622;
}
@media (max-width: 600px) {
  .verificacao-container {
    max-width: 99vw;
    margin: 0;
    border-radius: 0;
    padding: 10px 2vw 10px 2vw;
  }
  .verificacao-title {
    font-size: 1.2rem;
  }
  .verificacao-content {
    padding: 8px 2px;
    border-radius: 8px;
  }
  .verificacao-btn {
    width: 32px;
    height: 32px;
    font-size: 1.1rem;
  }
}
</style>
