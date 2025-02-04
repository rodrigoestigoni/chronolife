import React, { useEffect, useState } from "react";
import api from "../services/api";

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories/");
      setCategories(res.data);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
    }
  };

  const handleAdd = async () => {
    if (!newCategory) return;
    try {
      await api.post("/categories/", { name: newCategory });
      setNewCategory("");
      fetchCategories();
    } catch (err) {
      console.error("Erro ao adicionar categoria:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gerenciar Categorias</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nova categoria"
          className="border p-2 rounded flex-grow"
        />
        <button onClick={handleAdd} className="bg-primary text-white p-2 ml-2">
          Adicionar
        </button>
      </div>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="border p-2 mb-2">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryManager;
