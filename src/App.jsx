import {BrowserRouter,Routes, Route} from 'react-router-dom';
// import { ProductProvider } from "./context/ProductContext"
import { UserProvider } from "./context/UserContext"
import { ProductProvider } from './context/ProductContext';
import ProtectedRoute from './ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterProduct from './pages/RegisterProduct';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';
import RegisterUsers from './pages/RegisterUsers';
import Sidebar from './components/Sidebar';

function App(){
  return(
    <UserProvider>
      <ProductProvider>
        <BrowserRouter>
        <div className=''>
          <main className='container-test-1'>
              <Routes>
                <Route path='/' element={<LoginPage/>} />
                <Route element={<ProtectedRoute />} >
                
                  
                  
                  <Route path='/Home' element={<HomePage/>} />
                  <Route path='/invenProduct' element={<RegisterProduct/>} />
                  <Route path='/listUsers' element={<UsersPage/>} />
                  <Route path='/listProducts' element={<ProductsPage/>} />
                  <Route path='/registerUsers' element={<RegisterUsers/>} />
                </Route>
              </Routes>
          </main>
        </div>
        </BrowserRouter>
      </ProductProvider>
    </UserProvider>

  )
}

export default App