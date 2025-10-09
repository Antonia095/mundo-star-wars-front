import { useState } from 'react';
import { buscarItem } from '../services/apiService';
import type { SwapiResultado } from '../types/swapi';

export function useSwapiSearch() {
  const [resultados, setResultados] = useState<SwapiResultado[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const buscar = async (categoria: string, termo: string) => {
    setLoading(true);
    setErro('');
    setResultados([]);
    let endpoint = '';
     switch (categoria) {
      case 'filme':
        endpoint = 'films';
        break;
      case 'personagem':
        endpoint = 'people';
        break;
      case 'planeta':
        endpoint = 'planets';
        break;
      default:
        setErro('Categoria inválida.');
        setLoading(false);
        return;
    }
    try {
      const data = await buscarItem(endpoint, termo);
      if (data.results && data.results.length > 0) {
        setResultados(data.results);
      } else {
        setErro('Nenhum resultado encontrado.');
      }
    } catch {
      setErro('Erro ao buscar dados.');
    }
    setLoading(false);
  };

  return { resultados, loading, erro, buscar };
}
