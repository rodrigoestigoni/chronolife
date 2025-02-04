import React, { useEffect, useState } from "react";
import api from "../services/api";

function ScheduleManager() {
  const [schedules, setSchedules] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activityId, setActivityId] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("07:00");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const actRes = await api.get("/activities/");
      setActivities(actRes.data);
      const schedRes = await api.get("/schedules/");
      setSchedules(schedRes.data);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    }
  };

  const handleAdd = async () => {
    try {
      await api.post("/schedules/", {
        activity: activityId,
        day_of_week: dayOfWeek,
        start_time: startTime,
        end_time: endTime,
      });
      fetchData();
    } catch (err) {
      console.error("Erro ao adicionar horário:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gerenciar Horários</h2>
      <div className="flex flex-col space-y-2 mb-4">
        <select
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Selecione uma atividade</option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.title}
            </option>
          ))}
        </select>
        <select
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek(e.target.value)}
          className="border p-2 rounded"
        >
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
        <button onClick={handleAdd} className="bg-primary text-white p-2">
          Adicionar
        </button>
      </div>
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule.id} className="border p-2 mb-2">
            Atividade: {schedule.activity} - Dia: {schedule.day_of_week} - Horário: {schedule.start_time} - {schedule.end_time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScheduleManager;
