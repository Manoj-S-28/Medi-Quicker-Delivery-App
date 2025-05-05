import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const OrderTimeline = ({ timeline }) => {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (index) => {
    if (expandedStep === index) {
      setExpandedStep(null);
    } else {
      setExpandedStep(index);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return { name: "CheckCircle", className: "text-success-600" };
      case "in-progress":
        return { name: "Clock", className: "text-primary-600" };
      case "pending":
        return { name: "Circle", className: "text-neutral-400" };
      default:
        return { name: "Circle", className: "text-neutral-400" };
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-display font-semibold text-neutral-800 mb-4">Order Timeline</h2>
      
      <div className="space-y-4">
        {timeline.map((step, index) => {
          const isLast = index === timeline.length - 1;
          const icon = getStatusIcon(step.status);
          
          return (
            <div key={index} className="relative">
              <div 
                className={`flex cursor-pointer ${expandedStep === index ? "mb-3" : ""}`}
                onClick={() => toggleStep(index)}
              >
                <div className="mr-4 relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.status === "completed" ? "bg-success-100" : step.status ==="in-progress" ? "bg-primary-100" : "bg-neutral-100"
                  }`}>
                    <Icon name={icon.name} size={18} className={icon.className} />
                  </div>
                  {!isLast && (
                    <div className={`absolute top-8 left-4 w-0.5 h-full ${
                      step.status === "completed" ? "bg-success-600" : step.status ==="in-progress" ? "bg-primary-600" : "bg-neutral-300"
                    }`}></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-neutral-800">{step.title}</h3>
                    <div className="flex items-center">
                      <span className="text-sm text-neutral-500 mr-2">{step.time}</span>
                      <Icon 
                        name={expandedStep === index ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                        className="text-neutral-400" 
                      />
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600">{step.subtitle}</p>
                </div>
              </div>
              
              {expandedStep === index && (
                <div className="ml-12 p-4 bg-neutral-50 rounded-lg">
                  <p className="text-sm text-neutral-700 mb-2">{step.description}</p>
                  {step.details && (
                    <div className="text-sm text-neutral-600">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start mb-1">
                          <Icon name="Check" size={14} className="text-primary-600 mr-2 mt-1" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {step.actionButton && (
                    <button 
                      className="mt-3 text-sm bg-primary-50 text-primary-700 px-3 py-1.5 rounded-md hover:bg-primary-100 transition duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Action clicked: ${step.actionButton}`);
                      }}
                    >
                      {step.actionButton}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;