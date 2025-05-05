import React from "react";
import Icon from "../../../components/AppIcon";

const DeliveryOptions = ({ isEmergency, setIsEmergency, specialInstructions, setSpecialInstructions }) => {
  return (
    <div className="mt-6 bg-white rounded-lg shadow p-6">
      <h3 className="font-display font-semibold text-lg text-neutral-800 mb-4">
        Delivery Options
      </h3>
      
      <div className="mb-6">
        <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200 mb-4">
          <div className="flex items-center">
            <div className={`p-2 rounded-full mr-3 ${isEmergency ? "bg-emergency-100" : "bg-neutral-100"}`}>
              <Icon 
                name="Zap" 
                size={20} 
                color={isEmergency ? "var(--color-emergency-600)" : "var(--color-neutral-500)"} 
              />
            </div>
            <div>
              <h4 className="font-medium text-neutral-800">Emergency Delivery</h4>
              <p className="text-sm text-neutral-600">Get your medicines delivered within 1 hour</p>
            </div>
          </div>
          
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" className="sr-only peer" 
              checked={isEmergency}
              onChange={() => setIsEmergency(!isEmergency)}
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emergency-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <div className="flex items-center">
            <div className="bg-neutral-100 p-2 rounded-full mr-3">
              <Icon name="Truck" size={20} color="var(--color-neutral-500)" />
            </div>
            <div>
              <h4 className="font-medium text-neutral-800">Standard Delivery</h4>
              <p className="text-sm text-neutral-600">Delivery within 24 hours</p>
            </div>
          </div>
          
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" className="sr-only peer" 
              checked={!isEmergency}
              onChange={() => setIsEmergency(!isEmergency)}
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>
      
      <div>
        <label htmlFor="special-instructions" className="block font-medium text-neutral-700 mb-2">
          Special Instructions (Optional)
        </label>
        <textarea
          id="special-instructions" rows="3" className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" placeholder="Add any special instructions for the pharmacist..."
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
        ></textarea>
        <p className="mt-1 text-sm text-neutral-500">
          Please mention any specific requirements or questions for the pharmacist.
        </p>
      </div>
    </div>
  );
};

export default DeliveryOptions;