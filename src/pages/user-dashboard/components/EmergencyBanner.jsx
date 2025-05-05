import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const EmergencyBanner = () => {
  return (
    <div className="bg-emergency-100 border border-emergency-300 rounded-lg p-4 mb-6 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="bg-emergency-600 p-2 rounded-full mr-4">
          <Icon name="AlertTriangle" size={24} color="white" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-emergency-700">Emergency Medicine Delivery</h3>
          <p className="text-emergency-600">Get critical medications delivered within 1 hour</p>
        </div>
      </div>
      <Link 
        to="/medicine-catalog?filter=emergency" className="bg-emergency-600 hover:bg-emergency-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 flex items-center"
      >
        <Icon name="Clock" size={18} className="mr-2" color="white" />
        Order Emergency Medicine
      </Link>
    </div>
  );
};

export default EmergencyBanner;