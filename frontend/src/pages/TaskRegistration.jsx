import React, { useState, useEffect } from "react";
import api from "../services/api";

function TaskRegistration() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [unit, setUnit] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const units = ["Litros", "Mililitros", "Unidades", "Horas", "Minutos"];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await api.get("/categories/");
    setCategories(res.data);
  };

  const handleAddSchedule = () => {
    if (!dayOfWeek || !startTime || !endTime) return;
    setSchedule([...schedule, { dayOfWeek, startTime, endTime }]);
    setDayOfWeek("");
    setStartTime("");
    setEndTime("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/activities/", {
        title,
        description,
        category: categoryId,
        unit,
      });

      const activityId = res.data.id;
      for (const sched of schedule) {
        await api.post("/schedules/", {
          activity: activityId,
          day_of_week: sched.dayOfWeek,
          start_time: sched.startTime,
          end_time: sched.endTime,
        });
      }

      alert("Atividade cadastrada com sucesso!");
      setTitle("");
      setDescription("");
      setCategoryId("");
      setUnit("");
      setSchedule([]);
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar atividade.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Cadastrar Nova Atividade</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Selecione uma Categoria</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Selecione uma Unidade de Medida</option>
          {units.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
        <div>
          <h3 className="text-lg font-bold">Agendamento</h3>
          <div className="flex space-x-2 mb-4">
            <select
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Dia da Semana</option>
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
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              type="button"
              onClick={handleAddSchedule}
              className="bg-primary text-white p-2 rounded hover:bg-primary-dark"
            >
              Adicionar
            </button>
          </div>
          <ul>
            {schedule.map((sched, index) => (
              <li key={index} className="flex justify-between items-center">
                {`Dia: ${sched.dayOfWeek}, Início: ${sched.startTime}, Fim: ${sched.endTime}`}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          className="bg-primary text-white p-2 rounded hover:bg-primary-dark w-full"
        >
          Cadastrar Atividade
        </button>
      </form>
    </div>
  );
}

export default TaskRegistration;
