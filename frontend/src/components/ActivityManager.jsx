import React, { useEffect, useState } from "react";
import api from "../services/api";

function ActivityManager() {
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const catRes = await api.get("/categories/");
      setCategories(catRes.data);
      const actRes = await api.get("/activities/");
      setActivities(actRes.data);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    }
  };

  const handleAdd = async () => {
    try {
      await api.post("/activities/", {
        title,
        description,
        category: categoryId,
      });
      setTitle("");
      setDescription("");
      setCategoryId("");
      fetchData();
    } catch (err) {
      console.error("Erro ao adicionar atividade:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gerenciar Atividades</h2>
      <div className="flex flex-col space-y-2 mb-4">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={handleAdd} className="bg-primary text-white p-2">
          Adicionar
        </button>
      </div>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id} className="border p-2 mb-2">
            <strong>{activity.title}</strong> - {activity.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityManager;
