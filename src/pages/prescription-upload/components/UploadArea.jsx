import React, { useState, useRef } from "react";
import Icon from "../../../components/AppIcon";


const UploadArea = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter(file => {
      const fileType = file.type.toLowerCase();
      return fileType.includes('image') || fileType === 'application/pdf';
    });

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    } else {
      alert("Please upload valid image or PDF files only.");
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        isDragging ? "border-primary-500 bg-primary-50" : "border-neutral-300 hover:border-primary-400"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*,application/pdf"
        multiple
        className="hidden" aria-label="Upload prescription files"
      />

      <div className="flex flex-col items-center justify-center">
        <div className="bg-primary-100 p-4 rounded-full mb-4">
          <Icon name="FileUp" size={32} color="var(--color-primary-600)" />
        </div>
        
        <h3 className="font-display font-semibold text-lg text-neutral-800 mb-2">
          Drag & Drop Your Prescription
        </h3>
        
        <p className="text-neutral-600 mb-6 max-w-md">
          Upload your prescription as image or PDF files. You can upload multiple files if needed.
        </p>
        
        <button
          type="button"
          onClick={handleBrowseClick}
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 flex items-center"
        >
          <Icon name="FolderOpen" size={18} className="mr-2" color="white" />
          Browse Files
        </button>
        
        <p className="mt-4 text-sm text-neutral-500">
          Supported formats: JPG, PNG, PDF (Max 10MB per file)
        </p>
      </div>
    </div>
  );
};

export default UploadArea;