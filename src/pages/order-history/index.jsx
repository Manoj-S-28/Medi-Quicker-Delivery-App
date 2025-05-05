import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";


// Import components
import Header from "../user-dashboard/components/Header";
import Sidebar from "../user-dashboard/components/Sidebar";
import OrderFilters from "./components/OrderFilters";
import OrderList from "./components/OrderList";
import TimePeriodSidebar from "./components/TimePeriodSidebar";

const OrderHistory = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: "last30days",
    orderStatus: "all",
    orderType: "all",
    searchQuery: "",
  });
  
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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleTimePeriodSelect = (period) => {
    setFilters({
      ...filters,
      dateRange: period,
    });
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
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold text-neutral-800 mb-1">
                Order History
              </h1>
              <p className="text-neutral-600">
                View and manage all your past orders
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Link 
                to="/cart-checkout" className="bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center"
              >
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                View Cart
              </Link>
              <Link 
                to="/user-dashboard" className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center"
              >
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                Back to Dashboard
              </Link>
            </div>
          </div>
          
          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Time Period Filters */}
            <div className="hidden lg:block">
              <TimePeriodSidebar 
                onPeriodSelect={handleTimePeriodSelect}
                selectedPeriod={filters.dateRange}
              />
            </div>
            
            {/* Main Content - Order List */}
            <div className="lg:col-span-3 space-y-6">
              {/* Order Filters */}
              <OrderFilters onFilterChange={handleFilterChange} />
              
              {/* Order List */}
              <OrderList filters={filters} />
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

export default OrderHistory;