import React, { useState, useEffect, useRef } from "react";
import Icon from "../../../components/AppIcon";

const SearchBar = ({ onSearch, searchTerm, setSearchTerm, suggestions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) && 
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
    setActiveSuggestion(-1);
  };

  const handleKeyDown = (e) => {
    // Enter key
    if (e.keyCode === 13) {
      if (activeSuggestion >= 0 && activeSuggestion < suggestions.length) {
        setSearchTerm(suggestions[activeSuggestion]);
        setShowSuggestions(false);
        onSearch(suggestions[activeSuggestion]);
      } else {
        onSearch(searchTerm);
        setShowSuggestions(false);
      }
    }
    // Arrow up
    else if (e.keyCode === 38) {
      if (activeSuggestion > 0) {
        setActiveSuggestion(activeSuggestion - 1);
      }
      e.preventDefault();
    }
    // Arrow down
    else if (e.keyCode === 40) {
      if (activeSuggestion < suggestions.length - 1) {
        setActiveSuggestion(activeSuggestion + 1);
      }
      e.preventDefault();
    }
    // Escape key
    else if (e.keyCode === 27) {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setShowSuggestions(false);
  };

  const filteredSuggestions = suggestions.filter(suggestion => 
    suggestion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(searchTerm.length > 0)}
          placeholder="Search for medicines, devices, and more..."
          className="w-full pl-10 pr-12 py-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 shadow-sm"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
          <Icon name="Search" size={20} />
        </div>
        <button
          type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-600 hover:text-primary-700"
        >
          <Icon name="ArrowRight" size={20} />
        </button>
      </form>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          <ul>
            {filteredSuggestions.map((suggestion, index) => (
              <li 
                key={index}
                className={`px-4 py-2 cursor-pointer hover:bg-neutral-100 ${
                  index === activeSuggestion ? 'bg-primary-50 text-primary-700' : 'text-neutral-700'
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center">
                  <Icon name="Search" size={16} className="mr-2 text-neutral-400" />
                  {suggestion}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;