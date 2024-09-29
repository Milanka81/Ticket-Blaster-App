import axios, { AxiosResponse } from "axios";
const BASE_URL = "http://localhost:9000/api/v1/auth";

export const register = ({ ...values }) =>
  axios.post(`${BASE_URL}/register`, values);
export const verifyEmail = (token: string): Promise<AxiosResponse> => {
  return axios.get(`${BASE_URL}/verify-email/${token}`);
};
export const getNewToken = (
  email: string,
  clientUrl: string
): Promise<AxiosResponse> => {
  return axios.post(`${BASE_URL}/verificationToken`, { email, clientUrl });
};
export const login = ({ ...values }) => axios.post(`${BASE_URL}/login`, values);
export const logout = () => axios.post(`${BASE_URL}/logout`);
export const forgotPassword = ({ ...values }) =>
  axios.post(`${BASE_URL}/forgot-password`, values);

export const resetPassword = (
  token: string,
  { ...values }
): Promise<AxiosResponse> => {
  return axios.patch(`${BASE_URL}/reset-password/${token}`, values);
};
