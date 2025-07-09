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
      // Recuperar pedidos existentes ou criar array vazio
      const pedidosExistentes = JSON.parse(localStorage.getItem('pedidos') || '[]');

      // Adicionar novo pedido
      pedidosExistentes.push(pedido);

      // Salvar de volta no localStorage
      localStorage.setItem('pedidos', JSON.stringify(pedidosExistentes));

      console.log('Pedido salvo:', pedido);
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
.verificacao-btn.diminuir {
  font-size: 1.5rem;
  line-height: 1;
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
  transition: background-color 0.3s ease;
}
.verificacao-finalizar:disabled {
  background: #ccc;
  cursor: not-allowed;
  opacity: 0.7;
}
@media (max-width: 600px) {
  .verificacao-card {
    min-width: 90vw;
    padding: 16px 8px 16px 8px;
  }
}
</style>
