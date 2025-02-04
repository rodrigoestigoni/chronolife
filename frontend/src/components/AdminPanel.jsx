import React, { useState } from "react";
import CategoryManager from "./CategoryManager";
import ActivityManager from "./ActivityManager";
import ScheduleManager from "./ScheduleManager";

function AdminPanel() {
  const [tab, setTab] = useState("categories");

  const renderTabContent = () => {
    switch (tab) {
      case "categories":
        return <CategoryManager />;
      case "activities":
        return <ActivityManager />;
      case "schedules":
        return <ScheduleManager />;
      default:
        return <div>Selecione uma aba válida.</div>;
    }
  };

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setTab("categories")}
          className={`p-2 ${
            tab === "categories" ? "bg-primary text-white" : "bg-gray-200"
          } rounded`}
        >
          Categorias
        </button>
        <button
          onClick={() => setTab("activities")}
          className={`p-2 ${
            tab === "activities" ? "bg-primary text-white" : "bg-gray-200"
          } rounded`}
        >
          Atividades
        </button>
        <button
          onClick={() => setTab("schedules")}
          className={`p-2 ${
            tab === "schedules" ? "bg-primary text-white" : "bg-gray-200"
          } rounded`}
        >
          Horários
        </button>
      </div>
      <div>{renderTabContent()}</div>
    </div>
  );
}

export default AdminPanel;
