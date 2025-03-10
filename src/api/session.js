import axios from './axios'

export const loginUserRequest = async (user) => axios.post(`/session/login`, user)

export const searchRecoveryRequest = async (email) => axios.post(`/session/sendEmail/email`, email)

export const updatePasswordRecoveryRequest = async (user) => axios.put(`/session/updatePasswordRecovery`, user)

export const verifyUserTokenRequest = async (token) =>axios.get(`/session/verify/${token}`)

export const verifyUserRoleTokenRequest = async (token) =>axios.get(`/session/verifyUser/${token}`)