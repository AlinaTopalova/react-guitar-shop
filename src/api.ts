import axios, { AxiosResponse } from 'axios';
import { ApiRoute } from 'constants/constants';
import { Guitar } from './types/types';

export const API_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me/';
const timeout = 10000;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: timeout,
});

type FetchGuitarsData = (
  query: URLSearchParams | string
) => Promise<AxiosResponse<Guitar[]>>;

type FetchSimilarGuitars = (
  searchValue: string
) => Promise<AxiosResponse<Guitar[]>>;

export const fetchGuitars: FetchGuitarsData = (query) =>
  axiosInstance.get('/guitars', { params: query });

export const fetchSimilarGuitars: FetchSimilarGuitars = (searchValue: string) =>
  axiosInstance.get<Guitar[]>(`${ApiRoute.SimilarGuitars}${searchValue}`);


