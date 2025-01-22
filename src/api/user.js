import axios from './axios'

export const registerUserRequest = async (user) => axios.post(`/user/registerUser`, user)

export const getUsersRequest = async () => axios.get(`/user/`)

export const getUserProfileRequest = async (token, id) => axios.get(`/user/profile/${token}`, id)


