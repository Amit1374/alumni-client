function AdminDashboard() {
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
          🛠 Admin Dashboard
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
            Admin Information
          </h3>

          <div className="grid sm:grid-cols-3 gap-4 text-gray-600">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2">
              👥 Manage Users
            </h4>
            <p className="text-gray-600 text-sm">
              View, activate, deactivate, and manage all platform users.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2">
              ✅ Verify Alumni Profiles
            </h4>
            <p className="text-gray-600 text-sm">
              Approve or reject alumni registrations and profile updates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2">
              📊 View Analytics
            </h4>
            <p className="text-gray-600 text-sm">
              Monitor platform usage, engagement, and growth statistics.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2">
              🚫 Handle Reports
            </h4>
            <p className="text-gray-600 text-sm">
              Review and resolve reported users or content issues.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
