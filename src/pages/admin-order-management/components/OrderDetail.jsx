import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const OrderDetail = ({ order }) => {
  const [activeTab, setActiveTab] = useState("details");

  if (!order) {
    return (
      <div className="bg-white rounded-lg shadow h-full flex flex-col items-center justify-center p-6 text-center">
        <Icon name="ClipboardList" size={64} className="text-neutral-300 mb-4" />
        <h3 className="text-lg font-display font-semibold text-neutral-700 mb-2">No Order Selected</h3>
        <p className="text-neutral-500 max-w-md">
          Select an order from the list to view its details and take actions.
        </p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-info-100 text-info-600";
      case "Processing":
        return "bg-warning-100 text-warning-500";
      case "Out for Delivery":
        return "bg-primary-100 text-primary-600";
      case "Delivered":
        return "bg-success-100 text-success-600";
      case "Cancelled":
        return "bg-error-100 text-error-600";
      default:
        return "bg-neutral-100 text-neutral-600";
    }
  };

  const getActionButtons = (status) => {
    switch (status) {
      case "New":
        return (
          <>
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
              <Icon name="Check" size={18} className="mr-2" />
              Verify & Process
            </button>
            <button className="bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
              <Icon name="X" size={18} className="mr-2" />
              Cancel Order
            </button>
          </>
        );
      case "Processing":
        return (
          <>
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
              <Icon name="UserCheck" size={18} className="mr-2" />
              Assign to Agent
            </button>
            <button className="bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
              <Icon name="X" size={18} className="mr-2" />
              Cancel Order
            </button>
          </>
        );
      case "Out for Delivery":
        return (
          <>
            <button className="bg-success-600 hover:bg-success-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
              <Icon name="CheckCircle" size={18} className="mr-2" />
              Mark as Delivered
            </button>
            <button className="bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
              <Icon name="AlertTriangle" size={18} className="mr-2" />
              Report Issue
            </button>
          </>
        );
      case "Delivered":
        return (
          <button className="bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
            <Icon name="Printer" size={18} className="mr-2" />
            Print Invoice
          </button>
        );
      case "Cancelled":
        return (
          <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
            <Icon name="RefreshCw" size={18} className="mr-2" />
            Restore Order
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow h-full flex flex-col">
      {/* Order header */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <h2 className="text-lg font-display font-semibold text-neutral-800 mr-2">
                {order.id}
              </h2>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
              {order.isEmergency && (
                <span className="ml-2 bg-emergency-100 text-emergency-600 text-xs px-2 py-1 rounded-full flex items-center">
                  <Icon name="AlertTriangle" size={12} className="mr-1" />
                  Emergency
                </span>
              )}
            </div>
            <p className="text-sm text-neutral-500">
              Ordered on {new Date(order.orderDate).toLocaleString()}
            </p>
          </div>
          
          <div className="flex space-x-2">
            {getActionButtons(order.status)}
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-neutral-200">
        <div className="flex overflow-x-auto">
          <button
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "details" ?"text-primary-600 border-b-2 border-primary-600" :"text-neutral-600 hover:text-neutral-800"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Order Details
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "customer" ?"text-primary-600 border-b-2 border-primary-600" :"text-neutral-600 hover:text-neutral-800"
            }`}
            onClick={() => setActiveTab("customer")}
          >
            Customer Info
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "prescription" ?"text-primary-600 border-b-2 border-primary-600" :"text-neutral-600 hover:text-neutral-800"
            }`}
            onClick={() => setActiveTab("prescription")}
          >
            Prescription
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "delivery" ?"text-primary-600 border-b-2 border-primary-600" :"text-neutral-600 hover:text-neutral-800"
            }`}
            onClick={() => setActiveTab("delivery")}
          >
            Delivery Info
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "history" ?"text-primary-600 border-b-2 border-primary-600" :"text-neutral-600 hover:text-neutral-800"
            }`}
            onClick={() => setActiveTab("history")}
          >
            History Log
          </button>
        </div>
      </div>
      
      {/* Tab content */}
      <div className="flex-grow overflow-y-auto p-4">
        {activeTab === "details" && (
          <div>
            {/* Order items */}
            <div className="mb-6">
              <h3 className="font-medium text-neutral-800 mb-3">Order Items</h3>
              <div className="bg-neutral-50 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-100">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-200">
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-neutral-800">{item.name}</div>
                          <div className="text-xs text-neutral-500">{item.sku}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {item.inStock ? (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-600">
                              In Stock
                            </span>
                          ) : (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-error-100 text-error-600">
                              Out of Stock
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="bg-neutral-50 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-neutral-600">Subtotal</span>
                <span className="text-neutral-800 font-medium">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-neutral-600">Delivery Fee</span>
                <span className="text-neutral-800 font-medium">${order.deliveryFee.toFixed(2)}</span>
              </div>
              {order.isEmergency && (
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-600">Emergency Fee</span>
                  <span className="text-neutral-800 font-medium">${order.emergencyFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between mb-2">
                <span className="text-neutral-600">Tax</span>
                <span className="text-neutral-800 font-medium">${order.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-neutral-200 my-2 pt-2 flex justify-between">
                <span className="text-neutral-800 font-semibold">Total</span>
                <span className="text-neutral-800 font-semibold">${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Payment Method</span>
                <span className="text-neutral-800">{order.paymentMethod}</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "customer" && (
          <div>
            <div className="bg-neutral-50 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image 
                      src={order.customer.avatar} 
                      alt={order.customer.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-800">{order.customer.name}</h3>
                  <p className="text-sm text-neutral-600 mb-2">Customer ID: {order.customer.id}</p>
                  <div className="flex space-x-2">
                    <button className="bg-primary-50 hover:bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-lg transition duration-200 flex items-center">
                      <Icon name="Phone" size={14} className="mr-1" />
                      Call
                    </button>
                    <button className="bg-primary-50 hover:bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-lg transition duration-200 flex items-center">
                      <Icon name="Mail" size={14} className="mr-1" />
                      Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-neutral-800 mb-3">Contact Information</h3>
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="mb-3">
                    <div className="text-sm text-neutral-500">Email</div>
                    <div className="text-neutral-800">{order.customer.email}</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-neutral-500">Phone</div>
                    <div className="text-neutral-800">{order.customer.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-500">Alternative Phone</div>
                    <div className="text-neutral-800">{order.customer.alternativePhone || "Not provided"}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-neutral-800 mb-3">Order History</h3>
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="mb-3">
                    <div className="text-sm text-neutral-500">Total Orders</div>
                    <div className="text-neutral-800">{order.customer.orderCount}</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-neutral-500">Last Order</div>
                    <div className="text-neutral-800">{order.customer.lastOrderDate}</div>
                  </div>
                  <div>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      View All Orders
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "prescription" && (
          <div>
            {order.prescription ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-neutral-800">Prescription Details</h3>
                  <div className="flex space-x-2">
                    <button className="bg-primary-50 hover:bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-lg transition duration-200 flex items-center">
                      <Icon name="Download" size={14} className="mr-1" />
                      Download
                    </button>
                    <button className="bg-primary-50 hover:bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-lg transition duration-200 flex items-center">
                      <Icon name="Printer" size={14} className="mr-1" />
                      Print
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <div className="mb-3">
                        <div className="text-sm text-neutral-500">Doctor Name</div>
                        <div className="text-neutral-800">{order.prescription.doctorName}</div>
                      </div>
                      <div className="mb-3">
                        <div className="text-sm text-neutral-500">Hospital/Clinic</div>
                        <div className="text-neutral-800">{order.prescription.hospital}</div>
                      </div>
                      <div className="mb-3">
                        <div className="text-sm text-neutral-500">Date Issued</div>
                        <div className="text-neutral-800">{order.prescription.dateIssued}</div>
                      </div>
                      <div>
                        <div className="text-sm text-neutral-500">Valid Until</div>
                        <div className="text-neutral-800">{order.prescription.validUntil}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <div className="mb-3">
                        <div className="text-sm text-neutral-500">Verification Status</div>
                        <div className="flex items-center">
                          {order.prescription.isVerified ? (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-600">
                              Verified
                            </span>
                          ) : (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-warning-100 text-warning-500">
                              Pending Verification
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="text-sm text-neutral-500">Verified By</div>
                        <div className="text-neutral-800">
                          {order.prescription.verifiedBy || "Not verified yet"}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-neutral-500">Verification Time</div>
                        <div className="text-neutral-800">
                          {order.prescription.verificationTime || "Not verified yet"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-medium text-neutral-800 mb-3">Prescription Images</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {order.prescription.images.map((image, index) => (
                    <div key={index} className="bg-neutral-50 rounded-lg overflow-hidden">
                      <div className="aspect-w-4 aspect-h-3">
                        <Image 
                          src={image} 
                          alt={`Prescription ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 text-center">
                        <span className="text-sm text-neutral-600">Prescription {index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <Icon name="FileX" size={48} className="text-neutral-300 mb-4" />
                <p className="text-neutral-500">No prescription attached to this order</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === "delivery" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-medium text-neutral-800 mb-3">Delivery Address</h3>
                <div className="bg-neutral-50 rounded-lg p-4">
                  <p className="text-neutral-800 mb-2">{order.deliveryAddress.street}</p>
                  <p className="text-neutral-800 mb-2">{order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}</p>
                  <p className="text-neutral-600 text-sm mb-3">
                    <Icon name="MapPin" size={14} className="inline mr-1" />
                    {order.deliveryZone} Zone
                  </p>
                  <div className="text-sm text-neutral-500 mb-1">Delivery Instructions</div>
                  <p className="text-neutral-700">
                    {order.deliveryAddress.instructions || "No special instructions provided"}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-neutral-800 mb-3">Delivery Agent</h3>
                {order.deliveryAgent ? (
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="mr-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image 
                            src={order.deliveryAgent.avatar} 
                            alt={order.deliveryAgent.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-800">{order.deliveryAgent.name}</h4>
                        <p className="text-sm text-neutral-600 mb-2">ID: {order.deliveryAgent.id}</p>
                        <div className="flex space-x-2">
                          <button className="bg-primary-50 hover:bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-lg transition duration-200 flex items-center">
                            <Icon name="Phone" size={12} className="mr-1" />
                            Call
                          </button>
                          <button className="bg-primary-50 hover:bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-lg transition duration-200 flex items-center">
                            <Icon name="MessageSquare" size={12} className="mr-1" />
                            Message
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-neutral-200">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-xs text-neutral-500">Status</div>
                          <div className="text-sm text-neutral-800">{order.deliveryAgent.status}</div>
                        </div>
                        <div>
                          <div className="text-xs text-neutral-500">Vehicle</div>
                          <div className="text-sm text-neutral-800">{order.deliveryAgent.vehicle}</div>
                        </div>
                        <div>
                          <div className="text-xs text-neutral-500">Rating</div>
                          <div className="text-sm text-neutral-800 flex items-center">
                            <Icon name="Star" size={14} className="text-warning-500 mr-1" />
                            {order.deliveryAgent.rating}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-neutral-500">Deliveries Today</div>
                          <div className="text-sm text-neutral-800">{order.deliveryAgent.deliveriesToday}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-neutral-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <Icon name="UserX" size={32} className="text-neutral-400 mb-2" />
                    <p className="text-neutral-600 mb-3">No delivery agent assigned yet</p>
                    <button className="bg-primary-600 hover:bg-primary-700 text-white text-sm px-3 py-1 rounded-lg transition duration-200 flex items-center">
                      <Icon name="UserPlus" size={14} className="mr-1" />
                      Assign Agent
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <h3 className="font-medium text-neutral-800 mb-3">Delivery Location</h3>
            <div className="bg-neutral-50 rounded-lg overflow-hidden h-64 mb-4">
              <iframe
                width="100%" height="100%" loading="lazy" title="Delivery Location" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=40.7128,-74.0060&z=14&output=embed">
              </iframe>
            </div>
            
            {order.status === "Out for Delivery" && (
              <div>
                <h3 className="font-medium text-neutral-800 mb-3">Live Tracking</h3>
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-sm text-neutral-600">Estimated Delivery Time</span>
                      <div className="font-medium text-neutral-800">{order.estimatedDeliveryTime}</div>
                    </div>
                    <button className="bg-primary-50 hover:bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-lg transition duration-200 flex items-center">
                      <Icon name="RefreshCw" size={14} className="mr-1" />
                      Refresh
                    </button>
                  </div>
                  
                  <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-2">
                    <div 
                      className="bg-primary-600 h-2.5 rounded-full" 
                      style={{ width: `${order.deliveryProgress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>Picked Up</span>
                    <span>In Transit</span>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === "history" && (
          <div>
            <h3 className="font-medium text-neutral-800 mb-3">Order Timeline</h3>
            <div className="bg-neutral-50 rounded-lg p-4">
              <div className="space-y-4">
                {order.statusHistory.map((status, index) => (
                  <div key={index} className="flex">
                    <div className="mr-3 relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? "bg-primary-100 text-primary-600" : "bg-neutral-200 text-neutral-500"
                      }`}>
                        <Icon name={
                          status.status === "Order Placed" ? "ShoppingBag" : status.status ==="Order Confirmed"? "Check" : status.status ==="Processing"? "Package" : status.status ==="Out for Delivery"? "Truck" : status.status ==="Delivered"? "CheckCircle" : "Clock"
                        } size={16} />
                      </div>
                      {index !== order.statusHistory.length - 1 && (
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-neutral-200"></div>
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="font-medium text-neutral-800">{status.status}</div>
                      <div className="text-sm text-neutral-600">{status.timestamp}</div>
                      {status.note && (
                        <div className="mt-1 text-sm text-neutral-700 bg-white p-2 rounded border border-neutral-200">
                          {status.note}
                        </div>
                      )}
                      {status.by && (
                        <div className="mt-1 text-xs text-neutral-500">
                          By: {status.by}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;