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

  try {
    // Criar objeto do usuário com os dados do cadastro
    const novoUsuario = {
      id: Date.now(), // ID único baseado no timestamp
      nome: nome.value,
      email: email.value,
      senha: senha.value, // Em produção, isso deveria ser hash
      telefone: telefone.value,
      endereco: endereco.value,
      avatar: '',
      dataCadastro: new Date().toISOString()
    }

    // Salvar usuário no localStorage (simulando banco de dados)
    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios') || '[]')

    // Verificar se email já existe
    const emailJaExiste = usuariosExistentes.find(user => user.email === email.value)
    if (emailJaExiste) {
      mensagem.value = 'Este email já está cadastrado!'
      return
    }

    usuariosExistentes.push(novoUsuario)
    localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes))
    // Salvar também o usuário logado
    if (!localStorage.getItem('usuarioLogado')) {
      localStorage.setItem('usuarioLogado', JSON.stringify(novoUsuario))
    }

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
