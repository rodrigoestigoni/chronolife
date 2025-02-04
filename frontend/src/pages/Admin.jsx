import React, { useState } from "react";
import AdminPanel from "../components/AdminPanel";

function Admin() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Administração</h1>
      <AdminPanel />
    </div>
  );
}

export default Admin;
