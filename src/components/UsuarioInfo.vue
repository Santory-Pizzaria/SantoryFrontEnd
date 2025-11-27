<script>
import { useUserStore } from '@/stores/user';

export default {
  name: 'UsuarioInfo',
  setup() {
    const userStore = useUserStore();
    const defaultAvatar = new URL('@/assets/imagens/perfil.png', import.meta.url).href;

    return {
      usuarioLogado: userStore.user,
      defaultAvatar,
    };
  },
};
</script>


<template>
  <div v-if="usuarioLogado" class="usuario-info">
    <img
      :src="usuarioLogado.avatar || defaultAvatar"
      alt="Avatar"
      class="usuario-avatar"
    />
    <span class="usuario-nome">{{ usuarioLogado.nome }}</span>
  </div>
</template>

<style scoped>
.usuario-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: white;
  font-size: 0.9rem;
}

.usuario-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.usuario-nome {
  font-weight: 600;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .usuario-nome {
    display: none;
  }

  .usuario-info {
    padding: 6px;
  }
}
</style>
