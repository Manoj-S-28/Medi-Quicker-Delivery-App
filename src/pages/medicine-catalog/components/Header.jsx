import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import NotificationCenter from "../../user-dashboard/components/NotificationCenter";

const Header = ({ toggleSidebar, toggleDarkMode, isDarkMode, cartItemsCount }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="flex items-center justify-between">
        {/* Left side - Mobile menu button and logo */}
        <div className="flex items-center">
          <button 
            className="lg:hidden mr-4 text-neutral-600 hover:text-neutral-800"
            onClick={toggleSidebar}
            aria-label="Open menu"
          >
            <Icon name="Menu" size={24} />
          </button>
          
          <Link to="/user-dashboard" className="flex items-center">
            <div className="bg-primary-600 text-white p-2 rounded-lg mr-2">
              <Icon name="Stethoscope" size={24} />
            </div>
            <span className="font-display font-bold text-xl text-neutral-800 hidden md:block">MediQuick</span>
          </Link>
        </div>
        
        {/* Right side - Notifications, theme toggle, profile */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <Link to="/cart-checkout" className="relative p-2 text-neutral-600 hover:text-primary-600 transition duration-300">
            <Icon name="ShoppingCart" size={24} />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
          
          {/* Notifications */}
          <NotificationCenter />
          
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
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="User profile" className="w-full h-full object-cover"
                />
              </div>
              <span className="hidden md:block ml-2 font-medium text-neutral-700">John Doe</span>
              <Icon name="ChevronDown" size={16} className="hidden md:block ml-1 text-neutral-400" />
            </button>
            
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 py-1">
                <Link 
                  to="/user-profile" className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100"
                >
                  Your Profile
                </Link>
                <Link 
                  to="/user-profile?tab=settings" className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100"
                >
                  Settings
                </Link>
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
    </header>
  );
};

export default Header;