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
  const access = userStore.token; // Obter o token do Pinia
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
export const loginUser = (data) => api.post('/auth/jwt/create/', data);
export const getBebidas = () => api.get('/bebidas/');
export const refreshToken = (refresh) => api.post('/auth/jwt/refresh/', { refresh });

export default api;
