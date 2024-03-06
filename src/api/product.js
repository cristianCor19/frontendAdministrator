import axios from './axios'

export const getProductsRequest = async() => axios.get(`/product/` )

export const registerProductRequest = (product) => axios.post(`/product/registerProduct`, product)

// http://localhost:3000/product/registerProduct


