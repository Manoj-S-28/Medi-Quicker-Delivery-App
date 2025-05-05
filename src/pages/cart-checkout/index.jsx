import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";

// Import components
import Header from "../user-dashboard/components/Header";
import Sidebar from "../user-dashboard/components/Sidebar";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import RecommendedProducts from "./components/RecommendedProducts";
import DeliveryStep from "./components/DeliveryStep";
import PaymentStep from "./components/PaymentStep";
import ReviewStep from "./components/ReviewStep";
import EmergencyTimer from "./components/EmergencyTimer";
import CheckoutSteps from "./components/CheckoutSteps";
import EmptyCart from "./components/EmptyCart";
import OrderSuccess from "./components/OrderSuccess";

const CartCheckout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0: Cart, 1: Delivery, 2: Payment, 3: Review
  const [selectedAddress, setSelectedAddress] = useState(1); // Default selected address
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isEmergencyDelivery, setIsEmergencyDelivery] = useState(true);
  
  // Cart items mock data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Paracetamol 500mg",
      dosage: "500mg",
      quantity: 10,
      unit: "tablets",
      price: 45.99,
      count: 2,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      prescription: false
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      dosage: "250mg",
      quantity: 20,
      unit: "capsules",
      price: 120.50,
      count: 1,
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      prescription: true
    },
    {
      id: 3,
      name: "Digital Thermometer",
      quantity: 1,
      unit: "piece",
      price: 299.99,
      count: 1,
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      prescription: false
    }
  ]);
  
  // Recommended products mock data
  const recommendedProducts = [
    {
      id: 4,
      name: "Vitamin C 500mg",
      dosage: "500mg",
      quantity: 30,
      unit: "tablets",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1577460551100-d3f84b6e4bf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 5,
      name: "Bandage Roll",
      quantity: 1,
      unit: "piece",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 6,
      name: "Hand Sanitizer",
      quantity: 250,
      unit: "ml",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 7,
      name: "Disposable Face Masks",
      quantity: 10,
      unit: "pieces",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];
  
  // Addresses mock data
  const addresses = [
    {
      id: 1,
      name: "John Doe",
      phone: "+91 9876543210",
      address: "123, Green Avenue, Sector 14",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110001",
      isDefault: true
    },
    {
      id: 2,
      name: "John Doe",
      phone: "+91 9876543210",
      address: "456, Blue Heights, Malviya Nagar",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110017",
      isDefault: false
    }
  ];
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.count), 0);
  const deliveryFee = isEmergencyDelivery ? 0 : 40;
  const tax = subtotal * 0.18; // 18% tax
  const total = subtotal + deliveryFee + tax;
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  const updateQuantity = (id, newCount) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, count: newCount } : item
      )
    );
  };
  
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };
  
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      updateQuantity(product.id, existingItem.count + 1);
    } else {
      setCartItems([...cartItems, { ...product, count: 1 }]);
    }
  };
  
  const proceedToCheckout = () => {
    setCurrentStep(1);
  };
  
  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const goToPreviousStep = (step = null) => {
    if (step !== null) {
      setCurrentStep(step);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const goToStep = (step) => {
    setCurrentStep(step);
  };
  
  const placeOrder = () => {
    // Generate a random order ID
    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(newOrderId);
    setOrderPlaced(true);
    
    // In a real app, this would send the order to a backend
    console.log("Order placed:", {
      orderId: newOrderId,
      items: cartItems,
      address: addresses.find(addr => addr.id === selectedAddress),
      paymentMethod,
      total,
      isEmergencyDelivery
    });
  };
  
  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep, orderPlaced]);

  return (
    <div className={`flex h-screen bg-neutral-50 ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          toggleSidebar={toggleSidebar} 
          toggleDarkMode={toggleDarkMode} 
          isDarkMode={darkMode} 
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-display font-bold text-neutral-800 mb-1">
              {orderPlaced ? "Order Confirmation" : currentStep === 0 ? "Your Cart" : "Checkout"}
            </h1>
            {!orderPlaced && (
              <p className="text-neutral-600">
                {currentStep === 0 
                  ? `You have ${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart` 
                  : "Complete your purchase"}
              </p>
            )}
          </div>
          
          {/* Emergency Timer for emergency deliveries */}
          <EmergencyTimer isEmergencyDelivery={isEmergencyDelivery && !orderPlaced} />
          
          {/* Checkout Process */}
          {!orderPlaced ? (
            cartItems.length > 0 ? (
              <>
                {/* Checkout Steps Indicator - only show in checkout process */}
                {currentStep > 0 && (
                  <CheckoutSteps 
                    currentStep={currentStep} 
                    totalSteps={4} 
                    goToStep={goToStep} 
                  />
                )}
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Content - 2/3 width on large screens */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Cart Items - Step 0 */}
                    {currentStep === 0 && (
                      <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-lg font-display font-semibold text-neutral-800 mb-4">Cart Items</h2>
                        
                        <div className="divide-y divide-neutral-200">
                          {cartItems.map((item) => (
                            <CartItem 
                              key={item.id} 
                              item={item} 
                              updateQuantity={updateQuantity} 
                              removeItem={removeItem} 
                            />
                          ))}
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-neutral-200 flex justify-between items-center">
                          <Link 
                            to="/medicine-catalog" className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                          >
                            <Icon name="ArrowLeft" size={18} className="mr-1" />
                            Continue Shopping
                          </Link>
                          
                          <button 
                            onClick={proceedToCheckout}
                            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 flex items-center"
                          >
                            Proceed to Checkout
                            <Icon name="ArrowRight" size={18} className="ml-2" />
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Delivery Step - Step 1 */}
                    {currentStep === 1 && (
                      <DeliveryStep 
                        addresses={addresses}
                        selectedAddress={selectedAddress}
                        setSelectedAddress={setSelectedAddress}
                        goToNextStep={goToNextStep}
                      />
                    )}
                    
                    {/* Payment Step - Step 2 */}
                    {currentStep === 2 && (
                      <PaymentStep 
                        goToPreviousStep={goToPreviousStep}
                        goToNextStep={goToNextStep}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                      />
                    )}
                    
                    {/* Review Step - Step 3 */}
                    {currentStep === 3 && (
                      <ReviewStep 
                        cartItems={cartItems}
                        subtotal={subtotal}
                        deliveryFee={deliveryFee}
                        tax={tax}
                        total={total}
                        selectedAddress={selectedAddress}
                        addresses={addresses}
                        paymentMethod={paymentMethod}
                        isEmergencyDelivery={isEmergencyDelivery}
                        goToPreviousStep={goToPreviousStep}
                        placeOrder={placeOrder}
                      />
                    )}
                    
                    {/* Recommended Products - Only show in cart view */}
                    {currentStep === 0 && (
                      <RecommendedProducts 
                        products={recommendedProducts} 
                        addToCart={addToCart} 
                      />
                    )}
                  </div>
                  
                  {/* Sidebar Content - 1/3 width on large screens */}
                  <div>
                    {/* Cart Summary */}
                    <CartSummary 
                      cartItems={cartItems}
                      subtotal={subtotal}
                      deliveryFee={deliveryFee}
                      tax={tax}
                      total={total}
                      isEmergencyDelivery={isEmergencyDelivery}
                      proceedToCheckout={proceedToCheckout}
                      currentStep={currentStep}
                    />
                    
                    {/* Emergency Delivery Toggle - Only show in cart view */}
                    {currentStep === 0 && (
                      <div className="bg-white rounded-lg shadow p-6 mt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-neutral-800">Emergency Delivery</h3>
                            <p className="text-sm text-neutral-600 mt-1">Get your medicines within 1 hour</p>
                          </div>
                          
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" className="sr-only peer" 
                              checked={isEmergencyDelivery}
                              onChange={() => setIsEmergencyDelivery(!isEmergencyDelivery)}
                            />
                            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                        
                        {isEmergencyDelivery && (
                          <div className="mt-4 bg-emergency-100 border border-emergency-300 rounded-lg p-3">
                            <div className="flex items-start">
                              <Icon name="AlertTriangle" size={18} className="text-emergency-600 mr-2 mt-0.5" />
                              <div className="text-sm text-emergency-700">
                                Emergency delivery is available for critical medications. Our delivery partner will reach you within 1 hour.
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Need Help Section - Only show in checkout process */}
                    {currentStep > 0 && (
                      <div className="bg-white rounded-lg shadow p-6 mt-6">
                        <h3 className="font-medium text-neutral-800 mb-3">Need Help?</h3>
                        <p className="text-sm text-neutral-600 mb-4">Our support team is available 24/7 to assist you with your purchase.</p>
                        
                        <button className="w-full bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
                          <Icon name="MessageCircle" size={18} className="mr-2" />
                          Chat with Support
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <EmptyCart />
            )
          ) : (
            <OrderSuccess orderId={orderId} isEmergencyDelivery={isEmergencyDelivery} />
          )}
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-neutral-200 py-4 px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-2 md:mb-0 text-neutral-500 text-sm">
              &copy; {new Date().getFullYear()} MediQuick. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-500 hover:text-primary-600 text-sm">Privacy Policy</a>
              <a href="#" className="text-neutral-500 hover:text-primary-600 text-sm">Terms of Service</a>
              <a href="#" className="text-neutral-500 hover:text-primary-600 text-sm">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CartCheckout;