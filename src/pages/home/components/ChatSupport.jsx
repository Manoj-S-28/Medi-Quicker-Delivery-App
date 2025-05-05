import React, { useState } from "react";
import Icon from "../../../components/AppIcon";


const ChatSupport = ({ onClose }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: "bot",
      message: "Hello! How can I help you today with your medication needs?",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      id: chatHistory.length + 1,
      sender: "user",
      message: message.trim(),
      timestamp: new Date()
    };
    
    setChatHistory([...chatHistory, userMessage]);
    setMessage("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = {
        id: chatHistory.length + 2,
        sender: "bot",
        message: "Thank you for your message. A customer service representative will be with you shortly. For medication emergencies, please call our hotline at 1-888-MED-QUICK.",
        timestamp: new Date()
      };
      
      setChatHistory(prevChat => [...prevChat, botResponse]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-end p-4 md:items-center md:justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-neutral-900 bg-opacity-50" onClick={onClose}></div>
      
      {/* Chat Window */}
      <div 
        className="relative bg-white rounded-lg shadow-lg w-full max-w-md h-[500px] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-primary-600 text-white px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Icon name="Headphones" size={20} className="mr-2" />
            <h3 className="heading-medium">MediQuick Support</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-white hover:text-neutral-200 transition-colors" aria-label="Close chat"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-neutral-50">
          {chatHistory.map((chat) => (
            <div 
              key={chat.id} 
              className={`mb-4 flex ${chat.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {chat.sender === "bot" && ( <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-2 overflow-hidden flex-shrink-0">
                  <Icon name="Headphones" size={16} className="text-primary-600" />
                </div>
              )}
              
              <div 
                className={`max-w-[75%] rounded-lg px-4 py-2 ${
                  chat.sender === "user" ?"bg-primary-600 text-white" :"bg-white border border-neutral-200"
                }`}
              >
                <p className="body-medium">{chat.message}</p>
                <p className="body-small text-right mt-1 opacity-70">
                  {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              
              {chat.sender === "user" && ( <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center ml-2 overflow-hidden flex-shrink-0">
                  <Icon name="User" size={16} className="text-neutral-600" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="border-t border-neutral-200 p-3 bg-white">
          <div className="flex items-center">
            <input
              type="text" placeholder="Type your message..." className="flex-1 border border-neutral-300 rounded-l-lg py-2 px-3 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button 
              type="submit" className="bg-primary-600 text-white rounded-r-lg px-4 py-2 hover:bg-primary-700 transition-colors"
            >
              <Icon name="Send" size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatSupport;