
import React, { useState } from 'react';
import Card from '../components/Card';
import { useSwapiSearch } from '../hooks/useBuscarItems';
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
  const { resultados, loading, erro, buscar } = useSwapiSearch();

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoria(e.target.value);
    setTermo('');
  };

  const handleTermoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermo(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    buscar(categoria, termo);
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
          disabled={!categoria || !termo || loading}
          aria-label="Pesquisar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
      </form>
      {loading && <p style={{color:'#ffe066'}}>Carregando...</p>}
      {erro && <p style={{color:'#ffe066'}}>{erro}</p>}
      <div className="card-list">
        {resultados.map((item) => (
          <Card
            title={"title" in item ? item.title : item.name}
            description={"opening_crawl" in item ? item.opening_crawl : ("climate" in item ? item.climate : ("gender" in item ? item.gender : ''))}
            details={
              categoria === 'filme' ? {
                Diretor: "director" in item ? item.director : '',
                Produtor: "producer" in item ? item.producer : '',
                'Data de lançamento': "release_date" in item ? item.release_date : ''
              } : categoria === 'personagem' ? {
                Gênero: "gender" in item ? item.gender : '',
                'Ano de nascimento': "birth_year" in item ? item.birth_year : '',
                Altura: "height" in item ? item.height : ''
              } : categoria === 'planeta' ? {
                Clima: "climate" in item ? item.climate : '',
                Terreno: "terrain" in item ? item.terrain : '',
                População: "population" in item ? item.population : ''
              } : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
