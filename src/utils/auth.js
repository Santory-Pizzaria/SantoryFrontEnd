const API_URL = 'http://localhost:8000/auth';

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
      errorMsg = JSON.stringify(err);
    } catch {}
    throw new Error(errorMsg);
  }
  const data = await response.json();
  localStorage.setItem('access', data.access);
  localStorage.setItem('refresh', data.refresh);
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
    } catch {}
    throw new Error(errorMsg);
  }
  return await response.json();
}

export function logout() {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
}

export function isAuthenticated() {
  return !!localStorage.getItem('access');
}
