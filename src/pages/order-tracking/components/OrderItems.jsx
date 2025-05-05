import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const OrderItems = ({ items }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Show only first 2 items when collapsed
  const displayItems = isExpanded ? items : items.slice(0, 2);
  const hasMoreItems = items.length > 2;
  
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-display font-semibold text-neutral-800">Order Items</h2>
        <span className="text-sm text-neutral-600">{items.length} items</span>
      </div>
      
      <div className="space-y-4">
        {displayItems.map((item, index) => (
          <div key={index} className="flex items-center p-3 bg-neutral-50 rounded-lg">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-neutral-200 flex-shrink-0">
              <Image 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-medium text-neutral-800">{item.name}</h3>
              <p className="text-sm text-neutral-600">
                {item.quantity} x ${item.price.toFixed(2)}
              </p>
              {item.prescription && (
                <div className="flex items-center mt-1">
                  <Icon name="FileText" size={14} className="text-primary-600 mr-1" />
                  <span className="text-xs text-primary-600">Prescription Required</span>
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="font-medium text-neutral-800">${(item.quantity * item.price).toFixed(2)}</p>
            </div>
          </div>
        ))}
        
        {hasMoreItems && !isExpanded && (
          <button 
            className="w-full py-2 text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center"
            onClick={() => setIsExpanded(true)}
          >
            Show {items.length - 2} more items
            <Icon name="ChevronDown" size={16} className="ml-1" />
          </button>
        )}
        
        {isExpanded && hasMoreItems && (
          <button 
            className="w-full py-2 text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center"
            onClick={() => setIsExpanded(false)}
          >
            Show less
            <Icon name="ChevronUp" size={16} className="ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderItems;