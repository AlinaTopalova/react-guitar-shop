import axios from 'axios';
import { ApiRoute } from 'constants/constants';
import { Guitar } from 'types/guitar';

export const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me/';

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

export async function getGuitars() {
  const { data } = await axiosInstance.get<Guitar[]>(ApiRoute.Guitars);
  return data;
}
