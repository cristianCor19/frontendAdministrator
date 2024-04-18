import { createContext, useState, useContext, useEffect } from "react";

import { registerProductRequest, getProductsRequest} from "../api/product";


export const ProductContext = createContext()

//creacion de la funcion para poder entrar al contexto o las funciones de autenticacion
export const useProduct = () => {
    const context = useContext(ProductContext)

    if (!context) {
        throw new Error('useProduct debe utilizarse dentro de un Productprovider')
    }

    return context
}

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([])
    const [errors, setErrors] = useState([])


    //funcion para obtener todos los productos
    const getProducts = async () => {
        try {
            const res = await getProductsRequest()
            setProducts(res.data.data)
            
        } catch (error) {
            console.log(error);
        }
    }

    //funcion para el registro de productos
    const registerProduct = async (product) => {
        try {
            console.log('entro registro de producto');
            const res = await registerProductRequest(product)
         
        } catch (error) {
            setErrors(error.response.data)
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

    //funcion para realizar las verificaciones de seguridad respecto al manejo de tokens
   

    return (
        <ProductContext.Provider
        value={{
            products,
            registerProduct,
            getProducts,
            errors
            
        }}
        >
            {children}
        </ProductContext.Provider>
    )
}
