<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const nome = ref('')
const email = ref('')
const senha = ref('')
const telefone = ref('')
const endereco = ref('')
const mensagem = ref('')
const router = useRouter()

async function cadastrarPizzaria() {
  mensagem.value = ''
  // Simulação de cadastro (troque pela chamada real à API)
  try {
    // await fetch('https://sua-api.com/cadastro-pizzaria', { ... })
    mensagem.value = 'Cadastro realizado com sucesso!'
    nome.value = email.value = senha.value = telefone.value = endereco.value = ''
    setTimeout(() => {
      router.push('/login')
    }, 1200)
  } catch (err) {
    mensagem.value = err.message || 'Erro ao cadastrar. Tente novamente.'
  }
}
function irParaLogin() {
  router.push('/login')
}
</script> 

<template>
  <div class="cadastro-pizzaria-container">
    <div class="cadastro-pizzaria-box">
      <img src="/src/assets/imagens/logo.png" alt="Logo da Pizzaria" class="logo" />
      <h2>Realize o seu Cadastro</h2>
      <form @submit.prevent="cadastrarPizzaria">
        <div class="form-group">
          <label for="nome">Nome</label>
          <input id="nome" v-model="nome" required placeholder="Seu nome" />
        </div>
        <div class="form-group">
          <label for="email">E-mail</label>
          <input id="email" type="email" v-model="email" required placeholder="E-mail para contato" />
        </div>
        <div class="form-group">
          <label for="senha">Senha</label>
          <input id="senha" type="password" v-model="senha" required placeholder="Crie uma senha" />
        </div>
        <div class="form-group">
          <label for="telefone">Telefone</label>
          <input id="telefone" v-model="telefone" required placeholder="(99) 99999-9999" />
        </div>
        <div class="form-group">
          <label for="endereco">Endereço</label>
          <input id="endereco" v-model="endereco" required placeholder="Endereço completo" />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <p v-if="mensagem" class="mensagem">{{ mensagem }}</p>
      <p class="register-link">Já tem conta? <a href="#" @click.prevent="irParaLogin">Logar</a></p>
    </div>
  </div>
</template>

<style scoped>
.cadastro-pizzaria-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8 url('@/assets/imagens/fundo.png') no-repeat center center/cover;
}
.register-link {
  margin-top: 1rem;
  font-size: 0.95rem;
}
.register-link a {
  color: #c0392b;
  text-decoration: underline;
}
.cadastro-pizzaria-box {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 340px;
}
.logo {
  width: 80px;
  margin-bottom: 1rem;
}
h2 {
  margin-bottom: 1.5rem;
  color: #c0392b;
}
.form-group {
  width: 100%;
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.3rem;
  color: #333;
}
input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}
button {
  width: 100%;
  padding: 0.7rem;
  background: #c0392b;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s;
}
button:hover {
  background: #a93226;
}
.mensagem {
  margin-top: 1rem;
  color: #388e3c;
  font-weight: bold;
}
.voltar-btn {
  margin-top: 1rem;
  background: transparent;
  color: #c0392b;
  border: 1px solid #c0392b;
  transition: background 0.2s, color 0.2s;
}
.voltar-btn:hover {
  background: #c0392b;
  color: #fff;
}
</style>
