
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuthReal';
import '../styles/pages/Login.css';

const Login = () => {
  const { auth, login, error, loading, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) navigate('/itens');
  }, [auth, navigate]);

  useEffect(() => {
    // Limpar erros quando o componente monta
    clearError();
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, senha);
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Seu e-mail</label>
        <input
          id="email"
          type="email"
          placeholder="Inserir seu e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label htmlFor="senha">Sua senha</label>
        <input
          id="senha"
          type="password"
          placeholder="Inserir sua senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Logar'}</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
      
      <p style={{ textAlign: 'center', marginTop: 16 }}>
        Não tem uma conta?{' '}
        <Link to="/register" style={{ color: '#ffe066', textDecoration: 'underline' }}>
          Cadastre-se
        </Link>
      </p>
    </div>
  );
};

export default Login;
