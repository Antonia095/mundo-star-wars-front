export interface AuthResponse {
  token: string;
  expiresIn: number; // segundos
}

const MOCK_USER = {
  email: 'user@starwars.com',
  password: '123456',
};

export function login(email: string, password: string): Promise<AuthResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === MOCK_USER.email && password === MOCK_USER.password) {
        
        const token = btoa(`${email}:${Date.now()}`);
        resolve({ token, expiresIn: 60 * 15 }); // 15 minutos
      } else {
        reject(new Error('Usuário ou senha inválidos.'));
      }
    }, 700);
  });
}

export function logout() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_expiry');
}

export function isAuthenticated(): boolean {
  const token = localStorage.getItem('auth_token');
  const expiry = localStorage.getItem('auth_expiry');
  if (!token || !expiry) return false;
  return Date.now() < Number(expiry);
}

export function saveToken(token: string, expiresIn: number) {
  localStorage.setItem('auth_token', token);
  localStorage.setItem('auth_expiry', String(Date.now() + expiresIn * 1000));
}
