import axios from "axios";

export const useAxios = () => {
  const baseURL = "https://localhost:7092/api";

  const $axios = axios.create({
    baseURL,
  });

  return { $axios };
};
