import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 text-slate-800">

      {/* ================= NAVBAR ================= */}
      <nav className="flex items-center justify-between px-10 py-6 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          AlumniConnect
        </h1>

        <div className="space-x-6">
          <Link
            to="/login"
            className="text-slate-600 hover:text-slate-900 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-24 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-slate-900">
          Connecting  
          <span className="text-indigo-600"> Students</span>,  
          <span className="text-indigo-600"> Alumni</span> &  
          <span className="text-indigo-600"> Institutions</span>
        </h2>

        <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          AlumniConnect is a professional alumni management platform designed
          to enable mentorship, internships, events, and long-term engagement
          in one secure system.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Create Account
          </Link>

          <Link
            to="/login"
            className="border border-slate-300 px-8 py-3 rounded-lg text-slate-700 hover:bg-slate-100 transition"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
          <Stat value="1000+" label="Registered Students" />
          <Stat value="500+" label="Verified Alumni" />
          <Stat value="50+" label="Events & Opportunities" />
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-6xl mx-auto px-6 py-28">
        <h3 className="text-3xl font-semibold text-center mb-16 text-slate-900">
          Why AlumniConnect?
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <Feature
            title="Role-Based Dashboards"
            desc="Dedicated dashboards for students, alumni, and administrators with secure access control."
          />
          <Feature
            title="Mentorship & Guidance"
            desc="Students can connect with alumni mentors for career advice and industry exposure."
          />
          <Feature
            title="Internships & Events"
            desc="Alumni share internships, job openings, and organize professional events."
          />
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-slate-900 text-slate-100 py-24">
        <h3 className="text-3xl font-semibold text-center mb-16">
          How It Works
        </h3>

        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          <Step number="1" title="Register" />
          <Step number="2" title="Complete Profile" />
          <Step number="3" title="Connect & Engage" />
          <Step number="4" title="Grow Together" />
        </div>
      </section>

      {/* ================= ROLES ================= */}
      <section className="max-w-6xl mx-auto px-6 py-28">
        <h3 className="text-3xl font-semibold text-center mb-16 text-slate-900">
          Built for Every Role
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <Role
            title="Students"
            points={[
              "Find mentors",
              "Apply for internships",
              "Attend alumni events"
            ]}
          />
          <Role
            title="Alumni"
            points={[
              "Mentor students",
              "Post opportunities",
              "Stay institution-connected"
            ]}
          />
          <Role
            title="Administrators"
            points={[
              "Verify profiles",
              "Manage users",
              "Monitor platform activity"
            ]}
          />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-indigo-600 py-24 text-center text-white">
        <h3 className="text-4xl font-semibold mb-6">
          Build a Strong Alumni Network
        </h3>

        <p className="max-w-2xl mx-auto text-indigo-100 mb-10">
          AlumniConnect helps institutions create meaningful professional
          relationships that extend beyond graduation.
        </p>

        <Link
          to="/register"
          className="bg-white text-indigo-600 px-10 py-3 rounded-lg font-medium hover:bg-indigo-50 transition"
        >
          Get Started
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-8 text-center text-slate-500 bg-slate-100 border-t border-slate-200">
        © {new Date().getFullYear()} AlumniConnect. All rights reserved.
      </footer>
    </div>
  );
};

/* ---------- COMPONENTS ---------- */

const Feature = ({ title, desc }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
    <h4 className="text-lg font-semibold mb-3 text-slate-900">{title}</h4>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

const Role = ({ title, points }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm">
    <h4 className="text-lg font-semibold mb-4 text-slate-900">{title}</h4>
    <ul className="space-y-2 text-slate-600">
      {points.map((p, i) => (
        <li key={i}>• {p}</li>
      ))}
    </ul>
  </div>
);

const Step = ({ number, title }) => (
  <div className="bg-slate-800 p-6 rounded-xl">
    <div className="text-3xl font-semibold text-indigo-400 mb-2">{number}</div>
    <p className="font-medium">{title}</p>
  </div>
);

const Stat = ({ value, label }) => (
  <div>
    <p className="text-3xl font-semibold text-indigo-600">{value}</p>
    <p className="text-slate-600">{label}</p>
  </div>
);

export default Home;
