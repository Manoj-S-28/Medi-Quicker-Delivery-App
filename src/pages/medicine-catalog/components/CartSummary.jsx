import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const CartSummary = ({ cart, isVisible, toggleCart }) => {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  if (!isVisible || totalItems === 0) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-40 w-80 bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden">
      <div className="bg-primary-600 text-white p-3 flex justify-between items-center">
        <div className="flex items-center">
          <Icon name="ShoppingCart" size={20} className="mr-2" />
          <h3 className="font-medium">Cart Summary</h3>
        </div>
        <div className="flex items-center">
          <span className="bg-white text-primary-600 rounded-full h-6 w-6 flex items-center justify-center text-sm font-medium mr-2">
            {totalItems}
          </span>
          <button 
            onClick={toggleCart}
            className="text-white hover:text-neutral-200"
          >
            <Icon name="X" size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-3 max-h-60 overflow-y-auto">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-neutral-100 rounded-md overflow-hidden mr-2">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-800 line-clamp-1">{item.name}</p>
                <p className="text-xs text-neutral-500">${item.price.toFixed(2)} x {item.quantity}</p>
              </div>
            </div>
            <span className="font-medium text-neutral-800">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="p-3 bg-neutral-50 border-t border-neutral-200">
        <div className="flex justify-between mb-3">
          <span className="text-neutral-600">Subtotal:</span>
          <span className="font-semibold text-neutral-800">${subtotal.toFixed(2)}</span>
        </div>
        
        <Link 
          to="/cart-checkout" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
        >
          <Icon name="CreditCard" size={18} className="mr-2" />
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;