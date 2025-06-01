 <script setup>
  import { ref } from 'vue'


  const email = ref('')
  const cep = ref('')
  const paymentMethod = ref('')

  function submitForm() {
    if (!email.value || !cep.value || !paymentMethod.value) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    // Simulação de envio
    console.log('Enviando para PagSeguro (simulação)...')
    console.log({
      email: email.value,
      cep: cep.value,
      paymentMethod: paymentMethod.value
    })

    alert('Pedido enviado com sucesso! Você receberá o comprovante por e-mail.')
  }
  </script>

<template>
    <div class="checkout-container">
      <header class="header">
        <img src="/src/assets/imagens/logo.png" alt="Logo" class="logo" />
        <h1>Pizzaria Santory</h1>
      </header>

      <p class="test-environment">Você está em ambiente de teste</p>

      <div class="checkout-content">
        <section class="form-section">
          <p><strong>Você receberá o comprovante de pagamento no e-mail abaixo:</strong></p>

          <input v-model="email" type="email" placeholder="Seu e-mail" class="input" />
          <input v-mask="'#####-###'" v-model="cep" placeholder="CEP: 00000-000" class="input" />

          <h3>Pagamento</h3>
          <div class="payment-methods">
            <label><input type="radio" v-model="paymentMethod" value="credit" /> Cartão de crédito</label>
            <label><input type="radio" v-model="paymentMethod" value="boleto" /> Boleto</label>
            <label><input type="radio" v-model="paymentMethod" value="debito" /> Débito online</label>
            <label><input type="radio" v-model="paymentMethod" value="deposito" /> Depósito em conta</label>
          </div>

          <p>Selecione seu banco:</p>
          <div class="banks">
            <div class="bank-icon" v-for="n in 4" :key="n"></div>
          </div>

          <button @click="submitForm" class="submit-button">Finalizar Pedido</button>
        </section>

        <aside class="summary">
          <h3>Resumo do pedido</h3>
          <div class="item">
            <span>Bonde logo</span>
            <span>R$ 10,00</span>
          </div>
          <div class="item">
            <span>Quantidade: 1</span>
          </div>
          <div class="total">
            <strong>Total a pagar</strong>
            <strong>R$ 10,00</strong>
          </div>
        </aside>
      </div>
    </div>
  </template>



  <style scoped>
  .checkout-container {
    max-width: 900px;
    margin: auto;
    border: 10px solid orange;
    padding: 20px;
    font-family: sans-serif;
    background: white;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .logo {
    width: 60px;
  }
  .test-environment {
    background: #d6f5d6;
    padding: 10px;
    margin: 20px 0;
  }
  .checkout-content {
    display: flex;
    gap: 30px;
  }
  .form-section {
    flex: 2;
  }
  .input {
    display: block;
    margin: 10px 0 20px;
    padding: 8px;
    width: 100%;
  }
  .payment-methods label {
    display: block;
    margin: 5px 0;
  }
  .banks {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  .bank-icon {
    width: 40px;
    height: 40px;
    background: gray;
  }
  .summary {
    flex: 1;
    background: #eaffea;
    padding: 20px;
    border-radius: 5px;
  }
  .item {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  .total {
    background: #00c853;
    color: white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-top: 20px;
  }
  .submit-button {
    margin-top: 20px;
    background: #00c853;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    border-radius: 5px;
  }
  </style>
