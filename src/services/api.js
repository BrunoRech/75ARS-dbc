import axios from "axios";

export const backend = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

export const viacep = axios.create({
  baseURL: "https://viacep.com.br/ws",
});
