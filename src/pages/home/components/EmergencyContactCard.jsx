import React from "react";
import Icon from "../../../components/AppIcon";

const EmergencyContactCard = ({ title, phone, description, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mr-4`}>
          <Icon name={icon} size={24} />
        </div>
        <div>
          <h3 className="heading-medium text-neutral-800 mb-1">{title}</h3>
          <a 
            href={`tel:${phone.replace(/[^0-9]/g, '')}`} 
            className="heading-large text-primary-600 hover:text-primary-700 transition-colors mb-2 inline-block"
          >
            {phone}
          </a>
          <p className="body-medium text-neutral-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactCard;