import React from "react";
import Icon from "../../../components/AppIcon";

const MetricsCards = () => {
  const metrics = [
    {
      title: "Active Orders",
      value: "24",
      change: "+12%",
      isPositive: true,
      icon: "ShoppingBag",
      color: "primary",
    },
    {
      title: "Pending Deliveries",
      value: "18",
      change: "+5%",
      isPositive: true,
      icon: "Truck",
      color: "warning",
    },
    {
      title: "Avg. Delivery Time",
      value: "42 min",
      change: "-8%",
      isPositive: true,
      icon: "Clock",
      color: "success",
    },
    {
      title: "Daily Revenue",
      value: "$2,845",
      change: "+15%",
      isPositive: true,
      icon: "DollarSign",
      color: "info",
    },
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case "primary":
        return {
          bg: "bg-primary-100",
          text: "text-primary-600",
          icon: "var(--color-primary-600)",
        };
      case "warning":
        return {
          bg: "bg-warning-100",
          text: "text-warning-500",
          icon: "var(--color-warning-500)",
        };
      case "success":
        return {
          bg: "bg-success-100",
          text: "text-success-600",
          icon: "var(--color-success-600)",
        };
      case "info":
        return {
          bg: "bg-info-100",
          text: "text-info-600",
          icon: "var(--color-info-600)",
        };
      case "emergency":
        return {
          bg: "bg-emergency-100",
          text: "text-emergency-600",
          icon: "var(--color-emergency-600)",
        };
      default:
        return {
          bg: "bg-neutral-100",
          text: "text-neutral-600",
          icon: "var(--color-neutral-600)",
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => {
        const colorClasses = getColorClasses(metric.color);
        
        return (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-neutral-500 text-sm mb-1">{metric.title}</p>
                <h3 className="text-2xl font-display font-bold text-neutral-800">{metric.value}</h3>
              </div>
              <div className={`${colorClasses.bg} p-3 rounded-full`}>
                <Icon name={metric.icon} size={24} color={colorClasses.icon} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${metric.isPositive ? 'text-success-600' : 'text-emergency-600'}`}>
                {metric.change}
              </span>
              <Icon 
                name={metric.isPositive ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={`ml-1 ${metric.isPositive ? 'text-success-600' : 'text-emergency-600'}`} 
              />
              <span className="text-neutral-500 text-sm ml-2">vs last week</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsCards;