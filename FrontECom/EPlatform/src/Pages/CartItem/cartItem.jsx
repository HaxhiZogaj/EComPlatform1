import { useEffect, useState } from 'react';
import { addCartItem, deleteCartItem, getAllCartItems, updateCartItem } from '../../Services/PageService/cartItemApi';
import './cartItem.css';

function CartItem() {
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({ productId: '', userId: '', sessionId: '', quantity: 1 });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const res = await getAllCartItems();
    setCartItems(res.data);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const basePayload = {
    productId: Number(form.productId),
    userId: form.userId ? Number(form.userId) : null,
    sessionId: form.sessionId || null,
    quantity: Number(form.quantity)
  };
  const payload = editingId
    ? { ...basePayload, cartItemId: editingId }
    : basePayload;
  try {
    if (editingId) {
      await updateCartItem(editingId, payload);
    } else {
      await addCartItem(payload); // ✅ No cartItemId here
    }

    setForm({ productId: '', userId: '', sessionId: '', quantity: 1 });
    setEditingId(null);
    fetchCartItems();
  }catch (error) {
    console.error('API Error:', error.response?.data || error.message);
  }
};



  

  const handleEdit = (item) => {
    setForm({
      productId: item.productId,
      userId: item.userId,
      sessionId: item.sessionId,
      quantity: item.quantity
    });
    setEditingId(item.cartItemId);
  };

  const handleDelete = async (id) => {
    await deleteCartItem(id);
    fetchCartItems();
  };

  return (
    <div className="cartitem-container">
      <h2>Cart Items</h2>
      <form onSubmit={handleSubmit} className="cartitem-form">
        <input
          type="number"
          placeholder="Product ID"
          value={form.productId}
          onChange={(e) => setForm({ ...form, productId: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="User ID"
          value={form.userId}
          onChange={(e) => setForm({ ...form, userId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Session ID"
          value={form.sessionId}
          onChange={(e) => setForm({ ...form, sessionId: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Item</button>
      </form>

      <table className="cartitem-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>User ID</th>
            <th>Session ID</th>
            <th>Quantity</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.cartItemId}>
              <td>{item.productId}</td>
              <td>{item.userId}</td>
              <td>{item.sessionId}</td>
              <td>{item.quantity}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.cartItemId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartItem;
