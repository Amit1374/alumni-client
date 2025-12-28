import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotificationDropdown from "../components/NotificationDropdown";

function AlumniDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // UI state
  const [showMentorship, setShowMentorship] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;

    setUser(storedUser);

    fetch(`http://localhost:8080/api/alumni/profile/${storedUser.id}`)
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
          🎓 Alumni Dashboard
        </h2>

        <div className="flex items-center gap-6">
          {user && <NotificationDropdown userId={user.id} />}

          <div
            className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer font-semibold"
            onClick={() => navigate("/alumni/profile")}
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
      <div className="max-w-7xl mx-auto p-8">

        {!profileCompleted && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-lg mb-8">
            ⚠️ Complete your profile to start mentoring students and posting opportunities.
          </div>
        )}

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

          <FeatureCard
            title="📩 Mentorship Requests"
            desc="View and respond to mentorship requests."
            disabled={disabled}
            onClick={() => setShowMentorship(!showMentorship)}
          />

          <FeatureCard
            title="💼 Post Internships"
            desc="Share internships or job openings."
            disabled={disabled}
            onClick={() => navigate("/alumni/post-internship")}
          />

          <FeatureCard
            title="📅 Manage Events"
            desc="Create and manage alumni events."
            disabled={disabled}
          />

          <FeatureCard
            title="📊 Engagement Insights"
            desc="View your contribution statistics."
            disabled={disabled}
          />

          <FeatureCard
            title="📨 Announcements"
            desc="View updates from the institution."
            disabled={disabled}
          />
        </div>

        {/* 🔽 Mentorship Requests Section */}
        {showMentorship && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Mentorship Requests
            </h3>

            {/* Placeholder items (backend-ready) */}
            <div className="space-y-4">

              <MentorshipItem
                name="Amit Patel"
                domain="Backend Development"
              />

              <MentorshipItem
                name="Neha Sharma"
                domain="Data Science"
              />

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* Feature Card */
function FeatureCard({ title, desc, disabled, onClick }) {
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

/* Mentorship Request Item */
function MentorshipItem({ name, domain }) {
  return (
    <div className="flex justify-between items-center border rounded-lg p-4">
      <div>
        <p className="font-semibold text-gray-700">{name}</p>
        <p className="text-sm text-gray-500">{domain}</p>
      </div>

      <div className="flex gap-2">
        <button className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700">
          Accept
        </button>
        <button className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600">
          Reject
        </button>
      </div>
    </div>
  );
}

export default AlumniDashboard;
