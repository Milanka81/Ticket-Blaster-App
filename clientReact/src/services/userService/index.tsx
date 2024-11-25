import axios, { AxiosResponse } from "axios";
const BASE_URL = "http://localhost:9002/api/v1/users";
axios.defaults.withCredentials = true;
export const getAllUsers = () => axios.get(`${BASE_URL}`);

export const getUser = (id: string): Promise<AxiosResponse> => {
  return axios.get(`${BASE_URL}/${id}`);
};
export const getMyAccount = () => axios.get(`${BASE_URL}/get-my-account`);
export const updateAccount = ({ ...values }) =>
  axios.patch(`${BASE_URL}/update-my-account`, values, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const changePassword = ({ ...values }) =>
  axios.patch(`${BASE_URL}/change-password`, values);

export const updateUserRole = (
  userId: string,
  newRole: string
): Promise<AxiosResponse> =>
  axios.patch(`${BASE_URL}/toggle-role`, { userId, newRole });
