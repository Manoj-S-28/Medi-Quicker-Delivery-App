import React from "react";
import Icon from "../../../components/AppIcon";

const SpecialInstructions = ({ instructions }) => {
  if (!instructions || instructions.length === 0) return null;
  
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-display font-semibold text-neutral-800 mb-4">Special Instructions</h2>
      
      <div className="space-y-3">
        {instructions.map((instruction, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg border-l-4 ${
              instruction.type === "handling" ?"border-warning-500 bg-warning-100" : instruction.type ==="storage" ?"border-info-600 bg-info-100" :"border-primary-600 bg-primary-100"
            }`}
          >
            <div className="flex items-start">
              <Icon 
                name={
                  instruction.type === "handling" ?"AlertTriangle" : instruction.type ==="storage" ?"Thermometer" :"Info"
                } 
                size={20} 
                className={`mr-3 ${
                  instruction.type === "handling" ?"text-warning-500" : instruction.type ==="storage" ?"text-info-600" :"text-primary-600"
                }`} 
              />
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">{instruction.title}</h3>
                <p className="text-sm text-neutral-700">{instruction.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialInstructions;