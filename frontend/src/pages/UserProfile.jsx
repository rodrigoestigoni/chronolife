import React, { useEffect, useState } from "react";
import api from "../services/api";

function UserProfile() {
  const [user, setUser] = useState({ username: "", email: "" });

  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/users/me/");
        setUser(res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  const handleSave = async () => {
    // Supondo um endpoint PUT /users/me/ para atualizar:
    try {
      // Caso não exista, você terá que criar no backend.
      await api.put("/users/me/", { username, email });
      alert("Dados atualizados com sucesso!");
      setEditMode(false);
      setUser({ username, email });
    } catch (err) {
      console.error(err);
      alert("Falha ao atualizar dados.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Meu Perfil</h2>
      {editMode ? (
        <div className="space-y-2">
          <input
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-primary text-white p-2" onClick={handleSave}>
            Salvar
          </button>
          <button
            className="bg-gray-200 p-2"
            onClick={() => setEditMode(false)}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div>
          <p>Nome de usuário: {user.username}</p>
          <p>Email: {user.email}</p>
          <button
            className="bg-primary text-white p-2 mt-2"
            onClick={() => setEditMode(true)}
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
