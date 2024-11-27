import axios from "axios";

const VITE_APP_API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
console.log(VITE_APP_API_BASE_URL);
export const apiClient = axios.create({
  baseURL: VITE_APP_API_BASE_URL,
  withCredentials: true,
});
