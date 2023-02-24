import axios from "axios";
import { api } from "../config/api";

export const axiosRequest = axios.create({
  baseURL: api,
  withCredentials: true,
});
