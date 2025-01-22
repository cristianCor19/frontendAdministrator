
import axios from 'axios'

// creacion de conexion con la api back
const instance = axios.create({
    // baseURL: '',
    baseURL: 'https://back-infotect.vercel.app',
    withCredentials: true
})

export default instance