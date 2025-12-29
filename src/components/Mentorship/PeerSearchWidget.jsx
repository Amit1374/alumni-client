import React, { useState, useEffect } from 'react';
import { Search, Briefcase } from 'lucide-react';

const PeerSearchWidget = ({ currentUser }) => {
  const [peers, setPeers] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch only once or on search
  useEffect(() => {
    // Reusing the existing public search endpoint
    fetch('http://localhost:8080/api/alumni/profile/search')
      .then(res => res.json())
      .then(data => {
        // Filter out self
        const others = Array.isArray(data) ? data.filter(p => p.user?.id !== currentUser?.id) : [];
        setPeers(others);
      })
      .catch(console.error);
  }, [currentUser?.id]);

  const filteredPeers = peers.filter(p => 
    p.user?.name?.toLowerCase().includes(search.toLowerCase()) || 
    p.companyName?.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 5); // Limit to top 5 for widget feel

  return (
    <div className="h-full bg-gray-50 p-6 border-l border-gray-200 flex flex-col w-full lg:w-80 shrink-0">
       <div className="mb-6">
          <h3 className="font-bold text-gray-800 text-lg mb-1">Find Peers</h3>
          <p className="text-xs text-gray-500">Collaborate with fellow alumni</p>
       </div>

       {/* Mini Search */}
       <div className="relative mb-6">
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
         <input 
            type="text" 
            placeholder="Search alumni..." 
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
         />
       </div>

       {/* List */}
       <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-1">
          {filteredPeers.map(peer => (
             <div key={peer.id} className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                      {peer.user?.name?.charAt(0)}
                   </div>
                   <div className="overflow-hidden">
                      <h4 className="text-sm font-bold text-gray-800 truncate">{peer.user?.name}</h4>
                      <p className="text-xs text-gray-500 truncate flex items-center">
                         <Briefcase size={10} className="mr-1"/> {peer.companyName || 'N/A'}
                      </p>
                   </div>
                </div>
                {/* Collaborate Action (Placeholder) */}
                <button 
                  onClick={() => alert(`Start collaboration with ${peer.user?.name}`)}
                  className="mt-3 w-full py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition"
                >
                    Connect
                </button>
             </div>
          ))}
          {filteredPeers.length === 0 && (
             <p className="text-center text-xs text-gray-400 mt-4">No peers found.</p>
          )}
       </div>
    </div>
  );
};

export default PeerSearchWidget;