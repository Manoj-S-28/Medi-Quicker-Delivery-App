import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const FilePreview = ({ files, onRemove, onRotate }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!files || files.length === 0) {
    return null;
  }

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? files.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === files.length - 1 ? 0 : prev + 1));
  };

  const getFilePreview = (file) => {
    if (file.type.includes('image')) {
      return URL.createObjectURL(file);
    } else if (file.type === 'application/pdf') {
      return null; // PDF preview not supported directly
    }
    return null;
  };

  return (
    <div className="mt-6">
      <h3 className="font-display font-semibold text-lg text-neutral-800 mb-4">
        Prescription Preview
      </h3>
      
      <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
        {/* Main preview */}
        <div className="relative bg-white rounded-lg shadow-sm p-2 mb-4 h-64 flex items-center justify-center">
          {files[activeIndex].type.includes('image') ? (
            <img 
              src={getFilePreview(files[activeIndex])} 
              alt={`Prescription ${activeIndex + 1}`}
              className="max-h-full max-w-full object-contain"
              style={{ transform: `rotate(${files[activeIndex].rotation || 0}deg)` }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-neutral-600">
              <Icon name="FileText" size={48} className="mb-2 text-primary-500" />
              <p className="font-medium">{files[activeIndex].name}</p>
              <p className="text-sm text-neutral-500 mt-1">PDF Preview Not Available</p>
            </div>
          )}
          
          {/* Navigation arrows for multiple files */}
          {files.length > 1 && (
            <>
              <button 
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition duration-200"
                aria-label="Previous file"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition duration-200"
                aria-label="Next file"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </>
          )}
        </div>
        
        {/* File actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-sm font-medium text-neutral-700">
              {activeIndex + 1} of {files.length} {files.length === 1 ? 'file' : 'files'}
            </span>
            <span className="mx-2 text-neutral-400">|</span>
            <span className="text-sm text-neutral-600">
              {files[activeIndex].name}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => onRotate(activeIndex)}
              className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 rounded-full transition duration-200" aria-label="Rotate image"
            >
              <Icon name="RotateCw" size={18} />
            </button>
            <button 
              onClick={() => onRemove(activeIndex)}
              className="p-2 text-neutral-600 hover:text-error-600 hover:bg-neutral-100 rounded-full transition duration-200" aria-label="Remove file"
            >
              <Icon name="Trash2" size={18} />
            </button>
          </div>
        </div>
        
        {/* Thumbnails for multiple files */}
        {files.length > 1 && (
          <div className="mt-4 flex space-x-2 overflow-x-auto py-2">
            {files.map((file, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative h-16 w-16 rounded border-2 flex-shrink-0 overflow-hidden ${
                  index === activeIndex ? "border-primary-500" : "border-neutral-200"
                }`}
              >
                {file.type.includes('image') ? (
                  <img 
                    src={getFilePreview(file)} 
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-neutral-100">
                    <Icon name="FileText" size={20} className="text-neutral-500" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilePreview;