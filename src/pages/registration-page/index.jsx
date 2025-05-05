import React from "react";
import { Helmet } from "react-helmet";
import BrandSection from "./components/BrandSection";
import RegistrationForm from "./components/RegistrationForm";

const RegistrationPage = () => {
  return (
    <>
      <Helmet>
        <title>Create Account | MediQuick</title>
        <meta name="description" content="Register for MediQuick emergency medicine delivery service" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Brand Section - Left Side (Hidden on mobile) */}
        <div className="hidden lg:block lg:w-1/2 bg-primary-600">
          <BrandSection />
        </div>
        
        {/* Registration Form - Right Side */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Logo - Only visible on small screens */}
          <div className="lg:hidden bg-primary-600 text-white p-6 flex items-center">
            <div className="bg-white text-primary-600 p-1.5 rounded-lg mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span className="font-display font-bold text-xl">MediQuick</span>
          </div>
          
          {/* Form Container */}
          <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
            <RegistrationForm />
          </div>
          
          {/* Footer */}
          <footer className="p-6 border-t border-neutral-200 text-center text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} MediQuick. All rights reserved.
          </footer>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;