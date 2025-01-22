import { createContext, useState, useContext } from "react";

import { 
    totalSoldRequest,
    bestProductRequest
} from "../api/stats";

export const StatsContext = createContext()

export const useStats = () => {
    const context = useContext(StatsContext)

    if (!context) {
        throw new Error('useStats must be used inside a StatsProvider')
    }

    return context
}

export const StatsProvider = ({children}) => {
    const [totalSold, setTotalSold] = useState([])
    const [bestProduct, setBestProduct] = useState([])
    const [errors, setErrors] = useState([])

    const getTotalSold = async () => {
        try {
            const res = await totalSoldRequest()
            setTotalSold(res.data.data)
        } catch (error) {
            setErrors(Array.isArray(error.response.data)
            ? error.response.data
            : [error.response.data.message])
        }
    }

    const getBestProduct = async () => {
        try {
            const res = await bestProductRequest()
            setBestProduct(res.data.data)
        } catch (error) {
            setErrors(Array.isArray(error.response.data)
            ? error.response.data
            : [error.response.data.message])
        }
    }

    return(
        <StatsContext.Provider value={{
            totalSold,
            bestProduct,
            errors,
            getTotalSold,
            getBestProduct
        }}>
            {children}
        </StatsContext.Provider>
    )
}