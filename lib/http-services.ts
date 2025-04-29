import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // api
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});
