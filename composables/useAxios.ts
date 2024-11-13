import axios from "axios";

export const useAxios = () => {
  const isClient = !import.meta.server;
  const baseURL = "https://localhost:7092/api";
  let token;
  if (isClient) {
    token = localStorage.getItem("token");
  }

  const $axios = axios.create({
    baseURL,
  });

  if (token) {
    $axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return { $axios };
};
