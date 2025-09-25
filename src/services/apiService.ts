import axios from 'axios';

const API_URL = 'https://swapi.dev/api';

export async function buscarItem(endpoint: string, termo: string) {
  
  const response = await axios.get(`${API_URL}/${endpoint}/`, {
    params: { search: termo }
  });
 
  return response.data;
};
