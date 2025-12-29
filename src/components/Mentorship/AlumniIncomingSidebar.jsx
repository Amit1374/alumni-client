import React from 'react';
import { ChevronDown, Clock, User, Circle } from 'lucide-react';

const AlumniIncomingSidebar = ({ requests, selectedId, onSelect, loading }) => {

  if (loading) {
    return <div className="p-4 text-gray-400 text-sm text-center">Loading...</div>;
  }

  if (requests.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-gray-50 h-full border-r">
        <p>No new requests.</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col w-full md:w-80 lg:w-96 shrink-0">
      <div className="p-5 border-b border-gray-100 bg-gray-50/30">
        <h2 className="font-bold text-gray-800">Incoming Requests</h2>
        <p className="text-xs text-gray-500">{requests.filter(r => r.status === 'PENDING').length} Pending</p>
      </div>

      <div className="overflow-y-auto custom-scrollbar flex-1">
        {requests.map((req) => (
          <div 
            key={req.id}
            onClick={() => onSelect(req)}
            className={`group p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-indigo-50/50 relative
              ${selectedId === req.id ? 'bg-indigo-50 border-indigo-200' : 'bg-white'}
            `}
          >
            {/* Active Indicator Line */}
            {selectedId === req.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r"></div>
            )}

            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm
                  ${selectedId === req.id ? 'bg-indigo-200 text-indigo-700' : 'bg-gray-100 text-gray-500'}
                `}>
                  {req.student?.name?.charAt(0) || <User size={16}/>}
                </div>
                
                <div>
                  <h4 className={`text-sm font-bold ${selectedId === req.id ? 'text-indigo-900' : 'text-gray-700'}`}>
                    {req.student?.name}
                  </h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    {/* Status Badge */}
                    <span className={`w-2 h-2 rounded-full ${req.status === 'PENDING' ? 'bg-yellow-400' : req.status === 'ACCEPTED' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {req.status}
                  </p>
                </div>
              </div>
              
              {/* \/ Arrow Icon requested */}
              <ChevronDown 
                size={16} 
                className={`text-gray-400 transition-transform duration-300 ${selectedId === req.id ? '-rotate-90 text-indigo-500' : ''}`} 
              />
            </div>
            
            <div className="mt-2 pl-12">
               <p className="text-xs text-gray-400 truncate pr-4">"{req.message}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlumniIncomingSidebar;