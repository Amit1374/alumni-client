import { useEffect, useState } from "react";
import EventModal from "./EventModal"; // 👈 Import the new modal

function NotificationDropdown({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  
  // 🆕 State to control the Modal
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 1. Fetch Notifications
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/api/notifications/${userId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load");
          return res.json();
        })
        .then((data) => {
          setNotifications(Array.isArray(data) ? data : []);
        })
        .catch((err) => console.error(err));
    }
  }, [userId]);

  // 2. Mark Read Logic
  const handleMarkAllRead = async () => {
    const updatedList = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updatedList);
    try {
      await fetch(`http://localhost:8080/api/notifications/${userId}/read-all`, {
        method: "PUT",
      });
    } catch (error) {
      console.error("Failed to mark read:", error);
    }
  };

  // 3. 🆕 Handle View Details (Opens Modal)
  const handleViewDetails = (eventData) => {
    setIsOpen(false); // Close the dropdown
    setSelectedEvent(eventData); // Open the Modal
    handleMarkAllRead(); // Optional: Mark as read when viewing
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Helper date formatter
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <>
      <div className="relative">
        {/* 🔔 Bell Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 hover:bg-gray-100 rounded-full transition"
        >
          <span className="text-2xl">🔔</span>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* 🔽 Dropdown List */}
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden ring-1 ring-black/5">
              
              <div className="px-4 py-3 bg-gray-50/50 border-b flex justify-between items-center">
                <span className="font-semibold text-gray-700">Notifications</span>
                <span className="text-xs text-gray-500">{unreadCount} unread</span>
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 text-sm">No new notifications</div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.notificationId}
                      className={`px-4 py-4 border-b hover:bg-gray-50 transition flex flex-col gap-2 relative ${
                        !notif.read ? "bg-indigo-50/40" : "bg-white"
                      }`}
                    >
                      {!notif.read && (
                        <span className="absolute top-4 right-4 w-2 h-2 bg-indigo-500 rounded-full"></span>
                      )}

                      {notif.event ? (
                        <div>
                          <p className="text-sm font-semibold text-indigo-700 mb-1">
                            📅 {notif.message}
                          </p>
                          <div className="bg-white border rounded-lg p-3 shadow-sm">
                            <p className="text-gray-800 font-medium text-sm">
                              {notif.event.eventName}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              📍 {notif.event.eventLocation} • 🕒 {formatDate(notif.event.eventDateTime)}
                            </p>
                            
                            {/* 🆕 Button now passes the whole event object */}
                            <button
                              onClick={() => handleViewDetails(notif.event)} 
                              className="mt-3 w-full text-xs bg-indigo-50 text-indigo-700 font-medium py-1.5 rounded hover:bg-indigo-100 transition"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-800">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{formatDate(notif.createdAt)}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="p-2 bg-gray-50 border-t text-center">
                <button 
                  onClick={handleMarkAllRead}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium w-full py-1"
                >
                  Mark all as read
                </button>
              </div>

            </div>
          </>
        )}
      </div>

      {/* 🆕 RENDER MODAL OUTSIDE THE DROPDOWN */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </>
  );
}

export default NotificationDropdown;