import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";

// Import components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import EmergencyBanner from "./components/EmergencyBanner";
import RecentOrders from "./components/RecentOrders";
import TrackCurrentOrder from "./components/TrackCurrentOrder";
import QuickAccessTiles from "./components/QuickAccessTiles";

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real application, you would apply dark mode classes to the root element
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // User data
  const userData = {
    name: "John Doe",
    lastLogin: "May 16, 2023, 9:30 AM",
    prescriptions: 3,
    activeOrders: 1,
  };

  return (
    <div className={`flex h-screen bg-neutral-50 ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          toggleSidebar={toggleSidebar} 
          toggleDarkMode={toggleDarkMode} 
          isDarkMode={darkMode} 
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-display font-bold text-neutral-800 mb-1">
              Welcome back, {userData.name}
            </h1>
            <p className="text-neutral-600">
              Last login: {userData.lastLogin}
            </p>
          </div>
          
          {/* Emergency Banner */}
          <EmergencyBanner />
          
          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - 2/3 width on large screens */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Access Tiles */}
              <QuickAccessTiles />
              
              {/* Recent Orders */}
              <RecentOrders />
            </div>
            
            {/* Sidebar Content - 1/3 width on large screens */}
            <div className="space-y-6">
              {/* Track Current Order */}
              <TrackCurrentOrder />
              
              {/* User Stats */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-display font-semibold text-neutral-800 mb-4">Your Health Dashboard</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-primary-100 p-2 rounded-full mr-3">
                        <Icon name="FileText" size={20} color="var(--color-primary-600)" />
                      </div>
                      <span className="text-neutral-700">Saved Prescriptions</span>
                    </div>
                    <span className="font-semibold text-neutral-800">{userData.prescriptions}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-primary-100 p-2 rounded-full mr-3">
                        <Icon name="Package" size={20} color="var(--color-primary-600)" />
                      </div>
                      <span className="text-neutral-700">Active Orders</span>
                    </div>
                    <span className="font-semibold text-neutral-800">{userData.activeOrders}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-primary-100 p-2 rounded-full mr-3">
                        <Icon name="Calendar" size={20} color="var(--color-primary-600)" />
                      </div>
                      <span className="text-neutral-700">Medication Reminders</span>
                    </div>
                    <Link to="/user-profile?tab=reminders" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Set Up
                    </Link>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <Link 
                    to="/user-profile" className="w-full bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                  >
                    <Icon name="User" size={18} className="mr-2" />
                    Manage Your Profile
                  </Link>
                </div>
              </div>
              
              {/* Support Section */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-display font-semibold text-neutral-800 mb-4">Need Help?</h2>
                <p className="text-neutral-600 mb-4">Our support team is available 24/7 to assist you with any questions or concerns.</p>
                
                <div className="space-y-3">
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
                    <Icon name="MessageCircle" size={18} className="mr-2" />
                    Chat with Support
                  </button>
                  
                  <button className="w-full bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
                    <Icon name="Phone" size={18} className="mr-2" />
                    Call Helpline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-neutral-200 py-4 px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-2 md:mb-0 text-neutral-500 text-sm">
              &copy; {new Date().getFullYear()} MediQuick. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-500 hover:text-primary-600 text-sm">Privacy Policy</a>
              <a href="#" className="text-neutral-500 hover:text-primary-600 text-sm">Terms of Service</a>
              <a href="#" className="text-neutral-500 hover:text-primary-600 text-sm">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default UserDashboard;