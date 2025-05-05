import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
            <h1 className="display-large mb-4">
              1-Hour Emergency Medicine Delivery, 24x7
            </h1>
            <p className="body-large mb-8 text-primary-100">
              Get your essential medications delivered to your doorstep within 60 minutes. 
              We're here for you around the clock, ensuring you never have to worry about 
              medical emergencies.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/prescription-upload" className="px-6 py-3 bg-white text-primary-700 rounded-lg font-medium flex items-center hover:bg-neutral-100 transition-colors shadow-lg"
              >
                <Icon name="FileUp" size={20} className="mr-2" />
                <span>Upload Prescription</span>
              </Link>
              <Link 
                to="/medicine-catalog" className="px-6 py-3 bg-primary-700 text-white border border-primary-400 rounded-lg font-medium flex items-center hover:bg-primary-800 transition-colors"
              >
                <Icon name="Search" size={20} className="mr-2" />
                <span>Browse Medicines</span>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Emergency Medicine Delivery" className="w-full h-auto"
              />
            </div>
            <div className="absolute top-8 -right-4 bg-white p-4 rounded-lg shadow-lg z-20 hidden md:block">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center mr-3">
                  <Icon name="Clock" size={20} className="text-success-600" />
                </div>
                <div>
                  <p className="label-medium text-neutral-800">Average Delivery Time</p>
                  <p className="heading-medium text-primary-600">42 minutes</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg z-20 hidden md:block">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <Icon name="Users" size={20} className="text-primary-600" />
                </div>
                <div>
                  <p className="label-medium text-neutral-800">Happy Customers</p>
                  <p className="heading-medium text-primary-600">50,000+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;