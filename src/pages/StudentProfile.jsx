import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, BookOpen, Layers, Award, Sparkles, Save, Edit2, X } from "lucide-react";

function StudentProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // State Variables
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");

  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(!user.profileCompleted);
  const [loading, setLoading] = useState(true);

  // Fetch Profile Data
  useEffect(() => {
    // GET request matches the controller structure
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
  }, [user.id]);

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!department) newErrors.department = "Department is required";
    if (!year) newErrors.year = "Year is required";
    if (!semester) newErrors.semester = "Semester is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save Profile (Updated Integration)
  const saveProfile = async () => {
    if (!validate()) return;

    // ✅ FIXED: userId is now in the URL, not body
    const payload = { 
        department, 
        year: parseInt(year), 
        semester: parseInt(semester), 
        skills, 
        interests 
    };

    try {
      // ✅ FIXED: URL matches @PostMapping("/{userId}")
      const res = await fetch(`http://localhost:8080/api/student/profile/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Update local user object to reflect profile completion
        const updatedUser = { ...user, profileCompleted: true };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        setIsEditMode(false);
        alert("Profile Updated Successfully! 🎉");
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
        
        {/* --- Header Banner --- */}
        <div className="h-48 bg-gradient-to-r from-indigo-600 to-violet-600 relative">
             <button
                onClick={() => navigate("/student")}
                className="absolute top-6 left-6 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/30 transition text-sm font-medium"
             >
                ← Dashboard
             </button>
        </div>

        {/* --- Profile Info Section --- */}
        <div className="px-8 pb-8 relative">
             
             {/* Avatar & Main Info */}
             <div className="flex flex-col md:flex-row justify-between items-end -mt-16 mb-8">
                 <div className="flex items-end gap-6">
                     <div className="w-32 h-32 rounded-2xl bg-white p-1 shadow-lg">
                        <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-4xl font-bold text-indigo-600 border border-slate-200">
                            {user.name.charAt(0)}
                        </div>
                     </div>
                     <div className="mb-2">
                         <h1 className="text-3xl font-bold text-slate-800">{user.name}</h1>
                         <p className="text-slate-500 font-medium">Student • {department || "N/A"}</p>
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

             {/* --- Form / Details Grid --- */}
             <div className="grid md:grid-cols-2 gap-8">
                
                {/* Academic Details */}
                <Section title="Academic Information" icon={<BookOpen size={20} />}>
                    <SelectField 
                        label="Department" 
                        value={department} 
                        onChange={setDepartment} 
                        options={["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil"]}
                        editable={isEditMode}
                        error={errors.department}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <SelectField 
                            label="Year" 
                            value={year} 
                            onChange={setYear} 
                            options={["1", "2", "3", "4"]}
                            editable={isEditMode}
                            error={errors.year}
                        />
                        <SelectField 
                            label="Semester" 
                            value={semester} 
                            onChange={setSemester} 
                            options={["1", "2", "3", "4", "5", "6", "7", "8"]}
                            editable={isEditMode}
                            error={errors.semester}
                        />
                    </div>
                </Section>

                {/* Skills & Interests */}
                <Section title="Skills & Interests" icon={<Sparkles size={20} />}>
                    <TextAreaField 
                        label="Skills" 
                        value={skills} 
                        onChange={setSkills} 
                        editable={isEditMode}
                        placeholder="e.g. Java, React, Python..."
                    />
                    <TextAreaField 
                        label="Interests" 
                        value={interests} 
                        onChange={setInterests} 
                        editable={isEditMode}
                        placeholder="e.g. Web Dev, AI, Sports..."
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
                <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">{icon}</span>
                {title}
            </h3>
            <div className="space-y-5">{children}</div>
        </div>
    );
}

function SelectField({ label, value, onChange, options, editable, error }) {
    return (
        <div>
            <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">{label}</label>
            {editable ? (
                <>
                    <div className="relative">
                        <select
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className={`w-full appearance-none bg-slate-50 border ${error ? 'border-red-400' : 'border-slate-200'} text-slate-700 text-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 font-medium`}
                        >
                            <option value="">Select {label}</option>
                            {options.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                            <Layers size={14} />
                        </div>
                    </div>
                    {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
                </>
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
                    className="block p-3 w-full text-sm text-slate-700 bg-slate-50 rounded-xl border border-slate-200 focus:ring-indigo-500 focus:border-indigo-500 font-medium resize-none"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                ></textarea>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {value ? value.split(',').map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-lg border border-indigo-100">
                            {tag.trim()}
                        </span>
                    )) : <span className="text-slate-400 italic">No {label.toLowerCase()} added</span>}
                </div>
            )}
        </div>
    );
}

export default StudentProfile;