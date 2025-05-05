import React, { useState, useEffect, useCallback } from "react";
import Icon from "../../components/AppIcon";

// Import components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import FilterSidebar from "./components/FilterSidebar";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/ProductCard";
import CartSummary from "./components/CartSummary";

const MedicineCatalog = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [showCartSummary, setShowCartSummary] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    categories: {
      prescription: false,
      otc: false,
      devices: false,
      supplements: false,
      personalCare: false
    },
    priceRange: {
      min: 0,
      max: 500
    },
    availability: {
      inStock: false,
      fastDelivery: false
    },
    sort: "relevance"
  });

  // Mock data for products
  const mockProducts = [
    {
      id: 1,
      name: "Amoxicillin 500mg Capsules",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Antibiotic used to treat bacterial infections including respiratory infections, skin infections, and urinary tract infections.",
      price: 12.99,
      originalPrice: 15.99,
      inStock: true,
      requiresPrescription: true,
      prescriptionVerified: false,
      fastDelivery: true,
      isEmergency: true,
      category: "prescription",
      rating: 4.8,
      ratingCount: 245
    },
    {
      id: 2,
      name: "Digital Blood Pressure Monitor",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Automatic upper arm blood pressure monitor with large LCD display and irregular heartbeat detection.",
      price: 49.99,
      originalPrice: null,
      inStock: true,
      requiresPrescription: false,
      fastDelivery: false,
      isEmergency: false,
      category: "devices",
      rating: 4.5,
      ratingCount: 189
    },
    {
      id: 3,
      name: "Ibuprofen 200mg Tablets",
      image: "https://images.unsplash.com/photo-1550572017-9cf1a6a1f6a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Pain reliever and fever reducer for headaches, muscle aches, minor arthritis pain, and menstrual cramps.",
      price: 8.49,
      originalPrice: 9.99,
      inStock: true,
      requiresPrescription: false,
      fastDelivery: true,
      isEmergency: false,
      category: "otc",
      rating: 4.7,
      ratingCount: 312
    },
    {
      id: 4,
      name: "Vitamin D3 5000 IU Supplements",
      image: "https://images.unsplash.com/photo-1577460551100-d3f84b6e4bf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Supports bone health, immune function, and overall wellness. Essential for those with limited sun exposure.",
      price: 15.99,
      originalPrice: 19.99,
      inStock: true,
      requiresPrescription: false,
      fastDelivery: false,
      isEmergency: false,
      category: "supplements",
      rating: 4.6,
      ratingCount: 178
    },
    {
      id: 5,
      name: "Digital Thermometer",
      image: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Fast reading digital thermometer with fever alert function and waterproof tip for oral, rectal, or underarm use.",
      price: 12.99,
      originalPrice: null,
      inStock: true,
      requiresPrescription: false,
      fastDelivery: true,
      isEmergency: true,
      category: "devices",
      rating: 4.4,
      ratingCount: 156
    },
    {
      id: 6,
      name: "Lisinopril 10mg Tablets",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "ACE inhibitor used to treat high blood pressure and heart failure, and to improve survival after a heart attack.",
      price: 14.99,
      originalPrice: 18.99,
      inStock: true,
      requiresPrescription: true,
      prescriptionVerified: false,
      fastDelivery: true,
      isEmergency: true,
      category: "prescription",
      rating: 4.9,
      ratingCount: 203
    },
    {
      id: 7,
      name: "First Aid Kit - 100 Pieces",
      image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Comprehensive first aid kit with bandages, antiseptics, pain relievers, and emergency supplies for home, travel, or workplace.",
      price: 24.99,
      originalPrice: 29.99,
      inStock: true,
      requiresPrescription: false,
      fastDelivery: true,
      isEmergency: true,
      category: "personalCare",
      rating: 4.7,
      ratingCount: 289
    },
    {
      id: 8,
      name: "Cetirizine 10mg Allergy Tablets",
      image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "24-hour relief from allergy symptoms including runny nose, sneezing, itchy or watery eyes, and itchy throat or nose.",
      price: 11.49,
      originalPrice: 13.99,
      inStock: true,
      requiresPrescription: false,
      fastDelivery: false,
      isEmergency: false,
      category: "otc",
      rating: 4.5,
      ratingCount: 176
    },
    {
      id: 9,
      name: "Pulse Oximeter",
      image: "https://images.unsplash.com/photo-1584308666999-b85cdf88d68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Fingertip pulse oximeter that measures blood oxygen saturation levels and pulse rate with high accuracy.",
      price: 34.99,
      originalPrice: 39.99,
      inStock: true,
      requiresPrescription: false,
      fastDelivery: true,
      isEmergency: true,
      category: "devices",
      rating: 4.8,
      ratingCount: 234
    },
    {
      id: 10,
      name: "Metformin 500mg Tablets",
      image: "https://images.unsplash.com/photo-1585435557343-3b348031e799?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Oral diabetes medicine that helps control blood sugar levels in patients with type 2 diabetes.",
      price: 9.99,
      originalPrice: 12.99,
      inStock: false,
      requiresPrescription: true,
      prescriptionVerified: false,
      fastDelivery: false,
      isEmergency: false,
      category: "prescription",
      rating: 4.6,
      ratingCount: 198
    },
    {
      id: 11,
      name: "Omega-3 Fish Oil Supplements",
      image: "https://images.unsplash.com/photo-1577460551100-d3f84b6e4bf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Supports heart health, brain function, and reduces inflammation with essential fatty acids EPA and DHA.",
      price: 18.99,
      originalPrice: 22.99,
      inStock: true,
      requiresPrescription: false,
      fastDelivery: false,
      isEmergency: false,
      category: "supplements",
      rating: 4.4,
      ratingCount: 145
    },
    {
      id: 12,
      name: "Hand Sanitizer - 8oz",
      image: "https://images.unsplash.com/photo-1584483720412-ce931f4aefa8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "70% alcohol-based hand sanitizer that kills 99.9% of germs without water or towels. Includes moisturizers to prevent dry skin.",
      price: 5.99,
      originalPrice: 7.99,
      inStock: true,
      requiresPrescription: false,
      fastDelivery: true,
      isEmergency: false,
      category: "personalCare",
      rating: 4.3,
      ratingCount: 267
    }
  ];

  // Mock search suggestions
  const searchSuggestions = [
    "Amoxicillin",
    "Blood Pressure Monitor",
    "Ibuprofen",
    "Vitamin D",
    "Thermometer",
    "Lisinopril",
    "First Aid Kit",
    "Allergy Relief",
    "Pulse Oximeter",
    "Metformin",
    "Omega-3",
    "Hand Sanitizer",
    "Pain Relief",
    "Diabetes Supplies",
    "Cold & Flu",
    "Antibiotics"
  ];

  // Load initial products
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);

  // Apply filters
  const applyFilters = useCallback((currentFilters = filters) => {
    setLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      let filtered = [...mockProducts];
      
      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Filter by categories
      const selectedCategories = Object.entries(currentFilters.categories)
        .filter(([_, isSelected]) => isSelected)
        .map(([category]) => category);
      
      if (selectedCategories.length > 0) {
        filtered = filtered.filter(product => selectedCategories.includes(product.category));
      }
      
      // Filter by price range
      filtered = filtered.filter(product => 
        product.price >= currentFilters.priceRange.min && 
        product.price <= currentFilters.priceRange.max
      );
      
      // Filter by availability
      if (currentFilters.availability.inStock) {
        filtered = filtered.filter(product => product.inStock);
      }
      
      if (currentFilters.availability.fastDelivery) {
        filtered = filtered.filter(product => product.fastDelivery);
      }
      
      // Sort products
      switch (currentFilters.sort) {
        case "priceLowToHigh":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "priceHighToLow":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "popularity":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        default:
          // Default is relevance, which we'll simulate by sorting emergency items first
          filtered.sort((a, b) => {
            if (a.isEmergency && !b.isEmergency) return -1;
            if (!a.isEmergency && b.isEmergency) return 1;
            return 0;
          });
      }
      
      setFilteredProducts(filtered);
      setLoading(false);
      setPage(1);
      setHasMore(filtered.length > 12);
    }, 500);
  }, [searchTerm, filters]);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    applyFilters({ ...filters });
  };

  // Reset filters
  const resetFilters = () => {
    const resetFilterValues = {
      categories: {
        prescription: false,
        otc: false,
        devices: false,
        supplements: false,
        personalCare: false
      },
      priceRange: {
        min: 0,
        max: 500
      },
      availability: {
        inStock: false,
        fastDelivery: false
      },
      sort: "relevance"
    };
    
    setFilters(resetFilterValues);
    setSearchTerm("");
    applyFilters(resetFilterValues);
  };

  // Add to cart
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    setShowCartSummary(true);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Toggle filter sidebar
  const toggleFilterSidebar = () => {
    setFilterSidebarOpen(!filterSidebarOpen);
  };
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real application, you would apply dark mode classes to the root element
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Toggle cart summary
  const toggleCartSummary = () => {
    setShowCartSummary(!showCartSummary);
  };

  // Load more products
  const loadMoreProducts = () => {
    setPage(prevPage => prevPage + 1);
    // In a real app, this would fetch more products from an API
    setHasMore(false); // For demo purposes, we'll just disable the button after one click
  };

  return (
    <div className={`flex h-screen bg-neutral-50 ${darkMode ? 'dark' : ''}`}>
      {/* Main Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          toggleSidebar={toggleSidebar} 
          toggleDarkMode={toggleDarkMode} 
          isDarkMode={darkMode} 
          cartItemsCount={cart.reduce((total, item) => total + item.quantity, 0)}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {/* Search Bar - Sticky */}
          <div className="sticky top-0 z-30 bg-white shadow-sm p-4 border-b border-neutral-200">
            <div className="container mx-auto max-w-7xl">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <SearchBar 
                  onSearch={handleSearch} 
                  searchTerm={searchTerm} 
                  setSearchTerm={setSearchTerm}
                  suggestions={searchSuggestions}
                />
                
                <button
                  onClick={toggleFilterSidebar}
                  className="mt-3 md:mt-0 md:w-auto w-full flex items-center justify-center bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium py-2 px-4 rounded-lg transition duration-300 lg:hidden"
                >
                  <Icon name="SlidersHorizontal" size={18} className="mr-2" />
                  Filters
                </button>
              </div>
            </div>
          </div>
          
          {/* Content Container */}
          <div className="container mx-auto max-w-7xl p-4">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-display font-bold text-neutral-800 mb-1">
                Medicine Catalog
              </h1>
              <p className="text-neutral-600">
                Browse our extensive collection of medicines, medical devices, and health products
              </p>
            </div>
            
            {/* Main Grid Layout */}
            <div className="flex flex-col lg:flex-row">
              {/* Filter Sidebar - Desktop */}
      
              {/* <div className="hidden lg:block lg:w-64 flex-shrink-0 mr-6">
                <FilterSidebar 
                  filters={filters}
                  setFilters={setFilters}
                  isOpen={true}
                  toggleSidebar={() => {}}
                  applyFilters={applyFilters}
                  resetFilters={resetFilters}
                />
              </div> */}
              
              {/* Filter Sidebar - Mobile */}
              {/* <div className="lg:hidden fixed inset-0 z-40 bg-white shadow-lg transition-transform transform ${filterSidebarOpen ? 'translate-x-0' : 'translate-x-full'}"></div> */}
              <div className="flex justify-between items-center p-2 border-b border-neutral-400">
              <FilterSidebar 
                filters={filters}
                setFilters={setFilters}
                isOpen={filterSidebarOpen}
                toggleSidebar={toggleFilterSidebar}
                applyFilters={applyFilters}
                resetFilters={resetFilters}
              />
            </div>
              
              {/* Products Grid */}
              <div className="flex-1">
                {/* Active Filters */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  {Object.entries(filters.categories).some(([_, value]) => value) && (
                    <div className="text-sm text-neutral-600 mr-2">
                      <span className="font-medium">Categories:</span>
                    </div>
                  )}
                  
                  {Object.entries(filters.categories)
                    .filter(([_, value]) => value)
                    .map(([key]) => (
                      <span 
                        key={key} 
                        className="bg-primary-100 text-primary-700 text-xs font-medium px-2 py-1 rounded-full flex items-center"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                        <button 
                          onClick={() => {
                            const newFilters = {
                              ...filters,
                              categories: {
                                ...filters.categories,
                                [key]: false
                              }
                            };
                            setFilters(newFilters);
                            applyFilters(newFilters);
                          }}
                          className="ml-1 text-primary-600 hover:text-primary-800"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </span>
                    ))
                  }
                  
                  {(filters.availability.inStock || filters.availability.fastDelivery) && (
                    <div className="text-sm text-neutral-600 mr-2 ml-2">
                      <span className="font-medium">Availability:</span>
                    </div>
                  )}
                  
                  {filters.availability.inStock && (
                    <span className="bg-success-100 text-success-600 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                      In Stock
                      <button 
                        onClick={() => {
                          const newFilters = {
                            ...filters,
                            availability: {
                              ...filters.availability,
                              inStock: false
                            }
                          };
                          setFilters(newFilters);
                          applyFilters(newFilters);
                        }}
                        className="ml-1 text-success-600 hover:text-success-800"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  )}
                  
                  {filters.availability.fastDelivery && (
                    <span className="bg-warning-100 text-warning-500 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                      Fast Delivery
                      <button 
                        onClick={() => {
                          const newFilters = {
                            ...filters,
                            availability: {
                              ...filters.availability,
                              fastDelivery: false
                            }
                          };
                          setFilters(newFilters);
                          applyFilters(newFilters);
                        }}
                        className="ml-1 text-warning-500 hover:text-warning-700"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  )}
                  
                  {searchTerm && (
                    <span className="bg-info-100 text-info-600 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                      Search: {searchTerm}
                      <button 
                        onClick={() => {
                          setSearchTerm("");
                          applyFilters(filters);
                        }}
                        className="ml-1 text-info-600 hover:text-info-800"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  )}
                  
                  {(Object.entries(filters.categories).some(([_, value]) => value) || 
                    filters.availability.inStock || 
                    filters.availability.fastDelivery || 
                    searchTerm) && (
                    <button 
                      onClick={resetFilters}
                      className="text-neutral-600 hover:text-neutral-800 text-xs font-medium ml-2"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                
                {/* Results Count and Sort (Mobile) */}
                <div className="flex justify-between items-center mb-4">
                  <p className="text-neutral-600 text-sm">
                    Showing <span className="font-medium">{filteredProducts.length}</span> results
                  </p>
                  
                  <div className="flex items-center">
                    <label className="text-sm text-neutral-600 mr-2">Sort:</label>
                    <select 
                      value={filters.sort}
                      onChange={(e) => {
                        const newFilters = {
                          ...filters,
                          sort: e.target.value
                        };
                        setFilters(newFilters);
                        applyFilters(newFilters);
                      }}
                      className="text-sm border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="priceLowToHigh">Price: Low to High</option>
                      <option value="priceHighToLow">Price: High to Low</option>
                      <option value="popularity">Popularity</option>
                    </select>
                  </div>
                </div>
                
                {/* Loading State */}
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 h-96">
                        <div className="animate-pulse">
                          <div className="h-48 bg-neutral-200 rounded-lg mb-4"></div>
                          <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-neutral-200 rounded w-1/2 mb-4"></div>
                          <div className="h-3 bg-neutral-200 rounded w-full mb-2"></div>
                          <div className="h-3 bg-neutral-200 rounded w-5/6 mb-4"></div>
                          <div className="h-8 bg-neutral-200 rounded w-full mt-auto"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredProducts.length === 0 ? (
                  // No Results
                  <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8 text-center">
                    <div className="text-neutral-400 mb-4">
                      <Icon name="Search" size={48} />
                    </div>
                    <h3 className="text-lg font-medium text-neutral-800 mb-2">No products found</h3>
                    <p className="text-neutral-600 mb-4">
                      We couldn't find any products matching your criteria. Try adjusting your filters or search term.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  // Products Grid
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredProducts.slice(0, page * 12).map((product) => (
                        <ProductCard 
                          key={product.id} 
                          product={product} 
                          addToCart={addToCart}
                        />
                      ))}
                    </div>
                    
                    {/* Load More Button */}
                    {hasMore && (
                      <div className="mt-8 text-center">
                        <button
                          onClick={loadMoreProducts}
                          className="bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium py-2 px-6 rounded-lg transition duration-300"
                        >
                          Load More Products
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
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
      
      {/* Floating Cart Summary */}
      <CartSummary 
        cart={cart} 
        isVisible={showCartSummary} 
        toggleCart={toggleCartSummary} 
      />
    </div>
  );
};

export default MedicineCatalog;