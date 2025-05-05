import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";

// Import components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import OrderSummary from "./components/OrderSummary";
import DeliveryMap from "./components/DeliveryMap";
import OrderTimeline from "./components/OrderTimeline";
import DeliveryActions from "./components/DeliveryActions";
import SpecialInstructions from "./components/SpecialInstructions";
import OrderItems from "./components/OrderItems";

const OrderTracking = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real application, you would apply dark mode classes to the root element
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Mock order data
  const orderData = {
    orderNumber: "ORD-7835",
    status: "In Transit",
    placedDate: "May 16, 2023",
    placedTime: "9:30 AM",
    estimatedDelivery: "Today, 2:30 PM",
    eta: "15 minutes",
    distance: "1.2 miles",
    totalAmount: 78.50,
    items: [
      {
        id: 1,
        name: "Lisinopril 10mg",
        quantity: 1,
        price: 24.99,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        prescription: true
      },
      {
        id: 2,
        name: "Digital Blood Pressure Monitor",
        quantity: 1,
        price: 45.50,
        image: "https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        prescription: false
      },
      {
        id: 3,
        name: "Vitamin D3 Supplements",
        quantity: 1,
        price: 8.99,
        image: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        prescription: false
      }
    ],
    deliveryLocation: {
      lat: 37.7749,
      lng: -122.4194,
      address: "123 Main St, San Francisco, CA 94105"
    }
  };

  // Mock timeline data
  const timelineData = [
    {
      title: "Order Placed",
      subtitle: "Your order has been received",
      time: "9:30 AM",
      status: "completed",
      description: "Your order has been successfully placed and payment has been processed.",
      details: [
        "Order confirmation sent to your email",
        "Payment of $78.50 processed successfully"
      ]
    },
    {
      title: "Prescription Verified",
      subtitle: "Your prescription has been validated",
      time: "9:45 AM",
      status: "completed",
      description: "Our pharmacist has verified your prescription for Lisinopril 10mg.",
      details: [
        "Prescription validated by Dr. Johnson",
        "Medication approved for dispensing"
      ],
      actionButton: "View Prescription Details"
    },
    {
      title: "Order Prepared",
      subtitle: "Your medications are being packed",
      time: "10:15 AM",
      status: "completed",
      description: "Your order is being prepared and packed by our pharmacy team.",
      details: [
        "All items in stock and verified",
        "Special handling instructions noted for temperature-sensitive items",
        "Quality check completed"
      ]
    },
    {
      title: "Out for Delivery",
      subtitle: "Your order is on the way",
      time: "11:00 AM",
      status: "in-progress",
      description: "Your order has been picked up by our delivery agent and is on the way to your location.",
      details: [
        "Estimated arrival: 2:30 PM",
        "Delivery by: Michael Rodriguez"
      ],
      actionButton: "Contact Delivery Agent"
    },
    {
      title: "Delivered",
      subtitle: "Pending delivery confirmation",
      time: "Pending",
      status: "pending",
      description: "Your order will be delivered to your specified address.",
      details: [
        "Signature may be required upon delivery",
        "You'll receive a notification once delivered"
      ]
    }
  ];

  // Mock delivery agent data
  const deliveryAgentData = {
    name: "Michael Rodriguez",
    phone: "555-123-4567",
    rating: 4.8,
    photo: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  // Mock special instructions
  const specialInstructionsData = [
    {
      type: "handling",
      title: "Fragile Medical Device",
      description: "The blood pressure monitor is fragile. Please handle with care during delivery."
    },
    {
      type: "storage",
      title: "Temperature Sensitive",
      description: "Some medications in this order need to be kept at room temperature (59-77°F)."
    }
  ];

  return (
    <div className={`flex h-screen bg-neutral-50 ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          toggleSidebar={toggleSidebar} 
          toggleDarkMode={toggleDarkMode} 
          isDarkMode={darkMode} 
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/user-dashboard" className="text-neutral-600 hover:text-primary-600 text-sm font-medium">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <Icon name="ChevronRight" size={16} className="text-neutral-400" />
                    <Link to="/order-history" className="ml-1 text-neutral-600 hover:text-primary-600 text-sm font-medium">
                      Order History
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <Icon name="ChevronRight" size={16} className="text-neutral-400" />
                    <span className="ml-1 text-primary-600 text-sm font-medium">
                      Order #{orderData.orderNumber}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          {/* Order Summary */}
          <OrderSummary order={orderData} />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Map - 2/3 width on large screens */}
            <div className="lg:col-span-2">
              <DeliveryMap order={orderData} />
            </div>
            
            {/* Timeline - 1/3 width on large screens */}
            <div>
              <OrderTimeline timeline={timelineData} />
            </div>
          </div>
          
          {/* Additional Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <OrderItems items={orderData.items} />
            </div>
            
            {/* Delivery Actions and Special Instructions */}
            <div className="space-y-6">
              <DeliveryActions deliveryAgent={deliveryAgentData} />
              <SpecialInstructions instructions={specialInstructionsData} />
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-neutral-200 py-4 px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-2 md:mb-0 text-neutral-500 text-sm">
              &copy; {new Date().getFullYear()} MediQuick. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-500 hover:text-primary-600 text-sm">Privacy Policy</a>
              <a href="#" className="text-neutral-500 hover:text-primary-600 text-sm">Terms of Service</a>
              <a href="#" className="text-neutral-500 hover:text-primary-600 text-sm">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default OrderTracking;