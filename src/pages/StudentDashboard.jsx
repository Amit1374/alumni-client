import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function StudentDashboard() {
  const navigate = useNavigate();
  const notifRef = useRef();

  const [user, setUser] = useState(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showNotifications, setShowNotifications] = useState(false);

  // 🔹 TEMP NOTIFICATIONS
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "MENTORSHIP",
      message: "Your mentorship request was accepted by Amit Patel"
    },
    {
      id: 2,
      type: "EVENT",
      message: "Alumni Connect Meet scheduled this weekend"
    }
  ]);

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

  // 🔹 Close notification dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (loading || !user) return null;
  const disabled = !profileCompleted;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* NAVBAR */}
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center relative">
        <h2 className="text-xl font-bold text-indigo-700">
          🎓 Student Dashboard
        </h2>

        <div className="flex items-center gap-6">

          {/* 🔔 Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <span className="text-2xl">🔔</span>
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-lg border z-50">
                <div className="px-4 py-2 border-b font-medium text-slate-700">
                  Notifications
                </div>

                <div className="divide-y text-sm">
                  {notifications.length === 0 && (
                    <div className="px-4 py-3 text-slate-500">
                      No new notifications
                    </div>
                  )}

                  {notifications.map(n => (
                    <div
                      key={n.id}
                      className="px-4 py-3 hover:bg-slate-50 flex justify-between items-start gap-3"
                    >
                      <p className="text-slate-700">{n.message}</p>
                      <button
                        onClick={() => clearNotification(n.id)}
                        className="text-xs text-indigo-600 hover:underline"
                      >
                        Mark read
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
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

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto p-8 space-y-10">

        {!profileCompleted && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-lg">
            ⚠️ Complete your profile to unlock mentorship, internships, and events.
          </div>
        )}

        {/* QUICK ACTIONS */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Quick Actions
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActionCard
  title="🤝 Find a Mentor"
  desc="Connect with alumni mentors."
  disabled={disabled}
  onClick={() => navigate("/student/mentorship")}
/>


            <ActionCard
              title="🔍 Search Alumni"
              desc="Explore alumni by company or role."
              disabled={disabled}
            />

            <ActionCard
              title="👤 My Profile"
              desc="View or update your academic profile."
              onClick={() => navigate("/student/profile")}
            />
          </div>
        </section>

        {/* 💼 INTERNSHIPS */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-700">
              💼 Internship Opportunities
            </h3>

            <button
              disabled={disabled}
              onClick={() => navigate("/student/internships")}
              className="text-sm text-indigo-600 hover:underline disabled:text-gray-400"
            >
              View all →
            </button>
          </div>

          <div
            onClick={() => !disabled && navigate("/student/internships")}
            className={`bg-white rounded-xl shadow p-6 cursor-pointer transition
              ${disabled ? "opacity-60 cursor-not-allowed" : "hover:shadow-lg"}`}
          >
            <p className="text-gray-600">
              Browse internships and job opportunities posted by alumni and admins.
            </p>
          </div>
        </section>

        {/* EVENTS */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            📅 College Events & Meetups
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventCard title="Alumni Connect Meet" desc="Networking with alumni." />
            <EventCard title="Resume Workshop" desc="Hands-on resume building." />
            <EventCard title="Tech Talk Series" desc="Career guidance sessions." />
          </div>
        </section>

      </div>
    </div>
  );
}

/* ---------- Components ---------- */

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
