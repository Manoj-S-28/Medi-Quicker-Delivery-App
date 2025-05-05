import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const SearchBar = ({ searchQuery, onSearchChange, searchResults }) => {
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  
  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center bg-white border border-neutral-300 rounded-lg focus-within:ring-2 focus-within:ring-primary-400 focus-within:border-primary-400">
        <div className="pl-4 pr-2 text-neutral-500">
          <Icon name="Search" size={20} />
        </div>
        <input
          type="text" placeholder="Search for medicines, health products..." className="w-full py-3 px-2 border-none focus:ring-0 text-neutral-800 placeholder-neutral-400"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        {searchQuery && (
          <button 
            className="pr-4 pl-2 text-neutral-400 hover:text-neutral-600" onClick={() => onSearchChange("")}
          >
            <Icon name="X" size={18} />
          </button>
        )}
      </div>
      
      {/* Search Results Dropdown */}
      {isFocused && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-neutral-200 z-30 max-h-96 overflow-y-auto">
          <div className="p-2">
            <h3 className="label-medium text-neutral-600 px-3 py-2">Search Results</h3>
            
            {searchResults.map((medicine) => (
              <Link 
                key={medicine.id}
                to={`/medicine-catalog?search=${encodeURIComponent(medicine.name)}`}
                className="flex items-center p-3 hover:bg-neutral-50 rounded-md transition-colors"
                onClick={() => setIsFocused(false)}
              >
                <div className="w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
                  <Image 
                    src={medicine.image} 
                    alt={medicine.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="label-medium text-neutral-800">{medicine.name}</h4>
                  <p className="body-small text-neutral-600">{medicine.description}</p>
                </div>
                <span className="label-medium text-primary-700">${medicine.price.toFixed(2)}</span>
              </Link>
            ))}
            
            <Link 
              to={`/medicine-catalog?search=${encodeURIComponent(searchQuery)}`}
              className="flex items-center justify-center p-3 text-primary-600 hover:bg-primary-50 rounded-md transition-colors mt-2"
              onClick={() => setIsFocused(false)}
            >
              <span className="label-medium mr-1">View all results</span>
              <Icon name="ArrowRight" size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;