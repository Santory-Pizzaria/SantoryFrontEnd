<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const senha = ref('')
const erro = ref('')
const router = useRouter()

async function login() {
  erro.value = ''

  try {
    if (!email.value || !senha.value) {
      erro.value = 'Por favor, preencha email e senha'
      return
    }

    // Buscar usuários cadastrados
    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios') || '[]')

    // Verificar credenciais
    const usuarioEncontrado = usuariosExistentes.find(user =>
      user.email === email.value && user.senha === senha.value
    )

    if (!usuarioEncontrado) {
      erro.value = 'Email ou senha inválidos'
      return
    }

    // Salvar dados do usuário logado (sem a senha)
    const usuarioLogado = {
      id: usuarioEncontrado.id,
      nome: usuarioEncontrado.nome,
      email: usuarioEncontrado.email,
      telefone: usuarioEncontrado.telefone,
      endereco: usuarioEncontrado.endereco,
      avatar: usuarioEncontrado.avatar || '',
      dataCadastro: usuarioEncontrado.dataCadastro
    }

    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
    localStorage.setItem('token', `token-${usuarioEncontrado.id}`)

    console.log('Login bem-sucedido, redirecionando para /menu')
    router.push('/menu')

  } catch (e) {
    erro.value = e.message || 'Erro ao autenticar'
  }
}

function irParaCadastro() {
  router.push('/cadastro')
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <img src="/src/assets/imagens/logo.png" alt="Logo da Pizzaria" class="logo" />
      <h2>Faça Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="email" required placeholder="Digite seu e-mail" />
        </div>
        <div class="form-group">
          <label for="senha">Senha</label>
          <input type="password" id="senha" v-model="senha" required placeholder="Digite sua senha" />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p v-if="erro" style="color: #c0392b; margin-top: 10px;">{{ erro }}</p>
      <p class="register-link">Não tem conta? <a href="#" @click.prevent="irParaCadastro">Cadastre-se</a></p>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8 url('@/assets/imagens/fundo.png') no-repeat center center/cover;
}
.login-box {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
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
