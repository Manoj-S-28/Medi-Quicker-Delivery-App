import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const DeliveryActions = ({ deliveryAgent }) => {
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const toggleContactOptions = () => {
    setShowContactOptions(!showContactOptions);
    if (showShareOptions) setShowShareOptions(false);
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
    if (showContactOptions) setShowContactOptions(false);
  };

  const copyTrackingLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareLinkCopied(true);
    setTimeout(() => setShareLinkCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-display font-semibold text-neutral-800 mb-4">Delivery Actions</h2>
      
      {/* Delivery Agent Info */}
      <div className="flex items-center p-4 bg-neutral-50 rounded-lg mb-4">
        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
          <Icon name="User" size={24} className="text-primary-600" />
        </div>
        <div>
          <h3 className="font-medium text-neutral-800">{deliveryAgent.name}</h3>
          <p className="text-sm text-neutral-600">Delivery Agent • {deliveryAgent.rating} ★</p>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="relative">
          <button 
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            onClick={toggleContactOptions}
          >
            <Icon name="PhoneCall" size={18} className="mr-2" />
            Contact Delivery Agent
          </button>
          
          {showContactOptions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-10 p-2">
              <a 
                href={`tel:${deliveryAgent.phone}`}
                className="flex items-center p-3 hover:bg-neutral-100 rounded-md transition duration-200"
              >
                <Icon name="Phone" size={18} className="text-primary-600 mr-3" />
                <span>Call ({deliveryAgent.phone})</span>
              </a>
              <a 
                href={`sms:${deliveryAgent.phone}`}
                className="flex items-center p-3 hover:bg-neutral-100 rounded-md transition duration-200"
              >
                <Icon name="MessageSquare" size={18} className="text-primary-600 mr-3" />
                <span>Send Message</span>
              </a>
            </div>
          )}
        </div>
        
        <div className="relative">
          <button 
            className="w-full bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            onClick={toggleShareOptions}
          >
            <Icon name="Share2" size={18} className="mr-2" />
            Share Tracking
          </button>
          
          {showShareOptions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-10 p-2">
              <button 
                onClick={copyTrackingLink}
                className="flex items-center w-full p-3 hover:bg-neutral-100 rounded-md transition duration-200"
              >
                <Icon 
                  name={shareLinkCopied ? "Check" : "Copy"} 
                  size={18} 
                  className={shareLinkCopied ? "text-success-600 mr-3" : "text-primary-600 mr-3"} 
                />
                <span>{shareLinkCopied ? "Link Copied!" : "Copy Tracking Link"}</span>
              </button>
              <a 
                href={`mailto:?subject=Track my medicine delivery&body=You can track my medicine delivery here: ${window.location.href}`}
                className="flex items-center p-3 hover:bg-neutral-100 rounded-md transition duration-200"
              >
                <Icon name="Mail" size={18} className="text-primary-600 mr-3" />
                <span>Share via Email</span>
              </a>
              <a 
                href={`sms:?body=Track my medicine delivery: ${window.location.href}`}
                className="flex items-center p-3 hover:bg-neutral-100 rounded-md transition duration-200"
              >
                <Icon name="MessageCircle" size={18} className="text-primary-600 mr-3" />
                <span>Share via SMS</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryActions;