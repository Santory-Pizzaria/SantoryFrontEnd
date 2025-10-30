import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
      // Persistir o estado do usuário no localStorage
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearUser() {
      this.user = null;
      // Remover o estado do usuário do localStorage
      localStorage.removeItem('user');
    },
    restoreUser() {
      // Restaurar o estado do usuário do localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
        console.log('Usuário restaurado do localStorage:', this.user); // Log para verificar o usuário restaurado
      } else {
        console.log('Nenhum usuário encontrado no localStorage.'); // Log para verificar ausência de usuário
      }
    },
  },
});
