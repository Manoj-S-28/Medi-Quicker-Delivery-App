import React from "react";
import Icon from "../../../components/AppIcon";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "order_created",
      message: "New emergency order #ORD-7835 created by Emily Johnson",
      time: "10 minutes ago",
      icon: "AlertCircle",
      color: "emergency",
    },
    {
      id: 2,
      type: "order_assigned",
      message: "Order #ORD-7834 assigned to delivery agent Michael R.",
      time: "25 minutes ago",
      icon: "UserCheck",
      color: "primary",
    },
    {
      id: 3,
      type: "order_delivered",
      message: "Order #ORD-7830 successfully delivered to customer",
      time: "1 hour ago",
      icon: "CheckCircle",
      color: "success",
    },
    {
      id: 4,
      type: "inventory_alert",
      message: "Low stock alert: Amoxicillin 500mg (5 units remaining)",
      time: "2 hours ago",
      icon: "AlertTriangle",
      color: "warning",
    },
    {
      id: 5,
      type: "support_query",
      message: "New support query from David Rodriguez regarding order #ORD-7825",
      time: "3 hours ago",
      icon: "MessageCircle",
      color: "info",
    },
  ];

  const getIconColor = (color) => {
    switch (color) {
      case "primary":
        return "var(--color-primary-600)";
      case "success":
        return "var(--color-success-600)";
      case "warning":
        return "var(--color-warning-500)";
      case "error":
        return "var(--color-error-600)";
      case "info":
        return "var(--color-info-600)";
      case "emergency":
        return "var(--color-emergency-600)";
      default:
        return "var(--color-neutral-600)";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-display font-semibold text-neutral-800 mb-4">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex">
            <div className="mr-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-${activity.color}-100`}>
                <Icon name={activity.icon} size={16} color={getIconColor(activity.color)} />
              </div>
            </div>
            <div>
              <p className="text-neutral-700">{activity.message}</p>
              <p className="text-xs text-neutral-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-4 w-full text-primary-600 hover:text-primary-700 text-sm font-medium py-2 border-t border-neutral-200">
        View All Activity
      </button>
    </div>
  );
};

export default RecentActivity;