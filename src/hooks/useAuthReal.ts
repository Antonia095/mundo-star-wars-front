import { useState, useEffect } from 'react';
import { 
  login as apiLogin, 
  register as apiRegister,
  logout as apiLogout, 
  isAuthenticated, 
  getCurrentUser,
  refreshToken as apiRefreshToken,
  type User,
  type RegisterRequest,
  type LoginResponse,
  type RegisterResponse
} from '../services/mundoStarWarsApi';

interface UseAuthReturn {
  auth: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

export function useAuth(): UseAuthReturn {
  const [auth, setAuth] = useState(() => isAuthenticated());
  const [user, setUser] = useState<User | null>(() => getCurrentUser());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = isAuthenticated();
      const currentUser = getCurrentUser();
      
      setAuth(isAuth);
      setUser(currentUser);
    };

    checkAuth();

    const interval = setInterval(checkAuth, 60000);

    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const response: LoginResponse = await apiLogin(email, password);
      setAuth(true);
      setUser(response.usuario);
    } catch (err: unknown) {
      setError((err as Error).message);
      setAuth(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const response: RegisterResponse = await apiRegister(userData);
      setAuth(true);
      setUser(response.user);
    } catch (err: unknown) {
      setError((err as Error).message);
      setAuth(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    
    try {
      await apiLogout();
    } catch (err: unknown) {
      console.error('Erro no logout:', err);
    } finally {
      setAuth(false);
      setUser(null);
      setError(null);
      setLoading(false);
    }
  };

  const refreshToken = async (): Promise<void> => {
    try {
      const response: LoginResponse = await apiRefreshToken();
      setAuth(true);
      setUser(response.usuario);
      setError(null);
    } catch (err: unknown) {
      setError((err as Error).message);
      setAuth(false);
      setUser(null);
    }
  };

  const clearError = (): void => {
    setError(null);
  };

  return { 
    auth, 
    user, 
    loading, 
    error, 
    login, 
    register, 
    logout, 
    refreshToken,
    clearError 
  };
}