import React from "react";
import Icon from "../../../components/AppIcon";

const UploadInstructions = () => {
  const instructions = [
    {
      icon: "FileImage",
      title: "Acceptable Formats",
      description: "Upload clear images (JPG, PNG) or PDF files of your prescription."
    },
    {
      icon: "CheckCircle",
      title: "Valid Prescription",
      description: "Ensure your prescription is current, legible, and includes doctor\'s signature."
    },
    {
      icon: "Lock",
      title: "Secure & Private",
      description: "Your prescription data is encrypted and handled with strict confidentiality."
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="font-display font-semibold text-lg text-neutral-800 mb-4">
        Prescription Upload Guidelines
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {instructions.map((item, index) => (
          <div key={index} className="flex">
            <div className="bg-primary-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-3 flex-shrink-0">
              <Icon name={item.icon} size={20} color="var(--color-primary-600)" />
            </div>
            <div>
              <h3 className="font-medium text-neutral-800 mb-1">{item.title}</h3>
              <p className="text-sm text-neutral-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadInstructions;