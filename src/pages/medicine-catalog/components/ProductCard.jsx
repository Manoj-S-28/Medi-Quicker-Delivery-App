import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ProductCard = ({ product, addToCart }) => {
  const {
    id,
    name,
    image,
    description,
    price,
    originalPrice,
    inStock,
    requiresPrescription,
    fastDelivery,
    isEmergency,
    rating,
    ratingCount
  } = product;

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition duration-300 overflow-hidden flex flex-col h-full ${isEmergency ? 'border-2 border-emergency-500' : 'border border-neutral-200'}`}>
      {/* Product Image */}
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <Image 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {isEmergency && (
            <span className="bg-emergency-600 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
              <Icon name="AlertTriangle" size={12} className="mr-1" />
              Emergency
            </span>
          )}
          {requiresPrescription && (
            <span className="bg-info-600 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
              <Icon name="FileText" size={12} className="mr-1" />
              Prescription
            </span>
          )}
          {fastDelivery && (
            <span className="bg-success-600 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
              <Icon name="Clock" size={12} className="mr-1" />
              1hr Delivery
            </span>
          )}
        </div>
        
        {discount > 0 && (
          <div className="absolute top-2 right-2">
            <span className="bg-warning-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {discount}% OFF
            </span>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-display font-semibold text-neutral-800 mb-1 line-clamp-2">{name}</h3>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-warning-500">
            {[...Array(5)].map((_, i) => (
              <Icon 
                key={i} 
                name={i < Math.floor(rating) ? "Star" : i < rating ? "StarHalf" : "Star"} 
                size={16} 
                className={i < Math.floor(rating) ? "text-warning-500 fill-current" : i < rating ? "text-warning-500" : "text-neutral-300"}
              />
            ))}
          </div>
          <span className="text-xs text-neutral-500 ml-1">({ratingCount})</span>
        </div>
        
        <p className="text-sm text-neutral-600 mb-3 line-clamp-2">{description}</p>
        
        {/* Price */}
        <div className="mt-auto">
          <div className="flex items-center mb-3">
            <span className="font-semibold text-lg text-neutral-800">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="ml-2 text-sm text-neutral-500 line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          {/* Availability */}
          <div className="flex items-center justify-between mb-3">
            {inStock ? (
              <span className="text-xs text-success-600 flex items-center">
                <Icon name="Check" size={14} className="mr-1" />
                In Stock
              </span>
            ) : (
              <span className="text-xs text-error-600 flex items-center">
                <Icon name="X" size={14} className="mr-1" />
                Out of Stock
              </span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => addToCart(product)}
              disabled={!inStock || (requiresPrescription && !product.prescriptionVerified)}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm flex items-center justify-center transition duration-300 ${
                !inStock || (requiresPrescription && !product.prescriptionVerified)
                  ? "bg-neutral-200 text-neutral-500 cursor-not-allowed" :"bg-primary-600 hover:bg-primary-700 text-white"
              }`}
            >
              <Icon name="ShoppingCart" size={16} className="mr-1" />
              Add to Cart
            </button>
            
            {requiresPrescription && !product.prescriptionVerified && (
              <Link
                to="/prescription-upload" className="py-2 px-3 rounded-lg font-medium text-sm bg-info-100 text-info-600 hover:bg-info-200 transition duration-300 flex items-center justify-center"
              >
                <Icon name="Upload" size={16} className="mr-1" />
                Upload Rx
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;