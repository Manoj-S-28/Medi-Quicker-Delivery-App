import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const OrderList = ({ orders, selectedOrderId, onSelectOrder }) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("all");
  const [filterZone, setFilterZone] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-info-100 text-info-600";
      case "Processing":
        return "bg-warning-100 text-warning-500";
      case "Out for Delivery":
        return "bg-primary-100 text-primary-600";
      case "Delivered":
        return "bg-success-100 text-success-600";
      case "Cancelled":
        return "bg-error-100 text-error-600";
      default:
        return "bg-neutral-100 text-neutral-600";
    }
  };

  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const deadlineTime = new Date(deadline);
    const diff = deadlineTime - now;
    
    if (diff <= 0) return "Overdue";
    
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) {
      return `${minutes}m remaining`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m remaining`;
    }
  };

  const filteredOrders = orders.filter(order => {
    // Filter by status
    if (filterStatus !== "all" && order.status !== filterStatus) return false;
    
    // Filter by date
    if (filterDate !== "all") {
      const orderDate = new Date(order.orderDate);
      const today = new Date();
      
      if (filterDate === "today") {
        if (orderDate.toDateString() !== today.toDateString()) return false;
      } else if (filterDate === "yesterday") {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        if (orderDate.toDateString() !== yesterday.toDateString()) return false;
      } else if (filterDate === "thisWeek") {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        if (orderDate < weekStart) return false;
      }
    }
    
    // Filter by zone
    if (filterZone !== "all" && order.deliveryZone !== filterZone) return false;
    
    // Filter by type
    if (filterType !== "all" && order.isEmergency.toString() !== filterType) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.status.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow h-full flex flex-col">
      {/* Filter controls */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <input
              type="text" placeholder="Search by order ID or customer name" className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              <Icon name="Search" size={18} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {/* Status filter */}
            <select
              className="border border-neutral-300 rounded-lg py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="New">New</option>
              <option value="Processing">Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            
            {/* Date filter */}
            <select
              className="border border-neutral-300 rounded-lg py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="thisWeek">This Week</option>
            </select>
            
            {/* Zone filter */}
            <select
              className="border border-neutral-300 rounded-lg py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
              value={filterZone}
              onChange={(e) => setFilterZone(e.target.value)}
            >
              <option value="all">All Zones</option>
              <option value="North">North Zone</option>
              <option value="South">South Zone</option>
              <option value="East">East Zone</option>
              <option value="West">West Zone</option>
              <option value="Central">Central Zone</option>
            </select>
            
            {/* Type filter */}
            <select
              className="border border-neutral-300 rounded-lg py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="true">Emergency</option>
              <option value="false">Regular</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Order list */}
      <div className="flex-grow overflow-y-auto">
        {filteredOrders.length > 0 ? (
          <ul className="divide-y divide-neutral-200">
            {filteredOrders.map((order) => (
              <li 
                key={order.id}
                className={`hover:bg-neutral-50 cursor-pointer transition duration-150 ${
                  selectedOrderId === order.id ? "bg-primary-50 border-l-4 border-primary-600" : ""
                }`}
                onClick={() => onSelectOrder(order.id)}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <span className="font-medium text-neutral-800">{order.id}</span>
                      {order.isEmergency && (
                        <span className="ml-2 bg-emergency-100 text-emergency-600 text-xs px-2 py-1 rounded-full flex items-center">
                          <Icon name="AlertTriangle" size={12} className="mr-1" />
                          Emergency
                        </span>
                      )}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="text-sm text-neutral-600 mb-2">
                    <div className="flex items-center mb-1">
                      <Icon name="User" size={14} className="mr-1" />
                      <span>{order.customerName}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      <span>{order.deliveryZone} Zone</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-500">
                      {new Date(order.orderDate).toLocaleString()}
                    </span>
                    
                    {order.isEmergency && (
                      <span className={`font-medium ${
                        getTimeRemaining(order.emergencyDeadline) === "Overdue" ?"text-error-600" :"text-warning-500"
                      }`}>
                        <Icon 
                          name="Clock" 
                          size={12} 
                          className="inline mr-1" 
                        />
                        {getTimeRemaining(order.emergencyDeadline)}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <Icon name="Search" size={48} className="text-neutral-300 mb-4" />
            <p className="text-neutral-500 mb-2">No orders match your filters</p>
            <button 
              className="text-primary-600 hover:text-primary-700 font-medium"
              onClick={() => {
                setFilterStatus("all");
                setFilterDate("all");
                setFilterZone("all");
                setFilterType("all");
                setSearchQuery("");
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
      
      {/* Batch actions */}
      <div className="p-4 border-t border-neutral-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-neutral-600">
            {filteredOrders.length} orders
          </span>
          <div className="flex space-x-2">
            <button 
              className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1 rounded-lg text-sm transition duration-200" onClick={() => console.log("Export clicked")}
            >
              <Icon name="Download" size={14} className="inline mr-1" />
              Export
            </button>
            <button 
              className="bg-primary-50 hover:bg-primary-100 text-primary-700 px-3 py-1 rounded-lg text-sm transition duration-200" onClick={() => console.log("Batch actions clicked")}
            >
              <Icon name="ListChecks" size={14} className="inline mr-1" />
              Batch Actions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;