import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft, Loader2, User } from "lucide-react";

// ✅ Import your updated modular components
import MentorshipSidebar from "../components/Mentorship/MentorshipSidebar";
import AlumniGrid from "../components/Mentorship/AlumniGrid";
import RequestModal from "../components/Mentorship/RequestModal";

function FindMentor() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // --- States ---
  const [allAlumni, setAllAlumni] = useState([]); // Stores raw data from DB
  const [myRequests, setMyRequests] = useState([]);
  
  // UI States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  
  // Loading States
  const [loadingAlumni, setLoadingAlumni] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  const domains = [
    "Software Development", "Data Science", "Product Management",
    "Finance", "Marketing", "Consulting", "Research", "Design"
  ];

  // --- Initial Load ---
  useEffect(() => {
    fetchAllAlumni();
    if (user?.role === "STUDENT") {
      fetchMyRequests();
    }
  }, []);

  // --- API Actions (Using fetch directly) ---

  const fetchAllAlumni = async () => {
    try {
      setLoadingAlumni(true);
      // Fetch all profiles initially for smooth client-side filtering
      const res = await fetch("http://localhost:8080/api/alumni/profile/search");
      if (res.ok) {
        const data = await res.json();
        // Filter out yourself if you happen to be in the list
        setAllAlumni(Array.isArray(data) ? data.filter(a => a.user.id !== user.id) : []);
      }
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoadingAlumni(false);
    }
  };

  const fetchMyRequests = async () => {
    try {
      setLoadingRequests(true);
      const res = await fetch(`http://localhost:8080/api/mentorship/student/${user.id}`);
      if (res.ok) {
        setMyRequests(await res.json());
      }
    } catch (err) {
      console.error("History fetch failed", err);
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleSendRequest = async (message) => {
    if (!selectedAlumni) return;

    try {
      const res = await fetch("http://localhost:8080/api/mentorship/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: user.id,
          alumniId: selectedAlumni.user.id,
          message: message,
        }),
      });

      if (res.ok) {
        alert("Request Sent Successfully! 🎉");
        setIsModalOpen(false); // Close modal
        fetchMyRequests(); // Refresh sidebar & grid status
      } else {
        const errorText = await res.text();
        alert("Failed: " + errorText);
      }
    } catch (err) {
      console.error("Error sending request:", err);
      alert("Error sending request");
    }
  };

  // --- Handlers ---
  const handleConnectClick = (alumni) => {
    setSelectedAlumni(alumni);
    setIsModalOpen(true);
  };

  // --- Client-Side Filtering ---
  // This makes the UI feel faster than calling the API on every keystroke
  const filteredAlumni = allAlumni.filter((alumni) => {
    const name = alumni.user?.name || "";
    const company = alumni.companyName || "";
    const role = alumni.designation || "";
    const expertise = alumni.expertise || "";

    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain = selectedDomain
      ? role.includes(selectedDomain) || expertise.includes(selectedDomain)
      : true;

    return matchesSearch && matchesDomain;
  });

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* 1. Left Sidebar (Pass loading state for better UX) */}
      <div className="w-80 bg-white border-r border-gray-200 h-full shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] z-20">
        <MentorshipSidebar requests={myRequests} loading={loadingRequests} />
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative">
        
        {/* --- HEADER SECTION --- */}
        <div className="bg-white px-8 py-5 z-10">
            
            {/* Top Row: Back Button & Filters */}
            <div className="flex justify-between items-start mb-4">
                <button
                    onClick={() => navigate("/student")}
                    className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Dashboard
                </button>

                {/* Domain Filter Dropdown */}
                <select
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 hover:bg-white transition-colors cursor-pointer text-gray-700"
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                >
                    <option value="">All Domains</option>
                    {domains.map((d) => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>
            </div>

            {/* Title & Search Bar */}
            <div className="mb-2">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Find a Mentor</h1>
                
                <div className="relative max-w-2xl">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name, company, or role..."
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm text-gray-700 placeholder:text-gray-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
        </div>

        {/* --- SCROLLABLE GRID AREA --- */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
            {loadingAlumni ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <Loader2 className="w-8 h-8 animate-spin mb-2" />
                    <p>Finding experts...</p>
                </div>
            ) : (
                /* ✅ Grid Component 
                   - Passes 'filteredAlumni' for display
                   - Passes 'myRequests' so the grid can disable buttons for pending requests
                   - Passes 'handleConnectClick' to open modal
                */
                <AlumniGrid 
                    alumniList={filteredAlumni} 
                    myRequests={myRequests}
                    onConnect={handleConnectClick} 
                />
            )}
        </div>
      </div>

      {/* 3. Modal (Controlled by 'isModalOpen') */}
      <RequestModal 
        isOpen={isModalOpen} 
        alumni={selectedAlumni} 
        onClose={() => setIsModalOpen(false)} 
        onSend={handleSendRequest}
      />

    </div>
  );
}

export default FindMentor;