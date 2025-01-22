import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "./context/SessionContext";

function ProtectedRoute (){
    const {loading, isAuthenticated} = useSession()

    if(loading) return <h1>Cargando...</h1>
    if(!isAuthenticated && !isAuthenticated) return <Navigate to='/' replace />

    return <Outlet/>

}

export default ProtectedRoute