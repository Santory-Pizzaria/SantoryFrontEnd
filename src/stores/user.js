import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    accessToken: null,
  }),
  actions: {
    loadFromLocalStorage() {
      const user = localStorage.getItem('user');
      const accessToken = localStorage.getItem('accessToken');
      if (user && accessToken) {
        this.user = JSON.parse(user);
        this.accessToken = accessToken;
      }
    },
    logout() {
      this.user = null;
      this.accessToken = null;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});
