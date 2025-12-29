import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, CheckCircle, AlertTriangle, BarChart3, 
  Briefcase, MessageSquare, Calendar, ShieldCheck, 
  Megaphone, Settings, X, LogOut, User as UserIcon
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden font-sans">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-50 to-transparent -z-10" />

      {/* NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 px-8 py-4 flex justify-between items-center">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-violet-700 bg-clip-text text-transparent flex items-center gap-2"
        >
          <ShieldCheck className="text-indigo-600" /> Admin Console
        </motion.h2>

        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-indigo-600 shadow-lg shadow-indigo-200 text-white flex items-center justify-center cursor-pointer font-semibold"
            onClick={() => setShowProfile(true)}
          >
            {user.name.charAt(0).toUpperCase()}
          </motion.div>
          
          
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 bg-white text-red-500 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* OVERLAY & SIDEBAR */}
      <AnimatePresence>
        {showProfile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfile(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 border-l border-slate-100"
            >
              <div className="flex justify-between items-center px-6 py-6 border-b border-slate-50">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <UserIcon size={20} className="text-indigo-600" /> My Profile
                </h3>
                <button onClick={() => setShowProfile(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="flex flex-col items-center pb-6 border-b border-slate-50">
                   <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-3xl font-bold mb-4">
                        {user.name.charAt(0)}
                   </div>
                   <h4 className="font-bold text-xl text-slate-900">{user.name}</h4>
                   <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full mt-2">
                    {user.role}
                   </span>
                </div>
                
                <div className="space-y-4">
                    <ProfileField label="Email Address" value={user.email} />
                    <ProfileField label="Last Login" value="Today, 10:45 AM" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* DASHBOARD CONTENT */}
      <main className="max-w-7xl mx-auto p-8 space-y-12">
        
        <header>
            <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-black text-slate-800"
            >
                Overview
            </motion.h1>
            <p className="text-slate-500 mt-1">System status: All services operational.</p>
        </header>

        <Section title="Platform Administration">
          <AdminCard title="Manage Users" desc="Activate, deactivate, or modify user accounts." icon={<Users />} />
          <AdminCard title="Verify Alumni" desc="Review and approve pending alumni applications." icon={<CheckCircle />} badge="5 Pending" />
          <AdminCard title="Reports & Flags" desc="Moderate community content and handle violations." icon={<AlertTriangle />} />
          <AdminCard title="Analytics" desc="Deep dive into user growth and engagement metrics." icon={<BarChart3 />} />
        </Section>

        <Section title="Content Moderation">
          <AdminCard
            title="Post Internships"
            desc="Curate job opportunities for the student body."
            icon={<Briefcase />}
            onClick={() => navigate("/admin/post-internship")}
          />
          <AdminCard title="Mentorship Flow" desc="Review mentorship pairings and feedback." icon={<MessageSquare />} />
          <AdminCard title="Events" desc="Approve and schedule university meetups." icon={<Calendar />} />
        </Section>

        <Section title="System Controls">
          <AdminCard title="Announcements" desc="Send global notifications to all users." icon={<Megaphone />} />
          <AdminCard title="Settings" desc="Configure platform rules and API keys." icon={<Settings />} />
        </Section>
      </main>
    </div>
  );
}

/* ---------- REUSABLE COMPONENTS ---------- */

function Section({ title, children }) {
  return (
    <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">{title}</h3>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {children}
      </div>
    </motion.section>
  );
}

function AdminCard({ title, desc, onClick, icon, badge }) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`bg-white p-6 rounded-2xl border border-slate-200 flex flex-col h-full transition-all group
        ${onClick ? "cursor-pointer border-indigo-100" : ""}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors`}>
          {icon}
        </div>
        {badge && (
            <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-md uppercase">
                {badge}
            </span>
        )}
      </div>
      <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function ProfileField({ label, value }) {
    return (
        <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
            <p className="text-slate-700 font-medium">{value}</p>
        </div>
    )
}

export default AdminDashboard;