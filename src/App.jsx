import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx"; // create later if not present

import StudentDashboard from "./pages/StudentDashboard.jsx";
import AlumniDashboard from "./pages/AlumniDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import StudentProfile from "./pages/StudentProfile.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 Landing Page */}
        <Route path="/" element={<Home />} />

        {/* 🔐 Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🎓 Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        {/* 🧑‍🎓 Alumni Routes */}
        <Route
          path="/alumni"
          element={
            <ProtectedRoute allowedRole="ALUMNI">
              <AlumniDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🛡 Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
