import { useEffect, useState } from "react";

function StudentProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/student/profile/${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setDepartment(data.department || "");
          setYear(data.year || "");
          setSkills(data.skills || "");
        }
      });
  }, []);

  const saveProfile = async () => {
    await fetch(`http://localhost:8080/api/student/profile/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ department, year, skills })
    });

    alert("Profile saved");
  };

  return (
    <div>
      <h3>Student Profile</h3>

      <input placeholder="Department"
        value={department}
        onChange={e => setDepartment(e.target.value)} /><br/>

      <input placeholder="Year"
        value={year}
        onChange={e => setYear(e.target.value)} /><br/>

      <input placeholder="Skills"
        value={skills}
        onChange={e => setSkills(e.target.value)} /><br/><br/>

      <button onClick={saveProfile}>Save</button>
    </div>
  );
}

export default StudentProfile;
