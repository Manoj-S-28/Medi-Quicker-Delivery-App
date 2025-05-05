import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Image from "../../components/AppImage";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CategoryCard from "./components/CategoryCard";
import SearchBar from "./components/SearchBar";
import RecentOrderCard from "./components/RecentOrderCard";
import TestimonialCard from "./components/TestimonialCard";
import EmergencyContactCard from "./components/EmergencyContactCard";
import ChatSupport from "./components/ChatSupport";
import Footer from "./components/Footer";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showChatSupport, setShowChatSupport] = useState(false);

  useEffect(() => {
    // Simulate API call with setTimeout
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setRecentOrders(mockRecentOrders);
        setCategories(mockCategories);
        setTestimonials(mockTestimonials);
        setIsLoggedIn(true); // For demo purposes, assume user is logged in
        setLoading(false);
      } catch (error) {
        console.error("Error fetching home data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle search input
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    
    // Filter medicines based on search query
    const filteredResults = mockMedicines.filter(medicine => 
      medicine.name.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filteredResults);
  };

  const toggleChatSupport = () => {
    setShowChatSupport(!showChatSupport);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header isLoggedIn={isLoggedIn} />
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Search Bar - Sticky on scroll */}
        <div className="sticky top-16 z-10 bg-white shadow-sm py-3 border-b border-neutral-200">
          <div className="container mx-auto px-4 lg:px-8">
            <SearchBar 
              searchQuery={searchQuery} 
              onSearchChange={handleSearchChange}
              searchResults={searchResults}
            />
          </div>
        </div>
        
        {/* Medicine Categories Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="heading-large text-neutral-800 mb-6">Browse by Category</h2>
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-neutral-100 rounded-lg p-6 h-48 animate-pulse">
                    <div className="h-8 bg-neutral-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-neutral-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full mb-3"></div>
                    <div className="h-10 bg-neutral-200 rounded w-1/3 mt-4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Recent Orders Section - Only shown if user is logged in */}
        {isLoggedIn && (
          <section className="py-10 bg-neutral-50">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="heading-large text-neutral-800">Your Recent Orders</h2>
                <Link to="/user-dashboard" className="text-primary-600 flex items-center hover:text-primary-700 transition-colors">
                  <span className="mr-1">View All</span>
                  <Icon name="ArrowRight" size={16} />
                </Link>
              </div>
              
              {loading ? (
                <div className="flex space-x-6 overflow-x-auto pb-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex-shrink-0 w-64 bg-white rounded-lg p-4 shadow-sm animate-pulse">
                      <div className="h-4 bg-neutral-200 rounded w-3/4 mb-4"></div>
                      <div className="h-8 bg-neutral-200 rounded w-1/2 mb-4"></div>
                      <div className="h-4 bg-neutral-200 rounded w-full mb-3"></div>
                      <div className="h-10 bg-neutral-200 rounded w-full mt-4"></div>
                    </div>
                  ))}
                </div>
              ) : recentOrders.length > 0 ? (
                <div className="flex space-x-6 overflow-x-auto pb-4">
                  {recentOrders.map((order) => (
                    <RecentOrderCard key={order.id} order={order} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 shadow-sm text-center">
                  <Icon name="PackageCheck" size={48} className="mx-auto mb-4 text-neutral-400" />
                  <h3 className="heading-medium text-neutral-700 mb-2">No Recent Orders</h3>
                  <p className="body-medium text-neutral-600 mb-4">
                    You haven't placed any orders yet.
                  </p>
                  <Link 
                    to="/medicine-catalog" className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Icon name="ShoppingBag" size={18} className="mr-2" />
                    <span>Browse Medicines</span>
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}
        
        {/* Emergency Contacts Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="heading-large text-neutral-800 mb-6">Emergency Contacts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <EmergencyContactCard 
                title="Medical Emergency" phone="911" description="For life-threatening emergencies requiring immediate medical attention" icon="Ambulance" color="bg-emergency-100 text-emergency-600"
              />
              <EmergencyContactCard 
                title="Poison Control" phone="1-800-222-1222" description="For exposure to poisonous substances or medication overdose" icon="AlertTriangle" color="bg-warning-100 text-warning-600"
              />
              <EmergencyContactCard 
                title="MediQuick Support" phone="1-888-MED-QUICK" description="24/7 support for urgent medication delivery needs" icon="Headphones" color="bg-primary-100 text-primary-600"
              />
            </div>
          </div>
        </section>
        
        {/* Trust Indicators Section */}
        <section className="py-10 bg-neutral-50">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="heading-large text-neutral-800 mb-8 text-center">Why Choose MediQuick</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Clock" size={32} className="text-primary-600" />
                </div>
                <h3 className="heading-medium text-neutral-800 mb-2">1-Hour Delivery</h3>
                <p className="body-medium text-neutral-600">
                  Emergency medications delivered to your doorstep within 60 minutes
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="ShieldCheck" size={32} className="text-success-600" />
                </div>
                <h3 className="heading-medium text-neutral-800 mb-2">Verified Medicines</h3>
                <p className="body-medium text-neutral-600">
                  All medications sourced from licensed pharmacies with quality assurance
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-info-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Headphones" size={32} className="text-info-600" />
                </div>
                <h3 className="heading-medium text-neutral-800 mb-2">24/7 Support</h3>
                <p className="body-medium text-neutral-600">
                  Round-the-clock customer service for all your medication needs
                </p>
              </div>
            </div>
            
            {/* Partner Pharmacies */}
            <div className="mb-12">
              <h3 className="heading-medium text-neutral-700 mb-6 text-center">Our Partner Pharmacies</h3>
              <div className="flex flex-wrap justify-center items-center gap-8">
                <div className="w-32 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center p-2">
                  <Image 
                    src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                    alt="CVS Pharmacy" className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="w-32 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center p-2">
                  <Image 
                    src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                    alt="Walgreens" className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="w-32 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center p-2">
                  <Image 
                    src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                    alt="Rite Aid" className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="w-32 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center p-2">
                  <Image 
                    src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                    alt="HealthMart" className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            </div>
            
            {/* Testimonials */}
            <h3 className="heading-medium text-neutral-700 mb-6 text-center">What Our Customers Say</h3>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-neutral-200 rounded-full mr-3"></div>
                      <div>
                        <div className="h-4 bg-neutral-200 rounded w-24 mb-2"></div>
                        <div className="h-3 bg-neutral-200 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-neutral-200 rounded w-full mb-3"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full mb-3"></div>
                    <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Download App Section */}
        <section className="py-12 bg-primary-600 text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="display-small mb-4">Get the MediQuick App</h2>
                <p className="body-large mb-6 text-primary-100">
                  Download our mobile app for faster ordering, real-time tracking, and exclusive offers.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="bg-black rounded-lg px-4 py-3 flex items-center hover:bg-neutral-800 transition-colors">
                    <Icon name="Apple" size={24} className="mr-2" />
                    <div>
                      <p className="text-xs">Download on the</p>
                      <p className="text-sm font-semibold">App Store</p>
                    </div>
                  </a>
                  <a href="#" className="bg-black rounded-lg px-4 py-3 flex items-center hover:bg-neutral-800 transition-colors">
                    <Icon name="Play" size={24} className="mr-2" />
                    <div>
                      <p className="text-xs">Get it on</p>
                      <p className="text-sm font-semibold">Google Play</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <Image 
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="MediQuick Mobile App" className="max-w-full md:max-w-xs rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Chat Support Button */}
      <button 
        onClick={toggleChatSupport}
        className="fixed bottom-6 right-6 bg-primary-600 text-white rounded-full p-4 shadow-lg hover:bg-primary-700 transition-colors z-20"
        aria-label="Need Help?"
      >
        <Icon name="MessageCircle" size={24} />
      </button>
      
      {/* Chat Support Modal */}
      {showChatSupport && (
        <ChatSupport onClose={toggleChatSupport} />
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

// Mock Data
const mockRecentOrders = [
  {
    id: "ORD-2023-1001",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    items: [
      { name: "Paracetamol 500mg", quantity: 2 },
      { name: "Azithromycin 250mg", quantity: 1 },
      { name: "Vitamin C 1000mg", quantity: 1 }
    ],
    total: 28.97,
    status: "Delivered"
  },
  {
    id: "ORD-2023-0985",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    items: [
      { name: "Amoxicillin 500mg", quantity: 1 },
      { name: "Cough Syrup", quantity: 1 }
    ],
    total: 22.50,
    status: "Delivered"
  },
  {
    id: "ORD-2023-0954",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    items: [
      { name: "Metformin 500mg", quantity: 1 },
      { name: "Blood Glucose Test Strips", quantity: 2 }
    ],
    total: 45.50,
    status: "Delivered"
  }
];

const mockCategories = [
  {
    id: 1,
    name: "Emergency Medicines",
    description: "Critical medications for immediate relief and emergency situations",
    icon: "Stethoscope",
    color: "bg-emergency-100 text-emergency-600",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    link: "/medicine-catalog?category=emergency"
  },
  {
    id: 2,
    name: "Chronic Care",
    description: "Regular medications for managing long-term health conditions",
    icon: "Heart",
    color: "bg-primary-100 text-primary-600",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    link: "/medicine-catalog?category=chronic"
  },
  {
    id: 3,
    name: "Medical Devices",
    description: "Essential equipment for home healthcare and monitoring",
    icon: "Thermometer",
    color: "bg-info-100 text-info-600",
    image: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a41?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    link: "/medicine-catalog?category=devices"
  }
];

const mockTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
    text: "MediQuick was a lifesaver when my son had a high fever at midnight. The medication was delivered in just 40 minutes, and the delivery person was so professional and kind."
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    location: "Chicago, IL",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
    text: "As someone with chronic health issues, having reliable medication delivery is crucial. MediQuick has never let me down - always on time and with exactly what I need."
  },
  {
    id: 3,
    name: "Emily Chen",
    location: "San Francisco, CA",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4,
    text: "The app is incredibly easy to use, and I love being able to upload my prescription directly. The delivery tracking feature gives me peace of mind knowing exactly when my medication will arrive."
  }
];

const mockMedicines = [
  {
    id: 101,
    name: "Paracetamol 500mg",
    description: "For pain relief and fever reduction",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 102,
    name: "Amoxicillin 250mg",
    description: "Antibiotic for bacterial infections",
    price: 12.50,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 103,
    name: "Ibuprofen 400mg",
    description: "Anti-inflammatory pain reliever",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 104,
    name: "Cetirizine 10mg",
    description: "Antihistamine for allergy relief",
    price: 8.75,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 105,
    name: "Omeprazole 20mg",
    description: "For acid reflux and heartburn",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  }
];

export default Home;