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
  background: url('@/assets/imagens/fundo.png') center center/cover no-repeat;
  position: relative;
}
.login-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.85);
  z-index: 0;
}
.login-box {
  background: #fff;
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  border-radius: 22px;
  box-shadow: 0 8px 32px #b33c1a22;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 370px;
  width: 100%;
  position: relative;
  z-index: 1;
  animation: loginFadeIn 0.7s;
}
@keyframes loginFadeIn {
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
  font-size: 2rem;
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
.recuperar-form {
  width: 100%;
  margin-top: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
.seta-voltar-recuperar {
  position: absolute;
  top: 18px;
  left: 18px;
  background: transparent !important;
  border: none !important;
  padding: 0;
  cursor: pointer;
  z-index: 10;
  outline: none !important;
  box-shadow: none !important;
}
.seta-voltar-recuperar:focus,
.seta-voltar-recuperar:active,
.seta-voltar-recuperar:hover {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
  background: transparent !important;
}
.seta-voltar-recuperar img {
  width: 28px;
  height: 28px;
  display: block;
}
@media (max-width: 700px) {
  .login-box {
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
  .seta-voltar-recuperar {
    top: 8px;
    left: 8px;
  }
  .seta-voltar-recuperar img {
    width: 20px;
    height: 20px;
  }
}
</style>
