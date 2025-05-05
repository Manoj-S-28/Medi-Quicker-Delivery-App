import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-neutral-200 last:border-0">
      <div className="w-full sm:w-20 h-20 rounded-lg overflow-hidden mb-3 sm:mb-0 sm:mr-4">
        <Image 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <Link to={`/medicine-catalog/${item.id}`} className="font-medium text-neutral-800 hover:text-primary-600 transition duration-200">
          {item.name}
        </Link>
        
        {item.prescription && (
          <div className="flex items-center mt-1 text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full w-fit">
            <Icon name="FileText" size={12} className="mr-1" />
            Prescription Verified
          </div>
        )}
        
        <div className="text-sm text-neutral-500 mt-1">
          {item.dosage && <span>{item.dosage} • </span>}
          {item.quantity} {item.unit}
        </div>
      </div>
      
      <div className="flex items-center mt-3 sm:mt-0">
        <div className="flex items-center border border-neutral-300 rounded-lg mr-6">
          <button 
            onClick={() => updateQuantity(item.id, Math.max(1, item.count - 1))}
            className="px-3 py-1 text-neutral-600 hover:text-primary-600 transition duration-200" aria-label="Decrease quantity"
          >
            <Icon name="Minus" size={16} />
          </button>
          <span className="px-3 py-1 font-medium text-neutral-800">{item.count}</span>
          <button 
            onClick={() => updateQuantity(item.id, item.count + 1)}
            className="px-3 py-1 text-neutral-600 hover:text-primary-600 transition duration-200" aria-label="Increase quantity"
          >
            <Icon name="Plus" size={16} />
          </button>
        </div>
        
        <div className="text-right">
          <div className="font-medium text-neutral-800">₹{(item.price * item.count).toFixed(2)}</div>
          {item.count > 1 && (
            <div className="text-xs text-neutral-500">₹{item.price.toFixed(2)} each</div>
          )}
        </div>
        
        <button 
          onClick={() => removeItem(item.id)}
          className="ml-4 text-neutral-400 hover:text-error-600 transition duration-200" aria-label="Remove item"
        >
          <Icon name="Trash2" size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;