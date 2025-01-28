import axios from "./axios";

export const totalSoldRequest = async() => axios.get(`/stats/total-sold`)
export const bestProductRequest = async() => axios.get(`/stats/best-selling-product`)
export const totalSoldCategoryRequest = async() => axios.get(`/stats/total-sold-category`)
export const totalSoldMonthRequest = async() => axios.get(`/stats/total-sold-month`)
