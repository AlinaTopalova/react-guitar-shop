import axios, { AxiosResponse } from 'axios';
import { ApiRoute } from 'constants/constants';
import { Comment, CouponType, Guitar, NewComment } from './types/types';

export const API_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me/';
const timeout = 10000;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: timeout,
});

type FetchGuitarsData = (
  query: URLSearchParams | string
) => Promise<AxiosResponse<Guitar[]>>;

type FetchSimilarGuitars = (
  searchValue: string
) => Promise<AxiosResponse<Guitar[]>>;

type FetchCurrentReviews = (
  guitarId: number
) => Promise<AxiosResponse<Comment[]>>

type PostNewReview = (
  newReview: NewComment,
) => Promise<AxiosResponse<NewComment>>;

type PostCoupon = (
  coupon: CouponType,
) => Promise<AxiosResponse<number>>;

export const fetchGuitars: FetchGuitarsData = (query) =>
  axiosInstance.get(ApiRoute.GuitarWithComments, { params: query });

export const fetchSimilarGuitars: FetchSimilarGuitars = (searchValue) =>
  axiosInstance.get<Guitar[]>(`${ApiRoute.SimilarGuitars}${searchValue}`);

export async function fetchCurrentGuitar(id: number) {
  const { data } = await axiosInstance.get<Guitar>(`${ApiRoute.Guitars}/${id}`);
  return data;
}

export const fetchCurrentReviews: FetchCurrentReviews = (id: number) =>
  axiosInstance.get<Comment[]>(`${ApiRoute.Guitars}/${id}/comments`);

export const postNewReview: PostNewReview = (
  newReview,
) => axiosInstance.post<Comment>(`${ApiRoute.Comments}`, newReview);

export const postNewCoupon: PostCoupon = (
  coupon,
) => axiosInstance.post<number>(`${ApiRoute.Coupons}`, coupon);


