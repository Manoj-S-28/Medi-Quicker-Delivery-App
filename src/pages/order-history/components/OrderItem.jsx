import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const OrderItem = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const getStatusClasses = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-success-100 text-success-600";
      case "processing":
        return "bg-warning-100 text-warning-500";
      case "shipped":
        return "bg-info-100 text-info-600";
      case "cancelled":
        return "bg-error-100 text-error-600";
      default:
        return "bg-neutral-100 text-neutral-600";
    }
  };

  const getOrderTypeClasses = (type) => {
    switch (type.toLowerCase()) {
      case "emergency":
        return "bg-emergency-100 text-emergency-600";
      case "prescription":
        return "bg-info-100 text-info-600";
      default:
        return "bg-neutral-100 text-neutral-600";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow mb-4 overflow-hidden">
      {/* Order Header - Always visible */}
      <div 
        className="p-4 cursor-pointer hover:bg-neutral-50 transition duration-200"
        onClick={toggleExpand}
      >
        <div className="md:hidden">
          {/* Mobile View */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="font-medium text-neutral-800">{order.id}</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(order.status)}`}>
                {order.status}
              </span>
              {order.type && (
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getOrderTypeClasses(order.type)}`}>
                  {order.type}
                </span>
              )}
            </div>
            <Icon 
              name={expanded ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              className="text-neutral-500" 
            />
          </div>
          <div className="text-sm text-neutral-500 mb-2">
            {order.date} • {order.total}
          </div>
          <div className="text-sm text-neutral-500 flex items-start">
            <Icon name="MapPin" size={16} className="mr-1 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">{order.address}</span>
          </div>
        </div>

        <div className="hidden md:flex md:items-center md:justify-between">
          {/* Desktop View */}
          <div className="flex items-center">
            <div className="mr-4">
              <Icon 
                name={expanded ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-neutral-500" 
              />
            </div>
            <div>
              <div className="flex items-center">
                <span className="font-medium text-neutral-800">{order.id}</span>
                <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(order.status)}`}>
                  {order.status}
                </span>
                {order.type && (
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getOrderTypeClasses(order.type)}`}>
                    {order.type}
                  </span>
                )}
              </div>
              <div className="text-sm text-neutral-500">
                {order.date}
              </div>
            </div>
          </div>
          
          <div className="text-sm text-neutral-500 flex items-center max-w-xs truncate">
            <Icon name="MapPin" size={16} className="mr-1 flex-shrink-0" />
            <span className="truncate">{order.address}</span>
          </div>
          
          <div className="font-medium text-neutral-800">
            {order.total}
          </div>
          
          <div className="flex">
            <Link 
              to={`/order-tracking?id=${order.id}`}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium mr-4 flex items-center"
            >
              <Icon name="MapPin" size={16} className="mr-1" />
              Track
            </Link>
            {order.status === "Delivered" && (
              <button 
                className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Reordering ${order.id}`);
                }}
              >
                <Icon name="RefreshCw" size={16} className="mr-1" />
                Reorder
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Order Details - Visible when expanded */}
      {expanded && (
        <div className="border-t border-neutral-200 p-4 bg-neutral-50">
          {/* Order Items */}
          <h4 className="font-medium text-neutral-800 mb-3">Order Items</h4>
          <div className="space-y-3 mb-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-12 h-12 rounded-md overflow-hidden border border-neutral-200 bg-white flex-shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3 flex-grow">
                  <div className="font-medium text-neutral-800">{item.name}</div>
                  <div className="text-sm text-neutral-500">
                    {item.quantity} x {item.price}
                  </div>
                </div>
                <div className="font-medium text-neutral-800">
                  {item.total}
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Delivery Information */}
            <div className="bg-white p-3 rounded-lg border border-neutral-200">
              <h5 className="font-medium text-neutral-800 mb-2 flex items-center">
                <Icon name="Truck" size={16} className="mr-2 text-primary-600" />
                Delivery Information
              </h5>
              {order.deliveryPerson && (
                <div className="text-sm mb-1">
                  <span className="text-neutral-500">Delivery Agent:</span> {order.deliveryPerson}
                </div>
              )}
              <div className="text-sm mb-1">
                <span className="text-neutral-500">Delivery Date:</span> {order.deliveryDate || "Pending"}
              </div>
              <div className="text-sm">
                <span className="text-neutral-500">Address:</span> {order.address}
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="bg-white p-3 rounded-lg border border-neutral-200">
              <h5 className="font-medium text-neutral-800 mb-2 flex items-center">
                <Icon name="CreditCard" size={16} className="mr-2 text-primary-600" />
                Payment Information
              </h5>
              <div className="text-sm mb-1">
                <span className="text-neutral-500">Payment Method:</span> {order.paymentMethod}
              </div>
              <div className="text-sm mb-1">
                <span className="text-neutral-500">Subtotal:</span> {order.subtotal}
              </div>
              <div className="text-sm mb-1">
                <span className="text-neutral-500">Delivery Fee:</span> {order.deliveryFee}
              </div>
              <div className="text-sm font-medium">
                <span className="text-neutral-500">Total:</span> {order.total}
              </div>
            </div>
            
            {/* Prescription Information (if applicable) */}
            {order.prescription && (
              <div className="bg-white p-3 rounded-lg border border-neutral-200">
                <h5 className="font-medium text-neutral-800 mb-2 flex items-center">
                  <Icon name="FileText" size={16} className="mr-2 text-primary-600" />
                  Prescription Information
                </h5>
                <div className="text-sm mb-1">
                  <span className="text-neutral-500">Prescription ID:</span> {order.prescription.id}
                </div>
                <div className="text-sm mb-1">
                  <span className="text-neutral-500">Doctor:</span> {order.prescription.doctor}
                </div>
                <div className="text-sm">
                  <span className="text-neutral-500">Date:</span> {order.prescription.date}
                </div>
                {order.prescription.image && (
                  <button className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                    <Icon name="Eye" size={16} className="mr-1" />
                    View Prescription
                  </button>
                )}
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 justify-end mt-4">
            {order.status === "Delivered" && (
              <>
                <button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center">
                  <Icon name="Star" size={18} className="mr-2" />
                  Rate Order
                </button>
                <button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center">
                  <Icon name="FileText" size={18} className="mr-2" />
                  Download Invoice
                </button>
              </>
            )}
            {order.status === "Delivered" && (
              <button 
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Reordering ${order.id}`);
                }}
              >
                <Icon name="RefreshCw" size={18} className="mr-2" />
                Reorder All Items
              </button>
            )}
            {(order.status === "Processing" || order.status === "Pending") && (
              <button className="bg-error-100 hover:bg-error-200 text-error-600 font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center">
                <Icon name="X" size={18} className="mr-2" />
                Cancel Order
              </button>
            )}
            <Link 
              to={`/order-tracking?id=${order.id}`}
              className="bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Icon name="MapPin" size={18} className="mr-2" />
              Track Order
            </Link>
          </div>
        </div>
      )}
      
      {/* Mobile Action Buttons */}
      <div className="md:hidden border-t border-neutral-200 p-3 flex justify-between">
        <Link 
          to={`/order-tracking?id=${order.id}`}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Icon name="MapPin" size={16} className="mr-1" />
          Track
        </Link>
        {order.status === "Delivered" && (
          <button 
            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              console.log(`Reordering ${order.id}`);
            }}
          >
            <Icon name="RefreshCw" size={16} className="mr-1" />
            Reorder
          </button>
        )}
        {(order.status === "Processing" || order.status === "Pending") && (
          <button 
            className="text-error-600 hover:text-error-700 text-sm font-medium flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              console.log(`Cancelling ${order.id}`);
            }}
          >
            <Icon name="X" size={16} className="mr-1" />
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderItem;