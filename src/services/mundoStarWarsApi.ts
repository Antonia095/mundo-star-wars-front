const API_BASE_URL = 'http://localhost:8080/api';

export interface Item {
  id?: string;
  image: string;
  titulo: string;
  descricao: string;
  dataCriacao?: string;
  dataAtualizacao?: string;
}

export interface User {
  id: string;
  email: string;
  perfil: 'ADMIN' | 'PADRAO';
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  usuario: User;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

class MundoStarWarsApi {

  private getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  private buildHeaders(additionalHeaders: Record<string, string> = {}): HeadersInit {
    return {
      'Content-Type': 'application/json',
      ...this.getAuthHeader(),
      ...additionalHeaders,
    };
  }

  async loginUser(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/autenticacao/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Email ou senha inválidos');
    }

    const data = await response.json();
    
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    
    return data;
  }

  async registerUser(usuario: RegisterRequest): Promise<RegisterResponse> {
    const response = await fetch(`${API_BASE_URL}/usuarios/cadastro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Erro ao cadastrar usuário');
    }

    const loginResponse = await this.loginUser({
      email: usuario.email,
      senha: usuario.senha
    });

    return {
      user: loginResponse.usuario,
      token: loginResponse.token
    };
  }

  async logoutUser(): Promise<void> {
    try {
     
      await fetch(`${API_BASE_URL}/autenticacao/logout`, {
        method: 'POST',
        headers: this.buildHeaders(),
      });
    } catch (error) {
      console.warn('Erro ao fazer logout no servidor:', error);
    } finally {
      
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    }
  }

  async refreshUserToken(): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/autenticacao/refresh`, {
      method: 'POST',
      headers: this.buildHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Erro ao renovar token');
    }

    const data = await response.json();
    
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    
    return data;
  }

 
  async listarConteudos(page = 0, size = 10): Promise<PageResponse<Item>> {
    const response = await fetch(`${API_BASE_URL}/conteudos?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Erro ao listar conteúdos');
    }

    return response.json();
  }

  async buscarConteudosPorTitulo(titulo: string): Promise<Item[]> {
    const response = await fetch(`${API_BASE_URL}/conteudos/buscar?titulo=${encodeURIComponent(titulo)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Erro ao buscar conteúdos');
    }

    return response.json();
  }

  async criarConteudo(conteudo: Omit<Item, 'id' | 'dataCriacao' | 'dataAtualizacao'>): Promise<Item> {
    const response = await fetch(`${API_BASE_URL}/conteudos`, {
      method: 'POST',
      headers: this.buildHeaders(),
      body: JSON.stringify(conteudo),
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Acesso negado - Apenas ADMIN pode criar conteúdos');
      }
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Erro ao criar conteúdo');
    }

    return response.json();
  }

  async atualizarConteudo(id: string, conteudo: Omit<Item, 'id' | 'dataCriacao' | 'dataAtualizacao'>): Promise<Item> {
    const response = await fetch(`${API_BASE_URL}/conteudos/${id}`, {
      method: 'PUT',
      headers: this.buildHeaders(),
      body: JSON.stringify(conteudo),
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Acesso negado - Apenas ADMIN pode atualizar conteúdos');
      }
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Erro ao atualizar conteúdo');
    }

    return response.json();
  }

  async popularDadosIniciais(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/conteudos/popular-dados`, {
      method: 'POST',
      headers: this.buildHeaders(),
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Acesso negado - Apenas ADMIN pode popular dados');
      }
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Erro ao popular dados iniciais');
    }
  }

  async excluirConteudo(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/conteudos/${id}`, {
      method: 'DELETE',
      headers: this.buildHeaders(),
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Acesso negado - Apenas ADMIN pode excluir conteúdos');
      }
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Erro ao excluir conteúdo');
    }
  }

  async buscarConteudoPorId(id: string): Promise<Item> {
    const response = await fetch(`${API_BASE_URL}/conteudos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Conteúdo não encontrado');
      }
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Erro ao buscar conteúdo');
    }

    return response.json();
  }
}

export const mundoStarWarsApi = new MundoStarWarsApi();

export function isAuthenticated(): boolean {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    return payload.exp > currentTime;
  } catch {
    return false;
  }
}

export function getCurrentUser(): User | null {
  const userData = localStorage.getItem('usuario');
  if (!userData) return null;

  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function clearAuthData(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  return mundoStarWarsApi.loginUser({ email, senha: password });
}

export async function register(userData: RegisterRequest): Promise<RegisterResponse> {
  return mundoStarWarsApi.registerUser(userData);
}

export async function logout(): Promise<void> {
  return mundoStarWarsApi.logoutUser();
}

export async function refreshToken(): Promise<LoginResponse> {
  return mundoStarWarsApi.refreshUserToken();
}

export async function listarConteudos(page = 0, size = 10): Promise<PageResponse<Item>> {
  return mundoStarWarsApi.listarConteudos(page, size);
}

export async function buscarConteudoPorId(id: string): Promise<Item> {
  return mundoStarWarsApi.buscarConteudoPorId(id);
}

export async function criarConteudo(conteudo: Omit<Item, 'id' | 'dataCriacao' | 'dataAtualizacao'>): Promise<Item> {
  return mundoStarWarsApi.criarConteudo(conteudo);
}

export async function atualizarConteudo(id: string, conteudo: Omit<Item, 'id' | 'dataCriacao' | 'dataAtualizacao'>): Promise<Item> {
  return mundoStarWarsApi.atualizarConteudo(id, conteudo);
}

export async function excluirConteudo(id: string): Promise<void> {
  return mundoStarWarsApi.excluirConteudo(id);
}