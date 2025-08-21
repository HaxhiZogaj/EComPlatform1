import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">MyShop</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/product">Products</Link></li>
        <li><Link to="/category">Categories</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
      <div className="navbar-cart">🛒</div>
    </nav>
  );
}

export default Navbar;
