import React, { useEffect, useState } from "react";
import api from "../services/api";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  const fetchTasks = async () => {
    const res = await api.get("/activities/");
    setTasks(res.data);
  };

  const fetchCategories = async () => {
    const res = await api.get("/categories/");
    setCategories(res.data);
  };

  const fetchSchedules = async (taskId) => {
    const res = await api.get(`/schedules/?activity=${taskId}`);
    setSchedules(res.data);
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    fetchSchedules(task.id);
  };

  const handleAddSchedule = async (dayOfWeek, startTime, endTime, details) => {
    try {
      await api.post("/schedules/", {
        activity: selectedTask.id,
        day_of_week: dayOfWeek,
        start_time: startTime,
        end_time: endTime,
        details,
      });
      fetchSchedules(selectedTask.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Gerenciar Atividades</h2>
      <div className="flex mb-4">
        <select
          className="border p-2 rounded flex-grow"
          onChange={(e) =>
            handleTaskSelect(tasks.find((t) => t.id === parseInt(e.target.value)))
          }
        >
          <option value="">Selecione uma Atividade</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))}
        </select>
      </div>
      {selectedTask && (
        <div>
          <h3 className="text-lg font-bold">Agendamentos</h3>
          <ul>
            {schedules.map((schedule) => (
              <li key={schedule.id}>
                {`Dia: ${schedule.day_of_week}, Início: ${schedule.start_time}, Fim: ${schedule.end_time}`}
                {schedule.details && <p>Detalhes: {schedule.details}</p>}
              </li>
            ))}
          </ul>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleAddSchedule(
                formData.get("day_of_week"),
                formData.get("start_time"),
                formData.get("end_time"),
                formData.get("details")
              );
            }}
          >
            <div className="flex mb-4">
              <select name="day_of_week" className="border p-2 rounded">
                <option value="0">Segunda-feira</option>
                <option value="1">Terça-feira</option>
                <option value="2">Quarta-feira</option>
                <option value="3">Quinta-feira</option>
                <option value="4">Sexta-feira</option>
                <option value="5">Sábado</option>
                <option value="6">Domingo</option>
              </select>
              <input
                type="time"
                name="start_time"
                className="border p-2 rounded mx-2"
              />
              <input
                type="time"
                name="end_time"
                className="border p-2 rounded mx-2"
              />
              <input
                type="text"
                name="details"
                placeholder="Detalhes"
                className="border p-2 rounded flex-grow"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white p-2 rounded hover:bg-primary-dark"
            >
              Adicionar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TaskManager;
