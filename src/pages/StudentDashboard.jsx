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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-600"></div>
    </div>
  );

  const disabled = !profileCompleted;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      
      {/* --- Navbar (Kept Exactly as Requested) --- */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200 px-8 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
          <span>🎓</span> Student Dashboard
        </h2>
        <div className="flex items-center gap-6">
          <div className="relative">
             {user && <NotificationDropdown userId={user.id} />}
          </div>
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
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 lg:p-10 space-y-10">
        
        {/* --- Section 1: Compact Welcome Bar --- */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Welcome back, <span className="text-indigo-600">{user.name.split(' ')[0]}!</span>
            </h1>
            <p className="text-slate-500 text-sm">Here is what's happening with your career path today.</p>
          </div>
          
          {!profileCompleted && (
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 px-4 py-2 rounded-xl">
              <span className="text-amber-600 font-bold">⚠️ Profile Incomplete</span>
              <button 
                onClick={() => navigate("/student/profile")}
                className="text-xs bg-amber-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-amber-700 transition-colors"
              >
                Complete Now
              </button>
            </div>
          )}
        </section>

        {/* --- Section 2: Core Actions (Grid) --- */}
        <section>
          <div className="grid md:grid-cols-2 gap-6">
            <ActionCard
              title="Academic Profile"
              desc="Showcase your skills, GPA, and projects to stand out to recruiters."
              image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ3hDXJLNXg2aT-jdZxpKPO_Z_oxhXA4nV2cL7Av4Qv-GxKlfhRm7HbdWTWwunG"
              onClick={() => navigate("/student/profile")}
              label="Update Skills"
            />
            <ActionCard
              title="Mentorship Hub"
              desc="Connect with successful alumni for 1-on-1 career guidance."
              image="https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop"
              disabled={disabled}
              onClick={() => navigate("/student/find-mentor")}
              label="Find Mentors"
            />
          </div>
        </section>

        {/* --- Section 3: Internships Highlight --- */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Latest Internships</h3>
              <p className="text-sm text-slate-500">Opportunities tailored to your major.</p>
            </div>
            <button 
              disabled={disabled}
              onClick={() => navigate("/student/internships")}
              className="text-indigo-600 font-bold text-sm hover:underline disabled:text-slate-400"
            >
              View All Opportunities
            </button>
          </div>

          <div 
            onClick={() => !disabled && navigate("/student/internships")}
            className={`relative group h-64 rounded-2xl overflow-hidden border border-slate-200 transition-all shadow-md ${disabled ? 'cursor-not-allowed grayscale' : 'cursor-pointer hover:shadow-xl'}`}
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              alt="Team working"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex items-end p-8">
              <div className="max-w-xl">
                <h4 className="text-white text-xl font-bold mb-2">Bridge the gap between College and Corporate</h4>
                <p className="text-slate-200 text-sm leading-relaxed">
                  Apply for verified internships from our alumni network. Get real-world experience and build your professional network.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 4: Events Feed --- */}
        <section className="pb-16">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
            Upcoming Events
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventCard
              title="Alumni Tech Connect"
              type="Networking"
              image="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTRd_P4CPp0WV__qrfojEXQoryuCjk6XXsNoVTjGOoZ0TDSvYUFFaGGNMbLdjSA"
              desc="Join a live session with alumni working at Google and Microsoft."
            />
            <EventCard
              title="Resume Deep-Dive"
              type="Workshop"
              image="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=600&auto=format&fit=crop"
              desc="Get your resume reviewed by industry experts for free."
            />
           <EventCard
  title="Mock Interview Day"
  type="Practical"
  image="https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&q=80&w=600"
  desc="Practice your technical and HR interviews with seniors."
/>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------- Optimized Reusable Components ---------- */

function ActionCard({ title, desc, image, disabled, onClick, label }) {
  return (
    <div 
      onClick={!disabled ? onClick : undefined}
      className={`group relative flex flex-col sm:flex-row bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all
        ${disabled 
          ? "opacity-60 cursor-not-allowed" 
          : "hover:border-indigo-400 hover:shadow-lg cursor-pointer"
        }`}
    >
      <div className="sm:w-32 h-32 sm:h-auto overflow-hidden">
        <img src={image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={title} />
      </div>
      <div className="p-5 flex flex-col justify-center flex-1">
        <h4 className="font-bold text-slate-800 text-lg mb-1">{title}</h4>
        <p className="text-slate-500 text-sm mb-3 line-clamp-2">{desc}</p>
        <span className="text-indigo-600 font-bold text-xs uppercase tracking-wider">{label} →</span>
      </div>
    </div>
  );
}

function EventCard({ title, type, image, desc }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-all group">
      <div className="h-32 overflow-hidden relative">
        <img src={image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={title} />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-indigo-700 uppercase tracking-tight shadow-sm">
          {type}
        </span>
      </div>
      <div className="p-5">
        <h4 className="font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{title}</h4>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">{desc}</p>
        <button className="text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors uppercase tracking-widest">
          Register Now
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;