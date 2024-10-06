import axios, { isAxiosError } from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://weather-now-zc74.vercel.app/"
    : "http://localhost:3001/";

const customAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 3000, // in ms, after 3sec will throw error if call is not returned
});

export { customAxios, isAxiosError };
