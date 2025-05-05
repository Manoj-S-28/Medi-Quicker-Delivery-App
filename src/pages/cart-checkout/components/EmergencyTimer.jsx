import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const EmergencyTimer = ({ isEmergencyDelivery }) => {
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds
  
  useEffect(() => {
    if (!isEmergencyDelivery) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isEmergencyDelivery]);
  
  if (!isEmergencyDelivery) return null;
  
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  
  const formatTime = (value) => value.toString().padStart(2, '0');
  
  return (
    <div className="fixed bottom-4 right-4 bg-emergency-600 text-white rounded-lg shadow-lg p-3 z-50 flex items-center">
      <Icon name="Clock" size={20} className="mr-2" />
      <div>
        <div className="text-xs font-medium">Emergency Delivery</div>
        <div className="text-lg font-bold">
          {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
        </div>
      </div>
    </div>
  );
};

export default EmergencyTimer;