import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const EmptyCart = () => {
  return (
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name="ShoppingCart" size={32} className="text-neutral-400" />
      </div>
      
      <h2 className="text-xl font-display font-semibold text-neutral-800 mb-2">Your Cart is Empty</h2>
      <p className="text-neutral-600 mb-6">Looks like you haven't added any medicines to your cart yet.</p>
      
      <Link 
        to="/medicine-catalog" className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 inline-flex items-center"
      >
        Browse Medicines
        <Icon name="ArrowRight" size={18} className="ml-2" />
      </Link>
      
      <div className="mt-6 pt-6 border-t border-neutral-200">
        <h3 className="font-medium text-neutral-800 mb-3">Quick Actions</h3>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/prescription-upload" className="flex items-center justify-center text-primary-600 hover:text-primary-700"
          >
            <Icon name="FileText" size={18} className="mr-2" />
            Upload Prescription
          </Link>
          
          <Link 
            to="/order-history" className="flex items-center justify-center text-primary-600 hover:text-primary-700"
          >
            <Icon name="Clock" size={18} className="mr-2" />
            View Previous Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;