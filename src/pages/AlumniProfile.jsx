import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Building, GraduationCap, Clock, Save, Edit2, X } from "lucide-react";

function AlumniProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // State Variables
  const [passOutYear, setPassOutYear] = useState("");
  const [experienceInYear, setExperienceInYear] = useState("");
  const [expertise, setExpertise] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [industry, setIndustry] = useState("");

  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fetch Profile
  useEffect(() => {
    fetch(`http://localhost:8080/api/alumni/profile/${user.id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const text = await res.text();
        if (!text) {
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
        
        setIsEditMode(false);
        setLoading(false);
      })
      .catch(() => {
        setIsEditMode(true);
        setLoading(false);
      });
  }, [user.id]);

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!companyName) newErrors.companyName = "Company name is required";
    if (!designation) newErrors.designation = "Designation is required";
    if (!passOutYear) newErrors.passOutYear = "Pass-out year is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save Profile (Updated Integration)
  const saveProfile = async () => {
    if (!validate()) return;

    // ✅ FIXED: userId is now in the URL path, not body
    const payload = {
      passOutYear: parseInt(passOutYear),
      experienceInYear: parseFloat(experienceInYear),
      expertise,
      companyName,
      designation,
      industry
    };

    try {
      // ✅ FIXED: URL matches @PostMapping("/{userId}")
      const res = await fetch(`http://localhost:8080/api/alumni/profile/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsEditMode(false);
        alert("Profile Updated Successfully!");
      } else {
        const errorMsg = await res.text();
        alert("Failed to save profile: " + errorMsg);
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server.");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-indigo-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header Banner */}
        <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
             <button
                onClick={() => navigate("/alumni")}
                className="absolute top-6 left-6 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/30 transition text-sm font-medium"
             >
                ← Dashboard
             </button>
        </div>

        {/* Profile Info Section */}
        <div className="px-8 pb-8 relative">
             
             {/* Avatar & Main Info */}
             <div className="flex flex-col md:flex-row justify-between items-end -mt-16 mb-8">
                 <div className="flex items-end gap-6">
                     <div className="w-32 h-32 rounded-2xl bg-white p-1 shadow-lg">
                        <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-4xl font-bold text-blue-600 border border-slate-200">
                            {user.name.charAt(0)}
                        </div>
                     </div>
                     <div className="mb-2">
                         <h1 className="text-3xl font-bold text-slate-800">{user.name}</h1>
                         <p className="text-slate-500 font-medium">{designation || "Alumni"} • {companyName || "N/A"}</p>
                     </div>
                 </div>

                 {/* Action Buttons */}
                 <div className="mt-4 md:mt-0 flex gap-3">
                    {!isEditMode ? (
                        <button 
                            onClick={() => setIsEditMode(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl font-bold transition-all border border-indigo-200"
                        >
                            <Edit2 size={16} /> Edit Profile
                        </button>
                    ) : (
                        <>
                            <button 
                                onClick={() => setIsEditMode(false)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-600 hover:bg-slate-50 rounded-xl font-bold transition-all border border-slate-200"
                            >
                                <X size={16} /> Cancel
                            </button>
                            <button 
                                onClick={saveProfile}
                                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200"
                            >
                                <Save size={16} /> Save Changes
                            </button>
                        </>
                    )}
                 </div>
             </div>

             {/* Form Grid */}
             <div className="grid md:grid-cols-2 gap-8">
                
                {/* Professional Info */}
                <Section title="Professional Details" icon={<Briefcase size={20} />}>
                    <InputField 
                        label="Company Name" 
                        value={companyName} 
                        onChange={setCompanyName} 
                        editable={isEditMode}
                        error={errors.companyName}
                        icon={<Building size={16} />}
                        placeholder="Where do you work?"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <InputField 
                            label="Designation" 
                            value={designation} 
                            onChange={setDesignation} 
                            editable={isEditMode}
                            error={errors.designation}
                            placeholder="Your Job Title"
                        />
                         <InputField 
                            label="Industry" 
                            value={industry} 
                            onChange={setIndustry} 
                            editable={isEditMode}
                            placeholder="e.g. Fintech"
                        />
                    </div>
                </Section>

                {/* Experience & Education */}
                <Section title="Background & Skills" icon={<GraduationCap size={20} />}>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField 
                            label="Batch / Passout Year" 
                            value={passOutYear} 
                            onChange={setPassOutYear} 
                            editable={isEditMode}
                            error={errors.passOutYear}
                            type="number"
                        />
                        <InputField 
                            label="Experience (Years)" 
                            value={experienceInYear} 
                            onChange={setExperienceInYear} 
                            editable={isEditMode}
                            type="number"
                            icon={<Clock size={16} />}
                        />
                    </div>
                    <TextAreaField 
                        label="Expertise / Skills" 
                        value={expertise} 
                        onChange={setExpertise} 
                        editable={isEditMode}
                        placeholder="List your core skills separated by commas..."
                    />
                </Section>

             </div>

        </div>
      </div>
    </div>
  );
}

/* --- Reusable Components --- */

function Section({ title, icon, children }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
                <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">{icon}</span>
                {title}
            </h3>
            <div className="space-y-5">{children}</div>
        </div>
    );
}

function InputField({ label, value, onChange, editable, error, type = "text", placeholder, icon }) {
    return (
        <div>
            <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">{label}</label>
            {editable ? (
                <div>
                    <div className="relative">
                        <input
                            type={type}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={placeholder}
                            className={`w-full px-4 py-3 rounded-xl border bg-slate-50 font-medium text-slate-700
                              ${error ? "border-red-400 focus:ring-red-200" : "border-slate-200 focus:ring-indigo-200"}
                              focus:ring-4 focus:border-indigo-500 outline-none transition-all pl-4`}
                        />
                        {icon && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                {icon}
                            </div>
                        )}
                    </div>
                    {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
                </div>
            ) : (
                <p className="text-slate-800 font-bold text-lg">{value || "—"}</p>
            )}
        </div>
    );
}

function TextAreaField({ label, value, onChange, editable, placeholder }) {
    return (
        <div>
            <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">{label}</label>
            {editable ? (
                <textarea
                    rows="3"
                    className="block p-3 w-full text-sm text-slate-700 bg-slate-50 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 font-medium resize-none outline-none transition-all"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                ></textarea>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {value ? value.split(',').map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-bold rounded-lg border border-blue-100">
                            {tag.trim()}
                        </span>
                    )) : <span className="text-slate-400 italic">No skills listed</span>}
                </div>
            )}
        </div>
    );
}

export default AlumniProfile;