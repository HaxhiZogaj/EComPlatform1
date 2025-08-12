import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ClaimsPage from './Administration/ClaimsPage/claimsPage';
import Login from './Administration/Login/login';
import Register from './Administration/Register/register';
import RolesPage from './Administration/RolesPage/rolesPage';
import UsersPage from './Administration/UserPage/userPage';
import Product from './Pages/Product/product';
import ProductForm from './Pages/Product/ProductForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/claims" element={<ClaimsPage />} />
        <Route path="/product" element={<Product/>} />
        <Route path="/productForm" element={<ProductForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
