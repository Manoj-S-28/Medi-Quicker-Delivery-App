import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const DeliveryStep = ({ addresses, selectedAddress, setSelectedAddress, goToNextStep }) => {
  const [showAddNewForm, setShowAddNewForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false
  });

  const handleAddressChange = (e) => {
    setSelectedAddress(parseInt(e.target.value));
  };

  const handleNewAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    // In a real app, this would save to backend
    console.log("New address added:", newAddress);
    setShowAddNewForm(false);
    // For demo purposes, we'll just proceed
    goToNextStep();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-display font-semibold text-neutral-800 mb-4">Delivery Information</h2>
      
      {!showAddNewForm ? (
        <>
          <div className="space-y-3 mb-6">
            {addresses.map((address) => (
              <label 
                key={address.id} 
                className={`block border rounded-lg p-4 cursor-pointer transition duration-200 ${
                  selectedAddress === address.id 
                    ? "border-primary-600 bg-primary-50" :"border-neutral-200 hover:border-primary-300"
                }`}
              >
                <div className="flex items-start">
                  <input
                    type="radio" name="deliveryAddress"
                    value={address.id}
                    checked={selectedAddress === address.id}
                    onChange={handleAddressChange}
                    className="mt-1 text-primary-600 focus:ring-primary-500 focus:ring-2 focus:outline-none"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-neutral-800">{address.name}</div>
                    <div className="text-sm text-neutral-600 mt-1">{address.address}</div>
                    <div className="text-sm text-neutral-600">{address.city}, {address.state} - {address.pincode}</div>
                    <div className="text-sm text-neutral-600 mt-1">Phone: {address.phone}</div>
                    
                    {address.isDefault && (
                      <span className="inline-block mt-2 text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                        Default Address
                      </span>
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <button 
              onClick={() => setShowAddNewForm(true)}
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <Icon name="Plus" size={18} className="mr-1" />
              Add New Address
            </button>
            
            <button 
              onClick={goToNextStep}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 flex items-center justify-center"
              disabled={selectedAddress === null}
            >
              Continue to Payment
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleAddNewAddress} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
              <input
                type="text" id="name" name="name"
                value={newAddress.name}
                onChange={handleNewAddressChange}
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500 focus:ring-2 focus:outline-none"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">Phone Number</label>
              <input
                type="tel" id="phone" name="phone"
                value={newAddress.phone}
                onChange={handleNewAddressChange}
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500 focus:ring-2 focus:outline-none"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">Address</label>
            <textarea
              id="address" name="address"
              value={newAddress.address}
              onChange={handleNewAddressChange}
              rows="3" className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500 focus:ring-2 focus:outline-none"
              required
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">City</label>
              <input
                type="text" id="city" name="city"
                value={newAddress.city}
                onChange={handleNewAddressChange}
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500 focus:ring-2 focus:outline-none"
                required
              />
            </div>
            
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-neutral-700 mb-1">State</label>
              <input
                type="text" id="state" name="state"
                value={newAddress.state}
                onChange={handleNewAddressChange}
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500 focus:ring-2 focus:outline-none"
                required
              />
            </div>
            
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-neutral-700 mb-1">Pincode</label>
              <input
                type="text" id="pincode" name="pincode"
                value={newAddress.pincode}
                onChange={handleNewAddressChange}
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500 focus:ring-2 focus:outline-none"
                required
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox" id="isDefault" name="isDefault"
              checked={newAddress.isDefault}
              onChange={handleNewAddressChange}
              className="text-primary-600 focus:ring-primary-500 focus:ring-2 focus:outline-none"
            />
            <label htmlFor="isDefault" className="ml-2 text-sm text-neutral-700">
              Set as default address
            </label>
          </div>
          
          <div className="h-64 bg-neutral-100 rounded-lg mb-4 overflow-hidden">
            <iframe
              width="100%" height="100%" loading="lazy" title="Delivery Location" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=28.6139,77.2090&z=14&output=embed">
            </iframe>
          </div>
          
          <div className="flex justify-between">
            <button 
              type="button"
              onClick={() => setShowAddNewForm(false)}
              className="text-neutral-600 hover:text-neutral-800 font-medium"
            >
              Cancel
            </button>
            
            <button 
              type="submit" className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
            >
              Save & Continue
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DeliveryStep;