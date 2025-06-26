<script>
export default {
  name: 'PerfilUsuario',
  data() {
    return {
      usuario: {
        nome: 'Higor do Amaral Fritz',
        email: 'higor@email.com',
        telefone: '(11) 99999-9999',
        endereco: 'Rua das Pizzas, 123, Araquari - SC',
      },
      pedidos: [
        { id: 101, data: '20/06/2025', status: 'Entregue' },
        { id: 102, data: '25/06/2025', status: 'Em andamento' },
      ],
    };
  },
  methods: {
    editarPerfil() {
      alert('Funcionalidade de edição de perfil em breve!');
    },
    sair() {
      alert('Você saiu da conta!');
      this.$router.push('/login');
    },
  },
};
</script>

<template>
  <div class="FundoPerfil">
    <div class="perfil-usuario">
      <div class="perfil-header">
        <img class="perfil-avatar" src="/src/assets/imagens/logo.png" alt="Avatar do Usuário" />
        <h2>{{ usuario.nome }}</h2>
        <p>{{ usuario.email }}</p>
      </div>
      <div class="perfil-info">
        <h3>Informações do Perfil</h3>
        <ul>
          <li><strong>Nome:</strong> {{ usuario.nome }}</li>
          <li><strong>Email:</strong> {{ usuario.email }}</li>
          <li><strong>Telefone:</strong> {{ usuario.telefone }}</li>
          <li><strong>Endereço:</strong> {{ usuario.endereco }}</li>
        </ul>
        <button @click="editarPerfil">Editar Perfil</button>
      </div>
      <div class="perfil-pedidos">
        <h3>Meus Pedidos</h3>
        <ul>
          <li v-for="pedido in pedidos" :key="pedido.id">
            <span>Pedido #{{ pedido.id }} - {{ pedido.data }} - {{ pedido.status }}</span>
          </li>
        </ul>
      </div>
      <button class="btn-voltar-menu" @click="$router.push('/menu')">Voltar ao Menu</button>
      <button class="sair-btn" @click="sair">Sair da Conta</button>
    </div>
  </div>
</template>

<style scoped>
.FundoPerfil {
  min-height: 100vh;
  width: 100vw;
  background: url('/src/assets/imagens/fundo.png') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden;
}
:global(body) {
  overflow-x: hidden;
  width: 100vw;
  margin: 0;
  padding: 0;
}
.perfil-usuario {
  max-width: 500px;
  width: 100%;
  margin: 40px auto;
  background: white;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(44, 62, 80, 0.10);
  padding: 32px 24px;
  text-align: center;
  border: 1.5px solid var(--color-border);
  transition: background 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
}
.perfil-header {
  margin-bottom: 24px;
}
.perfil-avatar {
  width: 110px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
  border: 3px solid var(--vt-c-indigo);
  background: var(--color-background-mute);
}
.perfil-header h2 {
  color: var(--vt-c-indigo);
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 4px;
}
.perfil-header p {
  color: var(--vt-c-text-light-2);
  font-size: 1rem;
}
.perfil-info {
  text-align: left;
  margin-bottom: 32px;
  background: var(--color-background-mute);
  border-radius: 10px;
  padding: 18px 16px;
  box-shadow: 0 1px 4px rgba(44, 62, 80, 0.04);
}
.perfil-info h3 {
  color: var(--vt-c-indigo);
  font-size: 1.1rem;
  margin-bottom: 10px;
}
.perfil-info ul {
  list-style: none;
  padding: 0;
}
.perfil-info li {
  margin-bottom: 8px;
  color: var(--color-text);
  font-size: 1rem;
}
.perfil-info button {
  margin-top: 10px;
  background: var(--vt-c-indigo);
  color: #fff;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}
.perfil-info button:hover {
  background: #1a2533;
}
.perfil-pedidos {
  text-align: left;
  margin-bottom: 32px;
  background: var(--color-background-mute);
  border-radius: 10px;
  padding: 18px 16px;
  box-shadow: 0 1px 4px rgba(44, 62, 80, 0.04);
}
.perfil-pedidos h3 {
  color: var(--vt-c-indigo);
  font-size: 1.1rem;
  margin-bottom: 10px;
}
.perfil-pedidos ul {
  list-style: none;
  padding: 0;
}
.perfil-pedidos li {
  margin-bottom: 8px;
  color: var(--color-text);
  font-size: 0.98rem;
}
.sair-btn {
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.08);
  transition: background 0.2s;
  margin-top: 0;
}
.sair-btn:hover {
  background: #c0392b;
}
.btn-voltar-menu {
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.08);
  transition: background 0.2s;
  margin-bottom: 24px;
}
.btn-voltar-menu:hover {
  background: #c0392b;
}
@media (max-width: 900px) {
  .perfil-usuario {
    max-width: 98vw;
    width: 98vw;
    padding: 10px 2vw;
    margin: 12px auto;
  }
}
@media (max-width: 600px) {
  .FundoPerfil {
    padding: 0;
    width: 100vw;
    overflow-x: hidden;
  }
  .perfil-usuario {
    max-width: 100vw;
    width: 100vw;
    padding: 8px 0;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
  }
  .perfil-info, .perfil-pedidos {
    padding: 10px 2vw;
    font-size: 0.98rem;
  }
  .perfil-avatar {
    width: 60px;
    height: 60px;
  }
  .sair-btn, .perfil-info button, .btn-voltar-menu {
    width: 100%;
    font-size: 0.95rem;
    padding: 8px 0;
  }
  .perfil-header h2 {
    font-size: 1.1rem;
  }
  .perfil-header p {
    font-size: 0.95rem;
  }
}
@media (max-width: 400px) {
  .perfil-usuario {
    padding: 2px 0;
    width: 100vw;
  }
}
</style>

