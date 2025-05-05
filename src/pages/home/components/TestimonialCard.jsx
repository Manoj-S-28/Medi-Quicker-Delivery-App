import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const TestimonialCard = ({ testimonial }) => {
  // Generate star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon 
          key={i}
          name={i <= rating ? "Star" : "StarOff"} 
          size={16} 
          className={i <= rating ? "text-warning-600" : "text-neutral-300"} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
          <Image 
            src={testimonial.avatar} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="label-medium text-neutral-800">{testimonial.name}</h4>
          <p className="body-small text-neutral-500">{testimonial.location}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {renderStars(testimonial.rating)}
      </div>
      
      <p className="body-medium text-neutral-600">
        "{testimonial.text}"
      </p>
    </div>
  );
};

export default TestimonialCard;