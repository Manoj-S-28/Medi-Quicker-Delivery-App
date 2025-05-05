import React from "react";
import Icon from "../../../components/AppIcon";

const OrderSummary = ({ order }) => {
  // Calculate time remaining in minutes
  const calculateTimeRemaining = () => {
    const now = new Date();
    const estimatedDelivery = new Date(order.estimatedDelivery);
    const diffMs = estimatedDelivery - now;
    const diffMins = Math.round(diffMs / 60000);
    return diffMins > 0 ? diffMins : 0;
  };

  const timeRemaining = calculateTimeRemaining();
  const isOnTime = timeRemaining > 10; // Consider on time if more than 10 minutes remaining

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-neutral-800 mb-1">
            Order #{order.orderNumber}
          </h1>
          <p className="text-neutral-600">
            Placed on {order.placedDate} at {order.placedTime}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            order.status === "In Transit" ?"bg-primary-100 text-primary-700" : order.status ==="Delivered" ?"bg-success-100 text-success-600" :"bg-warning-100 text-warning-500"
          }`}>
            {order.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-neutral-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Icon name="Clock" size={20} className="text-primary-600 mr-2" />
            <span className="text-sm font-medium text-neutral-700">Estimated Delivery</span>
          </div>
          <p className="font-semibold text-neutral-800">{order.estimatedDelivery}</p>
        </div>

        <div className="bg-neutral-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Icon name="Package" size={20} className="text-primary-600 mr-2" />
            <span className="text-sm font-medium text-neutral-700">Items</span>
          </div>
          <p className="font-semibold text-neutral-800">{order.items.length} items</p>
        </div>

        <div className="bg-neutral-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Icon name="CreditCard" size={20} className="text-primary-600 mr-2" />
            <span className="text-sm font-medium text-neutral-700">Total Amount</span>
          </div>
          <p className="font-semibold text-neutral-800">${order.totalAmount}</p>
        </div>
      </div>

      {order.status !== "Delivered" && (
        <div className={`p-4 rounded-lg mb-4 ${isOnTime ? "bg-success-100" : "bg-warning-100"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon 
                name={isOnTime ? "CheckCircle" : "Clock"} 
                size={24} 
                className={isOnTime ? "text-success-600 mr-3" : "text-warning-500 mr-3"} 
              />
              <div>
                <h3 className={`font-medium ${isOnTime ? "text-success-600" : "text-warning-500"}`}>
                  {isOnTime 
                    ? "On track for 1-hour delivery" 
                    : "Delivery may be slightly delayed"}
                </h3>
                <p className="text-sm">
                  {timeRemaining > 0 
                    ? `Estimated ${timeRemaining} minutes remaining` 
                    : "Delivery expected very soon"}
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 rounded-full border-4 border-neutral-200 flex items-center justify-center relative">
                <div 
                  className={`absolute inset-0 rounded-full border-4 ${isOnTime ? "border-success-600" : "border-warning-500"}`}
                  style={{ 
                    clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 ${100 - (timeRemaining / 60) * 100}%)` 
                  }}
                ></div>
                <span className="text-lg font-bold text-neutral-800">{timeRemaining}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;