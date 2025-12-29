import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Megaphone, Calendar, MapPin, AlignLeft, ArrowLeft, Loader2, Type } from 'lucide-react';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    eventName: '',
    eventDescription: '',
    eventLocation: '',
    eventDateTime: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/events/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData) 
      });

      if (!response.ok) throw new Error('Failed to create announcement');

      alert('🎉 Announcement Posted Successfully!');
      navigate(-1); 
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-xl border border-indigo-100 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-10 translate-x-10 blur-2xl"></div>
            
            <button 
                onClick={() => navigate(-1)}
                className="absolute top-6 left-6 p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="mt-8 text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                    <Megaphone className="w-8 h-8 text-yellow-300" />
                </div>
                <h2 className="text-2xl font-bold">New Announcement</h2>
                <p className="text-indigo-200 mt-2 text-sm">Broadcast news or events to the community</p>
            </div>
        </div>

        {/* Form */}
        <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <Type className="w-4 h-4 text-indigo-500" /> Title
                    </label>
                    <input 
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Annual Alumni Meetup"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition font-medium text-gray-700 bg-gray-50/50 focus:bg-white"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-indigo-500" /> Date & Time
                        </label>
                        {/* ✅ FIX: Added max attribute to prevent 5-digit years */}
                        <input 
                            type="datetime-local"
                            name="eventDateTime"
                            value={formData.eventDateTime}
                            onChange={handleChange}
                            required
                            max="9999-12-31T23:59" 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition text-gray-600 bg-gray-50/50 focus:bg-white"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-indigo-500" /> Location / Link
                        </label>
                        <input 
                            name="eventLocation"
                            value={formData.eventLocation}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Main Hall or Zoom"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition font-medium text-gray-700 bg-gray-50/50 focus:bg-white"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <AlignLeft className="w-4 h-4 text-indigo-500" /> Details
                    </label>
                    <textarea 
                        name="eventDescription"
                        value={formData.eventDescription}
                        onChange={handleChange}
                        required
                        rows="4"
                        placeholder="Write your announcement details here..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition resize-none text-gray-700 bg-gray-50/50 focus:bg-white"
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition transform active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Post Announcement"}
                </button>

            </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;