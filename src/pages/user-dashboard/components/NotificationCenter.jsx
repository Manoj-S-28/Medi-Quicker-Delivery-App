import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "Order Shipped",
      message: "Your order #ORD-7835 has been shipped and is on the way.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "promotion",
      title: "Weekend Sale",
      message: "Get 15% off on all health supplements this weekend.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "reminder",
      title: "Prescription Renewal",
      message: "Your prescription for Lisinopril will expire in 7 days.",
      time: "Yesterday",
      read: true,
    },
  ]);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const getIconForType = (type) => {
    switch (type) {
      case "order":
        return "Package";
      case "promotion":
        return "Tag";
      case "reminder":
        return "Bell";
      default:
        return "MessageCircle";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="relative p-2 text-neutral-600 hover:text-primary-600 transition duration-300" aria-label="Notifications"
      >
        <Icon name="Bell" size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-emergency-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
            <h3 className="font-display font-semibold text-neutral-800">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-primary-600 hover:text-primary-700"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-neutral-100 hover:bg-neutral-50 ${
                    !notification.read ? "bg-primary-50" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex">
                    <div className={`mr-3 mt-1 ${!notification.read ? "text-primary-600" : "text-neutral-400"}`}>
                      <Icon name={getIconForType(notification.type)} size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-800">{notification.title}</h4>
                      <p className="text-sm text-neutral-600 mb-1">{notification.message}</p>
                      <p className="text-xs text-neutral-500">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-neutral-500">No notifications</div>
            )}
          </div>

          <div className="p-3 border-t border-neutral-200 text-center">
            <button className="text-sm text-primary-600 hover:text-primary-700">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;