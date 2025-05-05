import React, { useState } from "react";



// Import components
import Header from "../user-dashboard/components/Header";
import Sidebar from "../user-dashboard/components/Sidebar";
import ProfileHeader from "./components/ProfileHeader";
import PersonalInfoSection from "./components/PersonalInfoSection";
import AddressSection from "./components/AddressSection";
import MedicalInfoSection from "./components/MedicalInfoSection";
import AccountSettingsSection from "./components/AccountSettingsSection";

const UserProfile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Mock user data
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-06-15",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    memberSince: "January 2022",
    membershipTier: "Premium Member",
    verifiedUser: true,
    addresses: [
      {
        id: 1,
        label: "Home",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
        isPrimary: true,
        lat: 40.7128,
        lng: -74.0060
      },
      {
        id: 2,
        label: "Work",
        street: "456 Park Avenue",
        city: "New York",
        state: "NY",
        zipCode: "10022",
        country: "United States",
        isPrimary: false,
        lat: 40.7580,
        lng: -73.9855
      }
    ],
    medicalInfo: {
      allergies: "Penicillin, Peanuts",
      conditions: "Asthma, Hypertension",
      medications: "Lisinopril 10mg daily, Albuterol inhaler as needed",
      bloodType: "O+",
      emergencyContact: {
        name: "Jane Doe",
        relationship: "Spouse",
        phone: "+1 (555) 987-6543"
      }
    },
    accountSettings: {
      passwordLastChanged: "3 months ago",
      notifications: {
        email: true,
        sms: true,
        push: false,
        marketing: false
      },
      darkMode: false
    }
  });
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real application, you would apply dark mode classes to the root element
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Handler functions for updating user data
  const handleEditPhoto = () => {
    // In a real app, this would open a file picker
    console.log("Edit profile photo");
  };
  
  const handlePersonalInfoSave = (data) => {
    setUserData(prev => ({
      ...prev,
      ...data
    }));
    console.log("Personal info updated:", data);
  };
  
  const handleAddressSave = (address) => {
    let updatedAddresses;
    
    if (address.id) {
      // Update existing address
      updatedAddresses = userData.addresses.map(addr => 
        addr.id === address.id ? address : addr
      );
    } else {
      // Add new address with a new ID
      const newId = Math.max(...userData.addresses.map(a => a.id)) + 1;
      updatedAddresses = [...userData.addresses, { ...address, id: newId }];
    }
    
    // If the new/updated address is primary, make all others non-primary
    if (address.isPrimary) {
      updatedAddresses = updatedAddresses.map(addr => ({
        ...addr,
        isPrimary: addr.id === (address.id || newId)
      }));
    }
    
    setUserData(prev => ({
      ...prev,
      addresses: updatedAddresses
    }));
    
    console.log("Address saved:", address);
  };
  
  const handleAddressDelete = (addressId) => {
    const updatedAddresses = userData.addresses.filter(addr => addr.id !== addressId);
    setUserData(prev => ({
      ...prev,
      addresses: updatedAddresses
    }));
    console.log("Address deleted:", addressId);
  };
  
  const handleSetPrimaryAddress = (addressId) => {
    const updatedAddresses = userData.addresses.map(addr => ({
      ...addr,
      isPrimary: addr.id === addressId
    }));
    
    setUserData(prev => ({
      ...prev,
      addresses: updatedAddresses
    }));
    
    console.log("Set primary address:", addressId);
  };
  
  const handleMedicalInfoSave = (data) => {
    setUserData(prev => ({
      ...prev,
      medicalInfo: data
    }));
    console.log("Medical info updated:", data);
  };
  
  const handleAccountSettingsSave = ({ type, data }) => {
    if (type === "password") {
      console.log("Password updated");
      // In a real app, this would call an API to update the password
    } else if (type === "notifications") {
      setUserData(prev => ({
        ...prev,
        accountSettings: {
          ...prev.accountSettings,
          notifications: {
            email: data.emailNotifications,
            sms: data.smsNotifications,
            push: data.pushNotifications,
            marketing: data.marketingEmails
          }
        }
      }));
      console.log("Notification settings updated:", data);
    } else if (type === "darkMode") {
      setUserData(prev => ({
        ...prev,
        accountSettings: {
          ...prev.accountSettings,
          darkMode: data
        }
      }));
      console.log("Dark mode setting updated:", data);
    }
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
              Your Profile
            </h1>
            <p className="text-neutral-600">
              Manage your personal information and preferences
            </p>
          </div>
          
          {/* Profile Content */}
          <div className="max-w-4xl mx-auto">
            {/* Profile Header with Photo */}
            <ProfileHeader 
              user={userData} 
              onEditPhoto={handleEditPhoto} 
            />
            
            {/* Personal Information Section */}
            <PersonalInfoSection 
              personalInfo={userData} 
              onSave={handlePersonalInfoSave} 
            />
            
            {/* Delivery Addresses Section */}
            <AddressSection 
              addresses={userData.addresses} 
              onSave={handleAddressSave}
              onDelete={handleAddressDelete}
              onSetPrimary={handleSetPrimaryAddress}
            />
            
            {/* Medical Information Section */}
            <MedicalInfoSection 
              medicalInfo={userData.medicalInfo} 
              onSave={handleMedicalInfoSave} 
            />
            
            {/* Account Settings Section */}
            <AccountSettingsSection 
              settings={userData.accountSettings} 
              onSave={handleAccountSettingsSave} 
            />
            
            {/* Delete Account Button */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-display font-semibold text-neutral-800 mb-4">Danger Zone</h2>
              <div className="border border-error-600 border-dashed rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-medium text-error-600 mb-1">Delete Account</h3>
                    <p className="text-sm text-neutral-600">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                  </div>
                  <button className="bg-white border border-error-600 text-error-600 hover:bg-error-50 font-medium py-2 px-4 rounded-lg transition duration-300">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
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

export default UserProfile;