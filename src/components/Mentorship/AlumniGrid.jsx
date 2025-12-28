import React from 'react';
import { Briefcase, MapPin, GraduationCap, Send, Clock, User } from 'lucide-react';

const AlumniGrid = ({ alumniList, myRequests, onConnect }) => {
  
  // Helper to check status
  const getRequestStatus = (alumniUserId) => {
    const req = myRequests.find(r => r.alumni?.id === alumniUserId || r.alumniId === alumniUserId);
    return req ? req.status : null;
  };

  if (alumniList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-10">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <User className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="text-xl font-medium text-gray-700">No alumni found</h3>
        <p className="text-gray-500 mt-1">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {alumniList.map((alumni) => {
        const status = getRequestStatus(alumni.user.id);
        const isPending = status === 'PENDING';
        const isAccepted = status === 'ACCEPTED';

        return (
          <div 
            key={alumni.id} 
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
          >
            <div className="p-6 flex-1">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-sm shrink-0">
                  {alumni.user.name.charAt(0)}
                </div>
                
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                    {alumni.user.name}
                  </h3>
                  <p className="text-indigo-600 font-medium text-sm truncate flex items-center mt-0.5">
                    <Briefcase className="w-3.5 h-3.5 mr-1.5" />
                    {alumni.designation || 'Alumni'}
                  </p>
                </div>
              </div>

              {/* Info Tags */}
              <div className="mt-5 space-y-2.5 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2.5 text-gray-400" />
                  <span className="truncate">{alumni.companyName || 'Unknown Company'}</span>
                </div>
                <div className="flex items-center">
                   <GraduationCap className="w-4 h-4 mr-2.5 text-gray-400" />
                   <span>Class of {alumni.passOutYear}</span>
                </div>
              </div>
              
              {/* Expertise Pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                 {alumni.expertise && alumni.expertise.split(',').slice(0, 2).map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs rounded-md font-medium border border-gray-100">
                        {skill.trim()}
                    </span>
                 ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-4 bg-gray-50/50 border-t border-gray-100">
              <button 
                onClick={() => onConnect(alumni)}
                disabled={isPending || isAccepted}
                className={`w-full flex items-center justify-center px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    isPending 
                    ? 'bg-yellow-100 text-yellow-700 cursor-not-allowed border border-yellow-200'
                    : isAccepted
                    ? 'bg-green-100 text-green-700 cursor-not-allowed border border-green-200'
                    : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-600 hover:text-white hover:border-transparent hover:shadow-md'
                }`}
              >
                {isPending ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-pulse" /> Pending
                    </>
                ) : isAccepted ? (
                    <>Connected</>
                ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" /> Connect
                    </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlumniGrid;