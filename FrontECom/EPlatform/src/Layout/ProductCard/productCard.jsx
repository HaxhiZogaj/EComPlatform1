import './productCard.css';

function ProductCard({ name, price, image }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p className="price">{price}</p>
      <button className="buy-btn">Add to Cart</button>
    </div>
  );
}

export default ProductCard;
