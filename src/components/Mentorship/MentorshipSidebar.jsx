import React, { useState } from 'react';
import { ChevronDown, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const MentorshipSidebar = ({ requests, loading }) => {
  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin mb-2" />
        <p className="text-sm">Loading requests...</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Clock className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-gray-700 font-medium mb-1">No Requests Yet</h3>
        <p className="text-gray-500 text-sm">
          Start connecting with alumni! Your sent requests will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="px-4 pt-5 pb-3">
         <h2 className="font-bold text-gray-800 text-lg">My Requests</h2>
         <p className="text-gray-500 text-xs mt-1">Track status updates</p>
      </div>
      
      <div className="divider my-0"></div>

      <div className="flex flex-col">
        {requests.map((req) => (
          <SidebarRequestItem key={req.id} req={req} />
        ))}
      </div>
    </div>
  );
};

// --- Internal Component for a Single Expandable Row ---
const SidebarRequestItem = ({ req }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const getStatusConfig = (status) => {
      switch (status) {
        case 'ACCEPTED':
          return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', icon: <CheckCircle className="w-3 h-3" /> };
        case 'REJECTED':
          return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: <XCircle className="w-3 h-3" /> };
        default: // PENDING
          return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', icon: <Clock className="w-3 h-3" /> };
      }
    };
  
    const config = getStatusConfig(req.status);
    const alumniName = req.alumni ? req.alumni.name : `Alumni #${req.alumniId}`;
    const alumniInitials = alumniName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

  
    return (
      <div className="border-b border-gray-100 transition-colors hover:bg-gray-50">
        {/* The Clickable Header Row */}
        <div 
            className="flex items-center justify-between p-3 cursor-pointer select-none" 
            onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
             {/* Small Avatar Initials */}
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">
              {alumniInitials}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-medium text-gray-800 text-sm truncate">{alumniName}</h4>
              {req.alumni && req.alumni.company && (
                 <p className="text-xs text-gray-500 truncate">{req.alumni.company}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            {/* Compact Status Badge */}
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full border ${config.bg} ${config.border} ${config.text} text-xs font-medium capitalize`}>
                {config.icon}
                <span>{req.status.toLowerCase()}</span>
            </div>
            {/* Arrow Icon */}
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
  
        {/* Expanded Details Section */}
        {isExpanded && (
          <div className="px-3 pb-3 pl-[3.25rem] text-xs text-gray-500 animate-in slide-in-from-top-2 duration-200">
            <div className="flex justify-between py-1">
                <span>Sent:</span>
                <span className="font-medium">{new Date(req.createdAt).toLocaleDateString()}</span>
            </div>
            {/* You can add more details here later, like message preview */}
          </div>
        )}
      </div>
    );
  };

export default MentorshipSidebar;