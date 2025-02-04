import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Header() {
  return (
    <motion.header
      className="bg-primary text-white p-4 flex justify-between items-center"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="font-bold text-xl">ChronoLife</div>
      <nav className="flex items-center space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/daily" className="hover:underline">
          Tarefas Diárias
        </Link>
        <Link to="/weekly" className="hover:underline">
          Tarefas Semanais
        </Link>
        <Link to="/tasks" className="hover:underline">
          Tarefas
        </Link>
        <Link to="/profile" className="hover:underline">
          Perfil
        </Link>
        <Link to="/login" className="hover:underline">
          Login
        </Link>
      </nav>
    </motion.header>
  );
}

export default Header;
