import axios from 'axios';

export const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me/';
const timeout = 10000;

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: timeout,
});
