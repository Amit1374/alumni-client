import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-100 relative overflow-hidden">

      {/* Navbar */}
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-indigo-700">
          🛠 Admin Dashboard
        </h2>

        <div className="flex items-center gap-6">

          <span className="text-2xl">🔔</span>

          {/* Profile Avatar */}
          <div
            className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer font-semibold"
            onClick={() => setShowProfile(true)}
            title="Admin Profile"
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {showProfile && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setShowProfile(false)}
        />
      )}

      {/* Profile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300
        ${showProfile ? "translate-x-0" : "translate-x-full"}`}
      >

        {/* Sidebar Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-700">
            👤 Admin Profile
          </h3>
          <button
            onClick={() => setShowProfile(false)}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Profile Content */}
        <div className="p-6 space-y-4 text-gray-700">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-medium">{user.role}</p>
          </div>

          <hr />

          {/* Future actions */}
          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
            Edit Profile (Future)
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto p-8 space-y-10">

        <Section title="Platform Administration">
          <AdminCard title="👥 Manage Users" desc="Activate, deactivate, manage users." />
          <AdminCard title="✅ Verify Alumni" desc="Approve alumni profiles." />
          <AdminCard title="🚫 Reports & Flags" desc="Handle reports and violations." />
          <AdminCard title="📊 Analytics" desc="View platform statistics." />
        </Section>

        <Section title="Content & Activity Moderation">
          <AdminCard title="💼 Internship Posts" desc="Moderate alumni postings." />
          <AdminCard title="🤝 Mentorship Requests" desc="Monitor mentorship flow." />
          <AdminCard title="📅 Events & Meetups" desc="Approve events." />
        </Section>

        <Section title="System Controls">
          <AdminCard title="🔐 Role Management" desc="Manage permissions." />
          <AdminCard title="📨 Announcements" desc="Publish announcements." />
          <AdminCard title="⚙️ Settings" desc="Platform configuration." />
        </Section>

      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function Section({ title, children }) {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">{title}</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </section>
  );
}

function AdminCard({ title, desc }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}

export default AdminDashboard;
