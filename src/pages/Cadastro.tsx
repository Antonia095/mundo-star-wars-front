import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuthReal';
import { isValidEmail, isValidPassword } from '../services/mundoStarWarsApi';
import '../styles/pages/Login.css';

const Register = () => {
  const { auth, register, error, loading, clearError } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) navigate('/itens');
  }, [auth, navigate]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.nome.trim()) {
      errors.push('Nome é obrigatório');
    } else if (formData.nome.trim().length < 2) {
      errors.push('Nome deve ter pelo menos 2 caracteres');
    }

    if (!formData.email.trim()) {
      errors.push('Email é obrigatório');
    } else if (!isValidEmail(formData.email)) {
      errors.push('Email deve ter um formato válido');
    }

    if (!formData.password) {
      errors.push('Senha é obrigatória');
    } else if (!isValidPassword(formData.password)) {
      errors.push('Senha deve ter pelo menos 8 caracteres, incluindo letras e números');
    }

    if (formData.password !== formData.confirmPassword) {
      errors.push('Senhas não coincidem');
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    await register({
      email: formData.email.trim().toLowerCase(),
      senha: formData.password,
      confirmarSenha: formData.confirmPassword,
    });
  };

  return (
    <div className="auth-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Digite seu e-mail"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Digite sua senha (mín. 8 caracteres)"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="confirmPassword">Confirmar senha</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirme sua senha"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      {validationErrors.length > 0 && (
        <div style={{ color: 'red', marginTop: 8 }}>
          {validationErrors.map((error, index) => (
            <p key={index} style={{ margin: '4px 0', fontSize: '14px' }}>
              • {error}
            </p>
          ))}
        </div>
      )}

      {error && (
        <p style={{ color: 'red', marginTop: 8, fontWeight: 'bold' }}>
          {error}
        </p>
      )}

      <p style={{ textAlign: 'center', marginTop: 16 }}>
        Já tem uma conta?{' '}
        <Link to="/login" style={{ color: '#ffe066', textDecoration: 'underline' }}>
          Fazer login
        </Link>
      </p>
    </div>
  );
};

export default Register;