<template>
  <div class="carrinho-bg-novo">
    <div v-if="mensagemFinalizar" class="mensagem-finalizar-novo">{{ mensagemFinalizar }}</div>
    <div class="carrinho-card-novo">
      <header class="carrinho-header-novo">
        <img src="@/assets/imagens/seta-preta.png" alt="Voltar" class="seta-voltar-novo" @click="$router.push('/menu')" />
        <h1 class="carrinho-title-novo">Seu Carrinho</h1>
      </header>
      <main class="carrinho-main-novo">
        <ul v-if="carrinho.length" class="lista-carrinho-novo">
          <CarrinhoItem
            v-for="(item, index) in carrinho"
            :key="item.id"
            :item="item"
            @remover="removerItem(index)"
            @alterar-quantidade="valor => alterarQuantidade(index, valor)"
          />
        </ul>
        <div v-else class="carrinho-vazio-novo">
          <img src="@/assets/imagens/carrinho.png" alt="Carrinho vazio" class="carrinho-vazio-img-novo" />
          <p>Seu carrinho está vazio.</p>
        </div>
        <div v-if="carrinho.length" class="carrinho-footer-novo">
          <div class="total-carrinho-novo">
            <span>Total:</span>
            <strong>R$ {{ totalCarrinho.toFixed(2) }}</strong>
          </div>
          <button class="finalizar-novo" @click="finalizarCompra">Finalizar Compra</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import CarrinhoItem from '@/components/CarrinhoItem.vue';

export default {
  name: 'CarrinhoView',
  components: { CarrinhoItem },
  data() {
    return {
      carrinho: [],
      mensagemFinalizar: ''
    }
  },
  mounted() {
    this.carregarCarrinho();
  },
  computed: {
    totalCarrinho() {
      return this.carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
    }
  },
  methods: {
    carregarCarrinho() {
      // Busca os pedidos não finalizados do usuário no localStorage
      // Removed unused variable 'usuarioLogado'
      const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
      this.carrinho = pedidos.filter(p => p.usuarioId === usuarioLogado?.id && p.status !== 'Finalizado');
    },
    alterarQuantidade(index, valor) {
      const pedido = this.carrinho[index];
      if (pedido.quantidade + valor >= 1) {
        pedido.quantidade += valor;
        // Atualiza no localStorage
        let pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
        const idx = pedidos.findIndex(p => p.id === pedido.id);
        if (idx !== -1) {
          pedidos[idx].quantidade = pedido.quantidade;
          localStorage.setItem('pedidos', JSON.stringify(pedidos));
        }
        this.carregarCarrinho();
      }
    },
    removerItem(index) {
      let pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
      const pedidoRemovido = this.carrinho[index];
      pedidos = pedidos.filter(p => p.id !== pedidoRemovido.id);
      localStorage.setItem('pedidos', JSON.stringify(pedidos));
      this.carregarCarrinho();
    },
    finalizarCompra() {
      this.mensagemFinalizar = '🍕 Compra finalizada com sucesso! Obrigado por escolher a Santory Pizzaria!';
      setTimeout(() => {
        this.mensagemFinalizar = '';
        // Marca todos os pedidos do carrinho como finalizados
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        let pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
        pedidos = pedidos.map(p => {
          if (p.usuarioId === usuarioLogado?.id && p.status !== 'Finalizado') {
            return { ...p, status: 'Finalizado' };
          }
          return p;
        });
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        this.carregarCarrinho();
      }, 2000);
    }
  },
  watch: {
    // Atualiza o carrinho sempre que o localStorage mudar
    carrinho: {
      handler() {
        this.carregarCarrinho();
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.carrinho-bg-novo {
  min-height: 100vh;
  background: url('@/assets/imagens/fundo.png') center center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
  position: relative;
}
.carrinho-card-novo {
  background: rgba(255,255,255,0.95);
  border-radius: 32px;
  box-shadow: 0 8px 40px #b33c1a33;
  max-width: 520px;
  width: 100%;
  padding: 0 0 32px 0;
  display: flex;
  flex-direction: column;
  min-height: 540px;
  border: 2px solid #ff9800;
  position: relative;
}
.carrinho-header-novo {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 32px 40px 16px 40px;
  border-bottom: 2px solid #ff9800;
  background: linear-gradient(90deg, #fffbe6 0%, #ffe5b4 100%);
  border-radius: 32px 32px 0 0;
}
.seta-voltar-novo {
  width: 38px;
  height: 38px;
  cursor: pointer;
  filter: drop-shadow(0 2px 6px #b33c1a44);
  transition: filter 0.2s, transform 0.2s;
}
.seta-voltar-novo:hover {
  filter: brightness(1.2) drop-shadow(0 4px 12px #b33c1a66);
  transform: scale(1.08);
}
.carrinho-title-novo {
  font-size: 2.1rem;
  font-weight: 800;
  color: #b33c1a;
  margin: 0;
  letter-spacing: 2px;
  font-family: 'Playfair Display', serif;
}
.carrinho-main-novo {
  flex: 1;
  padding: 32px 40px 0 40px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.lista-carrinho-novo {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.carrinho-vazio-novo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 64px 0 40px 0;
}
.carrinho-vazio-img-novo {
  width: 100px;
  opacity: 0.5;
  margin-bottom: 10px;
}
.carrinho-footer-novo {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  align-items: center;
}
.total-carrinho-novo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3em;
  color: #b33c1a;
  width: 100%;
  max-width: 340px;
  background: #fffbe6;
  border-radius: 8px;
  padding: 10px 18px;
  box-shadow: 0 2px 8px #ff980022;
  font-family: 'Playfair Display', serif;
}
.finalizar-novo {
  background: linear-gradient(90deg, #ff9800 0%, #b33c1a 100%);
  color: #fff;
  border: none;
  padding: 18px 0;
  border-radius: 12px;
  font-size: 1.18em;
  cursor: pointer;
  width: 100%;
  max-width: 340px;
  font-weight: 700;
  transition: background 0.2s, transform 0.2s;
  box-shadow: 0 4px 16px #b33c1a22;
  letter-spacing: 1px;
}
.finalizar-novo:hover {
  background: linear-gradient(90deg, #b33c1a 0%, #ff9800 100%);
  transform: scale(1.04);
}
.mensagem-finalizar-novo {
  position: fixed;
  top: 38px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, #ff9800 0%, #b33c1a 100%);
  color: #fff;
  font-size: 1.18rem;
  font-weight: bold;
  border-radius: 14px;
  box-shadow: 0 4px 16px #b33c1a22;
  padding: 18px 36px;
  z-index: 3000;
  text-align: center;
  white-space: pre-line;
  animation: fadein 0.4s;
}
@keyframes fadein {
  from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}
@media (max-width: 600px) {
  .carrinho-card-novo {
    max-width: 98vw;
    min-height: 0;
    padding: 0 0 16px 0;
    border-radius: 16px;
  }
  .carrinho-header-novo, .carrinho-main-novo {
    padding-left: 4vw;
    padding-right: 4vw;
  }
  .carrinho-title-novo {
    font-size: 1.3rem;
    letter-spacing: 1px;
  }
  .seta-voltar-novo {
    width: 28px;
    height: 28px;
  }
  .total-carrinho-novo, .finalizar-novo {
    max-width: 98vw;
    font-size: 1rem;
    padding: 10px 0;
  }
}
</style>
