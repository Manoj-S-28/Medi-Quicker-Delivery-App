import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const RecommendedProducts = ({ products, addToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-display font-semibold text-neutral-800">Frequently Bought Together</h2>
        <Link to="/medicine-catalog" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
          View More <Icon name="ChevronRight" size={16} className="ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border border-neutral-200 rounded-lg p-3 hover:shadow-md transition duration-300">
            <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
              <Image 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <Link to={`/medicine-catalog/${product.id}`} className="font-medium text-neutral-800 hover:text-primary-600 transition duration-200 line-clamp-1">
              {product.name}
            </Link>
            
            <div className="text-sm text-neutral-500 mt-1 mb-2">
              {product.dosage && <span>{product.dosage} • </span>}
              {product.quantity} {product.unit}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-semibold text-neutral-800">₹{product.price.toFixed(2)}</span>
              <button 
                onClick={() => addToCart(product)}
                className="bg-primary-50 hover:bg-primary-100 text-primary-600 p-2 rounded-full transition duration-200"
                aria-label={`Add ${product.name} to cart`}
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;