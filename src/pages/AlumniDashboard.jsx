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

  if (loading || !user) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );
  
  const disabled = !profileCompleted;

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* Navbar - UNCHANGED as requested */}
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-indigo-700">
          🎓 Alumni Dashboard
        </h2>

        <div className="flex items-center gap-6">
          {user && <NotificationDropdown userId={user.id} />}

          {/* Profile Avatar */}
            <div
              className="w-10 h-10 rounded-full bg-indigo-50 border-2 border-indigo-200 text-indigo-700 flex items-center justify-center cursor-pointer font-bold hover:bg-indigo-100 transition-all shadow-sm"
              onClick={() => navigate("/alumni/profile")}
              title="View Profile"
            >
              {user.name.charAt(0).toUpperCase()}
            </div>

          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 bg-white text-red-500 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* --- Upgraded Content Section --- */}
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        
        {/* Welcome Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
            <p className="text-slate-500">Manage your contributions and help the next generation grow.</p>
          </div>
          <div className="flex gap-3">
             <StatBox label="Mentored" value="12" />
             <StatBox label="Jobs Posted" value="4" />
          </div>
        </header>

        {!profileCompleted && (
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl shadow-sm animate-pulse">
            <span className="text-xl">⚠️</span>
            <p className="font-medium">Complete your profile to start mentoring students and posting opportunities.</p>
          </div>
        )}

        {/* Feature Grid */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-6 w-1 bg-indigo-600 rounded-full"></div>
            <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wider">Quick Actions</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Mentorship Requests"
              icon="📩"
              desc="View and respond to mentorship requests."
              disabled={disabled}
              onClick={() => navigate("/alumni/mentorship-requests")}
              active={showMentorship}
            />

            <FeatureCard
              title="Post Internships"
              icon="💼"
              desc="Share internships or job openings."
              disabled={disabled}
              onClick={() => navigate("/alumni/post-internship")}
            />

            <FeatureCard
              title="Events & Meetups"
              icon="📅"
              desc="Create and manage alumni events."
              disabled={disabled}
            />

            <FeatureCard
              title="Engagement Insights"
              icon="📊"
              desc="View your contribution statistics."
              disabled={disabled}
            />

          </div>
        </section>

        {/* 🔽 Mentorship Requests Section */}
        {showMentorship && (
          <section className="animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-700">
                  Pending Mentorship Requests
                </h3>
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full">2 Requests</span>
              </div>

              <div className="divide-y divide-slate-100">
                <MentorshipItem
                  name="Amit Patel"
                  initials="AP"
                  domain="Backend Development"
                />
                <MentorshipItem
                  name="Neha Sharma"
                  initials="NS"
                  domain="Data Science"
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

/* --- Reusable Components --- */

function StatBox({ label, value }) {
  return (
    <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center min-w-[100px]">
      <span className="text-xl font-bold text-indigo-600">{value}</span>
      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{label}</span>
    </div>
  );
}

function FeatureCard({ title, desc, icon, disabled, onClick, active }) {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`p-6 rounded-2xl border transition-all duration-300 group
        ${disabled
          ? "bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed"
          : active 
            ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200"
            : "bg-white border-slate-200 hover:border-indigo-400 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        }`}
    >
      <div className={`text-2xl mb-4 transition-transform group-hover:scale-110 ${disabled ? 'grayscale' : ''}`}>
        {icon}
      </div>
      <h4 className={`text-lg font-bold mb-1 ${active ? 'text-white' : 'text-slate-800'}`}>{title}</h4>
      <p className={`text-sm leading-relaxed ${active ? 'text-indigo-100' : 'text-slate-500'}`}>{desc}</p>
    </div>
  );
}

function MentorshipItem({ name, domain, initials }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-6 hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-4 mb-4 sm:mb-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
          {initials}
        </div>
        <div>
          <p className="font-bold text-slate-800">{name}</p>
          <p className="text-xs text-slate-500 flex items-center gap-1">
             <span className="w-2 h-2 rounded-full bg-indigo-400"></span> {domain}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 sm:flex-none px-5 py-2 text-sm font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
          Accept
        </button>
        <button className="flex-1 sm:flex-none px-5 py-2 text-sm font-bold rounded-xl bg-white text-slate-400 border border-slate-200 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all">
          Reject
        </button>
      </div>
    </div>
  );
}

export default AlumniDashboard;