import axios from "axios";
const BASE_URL = "http://localhost:9000/api/v1/auth";

export const register = ({ ...values }) =>
  axios.post(`${BASE_URL}/register`, values);
export const login = ({ ...values }) => axios.post(`${BASE_URL}/login`, values);
export const forgotPassword = ({ ...values }) =>
  axios.post(`${BASE_URL}/forgot-password`, values);
