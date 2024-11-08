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

export const getEvent = (id: string): Promise<AxiosResponse> => {
  return axios.get(`${BASE_URL}/${id}`);
};
export const postEvent = ({ ...values }) =>
  axios.post(`${BASE_URL}`, values, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateEvent = (
  id: string,
  { ...values }
): Promise<AxiosResponse> => {
  return axios.patch(`${BASE_URL}/${id}`, values);
};
export const deleteEvent = (id: string): Promise<AxiosResponse> => {
  return axios.delete(`${BASE_URL}/${id}`);
};
