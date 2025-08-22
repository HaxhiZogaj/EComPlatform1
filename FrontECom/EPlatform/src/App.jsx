import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ClaimsPage from './Administration/ClaimsPage/claimsPage';
import Login from './Administration/Login/login';
import Register from './Administration/Register/register';
import RolesPage from './Administration/RolesPage/rolesPage';
import UsersPage from './Administration/UserPage/userPage';
import './App.css';
import HomePageLayout from './Layout/HomePageLayout/homePageLayout';
import CartItem from './Pages/CartItem/cartItem';
import Category from './Pages/Category/category';
import Product from './Pages/Product/product';
import ProductForm from './Pages/Product/ProductForm';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomePageLayout /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/roles" element={isAuthenticated ? <RolesPage /> : <Navigate to="/login" />} />
        <Route path="/users" element={isAuthenticated ? <UsersPage /> : <Navigate to="/login" />} />
        <Route path="/claims" element={isAuthenticated ? <ClaimsPage /> : <Navigate to="/login" />} />
        <Route path="/product" element={isAuthenticated ? <Product /> : <Navigate to="/login" />} />
        <Route path="/productForm" element={isAuthenticated ? <ProductForm /> : <Navigate to="/login" />} />
        <Route path="/category" element={isAuthenticated ? <Category /> : <Navigate to="/login" />} />
       <Route path="/cartItem" element={isAuthenticated ? <CartItem /> : <Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;
