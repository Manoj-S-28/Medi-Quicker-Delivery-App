import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Icon name="Stethoscope" size={24} className="text-primary-400 mr-2" />
              <span className="heading-medium">MediQuick</span>
            </div>
            <p className="body-medium text-neutral-400 mb-4">
              Your trusted partner for emergency medicine delivery, available 24/7 to ensure you never run out of essential medications.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <Icon name="Linkedin" size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="heading-small mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/home" className="body-medium text-neutral-400 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/medicine-catalog" className="body-medium text-neutral-400 hover:text-primary-400 transition-colors">
                  Browse Medicines
                </Link>
              </li>
              <li>
              <Link to="/user-dashboard" className="body-medium text-neutral-400 hover:text-primary-400 transition-colors">
                  UserDashboard
                </Link>
              </li>
              <li>
                <Link to="/prescription-upload" className="body-medium text-neutral-400 hover:text-primary-400 transition-colors">
                  Upload Prescription
                </Link>
              </li>
              <li>
                <Link to="/order-tracking" className="body-medium text-neutral-400 hover:text-primary-400 transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/user-profile" className="body-medium text-neutral-400 hover:text-primary-400 transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="heading-small mb-4 text-white">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="body-medium text-neutral-400 hover:text-primary-400 transition-colors">
                  Emergency Delivery
                </a>
              </li>
              <li>
                <a href="#" className="body-medium text-neutral-400 hover:text-primary-400 transition-colors">
                  Prescription Refills
                </a>
              </li>
              <li>
                <a href="#" className="body-medium text-neutral-400 hover:text-primary-400 transition-colors">
                  Medical Devices
                </a>
              </li>
              <li>
                <a href="#" className="body-medium text-neutral-400 hover:text-primary-400 transition-colors">
                  Health Consultations
                </a>
              </li>
              <li>
                <a href="#" className="body-medium text-neutral-400 hover:text-primary-400 transition-colors">
                  Medication Reminders
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="heading-small mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Icon name="MapPin" size={18} className="text-primary-400 mr-2 mt-1 flex-shrink-0" />
                <span className="body-medium text-neutral-400">
                  75 Childerns Nursury primary School(Oppsite),CM Nagar,RN Puudur,Erode-638005
                </span>
              </li>
              <li className="flex items-center">
                <Icon name="Phone" size={18} className="text-primary-400 mr-2 flex-shrink-0" />
                <a href="tel:+919840229006" className="body-medium text-neutral-400 hover:text-primary-400 transition-colors">
                  1-888-MED-QUICK (24/7)
                </a>
              </li>
              <li className="flex items-center">
                <Icon name="Mail" size={18} className="text-primary-400 mr-2 flex-shrink-0" />
                <a href="mailto:support@mediquick.com" className="body-medium text-neutral-400 hover:text-primary-400 transition-colors">
                  support@mediquick.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center">
          <p className="body-medium text-neutral-500 mb-4 md:mb-0">
            © {currentYear} MediQuick. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="body-small text-neutral-500 hover:text-primary-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="body-small text-neutral-500 hover:text-primary-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="body-small text-neutral-500 hover:text-primary-400 transition-colors">
              Cookie Policy
            </a>
            <a href="#" className="body-small text-neutral-500 hover:text-primary-400 transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;