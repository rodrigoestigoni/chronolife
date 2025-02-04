import React, { useEffect, useState } from "react";
import api from "../services/api";

function WeeklyTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasksForWeek();
  }, []);

  const fetchTasksForWeek = async () => {
    try {
      const res = await api.get("/schedules/");
      const schedules = res.data;

      const taskIds = schedules.map((schedule) => schedule.activity);
      const tasksRes = await api.get("/activities/");
      const weeklyTasks = tasksRes.data.filter((task) => taskIds.includes(task.id));
      setTasks(weeklyTasks);
    } catch (err) {
      console.error("Erro ao buscar tarefas semanais:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tarefas Semanais</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border p-2 rounded mb-2">
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeeklyTasks;
