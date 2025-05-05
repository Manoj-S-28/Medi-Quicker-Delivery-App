import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Header = ({ isLoggedIn }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/user-dashboard" className="flex items-center">
            <Icon name="Stethoscope" size={28} className="text-primary-600 mr-2" />
            <span className="heading-medium text-primary-800 font-semibold">MediQuick</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/home" className="label-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/medicine-catalog" className="label-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Medicines
            </Link>
            <Link to="/prescription-upload" className="label-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Upload Prescription
            </Link>
            <Link to="/order-tracking" className="label-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Track Order
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Notification Bell */}
                <button 
                  className="relative p-2 text-neutral-700 hover:text-primary-600 transition-colors" aria-label="Notifications"
                >
                  <Icon name="Bell" size={22} />
                  <span className="absolute top-0 right-0 bg-emergency-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Cart Icon */}
                <Link 
                  to="/cart-checkout" className="relative p-2 text-neutral-700 hover:text-primary-600 transition-colors" aria-label="Shopping Cart"
                >
                  <Icon name="ShoppingCart" size={22} />
                  <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    2
                  </span>
                </Link>

                {/* User Profile */}
                <Link 
                  to="/user-profile" className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-2 overflow-hidden">
                    <img 
                      src="https://randomuser.me/api/portraits/women/65.jpg" 
                      alt="User Profile" className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="hidden md:block label-medium">Sarah</span>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/login" className="label-medium text-neutral-700 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" className="hidden md:block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-neutral-700 hover:text-primary-600 transition-colors"
              onClick={toggleMobileMenu}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 py-4 px-4">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/home" className="label-medium text-neutral-700 hover:text-primary-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/medicine-catalog" className="label-medium text-neutral-700 hover:text-primary-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Medicines
            </Link>
            <Link 
              to="/prescription-upload" className="label-medium text-neutral-700 hover:text-primary-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Upload Prescription
            </Link>
            <Link 
              to="/order-tracking" className="label-medium text-neutral-700 hover:text-primary-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Track Order
            </Link>
            {!isLoggedIn && (
              <Link 
                to="/user-dashboard" className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;