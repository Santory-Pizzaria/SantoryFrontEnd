<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/utils/auth.js'

const email = ref('')
const password = ref('')
const erro = ref('')
const router = useRouter()

async function handleLogin() {
  try {
    await login(email.value, password.value)
    erro.value = ''
    router.push('/menu')
  } catch (e) {
    erro.value = 'Email ou senha inválidos'
  }
}

function irParaCadastro() {
  router.push('/cadastro')
}
</script>

<template>
  <div class="login-cliente-container">
    <div class="login-cliente-box">
      <img src="/src/assets/imagens/logo.png" alt="Logo da Pizzaria" class="logo" />
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input id="email" type="email" v-model="email" required placeholder="Seu e-mail" />
        </div>
        <div class="form-group">
          <label for="senha">Senha</label>
          <input id="senha" type="password" v-model="password" required placeholder="Sua senha" />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p v-if="erro" style="color:red">{{ erro }}</p>
      <p class="register-link">Não tem conta? <a href="#" @click.prevent="irParaCadastro">Cadastre-se</a></p>
    </div>
  </div>
</template>

<style scoped>
.login-cliente-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8 url('@/assets/imagens/fundo.png') no-repeat center center/cover;
}
.login-cliente-box {
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
.register-link {
  margin-top: 1rem;
  font-size: 0.95rem;
}
.register-link a {
  color: #c0392b;
  text-decoration: underline;
}
</style>
