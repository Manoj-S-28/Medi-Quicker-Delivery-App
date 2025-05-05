import React from "react";
import Icon from "../../../components/AppIcon";

const TimePeriodSidebar = ({ onPeriodSelect, selectedPeriod }) => {
  const timePeriods = [
    { id: "last30days", label: "Last 30 Days", icon: "Calendar" },
    { id: "last3months", label: "Last 3 Months", icon: "Calendar" },
    { id: "last6months", label: "Last 6 Months", icon: "Calendar" },
    { id: "last1year", label: "Last 1 Year", icon: "Calendar" },
    { id: "all", label: "All Orders", icon: "Package" },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-display font-semibold text-neutral-800 mb-4">Time Period</h3>
      
      <ul className="space-y-1">
        {timePeriods.map((period) => (
          <li key={period.id}>
            <button
              className={`w-full flex items-center px-3 py-2 rounded-lg transition duration-200 ${
                selectedPeriod === period.id
                  ? "bg-primary-50 text-primary-700" :"text-neutral-600 hover:bg-neutral-100"
              }`}
              onClick={() => onPeriodSelect(period.id)}
            >
              <Icon 
                name={period.icon} 
                size={18} 
                className={selectedPeriod === period.id ? "text-primary-600 mr-2" : "text-neutral-500 mr-2"}
              />
              <span className="font-medium">{period.label}</span>
            </button>
          </li>
        ))}
      </ul>
      
      <div className="mt-6 pt-4 border-t border-neutral-200">
        <h3 className="font-display font-semibold text-neutral-800 mb-3">Order Status</h3>
        <ul className="space-y-1">
          <li>
            <button className="w-full flex items-center px-3 py-2 rounded-lg text-success-600 hover:bg-success-100 transition duration-200">
              <div className="w-2 h-2 rounded-full bg-success-600 mr-2"></div>
              <span className="font-medium">Delivered</span>
            </button>
          </li>
          <li>
            <button className="w-full flex items-center px-3 py-2 rounded-lg text-warning-500 hover:bg-warning-100 transition duration-200">
              <div className="w-2 h-2 rounded-full bg-warning-500 mr-2"></div>
              <span className="font-medium">Processing</span>
            </button>
          </li>
          <li>
            <button className="w-full flex items-center px-3 py-2 rounded-lg text-info-600 hover:bg-info-100 transition duration-200">
              <div className="w-2 h-2 rounded-full bg-info-600 mr-2"></div>
              <span className="font-medium">Shipped</span>
            </button>
          </li>
          <li>
            <button className="w-full flex items-center px-3 py-2 rounded-lg text-error-600 hover:bg-error-100 transition duration-200">
              <div className="w-2 h-2 rounded-full bg-error-600 mr-2"></div>
              <span className="font-medium">Cancelled</span>
            </button>
          </li>
        </ul>
      </div>
      
      <div className="mt-6 pt-4 border-t border-neutral-200">
        <h3 className="font-display font-semibold text-neutral-800 mb-3">Order Type</h3>
        <ul className="space-y-1">
          <li>
            <button className="w-full flex items-center px-3 py-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition duration-200">
              <Icon name="Package" size={18} className="text-neutral-500 mr-2" />
              <span className="font-medium">Regular</span>
            </button>
          </li>
          <li>
            <button className="w-full flex items-center px-3 py-2 rounded-lg text-emergency-600 hover:bg-emergency-100 transition duration-200">
              <Icon name="AlertTriangle" size={18} className="text-emergency-600 mr-2" />
              <span className="font-medium">Emergency</span>
            </button>
          </li>
          <li>
            <button className="w-full flex items-center px-3 py-2 rounded-lg text-info-600 hover:bg-info-100 transition duration-200">
              <Icon name="FileText" size={18} className="text-info-600 mr-2" />
              <span className="font-medium">Prescription</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TimePeriodSidebar;