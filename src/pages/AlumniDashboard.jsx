function AlumniDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Top Navbar */}
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-indigo-700">
          🎓 Alumni Dashboard
        </h2>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Profile Information
          </h3>

          <div className="grid sm:grid-cols-3 gap-4 text-gray-600">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2">
              👤 Update Profile
            </h4>
            <p className="text-gray-600 text-sm">
              Keep your professional details updated.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2">
              📩 Mentorship Requests
            </h4>
            <p className="text-gray-600 text-sm">
              View and respond to student mentorship requests.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2">
              💼 Post Internships
            </h4>
            <p className="text-gray-600 text-sm">
              Share internships and job opportunities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2">
              📅 Manage Events
            </h4>
            <p className="text-gray-600 text-sm">
              Create and manage alumni events.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AlumniDashboard;
