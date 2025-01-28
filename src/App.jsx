import {BrowserRouter,Routes, Route} from 'react-router-dom';
// import { ProductProvider } from "./context/ProductContext"
import { SessionProvider } from './context/SessionContext';
import { UserProvider } from "./context/UserContext"
import { ProductProvider } from './context/ProductContext';
import { StatsProvider } from './context/StatsContext';
import ProtectedRoute from './ProtectedRoute';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';
// import RegisterUsers from './pages/RegisterUsers';
// import Sidebar from './components/Sidebar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
       staleTime: 1000 * 60 * 5,
       cacheTime: 1000 * 60 * 30,
       refetchOnWindowFocus: false,
       retry: 1,
    },
  },
})

function App(){
  return(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SessionProvider>
            <UserProvider>
              <ProductProvider>
                <StatsProvider>
                  <div className=''>
                    <main className='container-test-1'>
                        <Routes>
                          <Route path='/' element={<LoginPage/>} />
                          <Route element={<ProtectedRoute />} >
                          
                            
                            
                            <Route path='/Home' element={<HomePage/>} />
                            <Route path='/listUsers' element={<UsersPage/>} />
                            <Route path='/listProducts' element={<ProductsPage/>} />
                          </Route>
                        </Routes>
                    </main>
                  </div>
                </StatsProvider>
              </ProductProvider>
            </UserProvider>
        </SessionProvider>
      </BrowserRouter>
    </QueryClientProvider>

  )
}

export default App