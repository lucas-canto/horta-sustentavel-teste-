import axios from "axios";

export const api = axios.create({
  baseURL: 'https://backend-hortas.vercel.app/api'
})