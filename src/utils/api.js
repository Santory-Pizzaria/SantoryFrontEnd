// src/utils/api.js
// Serviço para consumir a API do Django
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // ajuste para sua URL

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true // se usar autenticação por sessão
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
export const getPizzas = () => api.get('/pizzas/');
export const getCombos = () => api.get('/combos/');
export const getCarrinhos = () => api.get('/carrinhos/');
export const getCarrinho = (id) => api.get(`/carrinhos/${id}/`);
export const getCarrinhoItens = () => api.get('/carrinhoitens/');
export const addCarrinhoItem = (data) => api.post('/carrinhoitens/', data);
export const registerUser = (data) => api.post('/auth/users/', data);
export const loginUser = (data) => api.post('/auth/jwt/create/', data);
export const getBebidas = () => api.get('/bebidas/');

export default api;
