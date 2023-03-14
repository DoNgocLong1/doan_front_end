import axios from "axios";
const url = "http://localhost:3001/api/";
export const instance = axios.create({
  baseURL: url,
  timeout: 1000,
});
