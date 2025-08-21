import { useEffect, useState } from 'react';
import { getAllCategories } from '../../Services/PageService/categoryApi';
import './categoryTiles.css';

function CategoryTiles() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getAllCategories();
      setCategories(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="category-tiles">
      {categories.map(cat => (
        <div key={cat.categoryId} className="tile">
          <span>{cat.categoryName}</span>
        </div>
      ))}
    </div>
  );
}

export default CategoryTiles;
