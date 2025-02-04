import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Dashboard() {
  const [tasksToday, setTasksToday] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Supondo que segunda = 0, terça = 1, etc.
        const today = new Date().getDay() - 1; 
        // getDay(): Domingo=0, Segunda=1... adaptamos para segunda=0
        const dayOfWeek = today < 0 ? 6 : today;

        const res = await api.get('/schedules/');
        const schedules = res.data.filter(s => s.day_of_week === dayOfWeek);

        // Agora precisamos pegar as atividades relacionadas
        // Podemos mapear para pegar IDs e filtrar.
        // Uma outra opção é expandir o endpoint do backend para retornar dados completos.
        // Aqui, simplificaremos obtendo todas atividades do usuário:
        const actRes = await api.get('/activities/');
        const activities = actRes.data;

        // Filtra atividades cujos IDs aparecem nos schedules do dia
        const todayActivities = activities.filter(a =>
          schedules.some(s => s.activity === a.id)
        );

        setTasksToday(todayActivities);
        setCompletedCount(todayActivities.filter(a => a.completed).length);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Tarefas para hoje: {tasksToday.length}</p>
      <p>Concluídas: {completedCount}</p>
      <p>Metas do dia: Complete todas as tarefas agendadas!</p>
      <ul className="mt-4">
        {tasksToday.map(task => (
          <li key={task.id} className="flex items-center justify-between border p-2 mb-2">
            <span>{task.title} ({task.completed ? 'Concluído' : 'Pendente'})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
