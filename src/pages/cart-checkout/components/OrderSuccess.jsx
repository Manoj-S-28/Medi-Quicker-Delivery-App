import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const OrderSuccess = ({ orderId, isEmergencyDelivery }) => {
  return (
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name="CheckCircle" size={40} className="text-success-600" />
      </div>
      
      <h2 className="text-xl font-display font-semibold text-neutral-800 mb-2">Order Placed Successfully!</h2>
      <p className="text-neutral-600 mb-2">Your order #{orderId} has been confirmed.</p>
      
      {isEmergencyDelivery ? (
        <div className="bg-emergency-100 text-emergency-700 p-3 rounded-lg inline-block mb-6">
          <div className="font-medium">Emergency Delivery</div>
          <div>Your medicines will arrive within 1 hour</div>
        </div>
      ) : (
        <p className="text-neutral-600 mb-6">Your medicines will be delivered in 2-3 business days.</p>
      )}
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        <Link 
          to={`/order-tracking?id=${orderId}`}
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 flex items-center justify-center"
        >
          <Icon name="MapPin" size={18} className="mr-2" />
          Track Order
        </Link>
        
        <Link 
          to="/user-dashboard" className="bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium py-2 px-6 rounded-lg transition duration-300 flex items-center justify-center"
        >
          Go to Dashboard
        </Link>
      </div>
      
      <div className="border-t border-neutral-200 pt-6">
        <h3 className="font-medium text-neutral-800 mb-3">Need Help?</h3>
        <p className="text-neutral-600 mb-4">If you have any questions about your order, please contact our support team.</p>
        <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center mx-auto">
          <Icon name="MessageCircle" size={18} className="mr-2" />
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;