import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function StudentInternships() {
  const [internships, setInternships] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("");
  const [paid, setPaid] = useState("");

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    fetch("http://localhost:8080/api/internships")
      .then(res => res.json())
      .then(data => {
        setInternships(data);
        setFiltered(data);
      })
      .catch(() => console.error("Failed to load internships"));
  }, []);

  /* ---------------- FILTER LOGIC ---------------- */
  useEffect(() => {
    let data = internships;

    if (search) {
      data = data.filter(i =>
        i.title.toLowerCase().includes(search.toLowerCase()) ||
        i.companyName.toLowerCase().includes(search.toLowerCase()) ||
        i.skills.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (mode) {
      data = data.filter(i => i.mode === mode);
    }

    if (paid) {
      data = data.filter(i => String(i.paid) === paid);
    }

    setFiltered(data);
  }, [search, mode, paid, internships]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-6 py-12">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-10"
      >
        <h2 className="text-3xl font-bold text-slate-800">
          Internship Opportunities
        </h2>
        <p className="text-slate-500 mt-1">
          Discover internships shared by alumni and administrators
        </p>
      </motion.div>

      {/* FILTER BAR */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-md border border-gray-200 p-5 mb-10 grid md:grid-cols-4 gap-4"
      >
        <input
          placeholder="Search title, company or skills"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <select
          value={mode}
          onChange={e => setMode(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-300"
        >
          <option value="">All Modes</option>
          <option value="Remote">Remote</option>
          <option value="Onsite">Onsite</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <select
          value={paid}
          onChange={e => setPaid(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-300"
        >
          <option value="">Paid / Unpaid</option>
          <option value="true">Paid</option>
          <option value="false">Unpaid</option>
        </select>

        <button
          onClick={() => {
            setSearch("");
            setMode("");
            setPaid("");
          }}
          className="rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
        >
          Reset Filters
        </button>
      </motion.div>

      {/* INTERNSHIP LIST */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {filtered.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No internships found
          </p>
        )}

        {filtered.map(i => (
          <InternshipCard key={i.id} internship={i} />
        ))}

      </div>
    </div>
  );
}

/* ---------------- CARD ---------------- */

function InternshipCard({ internship }) {
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    if (applied) return;

    setApplied(true);
    alert("✅ Applied successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col justify-between border border-gray-100"
    >
      <div>
        <h3 className="font-semibold text-slate-800 text-lg">
          {internship.title}
        </h3>

        <p className="text-sm text-slate-500 mb-3">
          {internship.companyName}
        </p>

        <div className="flex flex-wrap gap-2 text-xs mb-4">
          <Tag label={internship.mode} />
          <Tag label={internship.paid ? "Paid" : "Unpaid"} />
          <Tag label={`${internship.durationInMonths} Months`} />
        </div>

        <p className="text-sm text-slate-600 line-clamp-3">
          {internship.description}
        </p>

        <p className="text-xs text-slate-500 mt-3">
          <span className="font-medium">Skills:</span> {internship.skills}
        </p>
      </div>

      {/* APPLY BUTTON */}
      <button
        onClick={handleApply}
        disabled={applied}
        className={`mt-6 py-2.5 rounded-xl text-sm font-medium transition
          ${
            applied
              ? "bg-green-100 text-green-700 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
      >
        {applied ? "Applied ✓" : "Apply Now"}
      </button>
    </motion.div>
  );
}


function Tag({ label }) {
  return (
    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
      {label}
    </span>
  );
}

export default StudentInternships;
