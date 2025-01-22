import axios from "./axios";

export const totalSoldRequest = async() => axios.get(`/stats/total-sold`)
export const bestProductRequest = async() => axios.get(`/stats/best-selling-product`)
