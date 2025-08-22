/* import { useEffect, useState } from 'react';
import { deleteProduct, getAllProducts } from '../../Services/PageService/productApi';
import './product.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    getAllProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter(p => p.productId !== id));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      {currentProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-list-vertical">
          {currentProducts.map(p => (
            <div key={p.productId} className="product-card-vertical">
              <img src={p.imageUrl} alt={p.name} className="product-image-vertical" />
              <div className="product-info">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <p><strong>Price:</strong> ${p.price}</p>
                <p><strong>Stock:</strong> {p.stock}</p>
                <button onClick={() => handleDelete(p.productId)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination-controls">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default ProductList;


 */

import { useEffect, useState } from 'react';
import { deleteProduct, getAllProducts } from '../../Services/PageService/productApi';
import './product.css';

const ProductImage = ({ src, alt }) => {
  const fallback = "https://source.unsplash.com/random/300x300";
  return <img src={src || fallback} alt={alt || "Product image"} className="product-image-vertical" />;
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    getAllProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter(p => p.productId !== id));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      {currentProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-list-vertical">
          {currentProducts.map(p => (
            <div key={p.productId} className="product-card-vertical">
              <ProductImage src={p.imageUrl} alt={p.name} />
              <div className="product-info">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <p><strong>Price:</strong> ${p.price}</p>
                <p><strong>Stock:</strong> {p.stock}</p>
                <button onClick={() => handleDelete(p.productId)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination-controls">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default ProductList;
