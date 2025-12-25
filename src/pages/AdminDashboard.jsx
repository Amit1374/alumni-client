function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>🛠 Admin Dashboard</h2>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <hr />

      <ul>
        <li>👥 Manage Users</li>
        <li>✅ Verify Alumni Profiles</li>
        <li>📊 View Analytics</li>
        <li>🚫 Handle Reports</li>
      </ul>

      <br />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
