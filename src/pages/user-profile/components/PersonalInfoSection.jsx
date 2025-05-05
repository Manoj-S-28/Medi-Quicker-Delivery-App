import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const PersonalInfoSection = ({ personalInfo, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    email: personalInfo.email,
    phone: personalInfo.phone,
    dateOfBirth: personalInfo.dateOfBirth
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setFormData({
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      email: personalInfo.email,
      phone: personalInfo.phone,
      dateOfBirth: personalInfo.dateOfBirth
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-6 border-b border-neutral-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-display font-semibold text-neutral-800">Personal Information</h2>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium"
            >
              <Icon name="Edit" size={16} className="mr-1" />
              Edit
            </button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                  First Name
                </label>
                <input
                  type="text" id="firstName" name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text" id="lastName" name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel" id="phone" name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-neutral-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date" id="dateOfBirth" name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-neutral-500">First Name</p>
                <p className="font-medium text-neutral-800">{personalInfo.firstName}</p>
              </div>
              
              <div>
                <p className="text-sm text-neutral-500">Last Name</p>
                <p className="font-medium text-neutral-800">{personalInfo.lastName}</p>
              </div>
              
              <div>
                <p className="text-sm text-neutral-500">Email Address</p>
                <p className="font-medium text-neutral-800">{personalInfo.email}</p>
              </div>
              
              <div>
                <p className="text-sm text-neutral-500">Phone Number</p>
                <p className="font-medium text-neutral-800">{personalInfo.phone}</p>
              </div>
              
              <div>
                <p className="text-sm text-neutral-500">Date of Birth</p>
                <p className="font-medium text-neutral-800">{personalInfo.dateOfBirth}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoSection;