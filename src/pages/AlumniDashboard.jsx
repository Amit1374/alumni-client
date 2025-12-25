function AlumniDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>🎓 Alumni Dashboard</h2>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <hr />

      <ul>
        <li>👤 Update Alumni Profile</li>
        <li>📩 View Mentorship Requests</li>
        <li>💼 Post Internships</li>
        <li>📅 Manage Events</li>
      </ul>

      <br />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AlumniDashboard;
