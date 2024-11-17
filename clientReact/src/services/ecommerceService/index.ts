import axios, { AxiosResponse } from "axios";
const BASE_URL = "http://localhost:9004/api/v1/ecommerce";
axios.defaults.withCredentials = true;

interface CartItem {
  _id: string;
  event: {
    _id: string;
    imageCover: string;
    eventName: string;
    eventDate: string;
    description: string;
    location: string;
    ticketPrice: number;
  };
  quantity: number;
}

export const getCart = () => axios.get(`${BASE_URL}/shopping-cart`);

export const addToCart = (
  eventId: string,
  quantity: number
): Promise<AxiosResponse> =>
  axios.post(`${BASE_URL}/shopping-cart`, {
    eventId,
    quantity,
  });
export const removeFromCart = (id: string): Promise<AxiosResponse> =>
  axios.delete(`${BASE_URL}/shopping-cart/${id}`);

export const createPayment = (items: CartItem[]): Promise<AxiosResponse> =>
  axios.post(`${BASE_URL}/create-payment-intent`, { items });

export const clearCart = (cartItems: string[]): Promise<AxiosResponse> =>
  axios.delete(`${BASE_URL}/shopping-cart`, {
    data: { cartItems },
  });
export const getTicketsHistory = () => axios.get(`${BASE_URL}/tickets-history`);
export const getLastPurchase = () => axios.get(`${BASE_URL}/recent-tickets`);

export const getPrintTicket = (id: string): Promise<AxiosResponse> => {
  return axios.get(`${BASE_URL}/print-ticket/${id}`);
};
