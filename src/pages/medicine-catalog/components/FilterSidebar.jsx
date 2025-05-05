import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const FilterSidebar = ({ 
  filters, 
  setFilters, 
  isOpen, 
  toggleSidebar, 
  applyFilters, 
  resetFilters 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  
  const handleCategoryChange = (category) => {
    setLocalFilters({
      ...localFilters,
      categories: {
        ...localFilters.categories,
        [category]: !localFilters.categories[category]
      }
    });
  };

  const handleAvailabilityChange = (availability) => {
    setLocalFilters({
      ...localFilters,
      availability: {
        ...localFilters.availability,
        [availability]: !localFilters.availability[availability]
      }
    });
  };

  const handlePriceChange = (type, value) => {
    setLocalFilters({
      ...localFilters,
      priceRange: {
        ...localFilters.priceRange,
        [type]: parseInt(value)
      }
    });
  };

  const handleSortChange = (sortOption) => {
    setLocalFilters({
      ...localFilters,
      sort: sortOption
    });
  };

  const handleApply = () => {
    setFilters(localFilters);
    applyFilters(localFilters);
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  const handleReset = () => {
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
    
    setLocalFilters(resetFilterValues);
    setFilters(resetFilterValues);
    resetFilters();
    
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-neutral-900 bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
          <h2 className="font-display font-semibold text-lg text-neutral-800">Filters</h2>
          <button 
            className="lg:hidden text-neutral-500 hover:text-neutral-700"
            onClick={toggleSidebar}
            aria-label="Close filters"
          >
            <Icon name="X" size={24} />
          </button>
        </div>
        
        <div className="p-4">
          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-medium text-neutral-800 mb-3">Categories</h3>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                  checked={localFilters.categories.prescription}
                  onChange={() => handleCategoryChange('prescription')}
                />
                <span className="ml-2 text-neutral-700">Prescription Medicines</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                  checked={localFilters.categories.otc}
                  onChange={() => handleCategoryChange('otc')}
                />
                <span className="ml-2 text-neutral-700">Over-the-Counter</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                  checked={localFilters.categories.devices}
                  onChange={() => handleCategoryChange('devices')}
                />
                <span className="ml-2 text-neutral-700">Medical Devices</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                  checked={localFilters.categories.supplements}
                  onChange={() => handleCategoryChange('supplements')}
                />
                <span className="ml-2 text-neutral-700">Health Supplements</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                  checked={localFilters.categories.personalCare}
                  onChange={() => handleCategoryChange('personalCare')}
                />
                <span className="ml-2 text-neutral-700">Personal Care</span>
              </label>
            </div>
          </div>
          
          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium text-neutral-800 mb-3">Price Range</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm text-neutral-600">Min Price ($)</label>
                  <span className="text-sm font-medium text-neutral-800">${localFilters.priceRange.min}</span>
                </div>
                <input 
                  type="range" min="0" max="500" step="10"
                  value={localFilters.priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm text-neutral-600">Max Price ($)</label>
                  <span className="text-sm font-medium text-neutral-800">${localFilters.priceRange.max}</span>
                </div>
                <input 
                  type="range" min="0" max="500" step="10"
                  value={localFilters.priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
          
          {/* Availability */}
          <div className="mb-6">
            <h3 className="font-medium text-neutral-800 mb-3">Availability</h3>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                  checked={localFilters.availability.inStock}
                  onChange={() => handleAvailabilityChange('inStock')}
                />
                <span className="ml-2 text-neutral-700">In Stock</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                  checked={localFilters.availability.fastDelivery}
                  onChange={() => handleAvailabilityChange('fastDelivery')}
                />
                <span className="ml-2 text-neutral-700">Fast Delivery (1 hour)</span>
              </label>
            </div>
          </div>
          
          {/* Sort By */}
          <div className="mb-6">
            <h3 className="font-medium text-neutral-800 mb-3">Sort By</h3>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" name="sort" className="border-neutral-300 text-primary-600 focus:ring-primary-500 h-4 w-4" checked={localFilters.sort ==="relevance"}
                  onChange={() => handleSortChange("relevance")}
                />
                <span className="ml-2 text-neutral-700">Relevance</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" name="sort" className="border-neutral-300 text-primary-600 focus:ring-primary-500 h-4 w-4" checked={localFilters.sort ==="priceLowToHigh"}
                  onChange={() => handleSortChange("priceLowToHigh")}
                />
                <span className="ml-2 text-neutral-700">Price: Low to High</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" name="sort" className="border-neutral-300 text-primary-600 focus:ring-primary-500 h-4 w-4" checked={localFilters.sort ==="priceHighToLow"}
                  onChange={() => handleSortChange("priceHighToLow")}
                />
                <span className="ml-2 text-neutral-700">Price: High to Low</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" name="sort" className="border-neutral-300 text-primary-600 focus:ring-primary-500 h-4 w-4" checked={localFilters.sort ==="popularity"}
                  onChange={() => handleSortChange("popularity")}
                />
                <span className="ml-2 text-neutral-700">Popularity</span>
              </label>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-neutral-200">
            <button
              onClick={handleApply}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              Apply Filters
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              Reset
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;