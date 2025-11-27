const API_URL = 'http://localhost:8000/api/auth'; // Corrigido para refletir o endpoint correto
const API_USER_URL = 'http://localhost:8000/api';

export async function login(email, password) {
  const response = await fetch(`${API_URL}/jwt/create/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    let errorMsg = 'Login inválido';
    try {
      const err = await response.json();
      errorMsg = err.detail || JSON.stringify(err);
    } catch {
      // Error parsing error response, ignore
    }
    throw new Error(errorMsg);
  }
  const data = await response.json();
  console.log('Tokens recebidos:', data); // Log para verificar os tokens recebidos
  // Persistir tokens com chaves padronizadas
  localStorage.setItem('accessToken', data.access);
  localStorage.setItem('refreshToken', data.refresh);

  // Buscar dados do usuário logado
  try {
    const userResp = await fetch(`${API_USER_URL}/usuarios/me/`, {
      headers: { 'Authorization': `Bearer ${data.access}` }
    });
    if (userResp.ok) {
      const userData = await userResp.json();
      console.log('Dados do usuário logado:', userData); // Log para verificar os dados do usuário
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      console.error('Erro ao buscar dados do usuário:', userResp.status, await userResp.text());
    }
  } catch (e) {
    console.error('Erro ao buscar dados do usuário:', e);
  }

  return data;
}

export async function register({ email, password, name }) {
  // Gera passage_id aleatório só para o backend aceitar
  const payload = {
    email,
    password,
    passage_id: Math.random().toString(36).substring(2, 15)
  };
  if (name && name.trim() !== '') {
    payload.name = name;
  }
  const response = await fetch(`${API_URL}/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    let errorMsg = 'Erro ao cadastrar';
    try {
      const err = await response.json();
      errorMsg = JSON.stringify(err);
    } catch {
      // Error parsing error response, ignore
    }
    throw new Error(errorMsg);
  }
  return await response.json();
}

export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export async function isAuthenticated() {
  const access = localStorage.getItem('accessToken');
  console.log('Token de acesso no isAuthenticated:', access); // Log para verificar o token
  if (!access) {
    console.warn('Nenhum token de acesso encontrado.');
    return false;
  }

  try {
    const response = await fetch(`${API_USER_URL}/usuarios/me/`, {
      headers: { 'Authorization': `Bearer ${access}` },
    });
    console.log('Resposta do backend no isAuthenticated:', response.status); // Log para verificar a resposta

    if (response.ok) {
      const userData = await response.json();
      console.log('Usuário autenticado:', userData); // Log para verificar os dados do usuário
      localStorage.setItem('user', JSON.stringify(userData)); // Atualiza o localStorage com os dados do usuário
      return true;
    } else if (response.status === 401) {
      console.warn('Token expirado. Tentando renovar...');
      const tokenRenovado = await refreshAccessToken();
      return tokenRenovado;
    } else {
      console.warn('Falha na autenticação. Status:', response.status);
      const errorText = await response.text();
      console.warn('Detalhes do erro:', errorText);
      return false;
    }
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return false;
  }
}

export async function refreshAccessToken() {
  const refresh = localStorage.getItem('refreshToken');
  if (!refresh) {
    console.warn('Nenhum token de atualização encontrado.');
    return false;
  }

  try {
    const response = await fetch(`${API_URL}/jwt/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('accessToken', data.access);
      console.log('Token de acesso renovado e armazenado:', data.access);
      return true;
    } else {
      console.warn('Falha ao renovar o token de acesso. Limpando tokens e redirecionando para login.');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      const errorText = await response.text();
      console.warn('Detalhes do erro:', errorText);
      return false;
    }
  } catch (error) {
    console.error('Erro ao tentar renovar o token de acesso:', error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return false;
  }
}
