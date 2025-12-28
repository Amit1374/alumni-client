import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostInternship() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    title: "",
    company: "",
    type: "",
    duration: "",
    skills: "",
    location: "",
    stipend: "",
    description: "",
    applyLink: ""
  });

  const [errors, setErrors] = useState({});

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.company.trim()) newErrors.company = "Company is required";
    if (!form.type) newErrors.type = "Internship type is required";
    if (!form.duration) newErrors.duration = "Duration is required";
    if (!form.skills.trim()) newErrors.skills = "Skills are required";
    if (!form.description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/internships/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: form.title,
            companyName: form.company,
            description: form.description,
            skills: form.skills,
            mode: form.type,                // Remote / Onsite / Hybrid
            durationInMonths: Number(form.duration),
            paid: form.stipend ? true : false
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post internship");
      }

      alert("✅ Internship posted successfully");
      navigate(user.role === "ADMIN" ? "/admin" : "/alumni");

    } catch (error) {
      console.error(error);
      alert("❌ Error posting internship");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow p-8">

        <h2 className="text-2xl font-bold text-indigo-700 mb-2">
          💼 Post Internship
        </h2>

        <p className="text-gray-500 mb-6">
          Share internship opportunities with students
        </p>

        {/* FORM */}
        <div className="grid md:grid-cols-2 gap-4">

          <Input
            label="Internship Title"
            value={form.title}
            onChange={v => setForm({ ...form, title: v })}
            error={errors.title}
          />

          <Input
            label="Company Name"
            value={form.company}
            onChange={v => setForm({ ...form, company: v })}
            error={errors.company}
          />

          <Select
            label="Internship Type"
            value={form.type}
            onChange={v => setForm({ ...form, type: v })}
            options={["Remote", "Onsite", "Hybrid"]}
            error={errors.type}
          />

          <Input
            label="Duration (Months)"
            value={form.duration}
            onChange={v => setForm({ ...form, duration: v })}
            error={errors.duration}
            placeholder="3"
          />

          <Input
            label="Location (Optional)"
            value={form.location}
            onChange={v => setForm({ ...form, location: v })}
          />

          <Input
            label="Stipend / Salary (Optional)"
            value={form.stipend}
            onChange={v => setForm({ ...form, stipend: v })}
          />

        </div>

        <Input
          label="Required Skills"
          value={form.skills}
          onChange={v => setForm({ ...form, skills: v })}
          error={errors.skills}
          placeholder="React, Java, SQL"
        />

        <Textarea
          label="Internship Description"
          value={form.description}
          onChange={v => setForm({ ...form, description: v })}
          error={errors.description}
        />

        <Input
          label="Apply Link / Email (Optional)"
          value={form.applyLink}
          onChange={v => setForm({ ...form, applyLink: v })}
        />

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
          >
            Post Internship
          </button>

        </div>

      </div>
    </div>
  );
}

/* ---------------- REUSABLE INPUTS ---------------- */

function Input({ label, value, onChange, error, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg border
          ${error ? "border-red-500" : "border-gray-300"}
          focus:ring-2 focus:ring-indigo-500`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

function Select({ label, value, onChange, options, error }) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full px-4 py-2 rounded-lg border
          ${error ? "border-red-500" : "border-gray-300"}
          focus:ring-2 focus:ring-indigo-500`}
      >
        <option value="">Select</option>
        {options.map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

function Textarea({ label, value, onChange, error }) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <textarea
        rows="4"
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full px-4 py-2 rounded-lg border
          ${error ? "border-red-500" : "border-gray-300"}
          focus:ring-2 focus:ring-indigo-500`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default PostInternship;
