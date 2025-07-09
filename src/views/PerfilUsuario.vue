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
        <button class="btn-editar" @click="editarPerfil">Editar Perfil</button>
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
        nome: 'Cliente Pizzaria',
        email: 'cliente@email.com',
        telefone: '(11) 99999-9999',
        endereco: 'Rua das Pizzas, 123',
        avatar: '',
      },
      usuarioEdit: {},
      editando: false,
      defaultAvatar: new URL('@/assets/imagens/logo.png', import.meta.url).href,
    };
  },
  methods: {
    voltarMenu() {
      this.$router.push('/menu');
    },
    editarPerfil() {
      this.usuarioEdit = { ...this.usuario };
      this.editando = true;
    },
    salvarPerfil() {
      this.usuario = { ...this.usuarioEdit };
      this.editando = false;
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
          }
        };
        reader.readAsDataURL(file);
      }
    },
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
.btn-editar {
  background: #e67e22;
  color: #fff;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 12px;
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
