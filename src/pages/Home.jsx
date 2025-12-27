import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          AlumniConnect
        </h1>

        <div className="space-x-6">
          <Link
            to="/login"
            className="hover:text-indigo-300 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 mt-24">
        <h2 className="text-4xl md:text-5xl font-extrabold max-w-4xl leading-tight">
          One Platform to Connect  
          <span className="text-indigo-400"> Alumni</span>,  
          <span className="text-indigo-400"> Students</span> &  
          <span className="text-indigo-400"> Institutions</span>
        </h2>

        <p className="mt-6 text-lg text-gray-300 max-w-2xl">
          Manage alumni data, professional networking, events, and role-based
          dashboards through a secure and scalable system.
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            to="/register"
            className="bg-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-indigo-400 px-8 py-3 rounded-lg hover:bg-indigo-400 hover:text-black transition"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mt-32 px-8">
        <h3 className="text-3xl font-bold text-center mb-12">
          Why AlumniConnect?
        </h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl hover:scale-105 transition">
            <h4 className="text-xl font-semibold mb-3">
              Role-Based Access
            </h4>
            <p className="text-gray-300">
              Separate dashboards for Students, Alumni, and Admins with secure
              access control.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl hover:scale-105 transition">
            <h4 className="text-xl font-semibold mb-3">
              Alumni Networking
            </h4>
            <p className="text-gray-300">
              Strengthen alumni-student connections through events and
              professional engagement.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl hover:scale-105 transition">
            <h4 className="text-xl font-semibold mb-3">
              Admin Control
            </h4>
            <p className="text-gray-300">
              Centralized control to manage users, profiles, and platform data.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-32 py-6 text-center text-gray-400 border-t border-white/10">
        © {new Date().getFullYear()} AlumniConnect. All rights reserved.
      </footer>

    </div>
  );
};

export default Home;
