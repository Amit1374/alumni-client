import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotificationDropdown from "../components/NotificationDropdown";

function StudentDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;

    setUser(storedUser);

    fetch(`http://localhost:8080/api/student/profile/${storedUser.id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const text = await res.text();
        setProfileCompleted(!!text);
        setLoading(false);
      })
      .catch(() => {
        setProfileCompleted(false);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (loading || !user) return null;

  const disabled = !profileCompleted;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-indigo-700">
          🎓 Student Dashboard
        </h2>

        <div className="flex items-center gap-6">
          {/* Notification */}
         {user && <NotificationDropdown userId={user.id} />}

          {/* Profile Avatar */}
          <div
            className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer font-semibold"
            onClick={() => navigate("/student/profile")}
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

      {/* Content */}
      <div className="max-w-7xl mx-auto p-8 space-y-10">

        {/* Profile Warning */}
        {!profileCompleted && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-lg">
            ⚠️ Complete your profile to unlock mentorship, internships, and events.
          </div>
        )}

        {/* Quick Actions */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            What would you like to do?
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActionCard
              title="🤝 Find a Mentor"
              desc="Search alumni and send mentorship requests."
              disabled={disabled}
            />

            <ActionCard
              title="🔍 Search Alumni"
              desc="Explore alumni by company, role, or skills."
              disabled={disabled}
            />

            <ActionCard
              title="👤 My Profile"
              desc="View or update your academic profile."
              onClick={() => navigate("/student/profile")}
            />
          </div>
        </section>

        {/* Internship Section */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            💼 Internship Opportunities
          </h3>

          <div className="bg-white rounded-xl shadow p-6 space-y-4">

            {/* Filters (UI only) */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                placeholder="Search by skill (React, Java...)"
                className="border rounded-lg px-4 py-2"
                disabled={disabled}
              />
              <select className="border rounded-lg px-4 py-2" disabled={disabled}>
                <option>Mode</option>
                <option>Online</option>
                <option>Offline</option>
                <option>Hybrid</option>
              </select>
              <select className="border rounded-lg px-4 py-2" disabled={disabled}>
                <option>Experience</option>
                <option>Fresher</option>
                <option>0-1 Year</option>
                <option>1-3 Years</option>
              </select>
              <button
                disabled={disabled}
                className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 disabled:bg-gray-300"
              >
                Search
              </button>
            </div>

            <p className="text-gray-500 text-sm">
              Internships posted by alumni will appear here.
            </p>
          </div>
        </section>

        {/* Events Section */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            📅 College Events & Meetups
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventCard
              title="Alumni Connect Meet"
              desc="Networking session with alumni from top companies."
            />
            <EventCard
              title="Resume Building Workshop"
              desc="Hands-on workshop conducted by industry mentors."
            />
            <EventCard
              title="Tech Talk Series"
              desc="Sessions on modern technologies & career growth."
            />
          </div>
        </section>

      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function ActionCard({ title, desc, disabled, onClick }) {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`p-6 rounded-xl shadow transition
        ${disabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white hover:shadow-lg cursor-pointer"
        }`}
    >
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-sm">{desc}</p>
    </div>
  );
}

function EventCard({ title, desc }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}

export default StudentDashboard;
