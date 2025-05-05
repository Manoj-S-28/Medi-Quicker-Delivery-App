import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const OrdersPanel = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  
  const orders = [
    {
      id: "ORD-7835",
      customer: "Emily Johnson",
      items: 3,
      total: "$42.99",
      address: "123 Oak St, Springfield",
      status: "emergency",
      timeRemaining: "28 min",
      createdAt: "10:15 AM",
    },
    {
      id: "ORD-7834",
      customer: "Michael Chen",
      items: 5,
      total: "$78.50",
      address: "456 Maple Ave, Riverside",
      status: "pending",
      timeRemaining: null,
      createdAt: "10:02 AM",
    },
    {
      id: "ORD-7833",
      customer: "Sarah Williams",
      items: 2,
      total: "$23.75",
      address: "789 Pine Rd, Oakville",
      status: "processing",
      timeRemaining: null,
      createdAt: "9:45 AM",
    },
    {
      id: "ORD-7832",
      customer: "David Rodriguez",
      items: 4,
      total: "$56.20",
      address: "321 Cedar Ln, Maplewood",
      status: "emergency",
      timeRemaining: "42 min",
      createdAt: "9:30 AM",
    },
    {
      id: "ORD-7831",
      customer: "Lisa Thompson",
      items: 1,
      total: "$18.99",
      address: "654 Birch St, Elmwood",
      status: "pending",
      timeRemaining: null,
      createdAt: "9:15 AM",
    },
  ];

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const getStatusClasses = (status) => {
    switch (status) {
      case "emergency":
        return {
          bg: "bg-emergency-100",
          text: "text-emergency-600",
          border: "border-emergency-300",
          label: "Emergency",
        };
      case "processing":
        return {
          bg: "bg-primary-100",
          text: "text-primary-600",
          border: "border-primary-300",
          label: "Processing",
        };
      case "pending":
        return {
          bg: "bg-warning-100",
          text: "text-warning-500",
          border: "border-warning-300",
          label: "Pending",
        };
      case "delivered":
        return {
          bg: "bg-success-100",
          text: "text-success-600",
          border: "border-success-300",
          label: "Delivered",
        };
      default:
        return {
          bg: "bg-neutral-100",
          text: "text-neutral-600",
          border: "border-neutral-300",
          label: "Unknown",
        };
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-display font-semibold text-neutral-800">New Orders</h2>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1 text-sm rounded-full ${
              filterStatus === "all" ?"bg-primary-100 text-primary-600" :"bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilterStatus("emergency")}
            className={`px-3 py-1 text-sm rounded-full ${
              filterStatus === "emergency" ?"bg-emergency-100 text-emergency-600" :"bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            Emergency
          </button>
          <button 
            onClick={() => setFilterStatus("pending")}
            className={`px-3 py-1 text-sm rounded-full ${
              filterStatus === "pending" ?"bg-warning-100 text-warning-500" :"bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilterStatus("processing")}
            className={`px-3 py-1 text-sm rounded-full ${
              filterStatus === "processing" ?"bg-primary-100 text-primary-600" :"bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            Processing
          </button>
        </div>
      </div>
      
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {filteredOrders.map((order) => {
          const statusClasses = getStatusClasses(order.status);
          
          return (
            <div 
              key={order.id}
              className={`border ${order.status === "emergency" ? "border-emergency-300" : "border-neutral-200"} rounded-lg p-4 ${
                order.status === "emergency" ? "bg-emergency-50" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-neutral-800">{order.id}</h3>
                    <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${statusClasses.bg} ${statusClasses.text}`}>
                      {statusClasses.label}
                    </span>
                    {order.status === "emergency" && (
                      <span className="ml-2 flex items-center text-emergency-600 text-xs font-medium">
                        <Icon name="Clock" size={14} className="mr-1" />
                        {order.timeRemaining} left
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-500 mt-1">Ordered at {order.createdAt}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-neutral-800">{order.total}</p>
                  <p className="text-sm text-neutral-500">{order.items} items</p>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex items-start mb-2">
                  <Icon name="User" size={16} className="mt-0.5 mr-2 text-neutral-400" />
                  <p className="text-sm text-neutral-700">{order.customer}</p>
                </div>
                <div className="flex items-start">
                  <Icon name="MapPin" size={16} className="mt-0.5 mr-2 text-neutral-400" />
                  <p className="text-sm text-neutral-700">{order.address}</p>
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded text-sm font-medium flex items-center">
                  <Icon name="UserCheck" size={14} className="mr-1" />
                  Assign Delivery
                </button>
                <Link 
                  to={`/admin-order-management?id=${order.id}`}
                  className="bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 px-3 py-1.5 rounded text-sm font-medium flex items-center"
                >
                  <Icon name="Eye" size={14} className="mr-1" />
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-neutral-200 text-center">
        <Link 
          to="/admin-order-management" className="text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center"
        >
          View All Orders
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default OrdersPanel;