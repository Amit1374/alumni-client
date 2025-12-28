import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function AlumniDashboard() {
  const navigate = useNavigate();
  const notifRef = useRef();

  const [user, setUser] = useState(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const [openMentorship, setOpenMentorship] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // 🔹 Mentorship Requests (STATEFUL)
  const [mentorshipRequests, setMentorshipRequests] = useState([
    { id: 1, name: "Amit Patel", domain: "Backend Development" },
    { id: 2, name: "Neha Sharma", domain: "Data Science" }
  ]);

  const mentorshipCount = mentorshipRequests.length;
  const eventCount = 1;

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

  // 🔹 Close notification on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMentorshipAction = (id) => {
    setMentorshipRequests(prev => prev.filter(req => req.id !== id));
  };

  if (loading || !user) return null;
  const disabled = !profileCompleted;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* NAVBAR */}
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center relative">
        <h2 className="text-xl font-bold text-indigo-700">
          Alumni Dashboard
        </h2>

        <div className="flex items-center gap-6">

          {/* 🔔 Notifications */}
          <div className="relative" ref={notifRef}>
            <button onClick={() => setShowNotifications(!showNotifications)}>
              <span className="text-xl">🔔</span>
              {(mentorshipCount + eventCount) > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-72 bg-white shadow-xl rounded-lg border z-50">
                <div className="px-4 py-2 border-b font-medium text-slate-700">
                  Notifications
                </div>

                <div className="divide-y text-sm">
                  {mentorshipCount > 0 && (
                    <div className="px-4 py-3">
                      📩 {mentorshipCount} mentorship request(s)
                    </div>
                  )}
                  {eventCount > 0 && (
                    <div className="px-4 py-3">
                      📅 Upcoming alumni event scheduled
                    </div>
                  )}
                  {mentorshipCount === 0 && eventCount === 0 && (
                    <div className="px-4 py-3 text-slate-500">
                      No new notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div
            className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer font-semibold"
            onClick={() => navigate("/alumni/profile")}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto p-10 space-y-12">

        {!profileCompleted && (
          <div className="border border-yellow-200 bg-yellow-50 px-4 py-3 rounded-md text-sm">
            Complete your profile to unlock mentoring & posting features.
          </div>
        )}

        {/* 🔹 SECTION: MENTORSHIP */}
        <section className="bg-white rounded-xl shadow">
          <DashboardRow
            title="Mentorship Requests"
            subtitle="Students waiting for your response"
            badge={mentorshipCount}
            expandable
            open={openMentorship}
            disabled={disabled}
            onClick={() => setOpenMentorship(!openMentorship)}
          >
            {mentorshipRequests.length === 0 ? (
              <p className="text-sm text-slate-500">
                No pending mentorship requests.
              </p>
            ) : (
              mentorshipRequests.map(req => (
                <MentorshipRow
                  key={req.id}
                  name={req.name}
                  domain={req.domain}
                  onAction={() => handleMentorshipAction(req.id)}
                />
              ))
            )}
          </DashboardRow>
        </section>

        {/* 🔹 SECTION: INTERNSHIPS */}
        <section className="bg-white rounded-xl shadow">
          <DashboardRow
            title="Internships & Jobs"
            subtitle="Post opportunities for students"
            actionLabel="Create post"
            disabled={disabled}
            onClick={() => navigate("/alumni/post-internship")}
          />
        </section>

        {/* 🔹 SECTION: ENGAGEMENT */}
        <section>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Engagement & Updates
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard
              title="Events & Meetups"
              desc="Participate in alumni talks, webinars and college events."
            />
            <InfoCard
              title="Engagement Insights"
              desc="Track mentorship impact and student engagement."
            />
            <InfoCard
              title="Announcements"
              desc="Official notices and updates from the institution."
            />
          </div>
        </section>

      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function DashboardRow({
  title,
  subtitle,
  badge,
  disabled,
  onClick,
  expandable,
  open,
  actionLabel,
  children
}) {
  return (
    <div className={disabled ? "opacity-50" : ""}>
      <div
        onClick={!disabled ? onClick : undefined}
        className={`px-6 py-5 flex justify-between items-center
          ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-slate-50"}`}
      >
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-slate-800">{title}</p>
            {badge > 0 && (
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>

        {expandable ? (
          <span className="text-slate-400">{open ? "▾" : "▸"}</span>
        ) : (
          <span className="text-sm text-indigo-600">{actionLabel}</span>
        )}
      </div>

      {expandable && open && !disabled && (
        <div className="bg-slate-50 px-6 py-4 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}

function MentorshipRow({ name, domain, onAction }) {
  return (
    <div className="flex justify-between items-center bg-white border rounded-md px-4 py-3">
      <div>
        <p className="font-medium text-slate-700">{name}</p>
        <p className="text-xs text-slate-500">{domain}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onAction}
          className="text-xs px-3 py-1 rounded bg-green-600 text-white"
        >
          Accept
        </button>
        <button
          onClick={onAction}
          className="text-xs px-3 py-1 rounded bg-red-500 text-white"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

function InfoCard({ title, desc }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
      <h4 className="font-semibold text-slate-800 mb-2">{title}</h4>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  );
}

export default AlumniDashboard;
