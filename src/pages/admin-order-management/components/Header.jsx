import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const Header = ({ toggleSidebar, toggleDarkMode, isDarkMode }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };

  const notifications = [
    {
      id: 1,
      type: "emergency",
      message: "New emergency order #ORD-8721 requires immediate attention",
      time: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      type: "warning",
      message: "Order #ORD-8715 is approaching delivery deadline",
      time: "15 minutes ago",
      read: false
    },
    {
      id: 3,
      type: "info",
      message: "Delivery agent Marcus has completed 5 deliveries today",
      time: "1 hour ago",
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="flex items-center justify-between">
        {/* Left side - Mobile menu button and title */}
        <div className="flex items-center">
          <button 
            className="lg:hidden mr-4 text-neutral-600 hover:text-neutral-800"
            onClick={toggleSidebar}
            aria-label="Open menu"
          >
            <Icon name="Menu" size={24} />
          </button>
          
          <h1 className="text-xl font-display font-bold text-neutral-800">Order Management</h1>
        </div>
        
        {/* Right side - Search, notifications, theme toggle, profile */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <input
              type="text" placeholder="Search orders..." className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 w-64"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              <Icon name="Search" size={18} />
            </div>
          </div>
          
          {/* Notifications */}
          <div className="relative">
            <button 
              className="relative p-2 text-neutral-600 hover:text-primary-600 transition duration-300"
              onClick={toggleNotifications}
              aria-label="Notifications"
            >
              <Icon name="Bell" size={24} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-emergency-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
                  <h3 className="font-display font-semibold text-neutral-800">Notifications</h3>
                  {unreadCount > 0 && (
                    <button className="text-xs text-primary-600 hover:text-primary-700">
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-neutral-100 hover:bg-neutral-50 ${
                        !notification.read ? "bg-primary-50" : ""
                      }`}
                    >
                      <div className="flex">
                        <div className={`mr-3 mt-1 ${
                          notification.type === "emergency" ? "text-emergency-600" : 
                          notification.type === "warning"? "text-warning-500" : "text-primary-600"
                        }`}>
                          <Icon 
                            name={
                              notification.type === "emergency" ? "AlertTriangle" : 
                              notification.type === "warning"? "Clock" : "Info"
                            } 
                            size={20} 
                          />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-600 mb-1">{notification.message}</p>
                          <p className="text-xs text-neutral-500">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t border-neutral-200 text-center">
                  <button className="text-sm text-primary-600 hover:text-primary-700">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Theme toggle */}
          <button 
            onClick={toggleDarkMode}
            className="p-2 text-neutral-600 hover:text-primary-600 transition duration-300" aria-label={isDarkMode ?"Switch to light mode" : "Switch to dark mode"}
          >
            <Icon name={isDarkMode ? "Sun" : "Moon"} size={24} />
          </button>
          
          {/* Profile */}
          <div className="relative">
            <button 
              onClick={toggleProfileMenu}
              className="flex items-center focus:outline-none" aria-label="Open user menu"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-neutral-200">
                <Image 
                  src="https://randomuser.me/api/portraits/women/42.jpg" 
                  alt="Admin profile" className="w-full h-full object-cover"
                />
              </div>
              <span className="hidden md:block ml-2 font-medium text-neutral-700">Sarah Admin</span>
              <Icon name="ChevronDown" size={16} className="hidden md:block ml-1 text-neutral-400" />
            </button>
            
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 py-1">
                <button 
                  className="block w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100" onClick={() => console.log("Profile clicked")}
                >
                  Your Profile
                </button>
                <button 
                  className="block w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100" onClick={() => console.log("Settings clicked")}
                >
                  Settings
                </button>
                <div className="border-t border-neutral-200 my-1"></div>
                <button 
                  className="block w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100" onClick={() => console.log("Logout clicked")}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile search - only visible on small screens */}
      <div className="mt-4 relative lg:hidden">
        <input
          type="text" placeholder="Search orders..." className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
          <Icon name="Search" size={18} />
        </div>
      </div>
    </header>
  );
};

export default Header;