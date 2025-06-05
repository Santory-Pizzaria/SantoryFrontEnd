<script setup>
import { ref } from 'vue'

const cep = ref('')
const erroCep = ref('')
const endereco = ref({
  rua: '',
  bairro: '',
  cidade: '',
  uf: ''
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
        uf: data.uf
      }
    }
  } catch (erroCep) {
    erroCep.value = 'Erro ao consultar o CEP.'
    endereco.value = { rua: '', bairro: '', cidade: '', uf: '' }
  }
}

function submitForm() {
  alert('Pedido finalizado com sucesso!')
}
</script>
<template>
  <div class="checkout-container">
    <header class="header-Pag">
      <img src="/src/assets/imagens/logo.png" alt="Logo" class="logo" />
      <div class="titulo-Pag"><h1>Pizzaria Santory</h1></div>
    </header>
    <p class="test-environment">Você está em ambiente de teste</p>
    <div class="checkout-main-content">
      <section class="checkout-form-section">
        <div>
          <div class="Cep" for="cep"><strong>Informe o CEP:</strong></div>
          <input id="cep" type="text" v-model="cep" @blur="validarCep" placeholder="CEP (ex: 01001000)" class="input" />
          <p v-if="erroCep" class="erro">{{ erroCep }}</p>
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
                <input type="radio" name="pagamento" value="credito" />
                Cartão de crédito
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="pagamento" value="boleto" />
                Boleto
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="pagamento" value="debito" />
                Débito online
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="pagamento" value="deposito" />
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
        <div class="linha">
          <span><strong>Descrição</strong></span>
          <span><strong>Valor</strong></span>
        </div>
        <div class="linha">
          <span>Bonde logo</span>
          <span>R$ 10,00</span>
        </div>
        <p>Quantidade: 1</p>
        <p>Valor do item: R$ 10,00</p>
        <div class="total">
          <strong>Total a pagar:</strong> R$ 10,00
        </div>
        <button @click="submitForm" class="submit-button">Finalizar Pedido</button>
      </aside>
    </div>
  </div>
</template>


<style scoped>
.Cep {
  padding: 5px;
}
.title-Pagamento{
  padding: 5px;
}
.checkout-container {
  border: 8px solid orange;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: white;
  max-width: 1000px;
  margin: 0 auto;
}
.titulo-Pag {
  text-align: center;
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  padding-left: 20px;
}
.header-Pag {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.test-environment {
  background-color: #d2f9d2;
  padding: 10px;
  font-size: 14px;
  text-align: center;
}

.checkout-main-content {
  display: flex;
  gap: 30px;
}

.checkout-form-section {
  flex: 2;
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

.checkout-summary {
  flex: 1;
  background: #d2f9d2;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 100%;
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
}
</style>
