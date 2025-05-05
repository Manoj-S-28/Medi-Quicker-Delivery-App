import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const OrderFilters = ({ onFilterChange }) => {
  const [dateRange, setDateRange] = useState("last30days");
  const [orderStatus, setOrderStatus] = useState("all");
  const [orderType, setOrderType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case "dateRange":
        setDateRange(value);
        break;
      case "orderStatus":
        setOrderStatus(value);
        break;
      case "orderType":
        setOrderType(value);
        break;
      case "searchQuery":
        setSearchQuery(value);
        break;
      default:
        break;
    }

    // Pass the updated filters to parent component
    onFilterChange({
      dateRange: filterType === "dateRange" ? value : dateRange,
      orderStatus: filterType === "orderStatus" ? value : orderStatus,
      orderType: filterType === "orderType" ? value : orderType,
      searchQuery: filterType === "searchQuery" ? value : searchQuery,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h2 className="text-lg font-display font-semibold text-neutral-800 mb-2 md:mb-0">
          Filter Orders
        </h2>
        
        <div className="relative">
          <input
            type="text" placeholder="Search by order ID or medicine..." className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full md:w-64"
            value={searchQuery}
            onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
            <Icon name="Search" size={18} />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Date Range
          </label>
          <select
            className="w-full border border-neutral-300 rounded-lg py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
            value={dateRange}
            onChange={(e) => handleFilterChange("dateRange", e.target.value)}
          >
            <option value="last30days">Last 30 Days</option>
            <option value="last3months">Last 3 Months</option>
            <option value="last6months">Last 6 Months</option>
            <option value="last1year">Last 1 Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        
        {/* Order Status Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Order Status
          </label>
          <select
            className="w-full border border-neutral-300 rounded-lg py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
            value={orderStatus}
            onChange={(e) => handleFilterChange("orderStatus", e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="delivered">Delivered</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        
        {/* Order Type Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Order Type
          </label>
          <select
            className="w-full border border-neutral-300 rounded-lg py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
            value={orderType}
            onChange={(e) => handleFilterChange("orderType", e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="regular">Regular</option>
            <option value="emergency">Emergency</option>
            <option value="prescription">Prescription</option>
          </select>
        </div>
      </div>
      
      {dateRange === "custom" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Start Date
            </label>
            <input
              type="date" className="w-full border border-neutral-300 rounded-lg py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              End Date
            </label>
            <input
              type="date" className="w-full border border-neutral-300 rounded-lg py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      )}
      
      <div className="flex justify-end mt-4">
        <button 
          className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium py-2 px-4 rounded-lg transition duration-300 mr-2"
          onClick={() => {
            setDateRange("last30days");
            setOrderStatus("all");
            setOrderType("all");
            setSearchQuery("");
            onFilterChange({
              dateRange: "last30days",
              orderStatus: "all",
              orderType: "all",
              searchQuery: "",
            });
          }}
        >
          Reset Filters
        </button>
        <button 
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center"
        >
          <Icon name="Filter" size={18} className="mr-2" />
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default OrderFilters;