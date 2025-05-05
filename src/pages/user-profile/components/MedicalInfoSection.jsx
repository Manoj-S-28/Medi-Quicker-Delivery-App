import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const MedicalInfoSection = ({ medicalInfo, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    allergies: medicalInfo.allergies,
    conditions: medicalInfo.conditions,
    medications: medicalInfo.medications,
    bloodType: medicalInfo.bloodType,
    emergencyContact: {
      name: medicalInfo.emergencyContact.name,
      relationship: medicalInfo.emergencyContact.relationship,
      phone: medicalInfo.emergencyContact.phone
    }
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setFormData({
      allergies: medicalInfo.allergies,
      conditions: medicalInfo.conditions,
      medications: medicalInfo.medications,
      bloodType: medicalInfo.bloodType,
      emergencyContact: {
        name: medicalInfo.emergencyContact.name,
        relationship: medicalInfo.emergencyContact.relationship,
        phone: medicalInfo.emergencyContact.phone
      }
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-6 border-b border-neutral-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-display font-semibold text-neutral-800">Medical Information</h2>
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
        <p className="text-sm text-neutral-500 mt-1">
          This information helps us serve you better in emergencies. All data is kept confidential.
        </p>
      </div>
      
      <div className="p-6">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                <label htmlFor="allergies" className="block text-sm font-medium text-neutral-700 mb-1">
                  Allergies
                </label>
                <textarea
                  id="allergies" name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  rows="2" placeholder="List any allergies to medications or other substances" className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="conditions" className="block text-sm font-medium text-neutral-700 mb-1">
                  Medical Conditions
                </label>
                <textarea
                  id="conditions" name="conditions"
                  value={formData.conditions}
                  onChange={handleChange}
                  rows="2" placeholder="List any chronic conditions or important medical history" className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="medications" className="block text-sm font-medium text-neutral-700 mb-1">
                  Current Medications
                </label>
                <textarea
                  id="medications" name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  rows="2" placeholder="List medications you're currently taking" className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="bloodType" className="block text-sm font-medium text-neutral-700 mb-1">
                  Blood Type
                </label>
                <select
                  id="bloodType" name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
            
            <div className="border-t border-neutral-200 pt-6 mb-6">
              <h3 className="font-medium text-neutral-800 mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="emergencyContact.name" className="block text-sm font-medium text-neutral-700 mb-1">
                    Contact Name
                  </label>
                  <input
                    type="text" id="emergencyContact.name" name="emergencyContact.name"
                    value={formData.emergencyContact.name}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="emergencyContact.relationship" className="block text-sm font-medium text-neutral-700 mb-1">
                    Relationship
                  </label>
                  <input
                    type="text" id="emergencyContact.relationship" name="emergencyContact.relationship"
                    value={formData.emergencyContact.relationship}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="emergencyContact.phone" className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel" id="emergencyContact.phone" name="emergencyContact.phone"
                    value={formData.emergencyContact.phone}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
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
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-neutral-700 mb-1">Allergies</h3>
                <p className="text-neutral-800">
                  {medicalInfo.allergies || "No allergies specified"}
                </p>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-neutral-700 mb-1">Medical Conditions</h3>
                <p className="text-neutral-800">
                  {medicalInfo.conditions || "No conditions specified"}
                </p>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-neutral-700 mb-1">Current Medications</h3>
                <p className="text-neutral-800">
                  {medicalInfo.medications || "No medications specified"}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-neutral-700 mb-1">Blood Type</h3>
                <p className="text-neutral-800">
                  {medicalInfo.bloodType || "Not specified"}
                </p>
              </div>
            </div>
            
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="font-medium text-neutral-800 mb-4">Emergency Contact</h3>
              {medicalInfo.emergencyContact.name ? (
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <p className="font-medium text-neutral-800">{medicalInfo.emergencyContact.name}</p>
                  <p className="text-neutral-600">{medicalInfo.emergencyContact.relationship}</p>
                  <p className="text-neutral-600">{medicalInfo.emergencyContact.phone}</p>
                </div>
              ) : (
                <p className="text-neutral-600">No emergency contact specified</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalInfoSection;