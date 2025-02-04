import React from "react";
import { Route } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from "./utils/animations";

// Importação das páginas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import GeneralManagement from "./pages/GeneralManagement";
import DailyTasks from "./pages/DailyTasks";
import WeeklyTasks from "./pages/WeeklyTasks";
import UserProfile from "./pages/UserProfile";
import TaskManager from "./components/TaskManager";

const routes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
  {
    path: "/admin",
    component: <Admin />,
  },
  {
    path: "/tasks",
    component: <TaskManager />,
  },
  {
    path: "/dashboard",
    component: <Dashboard />,
  },
  {
    path: "/task-registration",
    component: <GeneralManagement />,
  },
  {
    path: "/daily",
    component: <DailyTasks />,
  },
  {
    path: "/weekly",
    component: <WeeklyTasks />,
  },
  {
    path: "/profile",
    component: <UserProfile />,
  },
];

export const generateRoutes = () => {
  return routes.map(({ path, component }) => (
    <Route
      key={path}
      path={path}
      element={<motion.div {...fadeInOut}>{component}</motion.div>}
    />
  ));
};
