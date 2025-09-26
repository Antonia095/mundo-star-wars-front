import axios from 'axios';
import { buscarItem } from '../apiService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('apiService', () => {
  it('deve fazer requisição para o endpoint correto e retorna dados', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { results: [{ name: 'Luke' }] } });
    const data = await buscarItem('people', 'Luke');
    expect(mockedAxios.get).toHaveBeenCalledWith('https://swapi.dev/api/people/', { params: { search: 'Luke' } });
    expect(data).toEqual({ results: [{ name: 'Luke' }] });
  });

  it('deve retornar erro da requisição', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Erro de rede'));
    await expect(buscarItem('people', 'Leia')).rejects.toThrow('Erro de rede');
  });
});
