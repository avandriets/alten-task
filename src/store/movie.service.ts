import axios from 'axios';
import { Movie } from '../interfaces';

const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

interface MoviesResponse {
  totalResults?: number;
  Search?: Movie[];
  Response?: string;
  Error?: string;
}

async function get(params: { [key: string]: string }): Promise<{ count: number, rows: Movie[] }> {
  const requestParams = {
    ...params,
    apikey: apiKey,
  };

  const response = await axios.get<MoviesResponse>(`${baseUrl}`, { params: requestParams });

  if (response.data.Response === 'False') {
    throw new Error(response.data?.Error);
  }

  return { count: response.data?.totalResults ?? 0, rows: response.data?.Search ?? [] };
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
