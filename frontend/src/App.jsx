import React from "react";
import { Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { generateRoutes } from "./routes";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  return (
    <div className="bg-background min-h-screen text-textmain">
      <Header />
      <main className="flex-1 p-4">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {generateRoutes()}
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
