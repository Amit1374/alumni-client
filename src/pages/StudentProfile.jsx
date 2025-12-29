import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");

  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(!user.profileCompleted);
  const [loading, setLoading] = useState(user.profileCompleted);

  // 🔹 Fetch profile if exists
  useEffect(() => {
    fetch(`http://localhost:8080/api/student/profile/${user.id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const text = await res.text();
        if (!text) {
          setIsEditMode(true);
          setLoading(false);
          return;
        }

        const data = JSON.parse(text);
        setDepartment(data.department || "");
        setYear(data.year || "");
        setSemester(data.semester || "");
        setSkills(data.skills || "");
        setInterests(data.interests || "");

        setIsEditMode(false);
        setLoading(false);
      })
      .catch(() => {
        setIsEditMode(true);
        setLoading(false);
      });
  }, [user?.id]);

  /* ✅ VALIDATION */
  const validateForm = () => {
    const newErrors = {};

    if (!department.trim()) newErrors.department = "Department is required";
    if (!year) newErrors.year = "Year is required";
    if (!semester) newErrors.semester = "Semester is required";
    if (!skills.trim()) newErrors.skills = "Skills are required";
    if (!interests.trim()) newErrors.interests = "Interests are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveProfile = async () => {
    if (!validateForm()) return;

    await fetch(`http://localhost:8080/api/student/profile/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        department,
        year,
        semester,
        skills,
        interests
      })
    });

    alert("Profile saved successfully");
    setIsEditMode(false);
    navigate("/student");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow w-full max-w-xl p-8">

        <h3 className="text-2xl font-bold text-indigo-700 mb-2">
          🎓 Student Profile
        </h3>

        <p className="text-gray-500 mb-6">
          {isEditMode ? "Fill or update your academic profile" : "Your profile details"}
        </p>

        {/* Basic Info */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6 text-gray-700">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        {/* Fields */}
        <div className="space-y-4">

          <InputField
            label="Department / Branch"
            value={department}
            onChange={setDepartment}
            error={errors.department}
            editable={isEditMode}
          />

          <SelectField
            label="Year"
            value={year}
            onChange={setYear}
            options={["1", "2", "3", "4"]}
            error={errors.year}
            editable={isEditMode}
          />

          <SelectField
            label="Semester"
            value={semester}
            onChange={setSemester}
            options={["1","2","3","4","5","6","7","8"]}
            error={errors.semester}
            editable={isEditMode}
          />

          <InputField
            label="Skills"
            value={skills}
            onChange={setSkills}
            error={errors.skills}
            editable={isEditMode}
          />

          <InputField
            label="Interests"
            value={interests}
            onChange={setInterests}
            error={errors.interests}
            editable={isEditMode}
          />

        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-8">

          {!isEditMode && (
            <button
              onClick={() => setIsEditMode(true)}
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
            >
              Update Profile
            </button>
          )}

          {isEditMode && (
            <>
              <button
                onClick={() => navigate("/student")}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={saveProfile}
                className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
              >
                Save Profile
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function InputField({ label, value, onChange, error, editable }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      {editable ? (
        <>
          <input
            value={value}
            onChange={e => onChange(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border
              ${error ? "border-red-500" : "border-gray-300"}
              focus:ring-2 focus:ring-indigo-500`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </>
      ) : (
        <p className="text-gray-800 bg-gray-100 px-4 py-2 rounded-lg">
          {value || "—"}
        </p>
      )}
    </div>
  );
}

function SelectField({ label, value, onChange, options, error, editable }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      {editable ? (
        <>
          <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border
              ${error ? "border-red-500" : "border-gray-300"}
              focus:ring-2 focus:ring-indigo-500`}
          >
            <option value="">Select {label}</option>
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </>
      ) : (
        <p className="text-gray-800 bg-gray-100 px-4 py-2 rounded-lg">
          {value || "—"}
        </p>
      )}
    </div>
  );
}

export default StudentProfile;
