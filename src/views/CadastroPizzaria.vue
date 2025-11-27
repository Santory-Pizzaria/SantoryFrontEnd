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
  background: url('@/assets/imagens/fundo.png') center center/cover no-repeat;
  position: relative;
}
.cadastro-pizzaria-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.85);
  z-index: 0;
}
.cadastro-pizzaria-box {
  background: #fff;
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  border-radius: 22px;
  box-shadow: 0 8px 32px #b33c1a22;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 400px;
  width: 100%;
  position: relative;
  z-index: 1;
  animation: cadastroFadeIn 0.7s;
}
@keyframes cadastroFadeIn {
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
}
.logo {
  width: 90px;
  margin-bottom: 1.2rem;
  border-radius: 16px;
  box-shadow: 0 2px 12px #b33c1a22;
}
h2 {
  margin-bottom: 1.5rem;
  color: #b33c1a;
  font-family: 'Playfair Display', serif;
  font-weight: 800;
  letter-spacing: 1px;
}
.form-group {
  width: 100%;
  margin-bottom: 1.1rem;
}
label {
  display: block;
  margin-bottom: 0.3rem;
  color: #b33c1a;
  font-weight: 600;
  letter-spacing: 0.5px;
}
input {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1.5px solid #ff9800;
  border-radius: 10px;
  font-size: 1.08rem;
  outline: none;
  background: #fffbe6;
  color: #222;
  transition: border 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px #b33c1a11;
}
input:focus {
  border-color: #b33c1a;
  box-shadow: 0 2px 8px #b33c1a22;
}
button {
  width: 100%;
  padding: 0.8rem 0;
  background: linear-gradient(90deg, #ff9800 0%, #b33c1a 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px #b33c1a22;
}
button:hover {
  background: linear-gradient(90deg, #b33c1a 0%, #ff9800 100%);
  transform: translateY(-2px) scale(1.04);
}
.mensagem {
  margin-top: 1rem;
  color: #388e3c;
  font-weight: bold;
  text-align: center;
}
.register-link, .recuperar-link {
  margin-top: 1.1rem;
  font-size: 1rem;
  text-align: center;
}
.register-link a, .recuperar-link a {
  color: #e63946;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
}
@media (max-width: 700px) {
  .cadastro-pizzaria-box {
    min-width: 0;
    max-width: 99vw;
    padding: 1.2rem 2vw 1.2rem 2vw;
    border-radius: 12px;
  }
  .logo {
    width: 60px;
  }
  h2 {
    font-size: 1.2rem;
  }
}
</style>
