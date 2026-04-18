import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/Student";
import StudentDetails from "./pages/StudentDetails";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

const ProtectedRoute = ({ children }) => {
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/students" element={<ProtectedRoute><Student /></ProtectedRoute>} />
        <Route path="/students/:id" element={<ProtectedRoute><StudentDetails /></ProtectedRoute>} />
        <Route path="/add-student" element={<ProtectedRoute><AddStudent /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditStudent /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;
