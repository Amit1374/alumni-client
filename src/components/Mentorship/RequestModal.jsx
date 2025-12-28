import React, { useState } from 'react';
import { X, Send, User } from 'lucide-react';

const RequestModal = ({ isOpen, alumni, onClose, onSend }) => {
  const [message, setMessage] = useState('');

  if (!isOpen || !alumni) return null;

  const handleSubmit = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage(''); // Reset
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all scale-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center">
            <h3 className="text-white font-bold text-lg">Request Mentorship</h3>
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                <X className="w-6 h-6" />
            </button>
        </div>

        <div className="p-6">
            {/* Alumni Summary */}
            <div className="flex items-center gap-4 mb-6 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <div className="w-12 h-12 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-lg">
                    {alumni.user.name.charAt(0)}
                </div>
                <div>
                    <p className="text-sm text-indigo-800 font-medium">To:</p>
                    <h4 className="font-bold text-gray-800 text-lg leading-tight">{alumni.user.name}</h4>
                    <p className="text-xs text-gray-500">{alumni.designation}</p>
                </div>
            </div>

            {/* Text Area */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message
                </label>
                <textarea
                    rows="5"
                    className="w-full px-4 py-3 text-sm text-gray-700 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none bg-gray-50 focus:bg-white transition-colors"
                    placeholder="Briefly introduce yourself and explain why you'd like to connect..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
                <button 
                    onClick={onClose}
                    className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleSubmit}
                    disabled={!message.trim()}
                    className="flex items-center px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                    <Send className="w-4 h-4 mr-2" />
                    Send Request
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;