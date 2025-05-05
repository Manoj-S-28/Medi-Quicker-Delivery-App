import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const PaymentStep = ({ goToPreviousStep, goToNextStep }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [upiId, setUpiId] = useState("");

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would process payment
    console.log("Payment method:", paymentMethod);
    if (paymentMethod === "card") {
      console.log("Card details:", cardDetails);
    } else if (paymentMethod === "upi") {
      console.log("UPI ID:", upiId);
    }
    goToNextStep();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-display font-semibold text-neutral-800 mb-4">Payment Method</h2>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          type="button" onClick={() => handlePaymentMethodChange("card")}
          className={`flex items-center px-4 py-3 rounded-lg border transition duration-200 ${
            paymentMethod === "card" ?"border-primary-600 bg-primary-50" :"border-neutral-300 hover:border-primary-300"
          }`}
        >
          <Icon name="CreditCard" size={20} className={paymentMethod === "card" ? "text-primary-600" : "text-neutral-600"} />
          <span className="ml-2 font-medium">Credit/Debit Card</span>
        </button>
        
        <button
          type="button" onClick={() => handlePaymentMethodChange("upi")}
          className={`flex items-center px-4 py-3 rounded-lg border transition duration-200 ${
            paymentMethod === "upi" ?"border-primary-600 bg-primary-50" :"border-neutral-300 hover:border-primary-300"
          }`}
        >
          <Icon name="Smartphone" size={20} className={paymentMethod === "upi" ? "text-primary-600" : "text-neutral-600"} />
          <span className="ml-2 font-medium">UPI Payment</span>
        </button>
        
        <button
          type="button" onClick={() => handlePaymentMethodChange("cod")}
          className={`flex items-center px-4 py-3 rounded-lg border transition duration-200 ${
            paymentMethod === "cod" ?"border-primary-600 bg-primary-50" :"border-neutral-300 hover:border-primary-300"
          }`}
        >
          <Icon name="Wallet" size={20} className={paymentMethod === "cod" ? "text-primary-600" : "text-neutral-600"} />
          <span className="ml-2 font-medium">Cash on Delivery</span>
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        {paymentMethod === "card" && (
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-neutral-700 mb-1">Card Number</label>
              <input
                type="text" id="cardNumber" name="number"
                value={cardDetails.number}
                onChange={handleCardDetailsChange}
                placeholder="1234 5678 9012 3456" className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500 focus:ring-2 focus:outline-none"
                required
              />
            </div>
            
            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-neutral-700 mb-1">Cardholder Name</label>
              <input
                type="text" id="cardName" name="name"
                value={cardDetails.name}
                onChange={handleCardDetailsChange}
                placeholder="John Doe" className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500 focus:ring-2 focus:outline-none"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cardExpiry" className="block text-sm font-medium text-neutral-700 mb-1">Expiry Date</label>
                <input
                  type="text" id="cardExpiry" name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleCardDetailsChange}
                  placeholder="MM/YY" className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500 focus:ring-2 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="cardCvv" className="block text-sm font-medium text-neutral-700 mb-1">CVV</label>
                <input
                  type="text" id="cardCvv" name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  placeholder="123" className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500 focus:ring-2 focus:outline-none"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg">
              <Icon name="Shield" size={16} className="text-success-600 mr-2" />
              Your payment information is secure and encrypted
            </div>
          </div>
        )}
        
        {paymentMethod === "upi" && (
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="upiId" className="block text-sm font-medium text-neutral-700 mb-1">UPI ID</label>
              <input
                type="text" id="upiId"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="name@upi" className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500 focus:ring-2 focus:outline-none"
                required
              />
            </div>
            
            <div className="flex items-center text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg">
              <Icon name="Info" size={16} className="text-info-600 mr-2" />
              You will receive a payment request on your UPI app
            </div>
          </div>
        )}
        
        {paymentMethod === "cod" && (
          <div className="space-y-4 mb-6">
            <div className="flex items-center text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg">
              <Icon name="AlertCircle" size={16} className="text-warning-500 mr-2" />
              Please keep exact change ready at the time of delivery
            </div>
          </div>
        )}
        
        <div className="flex justify-between">
          <button 
            type="button"
            onClick={goToPreviousStep}
            className="flex items-center text-neutral-600 hover:text-neutral-800 font-medium"
          >
            <Icon name="ArrowLeft" size={18} className="mr-1" />
            Back to Delivery
          </button>
          
          <button 
            type="submit" className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 flex items-center"
          >
            Review Order
            <Icon name="ArrowRight" size={18} className="ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentStep;