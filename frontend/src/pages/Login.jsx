import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import { bounceEffect } from "../utils/animations";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/users/token/", { username: email, password });
      localStorage.setItem("access_token", res.data.access);
      alert("Login realizado!");
    } catch (err) {
      console.error(err);
      alert("Falha no login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Bem-vindo ao ChronoLife
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <motion.button
            {...bounceEffect}
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary-dark transition"
            }`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </motion.button>
        </form>
      </div>
    </div>
  );
}

export default Login;
