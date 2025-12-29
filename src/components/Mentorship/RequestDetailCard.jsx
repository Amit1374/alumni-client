import React, { useState } from 'react';
import { Check, X, MessageSquare, Calendar, Mail, GraduationCap } from 'lucide-react';

const RequestDetailCard = ({ request, onAction }) => {
  if (!request) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 p-10">
        <MessageSquare size={48} className="mb-4 text-gray-300" />
        <p className="text-lg font-medium">Select a request to view details</p>
      </div>
    );
  }

  const isPending = request.status === 'PENDING';

  return (
    <div className="h-full p-8 overflow-y-auto bg-white">
      {/* Header Profile Section */}
      <div className="flex flex-col items-center text-center pb-8 border-b border-gray-100">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4">
          {request.student?.name?.charAt(0)}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{request.student?.name}</h2>
        <p className="text-indigo-600 font-medium">{request.student?.email}</p>
        
        {/* Student Stats (Mock data or real if available) */}
        <div className="flex gap-4 mt-4 text-sm text-gray-500">
           <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
             <GraduationCap size={14} /> Student
           </span>
           <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
             <Calendar size={14} /> Batch 2024
           </span>
        </div>
      </div>

      {/* Message Body */}
      <div className="py-8">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Mentorship Message</h3>
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-gray-700 leading-relaxed relative">
           {/* Decorative Quote */}
           <span className="absolute top-4 left-4 text-4xl text-indigo-200 font-serif opacity-50">“</span>
           <p className="relative z-10 px-4">{request.message}</p>
        </div>
      </div>

      {/* Action Buttons */}
      {isPending ? (
        <div className="flex gap-4 pt-4">
          <button 
            onClick={() => onAction(request.id, 'REJECTED')}
            className="flex-1 flex items-center justify-center px-6 py-4 rounded-xl border border-red-100 text-red-600 bg-red-50 font-bold hover:bg-red-100 transition transform hover:scale-[1.02]"
          >
            <X className="mr-2" /> Decline
          </button>
          
          <button 
            onClick={() => onAction(request.id, 'ACCEPTED')}
            className="flex-[2] flex items-center justify-center px-6 py-4 rounded-xl bg-indigo-600 text-white font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition transform hover:scale-[1.02]"
          >
            <Check className="mr-2" /> Accept Mentorship
          </button>
        </div>
      ) : (
        <div className={`p-4 rounded-xl text-center font-bold border ${
            request.status === 'ACCEPTED' 
            ? 'bg-green-50 text-green-700 border-green-200' 
            : 'bg-red-50 text-red-700 border-red-200'
        }`}>
            {request.status === 'ACCEPTED' ? '✅ You accepted this request' : '❌ Request declined'}
        </div>
      )}
    </div>
  );
};

export default RequestDetailCard;