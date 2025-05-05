import React from "react";
import Icon from "../../../components/AppIcon";

const DeliveryMap = ({ order }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden h-96 md:h-[500px] mb-6 md:mb-0">
      <div className="p-4 border-b border-neutral-200">
        <h2 className="text-lg font-display font-semibold text-neutral-800">Live Tracking</h2>
        <div className="flex items-center mt-2">
          <div className="flex items-center mr-6">
            <div className="w-3 h-3 rounded-full bg-primary-600 mr-2"></div>
            <span className="text-sm text-neutral-600">Delivery Agent</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-success-600 mr-2"></div>
            <span className="text-sm text-neutral-600">Delivery Address</span>
          </div>
        </div>
      </div>
      
      <div className="relative w-full h-full">
        <iframe
          width="100%" height="100%" loading="lazy" title="Delivery Map" referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${order.deliveryLocation.lat},${order.deliveryLocation.lng}&z=14&output=embed`}>
        </iframe>
        
        {/* Overlay with ETA */}
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm p-3 rounded-lg shadow-md">
          <div className="flex items-center">
            <Icon name="Navigation" size={20} className="text-primary-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-neutral-800">ETA: {order.eta}</p>
              <p className="text-xs text-neutral-600">{order.distance} away</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMap;