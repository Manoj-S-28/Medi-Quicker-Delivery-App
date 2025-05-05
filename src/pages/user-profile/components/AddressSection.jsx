import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const AddressSection = ({ addresses, onSave, onDelete, onSetPrimary }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    label: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isPrimary: false,
    lat: 40.7128,
    lng: -74.0060
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleEdit = (address) => {
    setFormData({
      id: address.id,
      label: address.label,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isPrimary: address.isPrimary,
      lat: address.lat,
      lng: address.lng
    });
    setEditingAddressId(address.id);
    setIsEditing(true);
    setShowAddForm(false);
  };
  
  const handleAddNew = () => {
    setFormData({
      id: null,
      label: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      isPrimary: false,
      lat: 40.7128,
      lng: -74.0060
    });
    setEditingAddressId(null);
    setIsEditing(false);
    setShowAddForm(true);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
    setShowAddForm(false);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setShowAddForm(false);
  };

  const renderAddressForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="md:col-span-2">
          <label htmlFor="label" className="block text-sm font-medium text-neutral-700 mb-1">
            Address Label
          </label>
          <input
            type="text" id="label" name="label"
            value={formData.label}
            onChange={handleChange}
            placeholder="Home, Work, etc." className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="street" className="block text-sm font-medium text-neutral-700 mb-1">
            Street Address
          </label>
          <input
            type="text" id="street" name="street"
            value={formData.street}
            onChange={handleChange}
            className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">
            City
          </label>
          <input
            type="text" id="city" name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-neutral-700 mb-1">
            State
          </label>
          <input
            type="text" id="state" name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-neutral-700 mb-1">
            ZIP Code
          </label>
          <input
            type="text" id="zipCode" name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-neutral-700 mb-1">
            Country
          </label>
          <input
            type="text" id="country" name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="flex items-center">
            <input
              type="checkbox" name="isPrimary"
              checked={formData.isPrimary}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
            />
            <span className="ml-2 text-sm text-neutral-700">Set as primary address</span>
          </label>
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
          Save Address
        </button>
      </div>
    </form>
  );

  const renderAddressList = () => (
    <div className="space-y-6">
      {addresses.map((address) => (
        <div key={address.id} className={`border rounded-lg ${address.isPrimary ? 'border-primary-300 bg-primary-50' : 'border-neutral-200'}`}>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-neutral-800">{address.label}</h3>
                {address.isPrimary && (
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                    Primary
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEdit(address)}
                  className="text-primary-600 hover:text-primary-700" aria-label="Edit address"
                >
                  <Icon name="Edit" size={16} />
                </button>
                {!address.isPrimary && (
                  <>
                    <button 
                      onClick={() => onSetPrimary(address.id)}
                      className="text-primary-600 hover:text-primary-700" aria-label="Set as primary address"
                    >
                      <Icon name="Star" size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(address.id)}
                      className="text-error-600 hover:text-error-700" aria-label="Delete address"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            <p className="text-neutral-600 mb-3">
              {address.street}, {address.city}, {address.state} {address.zipCode}, {address.country}
            </p>
            
            <div className="h-40 bg-neutral-100 rounded-lg overflow-hidden">
              <iframe
                width="100%" height="100%" loading="lazy"
                title={`Map for ${address.label}`}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${address.lat},${address.lng}&z=14&output=embed`}>
              </iframe>
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={handleAddNew}
        className="w-full py-3 border border-dashed border-neutral-300 rounded-lg text-primary-600 hover:bg-neutral-50 transition duration-300 flex items-center justify-center"
      >
        <Icon name="Plus" size={18} className="mr-2" />
        Add New Address
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-6 border-b border-neutral-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-display font-semibold text-neutral-800">Delivery Addresses</h2>
          {!isEditing && !showAddForm && addresses.length > 0 && (
            <button 
              onClick={handleAddNew}
              className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium"
            >
              <Icon name="Plus" size={16} className="mr-1" />
              Add New
            </button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        {isEditing || showAddForm ? renderAddressForm() : renderAddressList()}
      </div>
    </div>
  );
};

export default AddressSection;