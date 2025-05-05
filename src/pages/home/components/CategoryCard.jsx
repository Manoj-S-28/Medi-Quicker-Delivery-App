import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-neutral-200 hover:shadow-md transition-shadow">
      <div className="h-40 overflow-hidden relative">
        <Image 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="heading-medium text-white mb-1">{category.name}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start mb-4">
          <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center mr-3`}>
            <Icon name={category.icon} size={20} />
          </div>
          <p className="body-medium text-neutral-600 flex-1">{category.description}</p>
        </div>
        
        <Link 
          to={category.link} 
          className="w-full py-2 bg-neutral-50 text-primary-700 rounded-lg flex items-center justify-center hover:bg-primary-50 transition-colors"
        >
          <span className="label-medium mr-1">Browse</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;