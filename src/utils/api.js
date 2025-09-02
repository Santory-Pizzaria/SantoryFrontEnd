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
export const getProdutos = () => api.get('/produto/');
export const getEndereco = (id) => api.get(`/endereco/${id}/`);
export const getPedidos = () => api.get('/pedido/');
export const createPedido = (data) => api.post('/pedido/', data);
export const getItemPedido = (id) => api.get(`/itempedido/${id}/`);
export const createItemPedido = (data) => api.post('/itempedido/', data);
export const getReservas = () => api.get('/reserva/');
export const createReserva = (data) => api.post('/reserva/', data);
export const getPizzas = () => api.get('/pizza/');
export const getCombos = () => api.get('/combo/');
export const getCarrinhos = () => api.get('/carrinho/');
export const getCarrinho = (id) => api.get(`/carrinho/${id}/`);
export const getCarrinhoItens = () => api.get('/carrinhoitem/');
export const addCarrinhoItem = (data) => api.post('/carrinhoitem/', data);
export const registerUser = (data) => api.post('/auth/users/', data);
export const loginUser = (data) => api.post('/auth/jwt/create/', data);
export const getBebidas = () => api.get('/bebida/');

export default api;
