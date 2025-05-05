import React from "react";
import Icon from "../../../components/AppIcon";

const CheckoutSteps = ({ currentStep, totalSteps, goToStep }) => {
  const steps = [
    { name: "Cart", icon: "ShoppingCart" },
    { name: "Delivery", icon: "MapPin" },
    { name: "Payment", icon: "CreditCard" },
    { name: "Review", icon: "ClipboardCheck" }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div 
              className={`flex flex-col items-center ${
                index < currentStep 
                  ? "text-success-600 cursor-pointer" 
                  : index === currentStep 
                    ? "text-primary-600" :"text-neutral-400"
              }`}
              onClick={() => index < currentStep && goToStep(index)}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                index < currentStep 
                  ? "bg-success-100" 
                  : index === currentStep 
                    ? "bg-primary-100" :"bg-neutral-100"
              }`}>
                {index < currentStep ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={step.icon} size={20} />
                )}
              </div>
              <span className="text-sm font-medium">{step.name}</span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`flex-grow h-1 mx-2 ${
                index < currentStep ? "bg-success-600" : "bg-neutral-200"
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;