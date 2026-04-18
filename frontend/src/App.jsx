import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/Student";
import StudentDetails from "./pages/StudentDetails";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Student />} />
        <Route path="/students/:id" element={<StudentDetails />} />
      </Routes>
    </div>
  );
};

export default App;
