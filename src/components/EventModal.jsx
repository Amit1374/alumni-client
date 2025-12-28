import React from "react";

function EventModal({ event, onClose }) {
  if (!event) return null;

  // Formatter for Date and Time
  const dateObj = new Date(event.eventDateTime);
  const dateStr = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    // 1. Overlay
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      
      {/* 2. The Modal Box */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative transform transition-all scale-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header Section */}
        <div className="bg-indigo-600 h-32 flex flex-col justify-center px-8 relative overflow-hidden">
          {/* Decorative Circle in background */}
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          
          <h2 className="text-white text-2xl font-bold relative z-10 leading-tight">
            {event.eventName}
          </h2>
          <p className="text-indigo-100 text-sm mt-1 relative z-10">
            Event Details
          </p>
        </div>

        {/* Body Content */}
        <div className="p-8">
          
          {/* Metadata Column (Vertical Stack) */}
          <div className="space-y-5 mb-8">
            
            {/* Date Row */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                {/* Calendar Icon SVG */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Date</p>
                <p className="text-gray-800 font-medium">{dateStr}</p>
              </div>
            </div>

            {/* Time Row */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                {/* Clock Icon SVG */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Time</p>
                <p className="text-gray-800 font-medium">{timeStr}</p>
              </div>
            </div>

            {/* Location Row */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                {/* Map Pin Icon SVG */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Location</p>
                <p className="text-gray-800 font-medium">{event.eventLocation}</p>
              </div>
            </div>

          </div>

          <hr className="border-gray-100 my-6" />

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">
              About Event
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {event.eventDescription}
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-3 rounded-xl text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-700 transition"
            >
              Close
            </button>
            <button 
              className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform active:scale-95"
              onClick={() => alert("Registration Logic Coming Soon!")}
            >
              Register Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default EventModal;