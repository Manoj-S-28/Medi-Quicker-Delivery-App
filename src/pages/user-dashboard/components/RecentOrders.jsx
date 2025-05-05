import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const RecentOrders = () => {
  const recentOrders = [
    {
      id: "ORD-7829",
      date: "May 15, 2023",
      items: 3,
      total: "$42.99",
      status: "Delivered",
      statusColor: "success",
    },
    {
      id: "ORD-7814",
      date: "May 10, 2023",
      items: 5,
      total: "$78.50",
      status: "Processing",
      statusColor: "warning",
    },
    {
      id: "ORD-7802",
      date: "May 3, 2023",
      items: 2,
      total: "$23.75",
      status: "Delivered",
      statusColor: "success",
    },
  ];

  const getStatusClasses = (statusColor) => {
    switch (statusColor) {
      case "success":
        return "bg-success-100 text-success-600";
      case "warning":
        return "bg-warning-100 text-warning-500";
      case "error":
        return "bg-error-100 text-error-600";
      default:
        return "bg-neutral-100 text-neutral-600";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-display font-semibold text-neutral-800">Recent Orders</h2>
        <Link to="/order-history" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
          View All <Icon name="ChevronRight" size={16} className="ml-1" />
        </Link>
      </div>
      
      <div className="overflow-hidden">
        {recentOrders.map((order) => (
          <div key={order.id} className="border-b border-neutral-200 last:border-0 py-4 flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <span className="font-medium text-neutral-800">{order.id}</span>
                <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(order.statusColor)}`}>
                  {order.status}
                </span>
              </div>
              <div className="text-sm text-neutral-500">
                {order.date} • {order.items} items • {order.total}
              </div>
            </div>
            <div className="flex mt-3 sm:mt-0">
              <Link 
                to={`/order-tracking?id=${order.id}`}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium mr-4 flex items-center"
              >
                <Icon name="MapPin" size={16} className="mr-1" />
                Track
              </Link>
              <button 
                className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                onClick={() => console.log(`Reordering ${order.id}`)}
              >
                <Icon name="RefreshCw" size={16} className="mr-1" />
                Reorder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;