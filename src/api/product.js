import axios from './axios'

export const getProductsRequest = async() => axios.get(`/product/` )

export const registerProductRequest = (product) => axios.post(`/product/register-product`, product)




