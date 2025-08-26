<template>
  <div class="carrinho-layout">
    <div class="carrinho-lista">
      <h1>Carrinho de Compras</h1>
      <div v-if="carrinho.length === 0" class="carrinho-vazio">
        Seu carrinho está vazio.
      </div>
      <ul v-else class="lista-carrinho">
        <CarrinhoItem
          v-for="(item, index) in carrinho"
          :key="item.id"
          :item="item"
          @remover="removerItem(index)"
          @alterar-quantidade="valor => alterarQuantidade(index, valor)"
        />
      </ul>
      <div v-if="carrinho.length" class="total-carrinho">
        <span>Total:</span>
        <strong>R$ {{ totalCarrinho.toFixed(2) }}</strong>
      </div>
      <button v-if="carrinho.length" class="finalizar" @click="finalizarCompra">Finalizar Compra</button>
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
.carrinho-layout {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
@media (min-width: 900px) {
  .carrinho-layout {
    flex-direction: row;
    align-items: flex-start;
    gap: 48px;
  }
}
.carrinho-lista {
  flex: 2;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 32px 24px;
}
.carrinho-vazio {
  text-align: center;
  color: #888;
  font-size: 1.2em;
}
.lista-carrinho {
  list-style: none;
  padding: 0;
  margin: 0;
}
.item-carrinho {
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #eee;
  padding: 20px 0 16px 0;
  gap: 18px;
}
.imagem-produto {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.info-produto {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.linha-produto {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detalhes-produto {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}
.preco-unitario {
  color: #888;
  font-size: 0.98em;
}
.quantidade-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f5f5;
  border-radius: 6px;
  padding: 2px 10px;
}
.quantidade-box button {
  background: #eee;
  border: none;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background 0.2s;
}
.quantidade-box button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.subtotal {
  font-weight: 500;
  color: #222;
}
.remover {
  background: transparent;
  color: #ff4d4f;
  border: none;
  font-size: 1.3em;
  cursor: pointer;
  padding: 0 8px;
  transition: color 0.2s;
}
.remover:hover {
  color: #b71c1c;
}
.carrinho-resumo {
  flex: 1;
  background: #fafafa;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 28px 22px;
  min-width: 260px;
  max-width: 340px;
  position: sticky;
  top: 32px;
  height: fit-content;
}
.carrinho-resumo h3 {
  margin-top: 0;
  margin-bottom: 18px;
  font-size: 1.2em;
  color: #222;
}
.carrinho-resumo ul {
  list-style: none;
  padding: 0;
  margin: 0 0 18px 0;
}
.carrinho-resumo li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #444;
  font-size: 1em;
}
.total-carrinho {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2em;
  margin: 18px 0 20px 0;
  color: #222;
}
.finalizar {
  background: #27ae60;
  color: #fff;
  border: none;
  padding: 14px 0;
  border-radius: 6px;
  font-size: 1.1em;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s;
}
.finalizar:hover {
  background: #219150;
}
</style>
