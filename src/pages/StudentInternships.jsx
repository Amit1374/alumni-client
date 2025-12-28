import { useEffect, useState } from "react";

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
    <div className="min-h-screen bg-slate-100 px-6 py-10">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          💼 Internship Opportunities
        </h2>
        <p className="text-sm text-slate-500">
          Explore internships shared by alumni & admin
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-4 mb-8 grid md:grid-cols-4 gap-4">

        <input
          placeholder="Search by title, company or skills"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={mode}
          onChange={e => setMode(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Modes</option>
          <option value="Remote">Remote</option>
          <option value="Onsite">Onsite</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <select
          value={paid}
          onChange={e => setPaid(e.target.value)}
          className="px-4 py-2 border rounded-lg"
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
          className="bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-gray-200"
        >
          Reset Filters
        </button>
      </div>

      {/* INTERNSHIP LIST */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filtered.length === 0 && (
          <p className="text-gray-500 col-span-full">
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
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between">

      <div>
        <h3 className="font-semibold text-slate-800 text-lg">
          {internship.title}
        </h3>

        <p className="text-sm text-slate-500 mb-2">
          {internship.companyName}
        </p>

        <div className="flex flex-wrap gap-2 text-xs mb-3">
          <Tag label={internship.mode} />
          <Tag label={internship.paid ? "Paid" : "Unpaid"} />
          <Tag label={`${internship.durationInMonths} Months`} />
        </div>

        <p className="text-sm text-slate-600 line-clamp-3">
          {internship.description}
        </p>

        <p className="text-xs text-slate-500 mt-2">
          Skills: {internship.skills}
        </p>
      </div>

      <a
        href={internship.applyLink || "#"}
        target="_blank"
        rel="noreferrer"
        className="mt-4 text-center bg-indigo-600 text-white py-2 rounded-lg text-sm hover:bg-indigo-700"
      >
        Apply Now
      </a>

    </div>
  );
}

function Tag({ label }) {
  return (
    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
      {label}
    </span>
  );
}

export default StudentInternships;
