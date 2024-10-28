import axios, { AxiosResponse } from "axios";
const BASE_URL = "http://localhost:9001/api/v1/events";
axios.defaults.withCredentials = true;
export const getAllEvents = (
  page: number,
  limit: number,
  input: string,
  category: string
): Promise<AxiosResponse> =>
  axios.get(
    `${BASE_URL}?page=${page}&limit=${limit}&input=${input}&category=${category}`
  );
export const postEvent = ({ ...values }) => axios.post(`${BASE_URL}`, values);
