import { createContext, useState, useContext, useEffect } from "react";


import {
    registerUserRequest,
    loginUserRequest, 
    verifyUserTokenRequest,
    verifyUserRoleTokenRequest,
    getUsersRequest,
    searchRecoveryRequest,
    updatePasswordRecoveryRequest,
    getUserProfileRequest
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
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState(null)
    const [profile, setProfile] = useState(null)
    const [role, setUserRole] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)
    


    //funcion para el registro de usuarios
    const signup = async (user) => {
        try {
            const res = await registerUserRequest(user)
            if(res.data.status === true) {
                // console.log('prueba');
            }
        } catch (error) {
            if(Array.isArray(error.response.data)){
                setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    //funciona para loguearse como administrador
    const signin = async (user) => {
        try{
            const res = await loginUserRequest(user)
            console.log(res);
            setIsAuthenticated(true)
            setUser(res.data)
            setUserRole(res.data.role)
            localStorage.setItem('token', res.data.token);

        } catch (error) {
            if(Array.isArray(error.response.data)){
                setErrors(error.response.data)
            }

            setErrors([error.response.data.message])
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

    const getUserProfile = async(token, id)=>{

        const res = await getUserProfileRequest(token, id)
        setProfile(res.data)
    }

    //function to send search for the account 
    const searchRecovery = async(email) => {
        try{
            
            const res = await searchRecoveryRequest(email)
            setUser(res.data)
            setEmail(res.data.email)

        } catch (error) {
            if(Array.isArray(error.response.data)){
                setErrors(error.response.data)
            }

            setErrors([error.response.data.message])
        }
    }

    //function to send search for the account 
    const updatePasswordRecovery = async(data) => {
        try{
            const res = await updatePasswordRecoveryRequest(data)

        } catch (error) {
            if(Array.isArray(error.response.data)){
                setErrors(error.response.data)
            }

            setErrors([error.response.data.message])
        }
    }

    //funcion para desloguearse
    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        setIsAuthenticated(false)
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

    //funcion para realizar las verificaciones de seguridad respecto al manejo de tokens
    useEffect(() => {
        async function checklogin () {

            const token = localStorage.getItem('token');
            console.log(token);
            if(!token){
                setIsAuthenticated(false)
                setLoading(false)
                return 
            }

            const res = await verifyUserRoleTokenRequest(token)
            console.log(res.data.role);
                if (res.data.role != 'administrator') {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return;
                }
            
            try {
                const res = await verifyUserTokenRequest(token)
                if(!res.data){
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }

                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
                getUserProfile(token, res.data._id)

                
            } catch (error) {
                
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }   
        
        checklogin()
    }, [])

    return (
        <UserContext.Provider
        value={{
            signup,
            signin,
            getUsers,
            logout,
            searchRecovery,
            updatePasswordRecovery, 
            users,
            role,
            email,
            profile,
            user,
            loading,
            isAuthenticated,
            errors
            
        }}
        >
            {children}
        </UserContext.Provider>
    )
}
