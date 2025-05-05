import React from "react";
import Icon from "../../../components/AppIcon";

const UploadSteps = ({ currentStep }) => {
  const steps = [
    { id: 1, name: "Upload Prescription" },
    { id: 2, name: "Review & Confirm" },
    { id: 3, name: "Checkout" },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step.id < currentStep 
                    ? "bg-success-600 text-white" 
                    : step.id === currentStep 
                      ? "bg-primary-600 text-white" :"bg-neutral-200 text-neutral-500"
                }`}
              >
                {step.id < currentStep ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <span className="font-medium">{step.id}</span>
                )}
              </div>
              <span className={`mt-2 text-sm font-medium ${
                step.id === currentStep 
                  ? "text-primary-700" :"text-neutral-600"
              }`}>
                {step.name}
              </span>
            </div>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div 
                className={`flex-1 h-1 mx-4 ${
                  step.id < currentStep ? "bg-success-600" : "bg-neutral-200"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default UploadSteps;