import React, { useState, useEffect } from "react";
import OrderItem from "./OrderItem";
import Icon from "../../../components/AppIcon";

const OrderList = ({ filters }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Mock orders data
  const mockOrders = [
    {
      id: "ORD-7845",
      date: "May 20, 2023",
      status: "Delivered",
      type: "Regular",
      address: "123 Main St, Apt 4B, New York, NY 10001",
      total: "$67.50",
      subtotal: "$62.50",
      deliveryFee: "$5.00",
      paymentMethod: "Credit Card (ending in 4242)",
      deliveryPerson: "Michael R.",
      deliveryDate: "May 22, 2023",
      items: [
        {
          name: "Amoxicillin 500mg",
          quantity: 1,
          price: "$12.99",
          total: "$12.99",
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Vitamin D3 5000 IU",
          quantity: 2,
          price: "$15.99",
          total: "$31.98",
          image: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Digital Thermometer",
          quantity: 1,
          price: "$17.53",
          total: "$17.53",
          image: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: "ORD-7839",
      date: "May 18, 2023",
      status: "Shipped",
      type: "Prescription",
      address: "456 Park Ave, Suite 10C, New York, NY 10022",
      total: "$124.75",
      subtotal: "$119.75",
      deliveryFee: "$5.00",
      paymentMethod: "PayPal",
      deliveryPerson: "Sarah L.",
      items: [
        {
          name: "Lisinopril 10mg",
          quantity: 1,
          price: "$45.99",
          total: "$45.99",
          image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Metformin 500mg",
          quantity: 1,
          price: "$38.50",
          total: "$38.50",
          image: "https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Blood Pressure Monitor",
          quantity: 1,
          price: "$35.26",
          total: "$35.26",
          image: "https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ],
      prescription: {
        id: "PRE-2345",
        doctor: "Dr. Emily Johnson",
        date: "May 15, 2023",
        image: "https://example.com/prescription-image.jpg"
      }
    },
    {
      id: "ORD-7835",
      date: "May 16, 2023",
      status: "Processing",
      type: "Regular",
      address: "789 Broadway, Apt 12D, New York, NY 10003",
      total: "$42.99",
      subtotal: "$37.99",
      deliveryFee: "$5.00",
      paymentMethod: "Credit Card (ending in 5678)",
      items: [
        {
          name: "Ibuprofen 200mg",
          quantity: 1,
          price: "$8.99",
          total: "$8.99",
          image: "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "First Aid Kit",
          quantity: 1,
          price: "$29.00",
          total: "$29.00",
          image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: "ORD-7829",
      date: "May 15, 2023",
      status: "Delivered",
      type: "Emergency",
      address: "321 5th Ave, New York, NY 10016",
      total: "$78.50",
      subtotal: "$68.50",
      deliveryFee: "$10.00",
      paymentMethod: "Credit Card (ending in 9012)",
      deliveryPerson: "David K.",
      deliveryDate: "May 15, 2023",
      items: [
        {
          name: "EpiPen Auto-Injector",
          quantity: 1,
          price: "$68.50",
          total: "$68.50",
          image: "https://images.unsplash.com/photo-1631549916768-4119b4220292?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: "ORD-7814",
      date: "May 10, 2023",
      status: "Delivered",
      type: "Regular",
      address: "555 W 42nd St, Apt 3F, New York, NY 10036",
      total: "$23.75",
      subtotal: "$18.75",
      deliveryFee: "$5.00",
      paymentMethod: "Apple Pay",
      deliveryPerson: "Jennifer T.",
      deliveryDate: "May 12, 2023",
      items: [
        {
          name: "Acetaminophen 500mg",
          quantity: 1,
          price: "$7.25",
          total: "$7.25",
          image: "https://images.unsplash.com/photo-1550572017-37b34e8a1396?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Allergy Relief Tablets",
          quantity: 1,
          price: "$11.50",
          total: "$11.50",
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: "ORD-7802",
      date: "May 3, 2023",
      status: "Cancelled",
      type: "Regular",
      address: "888 1st Ave, Apt 7G, New York, NY 10022",
      total: "$45.25",
      subtotal: "$40.25",
      deliveryFee: "$5.00",
      paymentMethod: "Credit Card (ending in 3456)",
      items: [
        {
          name: "Multivitamin Tablets",
          quantity: 1,
          price: "$22.75",
          total: "$22.75",
          image: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Zinc Supplements",
          quantity: 1,
          price: "$17.50",
          total: "$17.50",
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ]
    }
  ];

  // Simulate loading orders with a delay
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
      setHasMore(false); // For demo, we're loading all orders at once
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter orders based on selected filters
  const filteredOrders = orders.filter(order => {
    // Filter by search query
    if (filters.searchQuery && !order.id.toLowerCase().includes(filters.searchQuery.toLowerCase()) && 
        !order.items.some(item => item.name.toLowerCase().includes(filters.searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Filter by order status
    if (filters.orderStatus !== "all" && order.status.toLowerCase() !== filters.orderStatus) {
      return false;
    }
    
    // Filter by order type
    if (filters.orderType !== "all" && (!order.type || order.type.toLowerCase() !== filters.orderType)) {
      return false;
    }
    
    // For demo purposes, we're not implementing date range filtering
    
    return true;
  });

  // Load more orders (for infinite scrolling)
  const loadMore = () => {
    if (!hasMore) return;
    
    setLoading(true);
    
    // Simulate loading more orders
    setTimeout(() => {
      setPage(page + 1);
      setLoading(false);
      
      // For demo, we'll stop after page 2
      if (page >= 1) {
        setHasMore(false);
      }
    }, 1000);
  };

  if (loading && orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center h-64">
        <div className="animate-spin mb-4">
          <Icon name="Loader" size={32} className="text-primary-600" />
        </div>
        <p className="text-neutral-600">Loading your orders...</p>
      </div>
    );
  }

  if (filteredOrders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center h-64">
        <div className="bg-neutral-100 p-4 rounded-full mb-4">
          <Icon name="PackageX" size={32} className="text-neutral-500" />
        </div>
        <h3 className="text-lg font-medium text-neutral-800 mb-2">No Orders Found</h3>
        <p className="text-neutral-600 text-center max-w-md">
          We couldn't find any orders matching your filters. Try adjusting your search criteria or browse all orders.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <p className="text-neutral-600">
          Showing {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}
        </p>
      </div>
      
      {filteredOrders.map(order => (
        <OrderItem key={order.id} order={order} />
      ))}
      
      {loading && (
        <div className="flex justify-center my-4">
          <div className="animate-spin">
            <Icon name="Loader" size={24} className="text-primary-600" />
          </div>
        </div>
      )}
      
      {hasMore && !loading && (
        <div className="flex justify-center my-4">
          <button 
            className="bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center"
            onClick={loadMore}
          >
            <Icon name="ChevronDown" size={18} className="mr-2" />
            Load More Orders
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderList;