import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

// Import Components
import AlumniIncomingSidebar from '../components/Mentorship/AlumniIncomingSidebar';
import RequestDetailCard from '../components/Mentorship/RequestDetailCard';
import PeerSearchWidget from '../components/Mentorship/PeerSearchWidget';

const AlumniMentorshipPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  
  // State
  const [requests, setRequests] = useState([]);
  const [selectedReq, setSelectedReq] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Requests
  const fetchRequests = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/mentorship/alumni/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
        // Auto-select first request if none selected
        if (!selectedReq && data.length > 0) {
            setSelectedReq(data[0]); 
        }
      }
    } catch (error) {
      console.error("Fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchRequests();
  }, [user?.id]);

  // 2. Handle Action (Accept/Reject)
  const handleAction = async (requestId, status) => {
    try {
      // 1. Optimistic Update (Show changes immediately)
      const updatedRequests = requests.map(r => 
         r.id === requestId ? { ...r, status: status } : r
      );
      setRequests(updatedRequests);
      
      if(selectedReq && selectedReq.id === requestId) {
          setSelectedReq({ ...selectedReq, status: status });
      }

      // 2. API Call with Error Checking
      const res = await fetch(`http://localhost:8080/api/mentorship/update-status/${requestId}?status=${status}`, {
        method: 'PUT'
      });

      // 🚨 NEW: Check if backend actually succeeded
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to update status");
      }
      
    } catch (error) {
      console.error("Update failed:", error);
      alert("❌ Error: " + error.message); // Show the REAL error from backend
      fetchRequests(); // Revert changes on error
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      
      {/* --- Top Header (Back Button) --- */}
      <div className="h-16 border-b border-gray-200 flex items-center px-6 bg-white shrink-0 z-10">
         <button 
           onClick={() => navigate('/alumni')}
           className="flex items-center text-gray-500 hover:text-indigo-600 transition font-medium"
         >
            <ChevronLeft size={20} className="mr-1" /> Back to Dashboard
         </button>
         <h1 className="ml-6 text-xl font-bold text-gray-800">Mentorship Management</h1>
      </div>

      {/* --- 3 Column Layout --- */}
      <div className="flex flex-1 overflow-hidden">
         
         {/* 1. Left Sidebar (Incoming Requests) */}
         <AlumniIncomingSidebar 
            requests={requests} 
            selectedId={selectedReq?.id} 
            onSelect={setSelectedReq} 
            loading={loading}
         />

         {/* 2. Middle (Detail View) */}
         <div className="flex-1 overflow-hidden bg-white relative">
            <RequestDetailCard 
                request={selectedReq} 
                onAction={handleAction} 
            />
         </div>

         {/* 3. Right Sidebar (Peer Search - Hidden on small screens, visible on large) */}
         <div className="hidden lg:block h-full border-l border-gray-200">
             <PeerSearchWidget currentUser={user} />
         </div>

      </div>
    </div>
  );
};

export default AlumniMentorshipPage;