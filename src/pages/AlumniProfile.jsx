import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AlumniProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [passOutYear, setPassOutYear] = useState("");
  const [experienceInYear, setExperienceInYear] = useState("");
  const [expertise, setExpertise] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [industry, setIndustry] = useState("");

  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(true);
  const [loading, setLoading] = useState(true);

  /* ✅ SAME LOGIC AS STUDENT PROFILE */
  useEffect(() => {
    fetch(`http://localhost:8080/api/alumni/profile/${user.id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error();

        const text = await res.text();
        if (!text) {
          // No profile yet → edit mode
          setIsEditMode(true);
          setLoading(false);
          return;
        }

        const data = JSON.parse(text);

        setPassOutYear(data.passOutYear || "");
        setExperienceInYear(data.experienceInYear || "");
        setExpertise(data.expertise || "");
        setCompanyName(data.companyName || "");
        setDesignation(data.designation || "");
        setIndustry(data.industry || "");

        setIsEditMode(false); // view mode
        setLoading(false);
      })
      .catch(() => {
        setIsEditMode(true);
        setLoading(false);
      });
  }, [user.id]);

  /* ✅ VALIDATION */
  const validateForm = () => {
    const newErrors = {};
    if (!passOutYear) newErrors.passOutYear = "Required";
    if (!experienceInYear) newErrors.experienceInYear = "Required";
    if (!expertise.trim()) newErrors.expertise = "Required";
    if (!companyName.trim()) newErrors.companyName = "Required";
    if (!designation.trim()) newErrors.designation = "Required";
    if (!industry.trim()) newErrors.industry = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveProfile = async () => {
    if (!validateForm()) return;

    await fetch(`http://localhost:8080/api/alumni/profile/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        passOutYear,
        experienceInYear,
        expertise,
        companyName,
        designation,
        industry
      })
    });

    alert("Profile saved successfully");
    setIsEditMode(false);
    navigate("/alumni");
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
          🎓 Alumni Profile
        </h3>

        <p className="text-gray-500 mb-6">
          {isEditMode
            ? "Fill or update your professional profile"
            : "Your profile details"}
        </p>

        {/* Basic Info */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6 text-gray-700">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        {/* Profile Fields */}
        <div className="space-y-4">
          <Field label="Pass Out Year" value={passOutYear}
            onChange={setPassOutYear} editable={isEditMode} error={errors.passOutYear} type="number" />

          <Field label="Experience (Years)" value={experienceInYear}
            onChange={setExperienceInYear} editable={isEditMode} error={errors.experienceInYear} type="number" />

          <Field label="Expertise" value={expertise}
            onChange={setExpertise} editable={isEditMode} error={errors.expertise} />

          <Field label="Company Name" value={companyName}
            onChange={setCompanyName} editable={isEditMode} error={errors.companyName} />

          <Field label="Designation" value={designation}
            onChange={setDesignation} editable={isEditMode} error={errors.designation} />

          <Field label="Industry" value={industry}
            onChange={setIndustry} editable={isEditMode} error={errors.industry} />
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
                onClick={() => navigate("/alumni")}
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

/* ---------- Reusable Field ---------- */
function Field({ label, value, onChange, editable, error, type = "text" }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      {editable ? (
        <>
          <input
            type={type}
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

export default AlumniProfile;
