import React, { useState } from "react";
import TaskRegistration from "./TaskRegistration";
import CategoryManager from "./CategoryManager";

function GeneralManagement() {
  const [activeTab, setActiveTab] = useState("activities");

  const renderContent = () => {
    switch (activeTab) {
      case "activities":
        return <TaskRegistration />;
      case "categories":
        return <CategoryManager />;
      default:
        return <div>Selecione uma aba válida.</div>;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento Geral</h1>
      <div className="flex space-x-4 mb-6">
        <button
          className={`flex items-center space-x-2 p-2 rounded ${
            activeTab === "activities"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("activities")}
        >
          <i className="fas fa-tasks"></i>
          <span>Gerenciar Atividades</span>
        </button>
        <button
          className={`flex items-center space-x-2 p-2 rounded ${
            activeTab === "categories"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("categories")}
        >
          <i className="fas fa-folder"></i>
          <span>Gerenciar Categorias</span>
        </button>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}

export default GeneralManagement;
