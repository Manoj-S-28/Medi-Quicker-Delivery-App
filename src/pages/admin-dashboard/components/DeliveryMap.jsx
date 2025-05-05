import React from "react";
import Icon from "../../../components/AppIcon";

const DeliveryMap = () => {
  const deliveryAgents = [
    {
      id: 1,
      name: "Michael R.",
      status: "active",
      orders: 2,
      location: "Downtown",
    },
    {
      id: 2,
      name: "Jessica T.",
      status: "active",
      orders: 1,
      location: "Westside",
    },
    {
      id: 3,
      name: "Robert K.",
      status: "inactive",
      orders: 0,
      location: "Northside",
    },
    {
      id: 4,
      name: "Amanda L.",
      status: "active",
      orders: 3,
      location: "Eastside",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-display font-semibold text-neutral-800">Live Delivery Map</h2>
        <div className="flex items-center text-sm">
          <span className="flex items-center mr-4">
            <span className="w-2 h-2 bg-success-600 rounded-full mr-1"></span>
            Active
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 bg-neutral-400 rounded-full mr-1"></span>
            Inactive
          </span>
        </div>
      </div>
      
      <div className="h-[400px] rounded-lg overflow-hidden mb-4 relative">
        <iframe
          width="100%" height="100%" loading="lazy" title="Delivery Map" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=40.7128,-74.0060&z=13&output=embed">
        </iframe>
        
        {/* Map overlay controls */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow p-2 flex flex-col space-y-2">
          <button className="p-2 hover:bg-neutral-100 rounded-lg" title="Zoom In">
            <Icon name="Plus" size={18} />
          </button>
          <button className="p-2 hover:bg-neutral-100 rounded-lg" title="Zoom Out">
            <Icon name="Minus" size={18} />
          </button>
          <button className="p-2 hover:bg-neutral-100 rounded-lg" title="Center Map">
            <Icon name="Maximize" size={18} />
          </button>
        </div>
      </div>
      
      <h3 className="font-medium text-neutral-700 mb-3">Delivery Agents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {deliveryAgents.map((agent) => (
          <div 
            key={agent.id}
            className="border border-neutral-200 rounded-lg p-3 flex justify-between items-center"
          >
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                agent.status === "active" ? "bg-success-600" : "bg-neutral-400"
              }`}></div>
              <div>
                <p className="font-medium text-neutral-800">{agent.name}</p>
                <p className="text-xs text-neutral-500">{agent.location}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-neutral-700">{agent.orders} orders</p>
              <button className="text-primary-600 text-xs flex items-center mt-1">
                <Icon name="MapPin" size={12} className="mr-1" />
                Locate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryMap;