import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Student from "./pages/Student";
import StudentDetails from "./pages/StudentDetails";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
    // Redirect based on their actual role if they try to access the wrong page
    if (userInfo.role === "student") {
      return <Navigate to="/student-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
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
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute allowedRoles={["teacher", "faculty_mentor", "faculty_coordinator"]}><Dashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/student-dashboard" 
          element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/students" 
          element={<ProtectedRoute allowedRoles={["teacher", "faculty_mentor", "faculty_coordinator"]}><Student /></ProtectedRoute>} 
        />
        <Route 
          path="/students/:id" 
          element={<ProtectedRoute allowedRoles={["teacher", "faculty_mentor", "faculty_coordinator"]}><StudentDetails /></ProtectedRoute>} 
        />
        <Route 
          path="/add-student" 
          element={<ProtectedRoute allowedRoles={["teacher", "faculty_mentor", "faculty_coordinator"]}><AddStudent /></ProtectedRoute>} 
        />
        <Route 
          path="/edit/:id" 
          element={<ProtectedRoute allowedRoles={["teacher", "faculty_mentor", "faculty_coordinator"]}><EditStudent /></ProtectedRoute>} 
        />
      </Routes>
    </div>
  );
};

export default App;
