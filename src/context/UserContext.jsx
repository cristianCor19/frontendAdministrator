import { createContext, useState, useContext, useEffect } from "react";


import {
    registerUserRequest,
    getUsersRequest,
} from '../api/user'


export const UserContext = createContext()



//creacion de la funcion para poder entrar al contexto o las funciones de autenticacion
export const useUser = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error('useUser debe utilizarse dentro de un Userprovider')
    }

    return context
}


export const UserProvider = ({children}) => {
    const [users, setUsers] = useState([])
    const [errors, setErrors] = useState([])
    


    //funcion para el registro de usuarios
    const signup = async (user) => {
        try {
            const res = await registerUserRequest(user)
            if(res.data.status === true) {
                // console.log('prueba');
            }
        } catch (error) {
            setErrors(Array.isArray(error.response.data)
            ? error.response.data
            : [error.response.data.message])
        }
    }

   
    const getUsers = async () => {
        try {
            const res = await getUsersRequest()
            setUsers(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }


    //funcion paar quitar los mensajes de error, despues de cierto tiempo

    useEffect(() => {
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [errors])

    

    return (
        <UserContext.Provider
        value={{
            signup,
            getUsers,
            users,
            errors
            
        }}
        >
            {children}
        </UserContext.Provider>
    )
}


export default UserContext
