
import { useState } from 'react';
import { login as mockLogin, logout as mockLogout, isAuthenticated, saveToken} from '../services/mockAuthService';

export function useAuth() {
  const [auth, setAuth] = useState(() => isAuthenticated());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await mockLogin(email, password);
      saveToken(res.token, res.expiresIn);
      setAuth(true);
    } catch (err: unknown) {
      setError((err as Error).message);
      setAuth(false);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    mockLogout();
    setAuth(false);
  }

  return { auth, login, logout, error, loading };
}
