import React, { useEffect, useState } from "react";
import api from "../services/api";

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingName, setEditingName] = useState("");

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

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta categoria?")) return;
    try {
      await api.delete(`/categories/${id}/`);
      fetchCategories();
    } catch (err) {
      console.error("Erro ao excluir categoria:", err);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setEditingName(category.name);
  };

  const handleEditSave = async () => {
    try {
      await api.put(`/categories/${editingCategory.id}/`, { name: editingName });
      setEditingCategory(null);
      setEditingName("");
      fetchCategories();
    } catch (err) {
      console.error("Erro ao editar categoria:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Gerenciar Categorias</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nova Categoria"
          className="border p-2 rounded flex-grow focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleAdd}
          className="bg-primary text-white p-2 ml-2 rounded hover:bg-primary-dark"
        >
          <i className="fas fa-plus"></i> Adicionar
        </button>
      </div>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className="border p-2 mb-2 rounded flex justify-between items-center"
          >
            <span>{category.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(category)}
                className="text-blue-500 hover:text-blue-700"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="text-red-500 hover:text-red-700"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-bold mb-4">Editar Categoria</h2>
            <input
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              className="border p-2 rounded w-full mb-4 focus:ring-2 focus:ring-primary"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleEditSave}
                className="bg-primary text-white p-2 rounded"
              >
                Salvar
              </button>
              <button
                onClick={() => setEditingCategory(null)}
                className="bg-gray-300 p-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryManager;
