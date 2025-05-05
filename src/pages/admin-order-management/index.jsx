import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import OrderList from "./components/OrderList";
import OrderDetail from "./components/OrderDetail";
import Icon from "../../components/AppIcon";

const AdminOrderManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  
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

  // Mock orders data
  const orders = [
    {
      id: "ORD-8721",
      customerName: "Emily Johnson",
      orderDate: "2023-05-16T14:30:00",
      status: "New",
      isEmergency: true,
      emergencyDeadline: new Date(Date.now() + 35 * 60000).toISOString(), // 35 minutes from now
      deliveryZone: "North",
      items: [
        { name: "Insulin NovoRapid", sku: "MED-1234", quantity: 2, price: 45.99, inStock: true },
        { name: "Blood Pressure Monitor", sku: "DEV-5678", quantity: 1, price: 89.99, inStock: true },
        { name: "Glucose Test Strips", sku: "SUP-9012", quantity: 3, price: 12.50, inStock: true }
      ],
      subtotal: 173.97,
      deliveryFee: 5.99,
      emergencyFee: 15.00,
      tax: 19.50,
      total: 214.46,
      paymentMethod: "Credit Card (Visa ****4582)",
      customer: {
        id: "CUST-4567",
        name: "Emily Johnson",
        email: "emily.johnson@example.com",
        phone: "+1 (555) 123-4567",
        alternativePhone: "+1 (555) 987-6543",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        orderCount: 5,
        lastOrderDate: "May 10, 2023"
      },
      prescription: {
        doctorName: "Dr. Michael Chen",
        hospital: "City General Hospital",
        dateIssued: "May 15, 2023",
        validUntil: "August 15, 2023",
        isVerified: false,
        verifiedBy: null,
        verificationTime: null,
        images: [
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          "https://images.unsplash.com/photo-1583912086096-8c60d75a13c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
        ]
      },
      deliveryAddress: {
        street: "123 Maple Street, Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        instructions: "Please ring doorbell twice. Building has elevator."
      },
      deliveryAgent: null,
      deliveryProgress: 0,
      estimatedDeliveryTime: "Today, 3:15 PM",
      statusHistory: [
        {
          status: "Order Placed",
          timestamp: "May 16, 2023, 2:30 PM",
          by: "Customer (Mobile App)"
        },
        {
          status: "Order Confirmed",
          timestamp: "May 16, 2023, 2:32 PM",
          by: "System",
          note: "Emergency order flagged for priority processing"
        }
      ]
    },
    {
      id: "ORD-8715",
      customerName: "Robert Smith",
      orderDate: "2023-05-16T10:15:00",
      status: "Processing",
      isEmergency: false,
      deliveryZone: "Central",
      items: [
        { name: "Amoxicillin 500mg", sku: "MED-3456", quantity: 1, price: 12.99, inStock: true },
        { name: "Ibuprofen 200mg", sku: "MED-7890", quantity: 2, price: 8.50, inStock: true }
      ],
      subtotal: 29.99,
      deliveryFee: 3.99,
      emergencyFee: 0,
      tax: 3.40,
      total: 37.38,
      paymentMethod: "PayPal",
      customer: {
        id: "CUST-7890",
        name: "Robert Smith",
        email: "robert.smith@example.com",
        phone: "+1 (555) 234-5678",
        alternativePhone: null,
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        orderCount: 2,
        lastOrderDate: "April 28, 2023"
      },
      prescription: null,
      deliveryAddress: {
        street: "456 Oak Avenue",
        city: "New York",
        state: "NY",
        zipCode: "10002",
        instructions: "Leave with doorman if not home"
      },
      deliveryAgent: null,
      deliveryProgress: 0,
      estimatedDeliveryTime: "Today, 4:30 PM",
      statusHistory: [
        {
          status: "Order Placed",
          timestamp: "May 16, 2023, 10:15 AM",
          by: "Customer (Website)"
        },
        {
          status: "Order Confirmed",
          timestamp: "May 16, 2023, 10:17 AM",
          by: "System"
        },
        {
          status: "Processing",
          timestamp: "May 16, 2023, 10:45 AM",
          by: "Sarah Admin",
          note: "All items verified in stock"
        }
      ]
    },
    {
      id: "ORD-8709",
      customerName: "David Wilson",
      orderDate: "2023-05-15T16:20:00",
      status: "Out for Delivery",
      isEmergency: true,
      emergencyDeadline: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago (overdue)
      deliveryZone: "East",
      items: [
        { name: "EpiPen Auto-Injector", sku: "MED-5678", quantity: 1, price: 125.99, inStock: true },
        { name: "Antihistamine Tablets", sku: "MED-9012", quantity: 1, price: 15.50, inStock: true }
      ],
      subtotal: 141.49,
      deliveryFee: 0, // Free for emergency
      emergencyFee: 20.00,
      tax: 16.15,
      total: 177.64,
      paymentMethod: "Credit Card (Mastercard ****7890)",
      customer: {
        id: "CUST-1234",
        name: "David Wilson",
        email: "david.wilson@example.com",
        phone: "+1 (555) 345-6789",
        alternativePhone: null,
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        orderCount: 8,
        lastOrderDate: "May 5, 2023"
      },
      prescription: null,
      deliveryAddress: {
        street: "789 Pine Street",
        city: "New York",
        state: "NY",
        zipCode: "10003",
        instructions: "Call upon arrival"
      },
      deliveryAgent: {
        id: "DA-456",
        name: "Marcus Johnson",
        avatar: "https://randomuser.me/api/portraits/men/36.jpg",
        status: "Active",
        vehicle: "Motorcycle",
        rating: 4.8,
        deliveriesToday: 6
      },
      deliveryProgress: 75,
      estimatedDeliveryTime: "Today, 2:45 PM",
      statusHistory: [
        {
          status: "Order Placed",
          timestamp: "May 15, 2023, 4:20 PM",
          by: "Customer (Mobile App)"
        },
        {
          status: "Order Confirmed",
          timestamp: "May 15, 2023, 4:22 PM",
          by: "System",
          note: "Emergency order flagged for priority processing"
        },
        {
          status: "Processing",
          timestamp: "May 15, 2023, 4:30 PM",
          by: "James Admin"
        },
        {
          status: "Ready for Pickup",
          timestamp: "May 15, 2023, 4:45 PM",
          by: "Pharmacy Staff"
        },
        {
          status: "Out for Delivery",
          timestamp: "May 15, 2023, 5:00 PM",
          by: "System",
          note: "Assigned to Marcus Johnson"
        }
      ]
    },
    {
      id: "ORD-8702",
      customerName: "Sophia Martinez",
      orderDate: "2023-05-15T09:45:00",
      status: "Delivered",
      isEmergency: false,
      deliveryZone: "South",
      items: [
        { name: "Vitamin D Supplements", sku: "SUP-1234", quantity: 1, price: 18.99, inStock: true },
        { name: "Calcium Tablets", sku: "SUP-5678", quantity: 1, price: 15.50, inStock: true },
        { name: "Digital Thermometer", sku: "DEV-9012", quantity: 1, price: 22.99, inStock: true }
      ],
      subtotal: 57.48,
      deliveryFee: 3.99,
      emergencyFee: 0,
      tax: 6.15,
      total: 67.62,
      paymentMethod: "Apple Pay",
      customer: {
        id: "CUST-5678",
        name: "Sophia Martinez",
        email: "sophia.martinez@example.com",
        phone: "+1 (555) 456-7890",
        alternativePhone: null,
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        orderCount: 3,
        lastOrderDate: "May 15, 2023"
      },
      prescription: null,
      deliveryAddress: {
        street: "321 Elm Street",
        city: "New York",
        state: "NY",
        zipCode: "10004",
        instructions: "Leave at front door"
      },
      deliveryAgent: {
        id: "DA-789",
        name: "Alicia Chen",
        avatar: "https://randomuser.me/api/portraits/women/56.jpg",
        status: "Active",
        vehicle: "Car",
        rating: 4.9,
        deliveriesToday: 8
      },
      deliveryProgress: 100,
      estimatedDeliveryTime: "Delivered at 11:30 AM",
      statusHistory: [
        {
          status: "Order Placed",
          timestamp: "May 15, 2023, 9:45 AM",
          by: "Customer (Website)"
        },
        {
          status: "Order Confirmed",
          timestamp: "May 15, 2023, 9:47 AM",
          by: "System"
        },
        {
          status: "Processing",
          timestamp: "May 15, 2023, 10:00 AM",
          by: "Sarah Admin"
        },
        {
          status: "Ready for Pickup",
          timestamp: "May 15, 2023, 10:30 AM",
          by: "Pharmacy Staff"
        },
        {
          status: "Out for Delivery",
          timestamp: "May 15, 2023, 10:45 AM",
          by: "System",
          note: "Assigned to Alicia Chen"
        },
        {
          status: "Delivered",
          timestamp: "May 15, 2023, 11:30 AM",
          by: "Alicia Chen",
          note: "Left at front door as instructed"
        }
      ]
    },
    {
      id: "ORD-8695",
      customerName: "James Brown",
      orderDate: "2023-05-14T14:10:00",
      status: "Cancelled",
      isEmergency: false,
      deliveryZone: "West",
      items: [
        { name: "Cough Syrup", sku: "MED-2345", quantity: 1, price: 9.99, inStock: true },
        { name: "Throat Lozenges", sku: "MED-6789", quantity: 2, price: 5.50, inStock: false }
      ],
      subtotal: 20.99,
      deliveryFee: 3.99,
      emergencyFee: 0,
      tax: 2.50,
      total: 27.48,
      paymentMethod: "Credit Card (Visa ****1234)",
      customer: {
        id: "CUST-9012",
        name: "James Brown",
        email: "james.brown@example.com",
        phone: "+1 (555) 567-8901",
        alternativePhone: null,
        avatar: "https://randomuser.me/api/portraits/men/55.jpg",
        orderCount: 1,
        lastOrderDate: "May 14, 2023"
      },
      prescription: null,
      deliveryAddress: {
        street: "987 Cedar Road",
        city: "New York",
        state: "NY",
        zipCode: "10005",
        instructions: null
      },
      deliveryAgent: null,
      deliveryProgress: 0,
      estimatedDeliveryTime: "Cancelled",
      statusHistory: [
        {
          status: "Order Placed",
          timestamp: "May 14, 2023, 2:10 PM",
          by: "Customer (Mobile App)"
        },
        {
          status: "Order Confirmed",
          timestamp: "May 14, 2023, 2:12 PM",
          by: "System"
        },
        {
          status: "Processing",
          timestamp: "May 14, 2023, 2:30 PM",
          by: "Sarah Admin"
        },
        {
          status: "Cancelled",
          timestamp: "May 14, 2023, 2:45 PM",
          by: "James Brown",
          note: "Customer requested cancellation due to item out of stock"
        }
      ]
    }
  ];

  // Find the selected order
  const selectedOrder = orders.find(order => order.id === selectedOrderId);

  // Handle order selection
  const handleSelectOrder = (orderId) => {
    setSelectedOrderId(orderId);
  };

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
          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="bg-primary-100 p-3 rounded-full mr-4">
                <Icon name="Package" size={24} color="var(--color-primary-600)" />
              </div>
              <div>
                <div className="text-sm text-neutral-500">Total Orders</div>
                <div className="text-xl font-semibold text-neutral-800">42</div>
                <div className="text-xs text-success-600">
                  <Icon name="TrendingUp" size={12} className="inline mr-1" />
                  +12% from yesterday
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="bg-emergency-100 p-3 rounded-full mr-4">
                <Icon name="AlertTriangle" size={24} color="var(--color-emergency-600)" />
              </div>
              <div>
                <div className="text-sm text-neutral-500">Emergency Orders</div>
                <div className="text-xl font-semibold text-neutral-800">5</div>
                <div className="text-xs text-neutral-500">
                  2 require immediate attention
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="bg-warning-100 p-3 rounded-full mr-4">
                <Icon name="Clock" size={24} color="var(--color-warning-500)" />
              </div>
              <div>
                <div className="text-sm text-neutral-500">Processing</div>
                <div className="text-xl font-semibold text-neutral-800">12</div>
                <div className="text-xs text-warning-500">
                  <Icon name="Clock" size={12} className="inline mr-1" />
                  3 approaching deadline
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="bg-success-100 p-3 rounded-full mr-4">
                <Icon name="CheckCircle" size={24} color="var(--color-success-600)" />
              </div>
              <div>
                <div className="text-sm text-neutral-500">Delivered Today</div>
                <div className="text-xl font-semibold text-neutral-800">25</div>
                <div className="text-xs text-success-600">
                  <Icon name="TrendingUp" size={12} className="inline mr-1" />
                  98% on-time rate
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Management Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-240px)]">
            {/* Order List - 1/3 width on large screens */}
            <div className="lg:col-span-1">
              <OrderList 
                orders={orders} 
                selectedOrderId={selectedOrderId} 
                onSelectOrder={handleSelectOrder} 
              />
            </div>
            
            {/* Order Detail - 2/3 width on large screens */}
            <div className="lg:col-span-2">
              <OrderDetail order={selectedOrder} />
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

export default AdminOrderManagement;