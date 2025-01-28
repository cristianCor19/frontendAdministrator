import { createContext, useState, useContext, useEffect } from "react";
import { enqueueSnackbar } from "notistack";

import { registerProductRequest, getProductsRequest } from "../api/product";

export const ProductContext = createContext();

//creacion de la funcion para poder entrar al contexto o las funciones de autenticacion
export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProduct debe utilizarse dentro de un Productprovider");
  }

  return context;
};

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState([]);

  //funcion para obtener todos los productos
  //function for get all products
  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //function to register the products
  const registerProduct = async (product) => {
    try {
      const res = await registerProductRequest(product);
      if (res.status === 200) {
        enqueueSnackbar("Producto registrado con éxito ", {
          variant: "success",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      setErrors(
        Array.isArray(error.response.data)
          ? error.response.data
          : [error.response.data.message]
      );
    }
  };

  //funcion paar quitar los mensajes de error, despues de cierto tiempo

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  //funcion para realizar las verificaciones de seguridad respecto al manejo de tokens

  return (
    <ProductContext.Provider
      value={{
        products,
        registerProduct,
        getProducts,
        errors,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
