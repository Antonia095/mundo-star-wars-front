
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/pages/Login.css';

const Login = () => {
  const { auth, login, error, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) navigate('/itens');
  }, [auth, navigate]);

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
    </div>
  );
};

export default Login;
