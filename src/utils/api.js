// src/utils/api.js
// Serviço para consumir a API do Django
import axios from 'axios';
import { useUserStore } from '@/stores/user';

const API_BASE_URL = 'http://localhost:8000/api'; // ajuste para sua URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para adicionar o token de acesso no cabeçalho Authorization
api.interceptors.request.use((config) => {
  const userStore = useUserStore();
  const access = userStore.accessToken || localStorage.getItem('accessToken');
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
    console.log('Token enviado na requisição:', access); // Log para verificar o token enviado
  } else {
    console.warn('Nenhum token encontrado no userStore.');
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor de resposta para renovar token automaticamente em 401
let isRefreshing = false;
let pendingRequests = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        // Fila enquanto renova
        return new Promise((resolve) => {
          pendingRequests.push((token) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }
      isRefreshing = true;
      try {
        const refresh = localStorage.getItem('refreshToken');
        if (!refresh) throw new Error('Sem refreshToken');
        const refreshRes = await api.post('/auth/jwt/refresh/', { refresh });
        const newAccess = refreshRes.data?.access;
        if (!newAccess) throw new Error('Sem novo accessToken');
        localStorage.setItem('accessToken', newAccess);
        // Atualiza header padrão
        api.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
        // Executa pendentes
        pendingRequests.forEach(cb => cb(newAccess));
        pendingRequests = [];
        // Refaz a requisição original
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (e) {
        console.error('Erro ao tentar renovar o token:', e);
        pendingRequests = [];
        // Limpa tokens e propaga erro
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

// Métodos para recursos principais (corrigidos para plural e adicionados faltantes)
export const getUsuarios = () => api.get('/usuarios/');
export const getUsuario = (id) => api.get(`/usuario/${id}/`);
export const getProdutos = () => api.get('/produtos/');
export const getEndereco = (id) => api.get(`/endereco/${id}/`);
export const getFeedbacks = () => api.get('/feedbacks/');
export const getPedidos = () => api.get('/pedidos/');
export const createPedido = (data) => api.post('/pedidos/', data);
export const getItemPedido = (id) => api.get(`/itempedido/${id}/`);
export const createItemPedido = (data) => api.post('/itempedido/', data);
export const getReservas = () => api.get('/reservas/');
export const createReserva = (data) => api.post('/reservas/', data);
export const getPizzas = () => {
  console.log('Iniciando requisição para /pizzas/');
  return api.get('/pizzas/').then((response) => {
    console.log('Resposta recebida:', response);
    return response;
  }).catch((error) => {
    console.error('Erro ao buscar pizzas:', error);
    throw error;
  });
};
export const getCombos = () => api.get('/combos/');
export const getCarrinhos = () => api.get('/carrinhos/');
export const getCarrinho = (id) => api.get(`/carrinhos/${id}/`);
export const getCarrinhoItens = () => api.get('/carrinhoitens/');
export const addCarrinhoItem = (data) => api.post('/carrinhoitens/', data);
export const registerUser = (data) => api.post('/auth/users/', data);
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/jwt/create/', credentials);
    const { access, refresh } = response.data;

    // Salvar tokens no localStorage
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);

    // Obter dados do usuário logado
    const userResponse = await api.get('/auth/users/me/', {
      headers: { Authorization: `Bearer ${access}` },
    });
    const user = userResponse.data;

    // Salvar usuário no localStorage
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};
export const logoutUser = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};
export const getBebidas = () => api.get('/bebidas/');
export const refreshToken = (refresh) => api.post('/auth/jwt/refresh/', { refresh });

export default api;
