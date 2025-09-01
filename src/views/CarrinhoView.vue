<template>
  <div class="carrinho-bg-novo">
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
      carrinho: [
        {
          id: 1,
          nome: 'Pizza Calabresa',
          preco: 49.9,
          quantidade: 2,
          imagem: 'src/assets/imagens/PizzaEx.png'
        },
        {
          id: 2,
          nome: 'Coca-Cola 2L',
          preco: 12.5,
          quantidade: 1,
          imagem: 'src/assets/imagens/Coca.png'
        },
        {
          id: 3,
          nome: 'Combo Família',
          preco: 89.9,
          quantidade: 1,
          imagem: 'src/assets/imagens/ComboExjpg.jpg'
        }
      ]
    }
  },
  computed: {
    totalCarrinho() {
      return this.carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
    }
  },
  methods: {
    alterarQuantidade(index, valor) {
      const item = this.carrinho[index];
      if (item.quantidade + valor >= 1) {
        item.quantidade += valor;
      }
    },
    removerItem(index) {
      this.carrinho.splice(index, 1);
    },
    finalizarCompra() {
      alert('Compra finalizada!');
      this.carrinho = [];
    }
  }
}
</script>

<style scoped>
.carrinho-bg-novo {
  min-height: 100vh;
  background: linear-gradient(120deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
}
.carrinho-card-novo {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 32px #64748b22;
  max-width: 480px;
  width: 100%;
  padding: 0 0 24px 0;
  display: flex;
  flex-direction: column;
  min-height: 520px;
}
.carrinho-header-novo {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 24px 32px 12px 32px;
  border-bottom: 2px solid #e2e8f0;
  background: #f1f5f9;
  border-radius: 18px 18px 0 0;
}
.seta-voltar-novo {
  width: 32px;
  height: 32px;
  cursor: pointer;
  filter: drop-shadow(0 2px 6px #64748b44);
  transition: filter 0.2s, transform 0.2s;
}
.seta-voltar-novo:hover {
  filter: brightness(1.2) drop-shadow(0 4px 12px #64748b66);
  transform: scale(1.08);
}
.carrinho-title-novo {
  font-size: 1.7rem;
  font-weight: 800;
  color: #334155;
  margin: 0;
  letter-spacing: 1px;
}
.carrinho-main-novo {
  flex: 1;
  padding: 24px 32px 0 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.lista-carrinho-novo {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.carrinho-vazio-novo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 48px 0 32px 0;
}
.carrinho-vazio-img-novo {
  width: 80px;
  opacity: 0.5;
  margin-bottom: 8px;
}
.carrinho-footer-novo {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
}
.total-carrinho-novo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2em;
  color: #222;
  width: 100%;
  max-width: 320px;
}
.finalizar-novo {
  background: #27ae60;
  color: #fff;
  border: none;
  padding: 16px 0;
  border-radius: 8px;
  font-size: 1.15em;
  cursor: pointer;
  width: 100%;
  max-width: 320px;
  font-weight: 700;
  transition: background 0.2s;
  box-shadow: 0 2px 8px #27ae6022;
}
.finalizar-novo:hover {
  background: #219150;
}
@media (max-width: 600px) {
  .carrinho-card-novo {
    max-width: 98vw;
    min-height: 0;
    padding: 0 0 12px 0;
  }
  .carrinho-header-novo, .carrinho-main-novo {
    padding-left: 4vw;
    padding-right: 4vw;
  }
}
</style>
