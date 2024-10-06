import axios from "axios";
const BASE_URL = "http://localhost:9002/api/v1/users";
axios.defaults.withCredentials = true;
export const getMyAccount = () => axios.get(`${BASE_URL}/get-my-account`);
