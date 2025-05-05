import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const RecentOrderCard = ({ order }) => {
  // Format date to readable string
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
      <div className={`px-4 py-2 text-white ${order.status === "Delivered" ? "bg-success-600" : "bg-warning-600"}`}>
        <div className="flex justify-between items-center">
          <span className="label-medium">{order.status}</span>
          <span className="body-small">{formatDate(order.date)}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="label-medium text-neutral-800 mb-2">Order #{order.id.split('-').pop()}</h4>
        
        <ul className="mb-4">
          {order.items.map((item, index) => (
            <li key={index} className="flex justify-between text-sm mb-1">
              <span className="text-neutral-700 truncate mr-2">{item.name}</span>
              <span className="text-neutral-600 flex-shrink-0">x{item.quantity}</span>
            </li>
          ))}
        </ul>
        
        <div className="flex justify-between items-center mb-4">
          <span className="body-medium text-neutral-600">Total</span>
          <span className="label-medium text-neutral-800">${order.total.toFixed(2)}</span>
        </div>
        
        <div className="flex space-x-2">
          <Link 
            to={`/order-tracking?id=${order.id}`}
            className="flex-1 py-2 bg-neutral-50 text-neutral-700 rounded-lg flex items-center justify-center hover:bg-neutral-100 transition-colors text-sm"
          >
            <Icon name="Eye" size={16} className="mr-1" />
            <span>Details</span>
          </Link>
          <button 
            className="flex-1 py-2 bg-primary-600 text-white rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors text-sm"
          >
            <Icon name="RefreshCw" size={16} className="mr-1" />
            <span>Reorder</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentOrderCard;