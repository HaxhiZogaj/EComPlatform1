
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addProduct, getProductById, updateProduct } from '../../Services/PageService/productApi';
import './product.css';

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    categoryId: ''
  });

  const navigate = useNavigate();
  const { id } = useParams(); // If editing

  useEffect(() => {
    if (id) {
      getProductById(id).then(res => setProduct(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateProduct(id, product);
    } else {
      await addProduct(product);
    }
    navigate('/product'); // Redirect after save
  };

  return (
    <div className="product-form-container">
      <h2>{id ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input name="name" value={product.name} onChange={handleChange} placeholder="Name" required />
        <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" required />
        <input name="price" type="number" value={product.price} onChange={handleChange} placeholder="Price" required />
        <input name="stock" type="number" value={product.stock} onChange={handleChange} placeholder="Stock" required />
        <input name="imageUrl" value={product.imageUrl} onChange={handleChange} placeholder="Image URL" />
        <input name="categoryId" type="number" value={product.categoryId} onChange={handleChange} placeholder="Category ID" required />
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
