
import React, { useState } from 'react';
import '../styles/pages/Home.css';



const categorias = [
  { value: '', label: 'Selecione uma categoria' },
  { value: 'filme', label: 'Filme' },
  { value: 'personagem', label: 'Personagem' },
  { value: 'planeta', label: 'Planeta' },
];

const Home = () => {
  const [categoria, setCategoria] = useState('');
  const [termo, setTermo] = useState('');

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoria(e.target.value);
    setTermo('');
  };

  const handleTermoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermo(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Pesquisar por: ${termo} na categoria: ${categoria}`);
  };

  return (
    <div>
      <h1>Bem-vindo ao Mundo Star Wars</h1>
      <form className='search-form' onSubmit={handleSubmit}>
        <select
          className='search-select'
          value={categoria}
          onChange={handleCategoriaChange}
          required
        >
          {categorias.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        {categoria && (
          <input
            className='search-input'
            type="text"
            placeholder={`Digite o nome do ${categoria}`}
            value={termo}
            onChange={handleTermoChange}
            required
          />
        )}
        <button
          className='search-btn'
          type="submit"
          disabled={!categoria || !termo}
          aria-label="Pesquisar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" >
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Home;
