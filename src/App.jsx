import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx"; // create later if not present


import StudentInternships from "./pages/StudentInternships";

import StudentDashboard from "./pages/StudentDashboard.jsx";
import AlumniDashboard from "./pages/AlumniDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import StudentProfile from "./pages/StudentProfile.jsx";
import AlumniProfile from "./pages/AlumniProfile.jsx";
import PostInternship from "./pages/PostInternship.jsx";
import FindMentor from "./pages/FindMentor.jsx";
import AlumniMentorshipPage from "./pages/AlumniMentorshipPage.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";


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

        <Route
          path="/student/find-mentor"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <FindMentor />
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

        {/* Alumni Profile */}
        <Route
          path="/alumni/profile"
          element={
            <ProtectedRoute allowedRole="ALUMNI">
              <AlumniProfile />
            </ProtectedRoute>
          }
        />

        {/* Post Internship - Alumni */}
        <Route
          path="/alumni/post-internship"
          element={
            <ProtectedRoute allowedRole="ALUMNI">
              <PostInternship />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alumni/mentorship-requests"
          element={
            <ProtectedRoute allowedRole="ALUMNI">
            <AlumniMentorshipPage />
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

        {/* Post Internship - Admin */}
        <Route
          path="/admin/post-internship"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <PostInternship />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-event"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alumni/create-event"
          element={
            <ProtectedRoute allowedRole="ALUMNI">
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/internships"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentInternships />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
