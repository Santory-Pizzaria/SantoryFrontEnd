<template>
  <div class="perfil-container">
    <div class="seta-voltar" @click="voltarMenu">
      <img src="@/assets/imagens/seta.png" alt="Voltar ao menu" />
    </div>
    <div class="perfil-card">
      <div class="perfil-avatar-area">
        <img :src="usuario.avatar || defaultAvatar" class="perfil-avatar" alt="Avatar do usuário" />
        <input type="file" accept="image/*" @change="onAvatarChange" id="avatarInput" style="display:none" />
        <button class="btn-avatar" @click="abrirInputAvatar">Alterar Foto</button>
      </div>
      <div v-if="!editando" class="perfil-info">
        <h2>{{ usuario.nome }}</h2>
        <p><strong>Email:</strong> {{ usuario.email }}</p>
        <p><strong>Telefone:</strong> {{ usuario.telefone }}</p>
        <p><strong>Endereço:</strong> {{ usuario.endereco }}</p>
        <div class="botoes-perfil">
          <button class="btn-editar" @click="editarPerfil">Editar Perfil</button>
          <button class="btn-logout" @click="logout">Sair</button>
        </div>
      </div>
      <div v-else class="perfil-edicao">
        <input v-model="usuarioEdit.nome" placeholder="Nome" />
        <input v-model="usuarioEdit.email" placeholder="Email" />
        <input v-model="usuarioEdit.telefone" placeholder="Telefone" />
        <input v-model="usuarioEdit.endereco" placeholder="Endereço" />
        <div class="botoes-edicao">
          <button class="btn-salvar" @click="salvarPerfil">Salvar</button>
          <button class="btn-cancelar" @click="cancelarEdicao">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PerfilUsuario',
  data() {
    return {
      usuario: {
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        avatar: '',
      },
      usuarioEdit: {},
      editando: false,
      defaultAvatar: new URL('@/assets/imagens/logo.png', import.meta.url).href,
    };
  },
  mounted() {
    this.carregarDadosUsuario();
  },
  methods: {
    carregarDadosUsuario() {
      // Verificar se usuário está logado
      const usuarioLogado = localStorage.getItem('usuarioLogado');

      if (!usuarioLogado) {
        // Se não estiver logado, redirecionar para login
        this.$router.push('/login');
        return;
      }

      try {
        const dadosUsuario = JSON.parse(usuarioLogado);
        this.usuario = {
          nome: dadosUsuario.nome || '',
          email: dadosUsuario.email || '',
          telefone: dadosUsuario.telefone || '',
          endereco: dadosUsuario.endereco || '',
          avatar: dadosUsuario.avatar || '',
        };
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        this.$router.push('/login');
      }
    },
    voltarMenu() {
      this.$router.push('/menu');
    },
    editarPerfil() {
      this.usuarioEdit = { ...this.usuario };
      this.editando = true;
    },
    salvarPerfil() {
      try {
        // Atualizar dados no componente
        this.usuario = { ...this.usuarioEdit };

        // Atualizar dados no localStorage
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        const usuarioAtualizado = {
          ...usuarioLogado,
          nome: this.usuario.nome,
          email: this.usuario.email,
          telefone: this.usuario.telefone,
          endereco: this.usuario.endereco,
          avatar: this.usuario.avatar,
        };

        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));

        // Atualizar também na lista de usuários
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const indiceUsuario = usuarios.findIndex(user => user.id === usuarioLogado.id);

        if (indiceUsuario !== -1) {
          usuarios[indiceUsuario] = {
            ...usuarios[indiceUsuario],
            nome: this.usuario.nome,
            email: this.usuario.email,
            telefone: this.usuario.telefone,
            endereco: this.usuario.endereco,
            avatar: this.usuario.avatar,
          };
          localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }

        this.editando = false;

        // Mostrar feedback de sucesso
        alert('Perfil atualizado com sucesso!');

      } catch (error) {
        console.error('Erro ao salvar perfil:', error);
        alert('Erro ao salvar perfil. Tente novamente.');
      }
    },
    cancelarEdicao() {
      this.editando = false;
    },
    abrirInputAvatar() {
      this.$el.querySelector('#avatarInput').click();
    },
    onAvatarChange(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (this.editando) {
            this.usuarioEdit.avatar = ev.target.result;
          } else {
            this.usuario.avatar = ev.target.result;
            // Salvar avatar imediatamente se não estiver editando
            this.salvarAvatarImediato();
          }
        };
        reader.readAsDataURL(file);
      }
    },
    salvarAvatarImediato() {
      try {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        const usuarioAtualizado = {
          ...usuarioLogado,
          avatar: this.usuario.avatar,
        };

        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));

        // Atualizar também na lista de usuários
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const indiceUsuario = usuarios.findIndex(user => user.id === usuarioLogado.id);

        if (indiceUsuario !== -1) {
          usuarios[indiceUsuario].avatar = this.usuario.avatar;
          localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }

      } catch (error) {
        console.error('Erro ao salvar avatar:', error);
      }
    },
    logout() {
      localStorage.removeItem('usuarioLogado');
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
.perfil-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('@/assets/imagens/fundo.png') no-repeat center center fixed;
  background-size: cover;
}
.perfil-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(44, 62, 80, 0.10);
  padding: 32px 24px;
  max-width: 350px;
  width: 100%;
  text-align: center;
}
.perfil-avatar-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 18px;
}
.perfil-avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e74c3c;
  margin-bottom: 8px;
}
.btn-avatar {
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 8px;
}
.perfil-info h2 {
  color: #e74c3c;
  font-size: 1.4rem;
  margin-bottom: 8px;
}
.perfil-info p {
  margin: 4px 0;
  color: #333;
}
.botoes-perfil {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 12px;
}
.btn-logout {
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.btn-logout:hover {
  background: #c0392b;
}
.btn-editar:hover {
  background: #d35400;
}
.perfil-edicao input {
  width: 100%;
  margin-bottom: 10px;
  padding: 7px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
.botoes-edicao {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.btn-salvar {
  background: #27ae60;
  color: #fff;
  border: none;
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.btn-cancelar {
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.seta-voltar {
  position: absolute;
  top: 24px;
  left: 24px;
  cursor: pointer;
  z-index: 10;
  background: none;
  border-radius: 0;
  box-shadow: none;
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: none;
  padding: 0;
}
.seta-voltar img {
  width: 28px;
  height: 28px;
  filter: drop-shadow(0 1px 2px rgba(44,62,80,0.10));
}
</style>
