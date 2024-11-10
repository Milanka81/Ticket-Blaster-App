import axios, { AxiosResponse } from "axios";
const BASE_URL = "http://localhost:9004/api/v1/ecommerce";
axios.defaults.withCredentials = true;
export const getCart = () => axios.get(`${BASE_URL}/shopping-cart`);

export const addToCart = (
  eventId: string,
  quantity: number
): Promise<AxiosResponse> =>
  axios.post(`${BASE_URL}/shopping-cart`, { eventId, quantity });
