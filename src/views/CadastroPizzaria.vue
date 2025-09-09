<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/utils/auth.js'

const email = ref('')
const password = ref('')
const name = ref('')
const erro = ref('')
const sucesso = ref(false)
const router = useRouter()

async function handleRegister() {
  try {
    await register({ email: email.value, password: password.value, name: name.value })
    erro.value = ''
    sucesso.value = true
    setTimeout(() => {
      router.push('/login')
    }, 1200)
  } catch (e) {
    // Mostra o erro detalhado do backend
    erro.value = e.message
    sucesso.value = false
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
      <h2>Cadastro</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input id="email" type="email" v-model="email" required placeholder="E-mail para contato" />
        </div>
        <div class="form-group">
          <label for="senha">Senha</label>
          <input id="senha" type="password" v-model="password" required placeholder="Crie uma senha" />
        </div>
        <div class="form-group">
          <label for="nome">Nome</label>
          <input id="nome" v-model="name" required placeholder="Seu nome" />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <p v-if="erro" style="color:red">{{ erro }}</p>
      <p v-if="sucesso" style="color:green">Cadastro realizado! Faça login.</p>
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
