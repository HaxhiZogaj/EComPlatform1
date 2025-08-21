import { useEffect, useState } from 'react';
import { addCategory, deleteCategory, getAllCategories, updateCategory } from '../../Services/PageService/categoryApi';
import './category.css';

function Category() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ categoryName: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await getAllCategories();
    setCategories(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateCategory({ categoryId: editingId, ...form });
    } else {
      await addCategory(form);
    }
    setForm({ categoryName: '', description: '' });
    setEditingId(null);
    fetchCategories();
  };

  const handleEdit = (cat) => {
    setForm({ categoryName: cat.categoryName, description: cat.description });
    setEditingId(cat.categoryId);
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    fetchCategories();
  };

  return (
    <div className="category-container">
      <h2>Category Management</h2>
      <form onSubmit={handleSubmit} className="category-form">
        <input
          type="text"
          placeholder="Category Name"
          value={form.categoryName}
          onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Category</button>
      </form>

      <table className="category-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.categoryId}>
              <td>{cat.categoryName}</td>
              <td>{cat.description}</td>
              <td>{new Date(cat.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(cat)}>Edit</button>
                <button onClick={() => handleDelete(cat.categoryId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Category;
