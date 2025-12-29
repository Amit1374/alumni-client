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

  if (loading || !user) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  const disabled = !profileCompleted;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      
      {/* --- Upgraded Navbar --- */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200 px-8 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
          <span>🎓</span> Student Dashboard
        </h2>

        <div className="flex items-center gap-6">
          {/* Notification Container - Set to relative so dropdown aligns below icon */}
          <div className="relative">
             {user && <NotificationDropdown userId={user.id} />}
          </div>

         {/* Profile Avatar */}
            <div
              className="w-10 h-10 rounded-full bg-indigo-50 border-2 border-indigo-200 text-indigo-700 flex items-center justify-center cursor-pointer font-bold hover:bg-indigo-100 transition-all shadow-sm"
              onClick={() => navigate("/student/profile")}
              title="View Profile"
            >
              {user.name.charAt(0).toUpperCase()}
            </div>

          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 bg-white text-red-500 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <div className="max-w-7xl mx-auto p-8 space-y-10">

        {/* Profile Warning */}
        {!profileCompleted && (
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl shadow-sm">
            <span className="text-xl">⚠️</span>
            <p className="font-medium">Complete your profile to unlock mentorship, internships, and events.</p>
          </div>
        )}

        {/* Quick Actions */}
        <section>
          <h3 className="text-lg font-bold mb-5 text-slate-700 flex items-center gap-2">
            <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
            What would you like to do?
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActionCard
              title="🤝 Find a Mentor"
              desc="Search alumni and send mentorship requests."
              disabled={disabled}
              onClick={() => navigate("/student/find-mentor")}
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

        {/* Internship Opportunities */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
              💼 Internship Opportunities
            </h3>

            <button
              disabled={disabled}
              onClick={() => navigate("/student/internships")}
              className="text-sm font-bold text-indigo-600 hover:text-indigo-800 disabled:text-gray-400 transition-colors"
            >
              View all →
            </button>
          </div>

          <div
            onClick={() => !disabled && navigate("/student/internships")}
            className={`bg-white border border-slate-200 rounded-2xl p-8 transition-all
              ${disabled ? "opacity-60 cursor-not-allowed" : "hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer"}`}
          >
            <p className="text-slate-600 text-lg">
              Browse internships and job opportunities posted by alumni and admins.
            </p>
          </div>
        </section>

        {/* Events Section */}
        <section className="pb-12">
          <h3 className="text-lg font-bold mb-5 text-slate-700 flex items-center gap-2">
            <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
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
      className={`p-6 rounded-2xl border transition-all duration-300
        ${disabled
          ? "bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed"
          : "bg-white border-slate-200 hover:border-indigo-400 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
        }`}
    >
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  );
}

function EventCard({ title, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
      <h4 className="text-lg font-bold mb-2 text-slate-800">{title}</h4>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
      <button className="mt-4 text-xs font-bold text-indigo-600 uppercase tracking-wider hover:text-indigo-800">Learn More</button>
    </div>
  );
}

export default StudentDashboard;