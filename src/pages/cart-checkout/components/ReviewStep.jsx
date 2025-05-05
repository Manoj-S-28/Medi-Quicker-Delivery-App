import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const ReviewStep = ({ 
  cartItems, 
  subtotal, 
  deliveryFee, 
  tax, 
  total, 
  selectedAddress, 
  addresses, 
  paymentMethod, 
  isEmergencyDelivery, 
  goToPreviousStep, 
  placeOrder 
}) => {
  // Find the selected address object
  const deliveryAddress = addresses.find(addr => addr.id === selectedAddress);
  
  // Format payment method for display
  const getPaymentMethodDisplay = () => {
    switch(paymentMethod) {
      case "card":
        return "Credit/Debit Card";
      case "upi":
        return "UPI Payment";
      case "cod":
        return "Cash on Delivery";
      default:
        return "Not selected";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-display font-semibold text-neutral-800 mb-4">Review Your Order</h2>
      
      {isEmergencyDelivery && (
        <div className="bg-emergency-100 border border-emergency-300 rounded-lg p-3 mb-4 flex items-center">
          <Icon name="Clock" size={18} className="text-emergency-600 mr-2" />
          <div className="text-sm">
            <span className="font-medium text-emergency-700">Emergency Delivery</span>
            <span className="text-emergency-600"> - Your order will be delivered within 1 hour</span>
          </div>
        </div>
      )}
      
      <div className="space-y-6">
        {/* Delivery Address */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-neutral-800">Delivery Address</h3>
            <button 
              onClick={() => goToPreviousStep(0)}
              className="text-primary-600 hover:text-primary-700 text-sm"
            >
              Change
            </button>
          </div>
          
          <div className="bg-neutral-50 rounded-lg p-3">
            <div className="font-medium text-neutral-800">{deliveryAddress?.name}</div>
            <div className="text-sm text-neutral-600 mt-1">{deliveryAddress?.address}</div>
            <div className="text-sm text-neutral-600">{deliveryAddress?.city}, {deliveryAddress?.state} - {deliveryAddress?.pincode}</div>
            <div className="text-sm text-neutral-600 mt-1">Phone: {deliveryAddress?.phone}</div>
          </div>
        </div>
        
        {/* Payment Method */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-neutral-800">Payment Method</h3>
            <button 
              onClick={() => goToPreviousStep(1)}
              className="text-primary-600 hover:text-primary-700 text-sm"
            >
              Change
            </button>
          </div>
          
          <div className="bg-neutral-50 rounded-lg p-3 flex items-center">
            <Icon 
              name={paymentMethod === "card" ? "CreditCard" : paymentMethod === "upi" ? "Smartphone" : "Wallet"} 
              size={18} 
              className="text-primary-600 mr-2" 
            />
            <span className="text-neutral-700">{getPaymentMethodDisplay()}</span>
          </div>
        </div>
        
        {/* Order Items */}
        <div>
          <h3 className="font-medium text-neutral-800 mb-2">Order Items ({cartItems.length})</h3>
          
          <div className="border rounded-lg divide-y divide-neutral-200">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3">
                <div className="flex items-center">
                  <div className="font-medium text-neutral-800">{item.count}x</div>
                  <div className="ml-3">
                    <div className="text-neutral-800">{item.name}</div>
                    <div className="text-xs text-neutral-500">
                      {item.dosage && <span>{item.dosage} • </span>}
                      {item.quantity} {item.unit}
                    </div>
                  </div>
                </div>
                <div className="font-medium text-neutral-800">₹{(item.price * item.count).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Price Summary */}
        <div className="border-t border-neutral-200 pt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
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
            
            <div className="border-t border-neutral-200 pt-2 flex justify-between font-semibold text-neutral-800">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Place Order Button */}
        <button 
          onClick={placeOrder}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
        >
          Place Order
          <Icon name="Check" size={18} className="ml-2" />
        </button>
        
        <div className="text-xs text-neutral-500 text-center">
          By placing your order, you agree to our <Link to="#" className="text-primary-600 hover:underline">Terms of Service</Link> and <Link to="#" className="text-primary-600 hover:underline">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;