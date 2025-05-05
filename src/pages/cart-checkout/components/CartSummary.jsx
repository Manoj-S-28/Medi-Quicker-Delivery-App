import React from "react";

import Icon from "../../../components/AppIcon";

const CartSummary = ({ 
  cartItems, 
  subtotal, 
  deliveryFee, 
  tax, 
  total, 
  isEmergencyDelivery, 
  proceedToCheckout,
  currentStep
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-6">
      <h2 className="text-lg font-display font-semibold text-neutral-800 mb-4">Order Summary</h2>
      
      {isEmergencyDelivery && (
        <div className="bg-emergency-100 border border-emergency-300 rounded-lg p-3 mb-4 flex items-center">
          <Icon name="AlertTriangle" size={18} className="text-emergency-600 mr-2" />
          <div className="text-sm text-emergency-700">
            <span className="font-medium">Emergency Delivery</span> - 1 hour guaranteed
          </div>
        </div>
      )}
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal ({cartItems.length} items)</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-neutral-600">Delivery Fee</span>
          {isEmergencyDelivery ? (
            <span className="text-success-600 font-medium">FREE</span>
          ) : (
            <span>₹{deliveryFee.toFixed(2)}</span>
          )}
        </div>
        
        <div className="flex justify-between text-neutral-600">
          <span>Tax</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-neutral-200 pt-3 flex justify-between font-semibold text-neutral-800">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
      
      {currentStep === 0 && (
        <button 
          onClick={proceedToCheckout}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
        >
          Proceed to Checkout
          <Icon name="ArrowRight" size={18} className="ml-2" />
        </button>
      )}
      
      {currentStep > 0 && (
        <div className="text-sm text-neutral-500 mt-4">
          <div className="flex items-center mb-2">
            <Icon name="Shield" size={16} className="mr-2 text-success-600" />
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center">
            <Icon name="Truck" size={16} className="mr-2 text-primary-600" />
            <span>{isEmergencyDelivery ? "1-Hour Delivery Guaranteed" : "Standard Delivery (2-3 days)"}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;