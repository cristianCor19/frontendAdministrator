import { createContext, useState, useContext } from "react";

import { 
    totalSoldRequest,
    bestProductRequest,
    totalSoldCategoryRequest,
    totalSoldMonthRequest
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
    const [totalSoldCategory, setTotalSoldCategory] = useState ([])
    const [totalCurrentYear, setTotalCurrentYear] = useState([])
    const [totalAmountPrevious, setTotalAmountPrevious] = useState([])
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

    const getTotalSoldCategory = async () => {
        try {
            const res = await totalSoldCategoryRequest()
            
            setTotalSoldCategory(res.data.data)
        } catch (error) {
            setErrors(Array.isArray(error.response.data)
            ? error.response.data
            : [error.response.data.message])
        }
    }

    const getTotalSoldMonth = async () => {
        try {
            const res = await totalSoldMonthRequest();

            setTotalCurrentYear(res.data.totalCurrentYear)
            
            setTotalAmountPrevious(res.data.totalAmountPrevious)

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
            totalSoldCategory,
            totalAmountPrevious,
            totalCurrentYear,
            errors,
            getTotalSold,
            getBestProduct,
            getTotalSoldCategory,
            getTotalSoldMonth
        }}>
            {children}
        </StatsContext.Provider>
    )
}