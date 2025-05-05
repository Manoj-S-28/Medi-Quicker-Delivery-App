import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const BrandSection = () => {
  const features = [
    {
      icon: "Clock",
      title: "1-Hour Delivery",
      description: "Get your medications delivered within an hour in emergency situations"
    },
    {
      icon: "Calendar",
      title: "24/7 Service",
      description: "Our service is available round the clock, including holidays"
    },
    {
      icon: "Shield",
      title: "Secure & Verified",
      description: "All medications are verified and securely delivered to your doorstep"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-primary-600 text-white p-8 lg:p-12">
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className="bg-white text-primary-600 p-2 rounded-lg mr-3">
            <Icon name="Stethoscope" size={28} />
          </div>
          <span className="font-display font-bold text-2xl">MediQuick</span>
        </div>
      </div>
      
      {/* Main Image */}
      <div className="mb-8 relative">
        <div className="absolute -top-4 -left-4 bg-primary-500 rounded-full w-20 h-20 opacity-20"></div>
        <div className="relative z-10 rounded-xl overflow-hidden shadow-lg">
          <Image 
            src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
            alt="Medical delivery service" className="w-full h-48 object-cover"
          />
        </div>
        <div className="absolute -bottom-4 -right-4 bg-primary-500 rounded-full w-16 h-16 opacity-20"></div>
      </div>
      
      {/* Tagline */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl mb-4">
          Emergency Medicine Delivery at Your Doorstep
        </h1>
        <p className="text-primary-100 text-lg">
          Join thousands of users who trust MediQuick for their medical needs
        </p>
      </div>
      
      {/* Features */}
      <div className="space-y-6 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex">
            <div className="bg-primary-500 p-2 rounded-lg mr-4 h-10 w-10 flex items-center justify-center flex-shrink-0">
              <Icon name={feature.icon} size={20} />
            </div>
            <div>
              <h3 className="font-medium text-lg">{feature.title}</h3>
              <p className="text-primary-200">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Testimonial */}
      <div className="mt-auto bg-primary-700 rounded-lg p-6 relative">
        <div className="absolute -top-3 left-6 text-primary-500 text-4xl">"</div>
        <p className="text-primary-100 mb-4 pt-2">
          MediQuick has been a lifesaver for my family. Their quick delivery during emergencies has made managing my mother's chronic condition much easier.
        </p>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <Image 
              src="https://randomuser.me/api/portraits/women/45.jpg" 
              alt="Sarah Johnson" className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">Sarah Johnson</p>
            <p className="text-primary-300 text-sm">MediQuick User</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSection;