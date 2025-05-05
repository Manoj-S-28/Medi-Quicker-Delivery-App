import React, { useState } from "react";


// Import components
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import MetricsCards from "./components/MetricsCards";
import OrdersPanel from "./components/OrdersPanel";
import DeliveryMap from "./components/DeliveryMap";
import PerformanceChart from "./components/PerformanceChart";
import RecentActivity from "./components/RecentActivity";

const AdminDashboard = () => {
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

  return (
    <div className={`flex h-screen bg-neutral-50 ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader 
          toggleSidebar={toggleSidebar} 
          toggleDarkMode={toggleDarkMode} 
          isDarkMode={darkMode} 
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-display font-bold text-neutral-800 mb-1">
              Admin Dashboard
            </h1>
            <p className="text-neutral-600">
              Overview of MediQuick operations and real-time metrics
            </p>
          </div>
          
          {/* Metrics Cards */}
          <MetricsCards />
          
          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Orders Panel - 1/3 width on large screens */}
            <div className="lg:col-span-1">
              <OrdersPanel />
            </div>
            
            {/* Delivery Map - 2/3 width on large screens */}
            <div className="lg:col-span-2">
              <DeliveryMap />
            </div>
          </div>
          
          {/* Bottom Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Chart - 2/3 width on large screens */}
            <div className="lg:col-span-2">
              <PerformanceChart />
            </div>
            
            {/* Recent Activity - 1/3 width on large screens */}
            <div className="lg:col-span-1">
              <RecentActivity />
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

export default AdminDashboard;