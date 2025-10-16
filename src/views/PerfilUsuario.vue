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
      showAlerta: false,
      alertaMsg: '',
      historicoCompras: [], // Adicionado histórico
    };
  },
  mounted() {
    this.carregarDadosUsuario();
    this.atualizarHistoricoCompras(); // Atualiza histórico ao montar
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
    Deslogar() {
      this.$router.push('/login');
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
        this.$forceUpdate();
        this.atualizarHistoricoCompras(); // Atualiza histórico após salvar perfil

        // Alerta personalizado
        this.alertaMsg = 'Perfil atualizado com sucesso!';
        this.showAlerta = true;
        setTimeout(() => { this.showAlerta = false; }, 3000);

      } catch (error) {
        console.error('Erro ao salvar perfil:', error);
        this.alertaMsg = 'Erro ao salvar perfil. Tente novamente.';
        this.showAlerta = true;
        setTimeout(() => { this.showAlerta = false; }, 3000);
      }
    },
    cancelarEdicao() {
      this.editando = false;
    },
    abrirInputAvatar() {
      // Corrigido para garantir que o input seja encontrado corretamente
      const input = document.getElementById('avatarInput');
      if (input) input.click();
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
            this.salvarAvatarImediato();
          }
          // Atualiza visualmente o avatar imediatamente
          this.$forceUpdate();
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
    },
    atualizarHistoricoCompras() {
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
      if (!usuarioLogado) return;
      const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
      this.historicoCompras = pedidos.filter(p => p.usuarioId === usuarioLogado.id);
    },
  },
};
</script>

<template>
  <div class="pizzaria-bg"></div>
  <div v-if="showAlerta" class="alerta-perfil-sucesso">
    <span>{{ alertaMsg }}</span>
  </div>
  <div class="perfil-historico-layout">
    <div class="perfil-container pizzaria-layout">
      <div class="seta-voltar" @click="voltarMenu">
        <img src="@/assets/imagens/seta-preta.png" alt="Voltar ao menu" />
      </div>
      <div class="perfil-card pizzaria-card">
        <div class="perfil-avatar-area pizzaria-avatar-area">
          <img :src="usuario.avatar || defaultAvatar" class="perfil-avatar pizzaria-avatar" alt="Avatar do usuário" />
          <input type="file" accept="image/*" @change="onAvatarChange" id="avatarInput" style="display:none" />
          <button class="btn-avatar pizzaria-btn-avatar" @click="abrirInputAvatar">Trocar Foto</button>
        </div>
        <div v-if="!editando" class="perfil-info pizzaria-info">
          <h2>{{ usuario.nome }}</h2>
          <div class="info-box">
            <span><i class="fa fa-envelope"></i> {{ usuario.email }}</span>
            <span><i class="fa fa-phone"></i> {{ usuario.telefone }}</span>
            <span><i class="fa fa-map-marker"></i> {{ usuario.endereco }}</span>
          </div>
          <div class="botoes-perfil pizzaria-botoes">
            <button class="btn-editar pizzaria-btn-editar" @click="editarPerfil">Editar</button>
            <button class="btn-deslogar pizzaria-btn-deslogar" @click="Deslogar">Sair</button>
          </div>
        </div>
        <div v-else class="perfil-edicao pizzaria-edicao">
          <input v-model="usuarioEdit.nome" placeholder="Nome" />
          <input v-model="usuarioEdit.email" placeholder="Email" />
          <input v-model="usuarioEdit.telefone" placeholder="Telefone" />
          <input v-model="usuarioEdit.endereco" placeholder="Endereço" />
          <div class="botoes-edicao pizzaria-botoes-edicao">
            <button class="btn-salvar pizzaria-btn-salvar" @click="salvarPerfil">Salvar</button>
            <button class="btn-cancelar pizzaria-btn-cancelar" @click="cancelarEdicao">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
    <aside class="historico-compras-card">
      <h3>Histórico de Compras</h3>
      <div v-if="historicoCompras.length === 0" class="sem-historico">Nenhuma compra realizada.</div>
      <ul v-else>
        <li v-for="pedido in historicoCompras" :key="pedido.id" class="item-historico">
          <div><strong>Pedido #{{ pedido.id }}</strong> - {{ pedido.data }}</div>
          <div>Status: <span :class="pedido.status">{{ pedido.status }}</span></div>
          <div>Valor: R$ {{ pedido.valor.toFixed(2).replace('.', ',') }}</div>
          <div>Itens:
            <ul>
              <li v-for="item in pedido.itens" :key="item.nome">{{ item.nome }} ({{ item.qtd }}) - {{ item.detalhes }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </aside>
  </div>
</template>

<style scoped>
.pizzaria-bg {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  z-index: 0;
  background: url('@/assets/imagens/fundo.png') no-repeat center center fixed, radial-gradient(circle at 30% 70%, #fffbe6 0%, #ffe5b4 40%, #b33c1a 100%);
  background-size: cover;
  opacity: 0.18;
  pointer-events: none;
}
.pizzaria-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.pizzaria-card {
  background: linear-gradient(120deg, #fff 70%, #ffe5b4 100%);
  border-radius: 32px;
  box-shadow: 0 8px 40px #b33c1a33;
  padding: 48px 36px 36px 36px;
  max-width: 420px;
  width: 100%;
  text-align: center;
  position: relative;
  border: 2px solid #b33c1a;
}
.pizzaria-avatar-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 22px;
}
.pizzaria-avatar {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #ff9800;
  margin-bottom: 12px;
  box-shadow: 0 4px 16px #b33c1a44;
  background: #fffbe6;
}
.pizzaria-btn-avatar {
  background: #ff9800;
  color: #fff;
  border: none;
  padding: 8px 24px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px #b33c1a44;
  transition: background 0.2s;
}
.pizzaria-btn-avatar:hover {
  background: #b33c1a;
}
.pizzaria-info h2 {
  color: #b33c1a;
  font-size: 1.7rem;
  margin-bottom: 12px;
  font-family: 'Playfair Display', serif;
}
.info-box {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-bottom: 22px;
  color: #222e3a;
  font-size: 1.08rem;
  align-items: flex-start;
}
.info-box i {
  margin-right: 8px;
  color: #ff9800;
}
.pizzaria-botoes {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 18px;
}
.pizzaria-btn-editar {
  background: #ffe5b4;
  color: #b33c1a;
  border: none;
  padding: 10px 26px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 2px 8px #ff980044;
  transition: background 0.2s;
}
.pizzaria-btn-editar:hover {
  background: #ff9800;
  color: #fff;
}
.pizzaria-btn-deslogar {
  background: #b33c1a;
  color: #fff;
  border: none;
  padding: 10px 26px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 2px 8px #b33c1a44;
  transition: background 0.2s;
}
.pizzaria-btn-deslogar:hover {
  background: #ff9800;
}
.pizzaria-edicao {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pizzaria-edicao input {
  width: 94%;
  margin-bottom: 14px;
  padding: 10px 14px;
  border-radius: 9px;
  border: 1px solid #ff9800;
  font-size: 1.08rem;
  display: block;
  text-align: center;
  background: #fffbe6;
  color: #b33c1a;
}
.pizzaria-botoes-edicao {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 10px;
}
.pizzaria-btn-salvar {
  background: #ff9800;
  color: #fff;
  border: none;
  padding: 10px 26px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 2px 8px #ff980044;
  transition: background 0.2s;
}
.pizzaria-btn-salvar:hover {
  background: #b33c1a;
}
.pizzaria-btn-cancelar {
  background: #ffe5b4;
  color: #b33c1a;
  border: none;
  padding: 10px 26px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 2px 8px #ff980044;
  transition: background 0.2s;
}
.pizzaria-btn-cancelar:hover {
  background: #ff9800;
  color: #fff;
}
.seta-voltar {
  position: fixed;
  top: 18px;
  left: 18px;
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
  width: 36px;
  height: 36px;
  filter: drop-shadow(0 1px 2px rgba(44,62,80,0.10));
}
.alerta-perfil-sucesso {
  position: fixed;
  top: 32px;
  right: 32px;
  z-index: 9999;
  background: linear-gradient(90deg, #ff9800 0%, #b33c1a 100%);
  color: #fff;
  font-size: 1.08rem;
  font-weight: 600;
  border-radius: 12px;
  box-shadow: 0 4px 16px #b33c1a22;
  padding: 16px 32px;
  animation: alertaPerfilFadeIn 0.4s;
  min-width: 220px;
  text-align: center;
}
@keyframes alertaPerfilFadeIn {
  from { opacity: 0; transform: translateY(-20px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@media (max-width: 600px) {
  .pizzaria-card {
    padding: 20px 4px 20px 4px;
    border-radius: 16px;
    max-width: 99vw;
  }
  .pizzaria-avatar {
    width: 80px;
    height: 80px;
  }
  .seta-voltar {
    top: 8px;
    left: 8px;
    position: fixed;
  }
  .alerta-perfil-sucesso {
    top: 10px;
    right: 4vw;
    min-width: 0;
    max-width: 90vw;
    padding: 10px 4vw;
    font-size: 0.98rem;
  }
}
.perfil-historico-layout {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 32px;
}
.historico-compras-card {
  background: #fffbe6;
  border-radius: 24px;
  box-shadow: 0 4px 24px #b33c1a18;
  padding: 32px 24px;
  min-width: 320px;
  max-width: 400px;
  width: 100%;
  margin-top: 32px;
}
.historico-compras-card h3 {
  color: #b33c1a;
  margin-bottom: 18px;
  font-size: 1.3rem;
  font-family: 'Playfair Display', serif;
}
.item-historico {
  background: #ffe5b4;
  border-radius: 12px;
  margin-bottom: 18px;
  padding: 14px 18px;
  box-shadow: 0 2px 8px #b33c1a22;
}
.sem-historico {
  color: #b33c1a;
  font-size: 1.08rem;
  text-align: center;
  margin-top: 24px;
}
@media (max-width: 900px) {
  .perfil-historico-layout {
    flex-direction: column;
    gap: 18px;
    align-items: stretch;
  }
  .historico-compras-card {
    margin-top: 0;
    min-width: 0;
    max-width: 99vw;
    padding: 18px 8px;
  }
}
</style>
