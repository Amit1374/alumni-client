import React, { useState } from "react";

function AlumniSearchFilter({ onSearch }) {
  const [filters, setFilters] = useState({
    name: "",
    company: "",
    skill: ""
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="bg-white p-6 shadow-sm z-10 border-b">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Find a Mentor</h1>
      
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <input 
            name="name"
            placeholder="Search by Name..." 
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
            onChange={handleChange}
          />
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <input 
            name="company"
            placeholder="Company (e.g. Google)..." 
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
            onChange={handleChange}
          />
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <input 
            name="skill"
            placeholder="Skill (e.g. Java)..." 
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
            onChange={handleChange}
          />
        </div>

        <button 
          onClick={handleSearch}
          className="px-8 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow-md transition transform active:scale-95"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default AlumniSearchFilter;