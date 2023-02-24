import axios from 'axios';
import { Movie } from '../interfaces';

const baseUrl = process.env.BASE_URL;
const apiKey = process.env.API_KEY;

async function get(search: string, params: { [key: string]: string }): Promise<{ count: number, rows: Movie[] }> {
  const requestParams = {
    ...params,
    s: search,
    apikey: apiKey,
  };

  const response = await axios.get<{ totalResults: number, Search: Movie[] }>(`${baseUrl}`, { params: requestParams });

  return { count: response.data.totalResults, rows: response.data.Search };
}

async function getById(id: string, params: { [key: string]: string }): Promise<Movie> {
  const requestParams = {
    ...params,
    apikey: apiKey,
    i: id,
  };

  const response = await axios.get<Movie>(`${baseUrl}$`, { params: requestParams });

  return response.data;
}

export const moviesService = {
  get,
  getById,
};
