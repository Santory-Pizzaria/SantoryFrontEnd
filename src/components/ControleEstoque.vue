<template>
  <div class="estoque-container">
    <button class="btn-voltar" @click="$router.push('/admin')" title="Voltar para o painel admin">
      <img src="/src/assets/imagens/seta-preta.png" alt="Voltar" />
    </button>
    <h2 class="estoque-title">Controle de Estoque</h2>
    <form class="estoque-form" @submit.prevent="adicionarItem">
      <div class="form-group">
        <input v-model="novoItem.nome" placeholder="Nome do produto" required />
        <input v-model.number="novoItem.quantidade" type="number" min="0" placeholder="Quantidade" required />
        <select v-model="novoItem.categoria" required>
          <option value="" disabled>Selecione a categoria</option>
          <option value="Bebida">Bebida</option>
          <option value="Ingredientes (salgados)">Ingredientes (salgados)</option>
          <option value="Ingredientes (doce)">Ingredientes (doce)</option>
        </select>
        <button type="submit" class="btn-add">
          <span>Adicionar</span>
        </button>
      </div>
    </form>
    <div class="estoque-lista">
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in estoque" :key="index" :class="{'editando': item.editando}">
            <td v-if="!item.editando">{{ item.nome }}</td>
            <td v-else><input v-model="item.nome" class="input-edit" /></td>
            <td v-if="!item.editando">{{ item.categoria }}</td>
            <td v-else>
              <select v-model="item.categoria" class="input-edit">
                <option value="Bebida">Bebida</option>
                <option value="Ingredientes (salgados)">Ingredientes (salgados)</option>
                <option value="Ingredientes (doce)">Ingredientes (doce)</option>
              </select>
            </td>
            <td v-if="!item.editando">{{ item.quantidade }}</td>
            <td v-else><input v-model.number="item.quantidade" type="number" min="0" class="input-edit" /></td>
            <td class="acoes">
              <button v-if="!item.editando" @click="editarItem(index)" class="btn-edit" title="Editar">
                <span>✏️</span>
              </button>
              <button v-if="item.editando" @click="salvarEdicao(index)" class="btn-save" title="Salvar">
                <span>💾</span>
              </button>
              <button @click="removerItem(index)" class="btn-remove" title="Remover">
                <span>🗑️</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ControleEstoque',
  data() {
    return {
      estoque: [
        { nome: 'Pizza Margherita', quantidade: 10, categoria: 'Pizza', editando: false },
        { nome: 'Coca-Cola', quantidade: 20, categoria: 'Bebida', editando: false },
      ],
      novoItem: { nome: '', quantidade: 0, categoria: '' },
    };
  },
  methods: {
    adicionarItem() {
      if (!this.novoItem.nome || this.novoItem.quantidade < 0 || !this.novoItem.categoria) return;
      this.estoque.push({ ...this.novoItem, editando: false });
      this.novoItem = { nome: '', quantidade: 0, categoria: '' };
    },
    removerItem(index) {
      this.estoque.splice(index, 1);
    },
    editarItem(index) {
      this.estoque[index].editando = true;
    },
    salvarEdicao(index) {
      this.estoque[index].editando = false;
    },
  },
};
</script>

<style scoped>
.estoque-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
  background: linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(60,60,120,0.10);
  transition: box-shadow 0.2s;
}
.estoque-title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 2rem;
  letter-spacing: 1px;
}
.estoque-form {
  margin-bottom: 2.5rem;
}
.form-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}
.estoque-form input {
  flex: 1 1 180px;
  padding: 0.7rem 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  background: #f1f5f9;
  transition: border 0.2s;
}
.estoque-form input:focus {
  border: 1.5px solid #6366f1;
  outline: none;
}
.estoque-form select, .input-edit[type="select"], select.input-edit {
  flex: 1 1 180px;
  padding: 0.7rem 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  background: #f1f5f9;
  color: #2d3748;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: none !important;
  transition: border 0.2s;
  box-shadow: 0 2px 8px #6366f11a;
  font-weight: 500;
}
.estoque-form select:focus, .input-edit[type="select"]:focus, select.input-edit:focus {
  border: 1.5px solid #6366f1;
  outline: none;
  background-color: #eef2ff;
}
.estoque-form select option, select.input-edit option {
  color: #2d3748;
  font-weight: 500;
}
.btn-add {
  padding: 0.7rem 2rem;
  background: linear-gradient(90deg, #6366f1 60%, #38bdf8 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(99,102,241,0.08);
  transition: background 0.2s, box-shadow 0.2s;
}
.btn-add:hover {
  background: linear-gradient(90deg, #4f46e5 60%, #0ea5e9 100%);
  box-shadow: 0 4px 16px rgba(99,102,241,0.13);
}
.estoque-lista {
  overflow-x: auto;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(60,60,120,0.06);
}
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}
th, td {
  padding: 1rem 0.7rem;
  border-bottom: 1.5px solid #e5e7eb;
  text-align: left;
  font-size: 1.05rem;
}
th {
  background: #f1f5f9;
  color: #6366f1;
  font-weight: 700;
  letter-spacing: 0.5px;
}
tr:last-child td {
  border-bottom: none;
}
tr.editando {
  background: #f0f9ff;
}
.input-edit {
  width: 100%;
  padding: 0.5rem 0.7rem;
  border: 1.5px solid #a5b4fc;
  border-radius: 6px;
  background: #eef2ff;
}
.acoes {
  display: flex;
  gap: 0.5rem;
}
.btn-edit, .btn-save, .btn-remove {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  transition: background 0.15s;
}
.btn-edit:hover {
  background: #e0e7ff;
}
.btn-save:hover {
  background: #bbf7d0;
}
.btn-remove:hover {
  background: #fee2e2;
}
.btn-voltar {
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 1000;
  background: #fff;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 8px #0002;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
}
.btn-voltar img {
  width: 26px;
  height: 26px;
  object-fit: contain;
}
.btn-voltar:hover {
  box-shadow: 0 4px 16px #6366f144;
  transform: scale(1.08);
}
@media (max-width: 700px) {
  .estoque-container {
    padding: 1rem 0.2rem;
  }
  .estoque-title {
    font-size: 1.4rem;
  }
  .form-group {
    flex-direction: column;
    gap: 0.7rem;
  }
  th, td {
    font-size: 0.98rem;
    padding: 0.6rem 0.2rem;
  }
}
</style>
