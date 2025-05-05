import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const BrandingSection = () => {
  const features = [
    {
      icon: "Clock",
      title: "Emergency Delivery",
      description: "Get critical medications delivered within 1 hour",
    },
    {
      icon: "Calendar",
      title: "24/7 Service",
      description: "We\'re available round the clock for your medical needs",
    },
    {
      icon: "Shield",
      title: "Secure & Verified",
      description: "All medicines are verified and securely delivered",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className="bg-primary-600 text-white p-2 rounded-lg mr-2">
            <Icon name="Stethoscope" size={24} />
          </div>
          <span className="font-display font-bold text-2xl text-white">MediQuick</span>
        </div>
      </div>
      
      {/* Hero image */}
      <div className="mb-8 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Emergency medical delivery" className="w-full h-48 object-cover"
        />
      </div>
      
      {/* Tagline */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-4">
          Your Health Emergency Partner
        </h1>
        <p className="text-primary-100 text-lg">
          Fast, reliable delivery of essential medications when you need them most.
        </p>
      </div>
      
      {/* Features */}
      <div className="space-y-6 mt-auto">
        {features.map((feature, index) => (
          <div key={index} className="flex">
            <div className="bg-primary-400 bg-opacity-20 p-2 rounded-lg mr-4">
              <Icon name={feature.icon} size={20} color="white" />
            </div>
            <div>
              <h3 className="font-medium text-white">{feature.title}</h3>
              <p className="text-primary-100 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-primary-700 text-primary-200 text-sm">
        <p>&copy; {new Date().getFullYear()} MediQuick. All rights reserved.</p>
      </div>
    </div>
  );
};

export default BrandingSection;