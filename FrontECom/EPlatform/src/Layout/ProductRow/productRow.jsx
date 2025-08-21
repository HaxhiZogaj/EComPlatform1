import { useEffect, useState } from 'react';
import { getAllProducts } from '../../Services/PageService/productApi';
import './productRow.css';

function ProductRow() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  // Optional: limit to featured or first 6 products
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="product-row">
      {featuredProducts.map(p => (
        <div key={p.productId} className="product-card">
          <img src={p.imageUrl} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductRow;
