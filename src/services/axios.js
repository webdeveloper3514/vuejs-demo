import axios from "axios";
import VueCookies from "vue-cookies";

// config
const API_URL = import.meta.env.VITE_API_URL;
const AUTH_URL = import.meta.env.VITE_AUTH_URL;

export const AxiosAPIInstance = axios.create({
  baseURL: API_URL,
});
AxiosAPIInstance.interceptors.request.use((config) => {
  const token = VueCookies.get("user-token");

  if (!token) {
    return config;
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
AxiosAPIInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || error)
);

export const AxiosAUTHInstance = axios.create({
  baseURL: AUTH_URL,
});
AxiosAUTHInstance.interceptors.request.use((config) => {
  const token = VueCookies.get("user-token");

  if (!token) {
    return config;
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
AxiosAUTHInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || error)
);
