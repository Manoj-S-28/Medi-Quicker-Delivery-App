import React, { useState } from "react";
import BrandingSection from "./components/BrandingSection";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Branding Section - Left side on desktop, top on mobile */}
      <div className="bg-primary-700 lg:w-1/2 p-8 lg:p-12">
        <div className="max-w-md mx-auto h-full">
          <BrandingSection />
        </div>
      </div>
      
      {/* Login Form - Right side on desktop, bottom on mobile */}
      <div className="bg-white lg:w-1/2 p-8 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;