import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";

// Import components
import Header from "../user-dashboard/components/Header";
import Sidebar from "../user-dashboard/components/Sidebar";
import UploadSteps from "./components/UploadSteps";
import UploadInstructions from "./components/UploadInstructions";
import UploadArea from "./components/UploadArea";
import FilePreview from "./components/FilePreview";
import DeliveryOptions from "./components/DeliveryOptions";

const PrescriptionUpload = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [files, setFiles] = useState([]);
  const [isEmergency, setIsEmergency] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleFilesSelected = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles).map(file => ({
      ...file,
      rotation: 0
    }));
    setFiles([...files, ...newFiles]);
    
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    
    if (newFiles.length === 0 && currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleRotateFile = (index) => {
    const newFiles = [...files];
    newFiles[index] = {
      ...newFiles[index],
      rotation: ((newFiles[index].rotation || 0) + 90) % 360
    };
    setFiles(newFiles);
  };

  const handleProceedToCheckout = () => {
    // In a real application, you would process the files and save them
    // For now, we'll just navigate to the checkout page
    navigate("/cart-checkout");
  };

  const handleContinueShopping = () => {
    navigate("/medicine-catalog");
  };

  return (
    <div className={`flex h-screen bg-neutral-50 ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          toggleSidebar={toggleSidebar} 
          toggleDarkMode={toggleDarkMode} 
          isDarkMode={darkMode} 
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-display font-bold text-neutral-800 mb-1">
              Upload Prescription
            </h1>
            <p className="text-neutral-600">
              Upload your prescription to order medicines securely
            </p>
          </div>
          
          {/* Upload Steps */}
          <UploadSteps currentStep={currentStep} />
          
          {/* Upload Instructions */}
          <UploadInstructions />
          
          {/* Main Upload Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            {files.length === 0 ? (
              <UploadArea onFilesSelected={handleFilesSelected} />
            ) : (
              <>
                <FilePreview 
                  files={files} 
                  onRemove={handleRemoveFile} 
                  onRotate={handleRotateFile} 
                />
                
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setFiles([])}
                    className="bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center mr-3"
                  >
                    <Icon name="RefreshCw" size={18} className="mr-2" />
                    Upload Different Files
                  </button>
                  
                  <button
                    onClick={handleFilesSelected}
                    className="bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center"
                  >
                    <Icon name="Plus" size={18} className="mr-2" />
                    Add More Files
                  </button>
                </div>
              </>
            )}
          </div>
          
          {/* Delivery Options - Only show if files are uploaded */}
          {files.length > 0 && (
            <DeliveryOptions 
              isEmergency={isEmergency}
              setIsEmergency={setIsEmergency}
              specialInstructions={specialInstructions}
              setSpecialInstructions={setSpecialInstructions}
            />
          )}
          
          {/* Action Buttons - Only show if files are uploaded */}
          {files.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-end mt-6 space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleContinueShopping}
                className="bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
              >
                <Icon name="ShoppingBag" size={18} className="mr-2" />
                Continue Shopping
              </button>
              
              <button
                onClick={handleProceedToCheckout}
                className={`font-medium py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center ${
                  isEmergency 
                    ? "bg-emergency-600 hover:bg-emergency-700 text-white" :"bg-primary-600 hover:bg-primary-700 text-white"
                }`}
              >
                <Icon name={isEmergency ? "Zap" : "ShoppingCart"} size={18} className="mr-2" color="white" />
                {isEmergency ? "Proceed to Emergency Checkout" : "Proceed to Checkout"}
              </button>
            </div>
          )}
          
          {/* Emergency Notice - Only show if emergency is selected */}
          {files.length > 0 && isEmergency && (
            <div className="mt-4 p-4 bg-emergency-100 border border-emergency-300 rounded-lg flex items-start">
              <Icon name="AlertTriangle" size={20} className="text-emergency-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-emergency-700 font-medium">Emergency Delivery Selected</p>
                <p className="text-emergency-600 text-sm">
                  Your order will be prioritized for delivery within 1 hour. Additional charges may apply.
                </p>
              </div>
            </div>
          )}
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-neutral-200 py-4 px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-2 md:mb-0 text-neutral-500 text-sm">
              &copy; {new Date().getFullYear()} MediQuick. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-500 hover:text-primary-600 text-sm">Privacy Policy</a>
              <a href="#" className="text-neutral-500 hover:text-primary-600 text-sm">Terms of Service</a>
              <a href="#" className="text-neutral-500 hover:text-primary-600 text-sm">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PrescriptionUpload;