import React, { useEffect, useState } from "react";
import api from "../services/api";

function DailyTasks() {
  const [tasks, setTasks] = useState([]);
  const [completedTask, setCompletedTask] = useState(null);
  const [observation, setObservation] = useState("");

  useEffect(() => {
    fetchTasksForToday();
  }, []);

  const fetchTasksForToday = async () => {
    try {
      const today = new Date().getDay(); // 0 = Domingo, 6 = Sábado
      const res = await api.get("/schedules/");
      const todaySchedules = res.data.filter((schedule) => schedule.day_of_week === today);

      const taskIds = todaySchedules.map((schedule) => schedule.activity);
      const tasksRes = await api.get("/activities/");
      const todayTasks = tasksRes.data.filter((task) => taskIds.includes(task.id));
      setTasks(todayTasks);
    } catch (err) {
      console.error("Erro ao buscar tarefas do dia:", err);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await api.put(`/activities/${taskId}/`, { completed: true });
      if (observation) {
        console.log(`Observação salva: ${observation}`);
      }
      fetchTasksForToday();
      alert("Tarefa concluída com sucesso!");
    } catch (err) {
      console.error("Erro ao concluir tarefa:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tarefas Diárias</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border p-2 rounded mb-2 flex justify-between items-center">
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Observações"
                value={completedTask === task.id ? observation : ""}
                onChange={(e) => setObservation(e.target.value)}
                className="border p-1 rounded"
              />
              <button
                onClick={() => {
                  setCompletedTask(task.id);
                  handleCompleteTask(task.id);
                }}
                className="bg-primary text-white p-2 rounded hover:bg-primary-dark"
              >
                Concluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DailyTasks;
