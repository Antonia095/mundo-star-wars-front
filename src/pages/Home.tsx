import React, { useState } from 'react';
import Card from '../components/Card';
import { useSwapiSearch } from '../hooks/useBuscarItems';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Home.css';

interface Filme {
  title: string;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
}

interface Personagem {
  name: string;
  gender: string;
  birth_year: string;
  height: string;
}

interface Planeta {
  name: string;
  climate: string;
  terrain: string;
  population: string;
}

type SwapiItem = Filme | Personagem | Planeta;

const isFilme = (item: SwapiItem): item is Filme => {
  return 'title' in item && 'opening_crawl' in item;
};

const isPersonagem = (item: SwapiItem): item is Personagem => {
  return 'gender' in item && 'birth_year' in item;
};

const isPlaneta = (item: SwapiItem): item is Planeta => {
  return 'climate' in item && 'terrain' in item;
};

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
  const { auth } = useAuth();
  const navigate = useNavigate();

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

  const getItemDetails = (item: SwapiItem, categoria: string): Record<string, string> | undefined => {
    switch (categoria) {
      case 'filme':
        if (isFilme(item)) {
          return {
            Diretor: item.director || '',
            Produtor: item.producer || '',
            'Data de lançamento': item.release_date || ''
          };
        }
        break;
        
      case 'personagem':
        if (isPersonagem(item)) {
          return {
            Gênero: item.gender || '',
            'Ano de nascimento': item.birth_year || '',
            Altura: item.height || ''
          };
        }
        break;
        
      case 'planeta':
        if (isPlaneta(item)) {
          return {
            Clima: item.climate || '',
            Terreno: item.terrain || '',
            População: item.population || ''
          };
        }
        break;
        
      default:
        return undefined;
    }
    return undefined;
  };

  const getItemTitle = (item: SwapiItem): string => {
    return isFilme(item) ? item.title : item.name;
  };

  const getItemDescription = (item: SwapiItem): string => {
    if (isFilme(item)) return item.opening_crawl;
    if (isPlaneta(item)) return item.climate;
    if (isPersonagem(item)) return item.gender;
    return '';
  };

  return (
    <div className='container-home'>
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
      {loading && <p className="loading-message">Carregando...</p>}
      {erro && <p className="error-message">{erro}</p>}
      <div className="card-list">
        {resultados.map((item) => (
          <Card
            key={getItemTitle(item)}
            title={getItemTitle(item)}
            description={getItemDescription(item)}
            details={getItemDetails(item, categoria)}
          />
        ))}
      </div>
      <button
        className='itens-btn'
        onClick={() => navigate('/itens')}
        disabled={!auth}
      >
        Acessar Itens Privados
      </button>
    </div>
  );
};

export default Home;
