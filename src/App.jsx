import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import AlumniDashboard from "./pages/AlumniDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import StudentProfile from "./pages/StudentProfile.jsx";   // ✅ ADD THIS
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Student Dashboard */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Student Profile */}
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        {/* Alumni Dashboard */}
        <Route
          path="/alumni"
          element={
            <ProtectedRoute allowedRole="ALUMNI">
              <AlumniDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
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
