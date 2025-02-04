import React, { useState } from "react";
import api from "../services/api";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("As senhas não coincidem.");
      return;
    }
    try {
      await api.post("/users/register/", { username, email, password });
      alert("Usuário registrado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Falha ao registrar usuário.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Registrar Usuário</h2>
      <form
        onSubmit={handleRegister}
        className="flex flex-col max-w-md space-y-2"
      >
        <input
          type="text"
          placeholder="Nome de usuário"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Repita a Senha"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <button className="bg-primary text-white p-2">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
