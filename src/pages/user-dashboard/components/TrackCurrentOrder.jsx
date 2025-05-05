import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const TrackCurrentOrder = () => {
  const currentOrder = {
    id: "ORD-7835",
    status: "In Transit",
    estimatedDelivery: "Today, 2:30 PM",
    items: 4,
    deliveryPerson: "Michael R.",
    progress: 65,
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-display font-semibold text-neutral-800">Track Current Order</h2>
        <Link to={`/order-tracking?id=${currentOrder.id}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
          Full Details <Icon name="ExternalLink" size={16} className="ml-1" />
        </Link>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-neutral-700">{currentOrder.id}</span>
          <span className="text-sm font-medium text-primary-600">{currentOrder.status}</span>
        </div>
        
        <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-2">
          <div 
            className="bg-primary-600 h-2.5 rounded-full" 
            style={{ width: `${currentOrder.progress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-neutral-500">
          <span>Order Placed</span>
          <span>In Transit</span>
          <span>Delivered</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4 p-3 bg-neutral-50 rounded-lg">
        <div className="flex items-center">
          <div className="bg-primary-100 p-2 rounded-full mr-3">
            <Icon name="Clock" size={20} color="var(--color-primary-600)" />
          </div>
          <div>
            <p className="text-sm text-neutral-500">Estimated Delivery</p>
            <p className="font-medium text-neutral-800">{currentOrder.estimatedDelivery}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-primary-100 p-2 rounded-full mr-3">
            <Icon name="User" size={20} color="var(--color-primary-600)" />
          </div>
          <div>
            <p className="text-sm text-neutral-500">Delivery Person</p>
            <p className="font-medium text-neutral-800">{currentOrder.deliveryPerson}</p>
          </div>
        </div>
      </div>
      
      <Link 
        to={`/order-tracking?id=${currentOrder.id}`}
        className="w-full bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
      >
        <Icon name="MapPin" size={18} className="mr-2" />
        Live Track Order
      </Link>
    </div>
  );
};

export default TrackCurrentOrder;