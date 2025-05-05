import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const QuickAccessTiles = () => {
  const quickAccessOptions = [
    {
      title: "Upload Prescription",
      description: "Get medicines based on your prescription",
      icon: "FileText",
      color: "bg-info-100",
      iconColor: "var(--color-info-600)",
      link: "/prescription-upload",
    },
    {
      title: "Medicine Catalog",
      description: "Browse our extensive medicine collection",
      icon: "Pill",
      color: "bg-success-100",
      iconColor: "var(--color-success-600)",
      link: "/medicine-catalog",
    },
    {
      title: "Medical Devices",
      description: "Explore healthcare devices and equipment",
      icon: "Stethoscope",
      color: "bg-warning-100",
      iconColor: "var(--color-warning-500)",
      link: "/medicine-catalog?category=devices",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {quickAccessOptions.map((option, index) => (
        <Link 
          key={index}
          to={option.link}
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition duration-300 flex flex-col"
        >
          <div className={`${option.color} p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
            <Icon name={option.icon} size={24} color={option.iconColor} />
          </div>
          <h3 className="font-display font-semibold text-neutral-800 mb-2">{option.title}</h3>
          <p className="text-neutral-600 text-sm mb-4">{option.description}</p>
          <div className="mt-auto text-primary-600 font-medium text-sm flex items-center">
            Explore <Icon name="ChevronRight" size={16} className="ml-1" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickAccessTiles;